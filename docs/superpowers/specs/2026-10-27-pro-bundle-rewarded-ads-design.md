# Design: DJ Guide Pro + Rewarded Ads

Datum: 2026-10-27
Status: Entwurf, wartet auf Freigabe (Plattform: nur iOS)

## Warum

Heute gibt es einen einzigen Kauf: „Werbung entfernen“ (IAP `free_ads`). Das ist ein schwacher Kaufgrund. Ziel ist,
mehr Umsatz pro Nutzer zu erzielen, ohne bestehende Nutzer zu verärgern:

1. **Pro-Bundle:** Aus „Werbung entfernen“ wird „DJ Guide Pro“ = werbefrei + Extras, die ab jetzt nur für Pro entstehen.
   Erstes Extra: **Lesezeichen**. (Zweites Extra, der Tools-Tab, ist ein eigenes Folgeprojekt und nicht Teil dieses
   Designs.)
2. **Rewarded Ads:** Gratis-Nutzer können freiwillig ein Werbevideo ansehen und bekommen dafür 1 Stunde werbefrei. Das
   bringt Werbeumsatz von Nutzern, die nie kaufen, und lässt sie Werbefreiheit „probieren“ (Upsell zu Pro).

## Ziele

- Pro-Kauf ist für Nutzer klar als „mehr als nur werbefrei“ erkennbar.
- Gratis-Nutzer entdecken Pro im passenden Moment (beim Antippen eines Lesezeichens).
- Rewarded-Video als freiwillige Alternative zum Kauf.
- Messbar über Firebase Analytics, ob Rewarded Ads Pro-Käufe kannibalisieren.

## Nicht-Ziele

- Tools-Tab, Quiz, Geräte-Packs (spätere Projekte).
- Cloud-Sync oder Accounts für Lesezeichen.
- Änderungen an Interstitial-Logik (Tab-Wechsel, 3 Min. Cooldown) — bleibt unverändert, damit Effekt der Rewarded Ads
  messbar ist.
- Abo-Modell.

## Anti-Ziele (wäre ein Fehlschlag, selbst wenn es technisch läuft)

- **Bestehende Inhalte hinter Pro sperren.** Alles, was heute gratis ist, bleibt gratis. (Entscheidung des Nutzers.)
- Bisherige `free_ads`-Käufer verlieren etwas oder müssen erneut kaufen.
- Lesezeichen gehen verloren, wenn sich Inhaltstexte ändern oder die Sprache gewechselt wird.
- Rewarded-Video wird ungefragt abgespielt.

## Entscheidungen des Nutzers

- Alte Inhalte bleiben gratis.
- Pro startet mit Lesezeichen; Tools-Tab folgt als zweites Extra in eigenem Update.
- Lesezeichen werden in jedem Tab über einen Chip „★ Gemerkt“ in der vorhandenen Chip-Leiste gefiltert (kein eigener
  Tab).
- Rewarded-Prämie schaltet **nur Werbung** ab (Banner + Interstitial), **nicht** die Lesezeichen.
- Pro-Preis bleibt beim bisherigen „Werbung entfernen“-Preis.
- iOS-Rewarded-Anzeigenblock: `ca-app-pub-3346959869225055/8944280703`.

## Teil 1: Pro-Bundle

### Produkt

- **Kein neues Produkt.** Bestehender Non-Consumable `free_ads` wird in App Store Connect und Play Console umbenannt in
  „DJ Guide Pro“ (Anzeigename + Beschreibung, DE/EN). Produkt-ID und Preis bleiben. (Claudes Vorschlag, vom Nutzer
  nicht widersprochen.)
- Folge: Bisherige Käufer haben automatisch Pro; „Wiederherstellen“ funktioniert unverändert.
- Lokaler Speicherschlüssel `adFree_v1` bleibt bestehen und gilt weiterhin als Pro-Nachweis (keine Migration nötig).

### Code

- `AdFreeContext` wird zu einem Pro-Kontext: `isAdFree` → `isPro` (Kauf). Zusätzlich ein abgeleiteter Wert, ob gerade
  Werbung gezeigt werden darf: `isPro || rewardedAdFreeActive` (siehe Teil 3). Werbekomponenten prüfen diesen
  abgeleiteten Wert, Lesezeichen prüfen nur `isPro`.
- Header-Button „Werbung entfernen“ wird zu „Pro“; bei Pro-Nutzern Badge „Pro ✓“ statt „Ad-Free ✓“.

### Pro-Screen

Ersetzt den heutigen System-Alert-Kaufdialog (`useRemoveAdsPrompt`). Eigener Screen (Modal-Route von expo-router):

- Titel „DJ Guide Pro“
- Vorteile-Liste: Keine Werbung · Lesezeichen in allen Bereichen. **Keine Versprechen künftiger Features** (Apple
  lehnt IAP-Texte mit nicht vorhandenen Features oft ab; nach deutschem Recht kann ein bezahltes Versprechen zur
  Lieferpflicht werden). Neue Extras kommen in die Liste, sobald sie ausgeliefert sind. (Claudes Entscheidung.)
- Kauf-Button mit Preis aus dem Store
- „Kauf wiederherstellen“
- Darunter, nur für Gratis-Nutzer und nur wenn ein Rewarded-Ad geladen ist: „Lieber gratis: Video ansehen → 1 Std.
  werbefrei“
- Bei Pro-Nutzern: Bestätigung „Du hast Pro“ statt Kauf-Button

Aufrufer: Header-Button, Lesezeichen-Icon (Gratis-Nutzer), Teaser nach Interstitial.

Den bestehenden Teaser-Alert („Nervt die Werbung?“, 20 % nach geschlossenem Interstitial) behalten; „Zeig mir das“
öffnet den Pro-Screen statt des alten Alerts. Texte auf Pro anpassen.

## Teil 2: Lesezeichen (Pro-Extra)

### Was kann gemerkt werden

| Tab         | Einheit                  | Hat heute stabile ID? |
|-------------|--------------------------|-----------------------|
| Pult        | einzelnes Bedienelement  | **nein**              |
| rekordbox   | Kapitel (nicht Schritt)  | **nein**              |
| Grundlagen  | Abschnitt                | ja (`id`)             |
| Troubleshoot| Eintrag                  | ja (`id`)             |

- `Control` und `Chapter` bekommen ein Pflichtfeld `id: string` (stabil, englisch, kebab-case, z. B. `jogwheel`,
  `usb-export`). `mirrorDeck()` erzeugt für gespiegelte rechte Deck-Elemente eigene IDs (z. B. Suffix `-r`), damit
  linkes und rechtes Element getrennt gemerkt werden können.
- Gespeichert wird **nur die ID**, nie Text → sprachunabhängig und robust gegen Textänderungen.
- Pult-IDs sind pro Gerät eindeutig; Speicherschlüssel enthält das Gerät (z. B. `pult:rx3:jogwheel`).

### Verhalten

- Jede Karte bekommt ein Lesezeichen-Icon (Ionicons `bookmark-outline` / `bookmark`).
- Pro: Antippen merkt/entfernt sofort.
- Gratis: Icon sichtbar, Antippen öffnet den Pro-Screen. Rewarded-Werbefreiheit schaltet Lesezeichen **nicht** frei.
- Speicherung: AsyncStorage, ein Schlüssel (z. B. `@pioneer_guide/bookmarks_v1`), Wert = Liste von IDs. Kein Sync.
  Nach Neuinstallation sind Lesezeichen weg (akzeptiert).
- Unbekannte IDs (Inhalt entfernt) werden still ignoriert.

### Chip „★ Gemerkt“

- rekordbox, Grundlagen, Troubleshoot: zusätzlicher Chip am Anfang der vorhandenen Kategorie-Chip-Leiste. Verhält sich
  wie ein Kategorie-Filter (Single-Select mit den anderen Kategorien, kombinierbar mit Suche).
- Pult: Die Chip-Leiste ist dort die Geräteauswahl (Pflicht-Auswahl, nicht abwählbar). **Claudes Entscheidung:** „★
  Gemerkt“ wird dort nicht in die Geräte-Leiste gemischt, sondern als Filter neben der Zonen-Auswahl angeboten und zeigt
  die gemerkten Elemente des aktuell gewählten Geräts. Genaue Platzierung entscheidet der Builder.
- Chip ist für Gratis-Nutzer sichtbar; Antippen öffnet den Pro-Screen.
- Pro-Nutzer ohne Lesezeichen: Leerzustand mit Hinweis „Tippe auf das Lesezeichen-Symbol einer Karte, um sie hier zu
  sammeln“.

## Teil 3: Rewarded Ads

### Ablauf

1. Gratis-Nutzer tippt „Video ansehen → 1 Std. werbefrei“ (Pro-Screen, oder Teaser-Alert als dritte Option).
2. Rewarded-Ad (`react-native-google-mobile-ads`, Format „Mit Prämie“) wird gezeigt.
3. Nur bei Ereignis „Prämie verdient“: Werbefrei-Ende = jetzt + 60 Minuten, persistiert in AsyncStorage.
4. Bricht der Nutzer ab: keine Prämie, keine Fehlermeldung.
5. Während aktiv: kein Banner, kein Interstitial, kein Teaser.
6. Nach Ablauf: einmaliger dezenter Hinweis „Werbefreiheit abgelaufen – mit Pro dauerhaft“ mit Link zum Pro-Screen.

### Regeln

- Zeit = Wanduhr (Ablaufzeitpunkt speichern), übersteht App-Neustart.
- Erneutes Ansehen während aktiver Stunde: Option wird nicht angeboten (keine Verlängerung). (Claudes Entscheidung.)
- Option wird nur angezeigt, wenn ein Ad geladen ist; sonst ausgeblendet (kein Lade-Spinner).
- Pro-Nutzer sehen die Option nie.

### Ad-Unit-IDs

- iOS Rewarded: `ca-app-pub-3346959869225055/8944280703`
- Android: nicht Teil dieses Releases (siehe Plattform). Rewarded-Option auf Android
  ausblenden statt Platzhalter-ID zu nutzen.
- Dev: `TestIds.REWARDED`.

## Teil 4: Werbe-Einwilligung (DSGVO + ATT)

Entscheidung des Nutzers: in dieses Projekt aufnehmen. Heute gibt es keinen Consent-Flow und keinen iOS-Tracking-Dialog.

- Google UMP über `AdsConsent` aus `react-native-google-mobile-ads` (keine zusätzliche Bibliothek, falls die
  eingebaute API reicht; der Builder prüft das gegen die aktuelle Doku).
- Beim App-Start: Consent-Info anfragen, bei Bedarf Formular zeigen; **erst danach** werden Banner, Interstitial und
  Rewarded-Ads geladen. Kein Werbe-Request vor diesem Schritt.
- iOS-Tracking-Dialog (ATT) über die IDFA-Mitteilung von UMP; `NSUserTrackingUsageDescription` (DE/EN) über das
  Config-Plugin in `app.json` setzen.
- Pro-Nutzer: Consent-Abfrage überspringen, da sie keine Werbung sehen. (Claudes Entscheidung.)
- Pflicht nach DSGVO: Nutzer muss Einwilligung später ändern können → Eintrag „Datenschutz-Einstellungen“, sichtbar
  wenn UMP ihn verlangt (`privacyOptionsRequirementStatus`). Platzierung entscheidet der Builder (z. B. unten im
  Pro-Screen).
- Fehler oder kein Netz beim Consent: App läuft normal weiter; Werbung lädt dann so, wie UMP es erlaubt.
- Firebase Analytics ist nicht Teil dieses Teils.

## Plattform

Entscheidung des Nutzers: **dieses Release nur iOS.** Android wird vorerst nicht veröffentlicht; Android-Code muss nur
kompilieren. Rewarded-Option auf Android ausblenden.

## Analytics (Firebase)

Neue Events:

- `pro_screen_open` (Parameter `source`: header | bookmark | teaser | expiry_notice)
- `rewarded_offer_shown`, `rewarded_started`, `rewarded_earned`, `rewarded_dismissed`
- `rewarded_expired`
- `bookmark_add`, `bookmark_remove` (Parameter `tab`)
- bestehendes `iap_purchase` bekommt Parameter `source` (woher der Kauf kam)

Damit beantwortbar: Kaufen Nutzer nach Rewarded-Nutzung öfter oder seltener Pro?

## Voraussetzungen (Aufgaben des Nutzers, außerhalb des Codes)

1. ~~App Store Connect: `free_ads` umbenennen in „DJ Guide Pro“~~ — erledigt laut Nutzer.
2. ~~AdMob prüfen: iOS-Block `…/8944280703` hat Format „Mit Prämie“ (nicht „Interstitial mit Prämie“).~~ — erledigt laut Nutzer.
3. ~~AdMob → Datenschutz & Mitteilungen: DSGVO-Mitteilung und IDFA-(ATT-)Mitteilung für die iOS-App anlegen und
   veröffentlichen.~~ — erledigt laut Nutzer.
4. ~~App Store Connect → App-Datenschutz: Angaben zu Tracking/Werbedaten prüfen und an ATT anpassen.~~ — erledigt laut Nutzer.
5. Store-Screenshots/Beschreibung auf Pro aktualisieren (optional, empfohlen).

Später (Android-Release, nicht Teil dieses Projekts): Play Console `free_ads` umbenennen; AdMob-Android-App + drei
Blöcke anlegen; Test-`androidAppId` in `app.json` (`ca-app-pub-3940256099942544~…`) durch echte ersetzen.

## i18n

Alle neuen Texte in `de.json` und `en.json`. Bestehende `iap.*`-Texte auf Pro umformulieren.

## Dem Builder überlassen

- Exakte ID-Vergabe für Controls/Kapitel (Regel: stabil, eindeutig, englisch, kebab-case).
- Layout/Styling des Pro-Screens im bestehenden Theme (`COLORS`, `SPACING`, `TYPE`, `RADIUS`).
- Platzierung des Lesezeichen-Icons auf den Karten und des Gemerkt-Filters im Pult-Tab.
- Form des Ablauf-Hinweises (Toast, Banner-Ersatz oder Alert), solange einmalig und dezent.
- Interne Struktur (z. B. eigener `BookmarksContext`, eigener `RewardedAdFree`-Hook).
