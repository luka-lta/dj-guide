import { TroubleshootEntry } from './types';

export const troubleshoot: TroubleshootEntry[] = [
  // ---- PULT ----
  {
    id: 'pult-track-startet-nicht',
    cat: 'pult',
    title: {
      de: 'Track startet nicht, obwohl Anzeige/Display den Track zeigt',
      en: 'Track does not start even though the display shows it',
    },
    keywords: 'track startet nicht play funktioniert nicht spielt nicht ab track not starting play not working',
    cause: {
      de: 'Häufigste Ursache: Deck steht auf Pause und der gesetzte Cue-Punkt liegt exakt auf einer Stille-Stelle, dazu Auto Cue aktiv, was den Eindruck erweckt, nichts passiere. Zweithäufigste Ursache: Channel-Fader oder Crossfader steht auf dieser Seite ganz unten, dann läuft der Track zwar, ist aber nicht hörbar. Seltener: Master-Level oder Trim auf 0.',
      en: 'Most common cause: the deck is paused and the set cue point lands exactly on a silent section, plus Auto Cue is active, giving the impression nothing is happening. Second most common: the channel fader or crossfader on that side is fully down — the track is playing but not audible. Less common: master level or trim is at 0.',
    },
    fix: {
      de: '1. Play/Pause-Taste erneut prüfen, ob das Deck tatsächlich pausiert (Play-Anzeige blinkt bei Pause meist). 2. Channel-Fader und Crossfader-Zuordnung (A/THRU/B) kontrollieren. 3. Trim und Master-Level checken, ob beide über 0 stehen. 4. Falls Link Export genutzt wird: Verbindung zum Laptop prüfen, bei Abbruch kann der Track angezeigt aber nicht mehr steuerbar sein.',
      en: '1. Check the Play/Pause button again — the play indicator usually blinks when paused. 2. Check the channel fader and crossfader assignment (A/THRU/B). 3. Verify trim and master level are both above 0. 4. If using Link Export: check the connection to the laptop — if it drops, the track may still be shown but uncontrollable.',
    },
  },
  {
    id: 'pult-jogwheel-scratcht',
    cat: 'pult',
    title: {
      de: 'Jogwheel scratcht ungewollt beim bloßen Berühren',
      en: 'Jogwheel scratches unintentionally when lightly touched',
    },
    keywords: 'jogwheel scratcht ungewollt vinyl modus jog springt jogwheel scratches unintentional vinyl mode',
    cause: {
      de: 'Gerät steht im Vinyl-Modus statt im CDJ-Modus. Im Vinyl-Modus bewegt jede Berührung der Oberseite direkt die Wiedergabeposition, wie bei echtem Vinyl.',
      en: 'The device is in Vinyl mode instead of CDJ mode. In Vinyl mode, any touch on the top surface moves the playback position directly, just like real vinyl.',
    },
    fix: {
      de: '1. Vinyl-Taste drücken, um in den CDJ-Modus zu wechseln. 2. Im CDJ-Modus bewegt Berühren der Oberseite den Track nicht mehr, nur noch der äußere Rand wirkt als Pitch Bend.',
      en: '1. Press the Vinyl button to switch to CDJ mode. 2. In CDJ mode, touching the top surface no longer moves the track — only the outer rim acts as pitch bend.',
    },
  },
  {
    id: 'pult-pads-reagieren-nicht',
    cat: 'pult',
    title: {
      de: 'Performance-Pads leuchten nicht oder reagieren nicht',
      en: 'Performance pads do not light up or respond',
    },
    keywords: 'pads leuchten nicht pads funktionieren nicht hot cue pad reagiert nicht pads not lighting not responding',
    cause: {
      de: 'Kein Track geladen, falscher Pad-Modus aktiv, oder in der aktuellen Pad-Bank sind schlicht keine Hot Cues/Samples belegt.',
      en: 'No track loaded, wrong pad mode active, or no hot cues/samples are assigned in the current pad bank.',
    },
    fix: {
      de: '1. Prüfen, ob überhaupt ein Track auf dem Deck läuft. 2. Pad-Modus-Taste (Hot Cue, Beat Jump, Pad FX etc.) erneut antippen, LED-Status kontrollieren. 3. Bank-Wechsel-Taste prüfen, falls das Gerät mehrere Pad-Banken unterstützt.',
      en: '1. Check whether a track is actually loaded on the deck. 2. Tap the pad mode button (Hot Cue, Beat Jump, Pad FX, etc.) again and check the LED status. 3. Check the bank switch button if the device supports multiple pad banks.',
    },
  },
  {
    id: 'pult-tempo-fader-wirkungslos',
    cat: 'pult',
    title: {
      de: 'Tempo-Fader bewegt sich, aber das Tempo ändert sich nicht hörbar',
      en: 'Tempo fader moves but tempo does not change audibly',
    },
    keywords: 'tempo fader funktioniert nicht pitch ändert sich nicht sync überschreibt tempo fader not working pitch not changing sync overrides',
    cause: {
      de: 'Sync ist auf dem Deck aktiv und überschreibt die manuelle Tempo-Fader-Position laufend, oder der eingestellte Regelbereich (Tempo-Range) ist so klein gewählt, dass die Änderung kaum hörbar ist.',
      en: 'Sync is active on the deck and continuously overrides the manual tempo fader position, or the set range (Tempo Range) is so small that the change is barely audible.',
    },
    fix: {
      de: '1. Sync auf dem betroffenen Deck deaktivieren, wenn manuell am Tempo gearbeitet werden soll. 2. Tempo-Range-Taste (WIDE) prüfen und ggf. einen größeren Bereich wählen.',
      en: '1. Deactivate Sync on the affected deck if you want to work manually with the tempo. 2. Check the Tempo Range button (WIDE) and select a larger range if needed.',
    },
  },
  {
    id: 'pult-mikrofon-rauscht',
    cat: 'pult',
    title: {
      de: 'Mikrofon rauscht oder pfeift (Rückkopplung)',
      en: 'Microphone hisses or howls (feedback)',
    },
    keywords: 'mikrofon rauscht pfeift rückkopplung feedback mic microphone hiss howl feedback',
    tags: ['mikrofon', 'lautsprecher', 'raum'],
    cause: {
      de: 'Mic-Gain zu hoch eingestellt, Mikrofon steht zu nah an einem Monitor-Lautsprecher, oder die Raumakustik reflektiert den Schall direkt zurück ins Mic.',
      en: 'Mic gain set too high, microphone placed too close to a monitor speaker, or room acoustics reflecting sound directly back into the mic.',
    },
    fix: {
      de: '1. Mic-Level reduzieren, bis das Pfeifen verschwindet. 2. Abstand zwischen Mikrofon und Lautsprechern erhöhen bzw. Mikrofon nicht direkt auf einen Monitor richten. 3. Bei dauerhaftem Problem: Mic-EQ im betroffenen Frequenzbereich leicht absenken.',
      en: '1. Reduce mic level until the howling stops. 2. Increase the distance between microphone and speakers, or avoid pointing the mic directly at a monitor. 3. For a persistent problem: slightly reduce the mic EQ in the affected frequency range.',
    },
  },
  {
    id: 'pult-kopfhoerer-einseitig',
    cat: 'pult',
    title: {
      de: 'Kopfhörer nur auf einer Seite hörbar oder komplett stumm',
      en: 'Headphones only audible on one side or completely silent',
    },
    keywords: 'kopfhörer nur eine seite kopfhörer stumm klinke wackelkontakt headphones one side silent jack loose',
    cause: {
      de: 'Meist ein Kabel- oder Steckerproblem (Klinkenstecker nicht vollständig eingesteckt, Wackelkontakt), seltener ein zu weit auf eine Seite gedrehter Balance-Regler.',
      en: 'Usually a cable or plug issue (jack not fully inserted, loose contact), less often a balance knob turned too far to one side.',
    },
    fix: {
      de: '1. Klinkenstecker vollständig einstecken, ggf. Adapter (6,3 mm auf 3,5 mm) prüfen. 2. Anderen Kopfhörer testen, um Kabel vom Gerät zu unterscheiden. 3. Balance-Regler falls vorhanden mittig stellen.',
      en: '1. Push the jack fully in and check any adapters (6.3mm to 3.5mm). 2. Test with another pair of headphones to isolate the cable from the device. 3. Centre the balance knob if one is present.',
    },
  },
  {
    id: 'pult-geraet-haengt',
    cat: 'pult',
    title: {
      de: 'Gerät reagiert gar nicht mehr / hängt komplett',
      en: 'Device completely unresponsive / frozen',
    },
    keywords: 'gerät hängt eingefroren reagiert nicht freeze abgestürzt device frozen unresponsive crashed',
    cause: {
      de: 'Software-Fehler in der Gerätefirmware, selten durch fehlerhaften USB-Stick oder eine beschädigte Datei ausgelöst, die beim Laden das System blockiert.',
      en: 'Firmware software error, occasionally triggered by a faulty USB drive or a corrupted file that locks the system during loading.',
    },
    fix: {
      de: '1. Gerät über den Netzschalter komplett aus- und nach kurzer Wartezeit wieder einschalten (Soft-Reset). 2. Falls es beim Laden eines bestimmten Tracks passiert: diesen Track am Laptop prüfen und neu exportieren. 3. Bei wiederholtem Einfrieren: Firmware-Update auf der Pioneer-Support-Seite prüfen.',
      en: '1. Fully power the device off using the power switch, wait briefly, then power it back on (soft reset). 2. If it happens when loading a specific track: check that track on the laptop and re-export it. 3. For repeated freezing: check for a firmware update on the Pioneer support page.',
    },
  },
  {
    id: 'pult-cue-nur-ein-kanal',
    cat: 'pult',
    title: {
      de: 'Beide Cue-Tasten aktiv, im Kopfhörer trotzdem nur ein Kanal hörbar',
      en: 'Both cue buttons active but only one channel audible in headphones',
    },
    keywords: 'cue taste kopfhörer nur ein kanal mixing regler cue button headphones one channel mixing knob',
    cause: {
      de: 'Der Mixing-Regler im Kopfhörerbereich steht zu weit auf einer Seite (Master oder Cue), sodass nicht beide vorgehörten Kanäle gleichzeitig durchkommen, oder Level eines Kanals ist zu niedrig.',
      en: 'The mixing knob in the headphone section is too far to one side (Master or Cue), so both cued channels cannot come through simultaneously, or one channel\'s level is too low.',
    },
    fix: {
      de: '1. Mixing-Regler in Richtung Cue-Mitte bringen. 2. Beide Cue-Tasten erneut aktivieren und Trim-Pegel der betroffenen Kanäle vergleichen.',
      en: '1. Move the mixing knob towards the Cue centre. 2. Reactivate both cue buttons and compare the trim levels of the affected channels.',
    },
  },
  {
    id: 'pult-crossfader-wirkungslos',
    cat: 'pult',
    title: {
      de: 'Crossfader hat keinen Effekt, Kanal immer hörbar',
      en: 'Crossfader has no effect, channel always audible',
    },
    keywords: 'crossfader wirkungslos crossfader macht nichts kanal immer hörbar thru crossfader no effect channel always audible thru',
    cause: {
      de: 'Der Crossfader-Assign-Schalter des betroffenen Kanals steht auf THRU statt auf A oder B. THRU bedeutet: Kanal ist vom Crossfader komplett entkoppelt und immer in der Summe hörbar, egal wo der Crossfader steht.',
      en: 'The crossfader assign switch for the affected channel is set to THRU instead of A or B. THRU means the channel is completely decoupled from the crossfader and always audible in the mix, regardless of crossfader position.',
    },
    fix: {
      de: '1. Assign-Schalter oder -Taste des betroffenen Kanals auf A (linke Seite) oder B (rechte Seite) umstellen. 2. Prüfen, ob alle Kanäle korrekt zugewiesen sind: Deck 1 → A, Deck 2 → B ist die übliche Club-Konfiguration. 3. Beim FLX4 ggf. in der Software-Einstellung (rekordbox/Serato) prüfen statt am Gerät.',
      en: '1. Switch the assign button or switch on the affected channel to A (left side) or B (right side). 2. Check that all channels are correctly assigned: Deck 1 → A, Deck 2 → B is the standard club configuration. 3. For the FLX4, check the software settings (rekordbox/Serato) rather than the device itself.',
    },
  },
  {
    id: 'pult-booth-kein-ton',
    cat: 'pult',
    title: {
      de: 'Kein Signal am Booth-Ausgang trotz Kabelverbindung',
      en: 'No signal at the Booth output despite a cable connection',
    },
    keywords: 'booth kein ton monitor kein sound booth stumm booth no sound monitor silent',
    cause: {
      de: 'Booth-Level-Regler steht auf null, oder das Kabel ist mit dem falschen Ausgang verbunden (Master Out statt Booth Out).',
      en: 'Booth level knob is at zero, or the cable is connected to the wrong output (Master Out instead of Booth Out).',
    },
    fix: {
      de: '1. Booth-Level-Regler aufdrehen. 2. Kabelverbindung prüfen: Booth Out (Cinch/RCA) ist ein eigener Ausgang, nicht identisch mit Master Out (XLR). 3. Sicherstellen, dass der Monitor-Lautsprecher korrekt verkabelt und eingeschaltet ist.',
      en: '1. Turn up the Booth Level knob. 2. Check the cable connection: Booth Out (RCA) is a separate output, not the same as Master Out (XLR). 3. Make sure the monitor speaker is correctly cabled and switched on.',
    },
  },

  // ---- REKORDBOX ----
  {
    id: 'rb-loop-falsch',
    cat: 'rekordbox',
    title: {
      de: 'Loop klingt falsch oder springt an der falschen Stelle',
      en: 'Loop sounds wrong or jumps at the wrong point',
    },
    keywords: 'loop falsch loop springt loop passt nicht loop timing loop wrong jumps incorrect timing',
    cause: {
      de: 'Fast immer ein fehlerhaftes Beatgrid im Track. Auto Loop und Quantize orientieren sich am Beatgrid aus rekordbox, nicht am tatsächlichen Gehör – wenn das Grid leicht daneben liegt, sitzt auch der Loop daneben.',
      en: 'Almost always a faulty beat grid in the track. Auto Loop and Quantize use the beat grid from rekordbox, not the actual sound — if the grid is slightly off, the loop will be too.',
    },
    fix: {
      de: '1. Track am Laptop in rekordbox öffnen, Beatgrid im Track-Editor prüfen und bei Bedarf korrigieren (besonders bei Tracks mit Intro-Breaks oder Tempo-Drift). 2. Erneut exportieren bzw. bei Link Export einfach neu laden. 3. Kurzfristig am Pult: Quantize kurz ausschalten und den Loop manuell per Ohr setzen, dann Quantize wieder aktivieren.',
      en: '1. Open the track in rekordbox on the laptop, check the beat grid in the track editor and correct if needed (especially for tracks with intro breaks or tempo drift). 2. Re-export, or simply reload the track if using Link Export. 3. Quick fix at the mixer: briefly disable Quantize and set the loop manually by ear, then re-enable Quantize.',
    },
  },
  {
    id: 'rb-hot-cue-weg',
    cat: 'rekordbox',
    title: {
      de: 'Hot Cue lässt sich nicht setzen oder verschwindet',
      en: 'Hot cue cannot be set or disappears',
    },
    keywords: 'hot cue funktioniert nicht hot cue weg hot cue lässt sich nicht speichern hot cue not working disappears cannot save',
    cause: {
      de: 'Pad-Modus steht nicht auf Hot Cue, sondern auf Beat Jump, Pad FX o.ä. – dann lösen die Pads etwas anderes aus. Oder alle 8 Hot-Cue-Plätze der aktuellen Bank sind bereits belegt.',
      en: 'Pad mode is not set to Hot Cue but to Beat Jump, Pad FX, etc. — the pads then trigger something else. Or all 8 hot cue slots in the current bank are already occupied.',
    },
    fix: {
      de: '1. Pad-Modus-Taste \'Hot Cue\' aktiv prüfen (LED-Anzeige an der Taste). 2. Belegte Pads per Shift+Pad löschen, wenn kein Platz mehr frei ist, oder auf eine andere Pad-Bank wechseln, falls das Gerät mehrere Banks unterstützt.',
      en: '1. Check that the Hot Cue pad mode button is active (LED on the button). 2. Delete occupied pads with Shift + Pad when there is no space left, or switch to another pad bank if the device supports multiple banks.',
    },
  },
  {
    id: 'rb-sync-driftet',
    cat: 'rekordbox',
    title: {
      de: 'Sync gleicht Tempo nicht richtig an / Beat driftet trotz Sync',
      en: 'Sync does not align tempo correctly / beat drifts despite Sync',
    },
    keywords: 'sync funktioniert nicht beat driftet sync ungenau sync not working beat drifts inaccurate',
    cause: {
      de: 'Beat Sync übernimmt das Beatgrid aus der Analyse. Bei falsch analysiertem Grid (z.B. bei Tracks mit leichten Temposchwankungen, live eingespielten Drums oder DJ-Edits ohne festen Klick) stimmt der Sync-Zielpunkt nicht.',
      en: 'Beat Sync uses the beat grid from the analysis. If the grid is incorrectly analysed (e.g. tracks with slight tempo fluctuations, live-recorded drums, or DJ edits without a fixed click), the sync target point is wrong.',
    },
    fix: {
      de: '1. Beatgrid des betroffenen Tracks in rekordbox manuell prüfen und ggf. mehrere Grid-Marker über den Track verteilt setzen (nicht nur am Anfang). 2. Bei Tracks mit bekannt schwankendem Tempo: Sync gar nicht nutzen, stattdessen per Tempo-Fader von Hand nachführen.',
      en: '1. Manually check the beat grid of the affected track in rekordbox and set multiple grid markers distributed across the track if needed (not just at the start). 2. For tracks with known tempo fluctuations: do not use Sync at all — instead, follow the tempo manually with the fader.',
    },
  },
  {
    id: 'rb-usb-nicht-erkannt',
    cat: 'rekordbox',
    title: {
      de: 'USB-Stick wird nicht erkannt',
      en: 'USB drive not recognised',
    },
    keywords: 'usb wird nicht erkannt usb stick funktioniert nicht stick nicht gefunden usb not recognised drive not found',
    cause: {
      de: 'Falsches Dateisystem (rekordbox-Export erwartet FAT32 oder exFAT, je nach Gerät und Stickgröße), beschädigte Exportstruktur, oder Stick steckt im falschen Port bei Geräten mit mehreren Slots.',
      en: 'Wrong file system (rekordbox export requires FAT32 or exFAT depending on device and drive size), corrupted export structure, or drive inserted in the wrong port on devices with multiple slots.',
    },
    fix: {
      de: '1. Stick am Laptop erneut mit rekordbox exportieren, nicht nur Dateien per Hand kopieren. 2. Dateisystem des Sticks prüfen, bei über 32 GB oft exFAT statt FAT32 nötig. 3. Anderen USB-Port am Pult testen. 4. Bei wiederholtem Problem: Stick am Rechner auf Fehler prüfen, ggf. neu formatieren und komplett neu exportieren.',
      en: '1. Re-export from rekordbox on the laptop — do not manually copy files. 2. Check the drive\'s file system; drives over 32 GB often need exFAT instead of FAT32. 3. Try a different USB port on the mixer. 4. For repeated issues: check the drive for errors on the computer, reformat if needed and do a full re-export.',
    },
  },
  {
    id: 'rb-link-export-verbindet-nicht',
    cat: 'rekordbox',
    title: {
      de: 'Link Export verbindet nicht / Bibliothek erscheint nicht am Pult',
      en: 'Link Export does not connect / library does not appear on the mixer',
    },
    keywords: 'link export funktioniert nicht verbindung weg wlan verbindet nicht link export not working connection lost wifi',
    cause: {
      de: 'Laptop und Pult sind nicht im selben Netzwerk, WLAN-Verbindung ist instabil, oder rekordbox läuft nicht mehr im Vordergrund/ist abgestürzt.',
      en: 'Laptop and mixer are not on the same network, the Wi-Fi connection is unstable, or rekordbox is no longer in the foreground or has crashed.',
    },
    fix: {
      de: '1. Netzwerkverbindung prüfen: beide Geräte im selben WLAN oder per Kabel verbunden. 2. Bei WLAN-Ausfällen während des Sets grundsätzlich lieber auf USB-Export statt Link Export setzen, deutlich stabiler. 3. rekordbox neu starten, Link-Export-Verbindung erneut aktivieren.',
      en: '1. Check the network connection: both devices on the same Wi-Fi or connected by cable. 2. For sets where Wi-Fi drops are a risk, prefer USB export over Link Export — significantly more stable. 3. Restart rekordbox and re-enable the Link Export connection.',
    },
  },
  {
    id: 'rb-analyse-haengt',
    cat: 'rekordbox',
    title: {
      de: 'Analyse bleibt bei einem bestimmten Prozentwert hängen',
      en: 'Analysis gets stuck at a certain percentage',
    },
    keywords: 'analyse hängt analyse bricht ab analyse dauert ewig analysis stuck stops hangs forever',
    cause: {
      de: 'Häufig eine beschädigte oder unvollständig heruntergeladene Audiodatei, ein Dateipfad mit Sonderzeichen/Umlauten, oder die Datei liegt auf einem Netzlaufwerk mit schlechter Verbindung statt lokal.',
      en: 'Often a corrupted or incompletely downloaded audio file, a file path containing special characters or umlauts, or the file is on a network drive with a poor connection rather than stored locally.',
    },
    fix: {
      de: '1. Die betroffene Datei einzeln testen (in einem anderen Player öffnen, ob sie überhaupt fehlerfrei abspielt). 2. Dateiname und Ordnerpfad auf Sonderzeichen prüfen und ggf. vereinfachen. 3. Datei auf die lokale Festplatte kopieren statt von einem Netzlaufwerk zu analysieren.',
      en: '1. Test the affected file individually (open it in another player to check whether it plays without errors). 2. Check the filename and folder path for special characters and simplify if needed. 3. Copy the file to the local hard drive rather than analysing it from a network drive.',
    },
  },
  {
    id: 'rb-tracks-fehlen',
    cat: 'rekordbox',
    title: {
      de: 'Tracks fehlen nach Import oder sind rot markiert',
      en: 'Tracks missing after import or shown in red',
    },
    keywords: 'track fehlt track rot datei nicht gefunden missing file track missing red file not found',
    cause: {
      de: 'Die Audiodatei wurde nach dem Import verschoben, umbenannt oder gelöscht. rekordbox verweist noch auf den alten Speicherort und findet ihn nicht mehr.',
      en: 'The audio file was moved, renamed, or deleted after import. rekordbox still references the old location and can no longer find it.',
    },
    fix: {
      de: '1. Track in der Bibliothek anklicken, Kontextmenü \'Datei suchen\'/\'Relink\' nutzen und den neuen Speicherort angeben. 2. Für viele betroffene Dateien gleichzeitig: alle im selben Ordner behalten und rekordbox einmal auf den neuen übergeordneten Ordner zeigen lassen.',
      en: '1. Click the track in the library, use the context menu "Find File" / "Relink" and point to the new location. 2. For many affected files at once: keep them all in the same folder and let rekordbox rescan the new parent folder.',
    },
  },
  {
    id: 'rb-export-bricht-ab',
    cat: 'rekordbox',
    title: {
      de: 'USB-Export bricht mitten ab oder dauert extrem lange',
      en: 'USB export aborts midway or takes extremely long',
    },
    keywords: 'export bricht ab export dauert lange export hängt export aborts slow hangs',
    cause: {
      de: 'Beschädigter oder sehr langsamer USB-Stick (USB 2.0 statt 3.0), sehr viele kleine Dateien, oder eine einzelne beschädigte Datei blockiert den gesamten Exportvorgang.',
      en: 'Damaged or very slow USB drive (USB 2.0 instead of 3.0), very many small files, or a single corrupted file blocking the entire export process.',
    },
    fix: {
      de: '1. Anderen, schnelleren USB-Stick (USB 3.0) testen. 2. Export in kleineren Playlist-Häppchen statt der gesamten Bibliothek auf einmal durchführen. 3. Bei Abbruch immer an derselben Stelle: die dort betroffene Datei einzeln prüfen.',
      en: '1. Try a different, faster USB drive (USB 3.0). 2. Export in smaller playlist portions rather than the entire library at once. 3. If the export always aborts at the same point: check the file at that position individually.',
    },
  },
  {
    id: 'rb-playlist-fehlt-am-pult',
    cat: 'rekordbox',
    title: {
      de: 'Playlist erscheint nicht am Pult trotz erfolgtem Export',
      en: 'Playlist does not appear on the mixer despite a successful export',
    },
    keywords: 'playlist fehlt playlist nicht am pult playlist wird nicht angezeigt playlist missing not showing on mixer',
    cause: {
      de: 'Falscher USB-Slot am Pult ausgewählt, Export war unvollständig/wurde vorzeitig unterbrochen, oder es wurde auf einen anderen Stick exportiert als den, der gerade im Pult steckt.',
      en: 'Wrong USB slot selected on the mixer, export was incomplete or interrupted prematurely, or the export was done to a different drive than the one currently in the mixer.',
    },
    fix: {
      de: '1. Am Pult-Display den richtigen USB-Slot (1 oder 2) auswählen. 2. Export-Vorgang in rekordbox am Laptop nochmal vollständig abwarten. 3. Sicherstellen, dass wirklich derselbe Stick verwendet wird, auf den exportiert wurde.',
      en: '1. Select the correct USB slot (1 or 2) on the mixer display. 2. Let the export process in rekordbox fully complete again on the laptop. 3. Make sure you are using the exact drive that was exported to.',
    },
  },
  {
    id: 'rb-tonart-falsch',
    cat: 'rekordbox',
    title: {
      de: 'Tonart (Key) wirkt falsch erkannt',
      en: 'Key appears to be incorrectly detected',
    },
    keywords: 'tonart falsch key falsch erkannt tonart stimmt nicht key wrong incorrect detection',
    cause: {
      de: 'Die automatische Tonart-Erkennung ist bei atonalen, sehr percussiven oder stark verzerrten Tracks (häufig bei Techno-Subgenres) ungenauer als bei harmonisch klaren Tracks mit klarem Akkordverlauf.',
      en: 'Automatic key detection is less accurate for atonal, highly percussive, or heavily distorted tracks (common in Techno subgenres) than for harmonically clear tracks with a defined chord progression.',
    },
    fix: {
      de: '1. Bei wichtigen harmonischen Übergängen den Key per Ohr gegenchecken, nicht blind der Anzeige vertrauen. 2. Key in rekordbox notfalls manuell überschreiben, wenn er nachweislich falsch ist.',
      en: '1. For important harmonic transitions, double-check the key by ear — do not blindly trust the display. 2. Manually override the key in rekordbox if it is demonstrably wrong.',
    },
  },
  {
    id: 'rb-wellenform-fehlt',
    cat: 'rekordbox',
    title: {
      de: 'Wellenform wird nicht angezeigt oder bleibt leer',
      en: 'Waveform not displayed or remains empty',
    },
    keywords: 'wellenform fehlt wellenform leer waveform nicht sichtbar waveform missing empty not visible',
    cause: {
      de: 'Die Analyse ist noch nicht abgeschlossen oder beim Import fehlgeschlagen, oft bei sehr großen Dateien oder unüblichen Formaten.',
      en: 'Analysis has not completed or failed during import, often with very large files or unusual formats.',
    },
    fix: {
      de: '1. Analysefortschritt in rekordbox prüfen, ggf. abwarten. 2. Track markieren und Analyse manuell erneut anstoßen (Rechtsklick → Track(s) analysieren).',
      en: '1. Check the analysis progress in rekordbox and wait if needed. 2. Select the track and manually trigger re-analysis (right-click → Analyse Track(s)).',
    },
  },
  {
    id: 'rb-startet-nicht',
    cat: 'rekordbox',
    title: {
      de: 'rekordbox startet nicht oder stürzt beim Öffnen ab',
      en: 'rekordbox does not start or crashes on launch',
    },
    keywords: 'rekordbox startet nicht rekordbox stürzt ab rekordbox crash not starting crashes on launch',
    cause: {
      de: 'Meist ein Lizenz-/Account-Problem (keine Internetverbindung bei nötiger Aktivierung), eine beschädigte Konfigurations- oder Cache-Datei, oder ein Konflikt nach einem Software-Update.',
      en: 'Usually a licence/account issue (no internet connection when activation is required), a corrupted configuration or cache file, or a conflict after a software update.',
    },
    fix: {
      de: '1. Internetverbindung prüfen, falls eine Online-Aktivierung nötig ist. 2. rekordbox komplett neu starten, ggf. Rechner neu starten. 3. Bei wiederholtem Absturz: Datenbank-/Cache-Reparaturfunktion in den rekordbox-Einstellungen nutzen oder Neuinstallation.',
      en: '1. Check the internet connection if online activation is required. 2. Fully restart rekordbox, or restart the computer if needed. 3. For repeated crashes: use the database/cache repair function in rekordbox preferences, or reinstall.',
    },
  },
  {
    id: 'rb-cue-points-verschwunden',
    cat: 'rekordbox',
    title: {
      de: 'Cue Points/Hot Cues nach erneutem Export verschwunden',
      en: 'Cue points/hot cues gone after re-export',
    },
    keywords: 'hot cue verschwunden cue points weg export überschrieben hot cue gone cue points deleted export overwritten',
    cause: {
      de: 'Der Track wurde nach dem letzten Export in rekordbox verändert (z.B. neue Analyse, geändertes Beatgrid), aber nicht erneut exportiert, sodass der Stick noch den alten Stand zeigt – oder umgekehrt wurde eine ältere Analyse über neuere Cue-Daten gelegt.',
      en: 'The track was modified in rekordbox after the last export (e.g. new analysis, changed beat grid) but not re-exported, so the drive still shows the old state — or conversely, an older analysis was applied over newer cue data.',
    },
    fix: {
      de: '1. Playlist/Track komplett neu auf den Stick exportieren, nicht nur einzelne Dateien nachkopieren. 2. Cue-Punkte grundsätzlich in rekordbox am Laptop pflegen, nicht direkt am Pult, wenn regelmäßig neu exportiert wird.',
      en: '1. Fully re-export the playlist/track to the drive — do not just copy individual files on top. 2. As a rule, maintain cue points in rekordbox on the laptop rather than directly on the mixer if you export regularly.',
    },
  },
  {
    id: 'rb-intelligente-playlist-leer',
    cat: 'rekordbox',
    title: {
      de: 'Intelligente Playlist bleibt leer',
      en: 'Smart playlist remains empty',
    },
    keywords: 'intelligente playlist leer smart playlist leer regeln smart playlist empty rules',
    cause: {
      de: 'Die festgelegten Regeln sind zu eng gefasst, oder die benötigten Tags/Bewertungen/BPM-Werte wurden bei den betroffenen Tracks noch nicht vergeben bzw. sind noch nicht analysiert.',
      en: 'The defined rules are too restrictive, or the required tags/ratings/BPM values have not yet been assigned to the affected tracks, or they have not been analysed yet.',
    },
    fix: {
      de: '1. Regeln einzeln testen, z.B. nur BPM-Bereich ohne zusätzliche Genre-Bedingung. 2. Prüfen, ob die verwendeten Tags/Bewertungen bei den Tracks überhaupt gesetzt sind. 3. UND-Verknüpfungen ggf. auf ODER umstellen, wenn die Auswahl zu klein ausfällt.',
      en: '1. Test rules individually, e.g. BPM range only without an additional genre condition. 2. Check whether the tags/ratings used are actually set on the tracks. 3. Switch AND conditions to OR if the selection is too small.',
    },
  },

  // ---- TRACKS ----
  {
    id: 'tracks-bpm-falsch',
    cat: 'tracks',
    title: {
      de: 'BPM wirkt doppelt oder halb so hoch wie gefühlt',
      en: 'BPM appears double or half of what it feels like',
    },
    keywords: 'bpm falsch bpm doppelt bpm halbiert halftime doubletime bpm wrong double half halftime doubletime',
    cause: {
      de: 'Halftime/Doubletime-Verwechslung der Analyse, besonders häufig bei Genres mit schnellen Hi-Hats/Percussion über einem eigentlich langsameren Grundgroove (z.B. Hypnotic/Prog-Techno).',
      en: 'Halftime/doubletime confusion during analysis, especially common in genres with fast hi-hats/percussion over a slower underlying groove (e.g. Hypnotic/Prog Techno).',
    },
    fix: {
      de: '1. BPM-Wert in rekordbox mit einem manuellen Klick-Tempo (TAP) gegenchecken. 2. BPM-Wert in der Track-Info manuell auf den korrekten Wert setzen (halbieren oder verdoppeln), betrifft dann auch Sync und Beat FX korrekt.',
      en: '1. Cross-check the BPM value in rekordbox using a manual tap tempo (TAP). 2. Manually set the BPM value in the track info to the correct value (halve or double it) — this also corrects Sync and Beat FX.',
    },
  },
  {
    id: 'tracks-track-leise',
    cat: 'tracks',
    title: {
      de: 'Track klingt dumpf oder deutlich leiser als andere',
      en: 'Track sounds dull or noticeably quieter than others',
    },
    keywords: 'track leise track dumpf schlechtes mastering bitrate track quiet dull poor mastering bitrate',
    cause: {
      de: 'Meist ein leiseres oder weniger druckvolles Mastering der Quelle, oder eine MP3 mit niedriger Bitrate statt WAV/AIFF/FLAC.',
      en: 'Usually a quieter or less punchy master from the source, or an MP3 with a low bitrate instead of WAV/AIFF/FLAC.',
    },
    fix: {
      de: '1. Wenn möglich hochwertigere Datei (WAV/AIFF, hohe MP3-Bitrate) derselben Version besorgen. 2. Trim-Regler für diesen Track individuell anpassen, siehe Grundlagen-Bereich zum Gain-Staging.',
      en: '1. If possible, get a higher-quality file (WAV/AIFF, high MP3 bitrate) of the same version. 2. Adjust the trim individually for this track — see the basics section on gain staging.',
    },
  },
  {
    id: 'tracks-duplikate',
    cat: 'tracks',
    title: {
      de: 'Doppelte Tracks in der Bibliothek',
      en: 'Duplicate tracks in the library',
    },
    keywords: 'doppelte tracks duplikate bibliothek doppelt duplicate tracks library',
    cause: {
      de: 'Mehrfacher Import derselben Datei aus unterschiedlichen Ordnern, oder Import sowohl der Original- als auch einer umbenannten Kopie.',
      en: 'The same file imported multiple times from different folders, or both the original and a renamed copy were imported.',
    },
    fix: {
      de: '1. In rekordbox nach \'Doppelte Tracks suchen\' bzw. per Sortierung nach Titel/Künstler prüfen. 2. Ordnerstruktur vor dem nächsten Import aufräumen, jede Datei nur an einem Ort behalten.',
      en: '1. Use rekordbox\'s "Find Duplicate Tracks" function or sort by title/artist to identify duplicates. 2. Clean up the folder structure before the next import — keep each file in only one location.',
    },
  },
  {
    id: 'tracks-pfad-kaputt',
    cat: 'tracks',
    title: {
      de: 'Dateipfad kaputt nach Festplatten- oder Ordnerumzug',
      en: 'File path broken after moving hard drive or folder',
    },
    keywords: 'pfad kaputt datei verschoben festplatte umgezogen relink path broken file moved hard drive relocated relink',
    cause: {
      de: 'rekordbox verweist noch auf den alten Speicherort der Dateien, nachdem die Musiksammlung auf eine neue Festplatte oder einen neuen Ordner verschoben wurde.',
      en: 'rekordbox still references the old file location after the music collection was moved to a new hard drive or folder.',
    },
    fix: {
      de: '1. Rechtsklick auf betroffene Tracks → \'Datei suchen\'/Relink zum neuen Pfad. 2. Bei sehr vielen betroffenen Dateien: kompletten Ordner an gleicher relativer Struktur wiederherstellen, dann funktioniert der Relink meist automatisch für alle gleichzeitig.',
      en: '1. Right-click affected tracks → "Find File" / Relink to the new path. 2. For very many affected files: restore the complete folder at the same relative structure — the relink usually then works automatically for all files at once.',
    },
  },
  {
    id: 'tracks-dateiformat',
    cat: 'tracks',
    title: {
      de: 'Welche Dateiformate sind für rekordbox am besten?',
      en: 'Which file formats are best for rekordbox?',
    },
    keywords: 'dateiformat wav aiff mp3 flac bitrate qualität format file format wav aiff mp3 flac bitrate quality',
    cause: {
      de: 'Nicht alle Formate liefern gleiche Qualität, und nicht alle werden von Pioneer-Geräten gleichermaßen unterstützt. MP3 mit niedriger Bitrate klingt oft dumpf und verliert Details bei hohen Frequenzen, was auf einer guten PA deutlich hörbar ist.',
      en: 'Not all formats deliver the same quality, and not all are equally supported by Pioneer devices. MP3 at a low bitrate often sounds dull and loses detail in high frequencies, which is clearly audible on a good PA system.',
    },
    fix: {
      de: '1. Beste Qualität: WAV oder AIFF (unkomprimiert, verlustfrei). Dateigröße höher, aber keinerlei Qualitätsverlust. 2. Guter Kompromiss: MP3 mit mindestens 320 kbps oder AAC/M4A mit 256 kbps. 3. FLAC: verlustfrei, aber von älteren Pioneer-Geräten teils nicht nativ unterstützt – im Zweifel in WAV konvertieren. 4. Finger weg von MP3 mit 128 kbps oder weniger – auf einer Club-PA hörbar schlechter.',
      en: '1. Best quality: WAV or AIFF (uncompressed, lossless). Larger file size, but zero quality loss. 2. Good compromise: MP3 at at least 320 kbps or AAC/M4A at 256 kbps. 3. FLAC: lossless, but not natively supported on some older Pioneer devices — convert to WAV if in doubt. 4. Avoid MP3 at 128 kbps or lower — noticeably worse on a club PA system.',
    },
  },
  {
    id: 'tracks-vorbereitung',
    cat: 'tracks',
    title: {
      de: 'Wie bereite ich Tracks für ein Set vor?',
      en: 'How do I prepare tracks for a set?',
    },
    keywords: 'track vorbereitung set vorbereiten workflow hot cues beatgrid bpm key track preparation set workflow hot cues beatgrid',
    cause: {
      de: 'Ohne Vorbereitung in rekordbox fehlen korrekte BPM, Beatgrids, Key und Hot Cues – das macht Sync unzuverlässig, Beat FX laufen aus dem Takt, und im Set fehlt Zeit für manuelle Korrekturen.',
      en: 'Without preparation in rekordbox, correct BPM, beat grids, key, and hot cues are missing — this makes Sync unreliable, Beat FX runs out of time, and there is no time for manual corrections during a set.',
    },
    fix: {
      de: '1. Tracks importieren und analysieren lassen (BPM, Key, Wellenform). 2. Beatgrid-Genauigkeit stichprobenartig prüfen, besonders bei älteren oder untypischen Tracks. 3. Mindestens einen Hot Cue am sinnvollen Einstiegspunkt setzen (nach Intro oder am ersten Beat). 4. Key prüfen und bei offensichtlichen Fehlern manuell korrigieren. 5. Tracks nach Genre, BPM-Bereich und Energie in Playlists sortieren, damit das Set im Club ohne Suchen funktioniert. 6. Auf USB-Stick exportieren, Stick am Pult testen bevor der Gig beginnt.',
      en: '1. Import tracks and let rekordbox analyse them (BPM, key, waveform). 2. Spot-check beat grid accuracy, especially for older or atypical tracks. 3. Set at least one hot cue at a useful entry point (after the intro or at the first beat). 4. Check the key and manually correct obvious errors. 5. Sort tracks into playlists by genre, BPM range, and energy so the set works without searching during the gig. 6. Export to a USB drive and test the drive on the mixer before the gig starts.',
    },
  },
  {
    id: 'tracks-tags-fehlen',
    cat: 'tracks',
    title: {
      de: 'Künstler/Genre-Tags fehlen oder sind falsch',
      en: 'Artist/genre tags missing or incorrect',
    },
    keywords: 'tags fehlen künstler falsch genre falsch id3 tags missing artist wrong genre wrong id3',
    cause: {
      de: 'Die ID3-Tags der Audiodatei selbst sind unvollständig oder falsch befüllt, rekordbox liest nur aus, was in der Datei steht.',
      en: 'The ID3 tags of the audio file itself are incomplete or incorrectly filled — rekordbox only reads what is in the file.',
    },
    fix: {
      de: '1. Tags direkt in rekordbox im Track-Info-Fenster nachtragen, das schreibt sie meist auch in die Datei zurück. 2. Bei vielen betroffenen Dateien: externen Tag-Editor vor dem Import nutzen, spart Zeit gegenüber Einzelkorrektur.',
      en: '1. Add the tags directly in rekordbox\'s track info window — this usually writes them back to the file as well. 2. For many affected files: use an external tag editor before importing, which saves time compared to correcting one by one.',
    },
  },

  // ---- MIXING ----
  {
    id: 'mixing-kein-ton-master',
    cat: 'mixing',
    title: {
      de: 'Kein Ton am Master trotz laufendem Track',
      en: 'No sound at Master despite a running track',
    },
    keywords: 'kein ton kein sound stumm master leise no sound silent master quiet',
    cause: {
      de: 'Meist Kabel/Routing (Master-Ausgang nicht mit der PA verbunden oder falscher Eingang an der Anlage gewählt), seltener Master-Level oder Mute/Booth-Umschaltung aktiv.',
      en: 'Usually a cable/routing issue (master output not connected to the PA or wrong input selected on the amplifier), less often master level at zero or a mute/booth switch active.',
    },
    fix: {
      de: '1. Kabelverbindung Master-Out → PA-Eingang prüfen. 2. Master-Level und Trim aller aktiven Kanäle kontrollieren. 3. Prüfen, ob versehentlich nur der Booth-Ausgang verkabelt ist statt Master.',
      en: '1. Check the cable connection from Master Out to the PA input. 2. Check master level and trim on all active channels. 3. Check whether only the Booth output is cabled instead of Master.',
    },
  },
  {
    id: 'mixing-verzerrt',
    cat: 'mixing',
    title: {
      de: 'Track klingt verzerrt oder kratzig',
      en: 'Track sounds distorted or scratchy',
    },
    keywords: 'verzerrt kratzig clipping übersteuert distorted scratchy clipping overdrive',
    tags: ['verzerrt', 'clipping', 'pegel', 'gain'],
    cause: {
      de: 'Trim-Regler des Kanals zu hoch eingestellt, seltener Master-Level zu hoch oder ein extrem laut gemasterter Track, der bereits in der Datei selbst übersteuert ist.',
      en: 'Channel trim set too high, less often master level too high, or an extremely loudly mastered track that is already clipping within the file itself.',
    },
    fix: {
      de: '1. Trim-Regler des betroffenen Kanals reduzieren, bis die Pegelanzeige nicht mehr dauerhaft rot ausschlägt. 2. Master-Level prüfen. 3. Falls die Datei selbst schon übersteuert ist (im Wellenform-Editor an gekappten Spitzen erkennbar), hilft nur ein anderes Master der Datei.',
      en: '1. Reduce the trim on the affected channel until the level meter no longer stays permanently red. 2. Check master level. 3. If the file itself is already clipping (visible as flat-topped peaks in the waveform editor), only a different master of the file will help.',
    },
  },
  {
    id: 'mixing-kopfhoerer-leise',
    cat: 'mixing',
    title: {
      de: 'Kopfhörer zu leise trotz aufgedrehtem Level',
      en: 'Headphones too quiet despite turned-up level',
    },
    keywords: 'kopfhörer leise headphone leise cue leise headphones quiet cue quiet',
    tags: ['kopfhörer', 'cue', 'lautstärke'],
    cause: {
      de: 'Mixing-Regler steht zu weit auf der Master- statt der Cue-Seite (oder umgekehrt), oder die Cue-Taste des vorzuhörenden Kanals ist nicht aktiviert.',
      en: 'Mixing knob is too far towards Master instead of Cue (or vice versa), or the cue button on the channel to be monitored is not activated.',
    },
    fix: {
      de: '1. Cue-Taste des gewünschten Kanals aktivieren. 2. Mixing-Regler zur Cue-Seite drehen. 3. Kopfhörer-Level-Regler separat prüfen, unabhängig von Master und Booth.',
      en: '1. Activate the cue button on the desired channel. 2. Turn the mixing knob towards the Cue side. 3. Check the headphone level knob separately — it is independent of master and booth.',
    },
  },
  {
    id: 'mixing-beat-fx-falsch',
    cat: 'mixing',
    title: {
      de: 'Beat FX läuft aus dem Takt',
      en: 'Beat FX runs out of time',
    },
    keywords: 'beat fx falsch effekt out of sync effekt timing beat fx wrong out of sync timing',
    cause: {
      de: 'Die BPM-Basis des Effekts wurde nicht korrekt vom Deck übernommen, meist weil der Track noch nicht läuft, ein falsches Deck als Quelle gewählt ist, oder die Analyse-BPM ungenau ist (z.B. bei Halftime/Doubletime-Verwechslung).',
      en: 'The BPM base of the effect was not correctly taken from the deck — usually because the track is not yet playing, the wrong deck is selected as the source, or the analysed BPM is inaccurate (e.g. halftime/doubletime confusion).',
    },
    fix: {
      de: '1. Kanal-Wahl im Beat-FX-Bereich prüfen, ob das richtige Deck als Zeitbasis gewählt ist. 2. BPM per TAP-Taste im Songtempo neu eintippen. 3. Bei wiederkehrendem Problem mit einem Track: BPM-Wert in rekordbox manuell prüfen und korrigieren, oft ist er exakt doppelt oder halb so hoch wie das gefühlte Tempo.',
      en: '1. Check the channel selection in the Beat FX section to make sure the correct deck is chosen as the time base. 2. Tap the TAP button at the song tempo to input BPM manually. 3. For a recurring issue with a specific track: manually check and correct the BPM in rekordbox — it is often exactly double or half the felt tempo.',
    },
  },
  {
    id: 'mixing-bass-verschwindet',
    cat: 'mixing',
    title: {
      de: 'Bass verschwindet oder wird dünn beim Blenden zweier Tracks',
      en: 'Bass disappears or thins out when blending two tracks',
    },
    keywords: 'bass verschwindet phasenauslöschung bass dünn beim mixen bass disappears phase cancellation thin mixing',
    tags: ['bass', 'phase', 'eq', 'sub'],
    cause: {
      de: 'Nicht nur ein EQ-Problem: Zwei ähnliche Basslinien können sich durch Phasenauslöschung teilweise gegenseitig aufheben, wenn ihre Wellenformen gegenläufig schwingen. EQ-Kill allein löst das nicht, wenn die Ursache Phase statt Frequenzüberlagerung ist.',
      en: 'Not just an EQ issue: two similar basslines can partially cancel each other through phase cancellation when their waveforms are out of phase. EQ kill alone does not fix this if the cause is phase rather than frequency overlap.',
    },
    fix: {
      de: '1. Zuerst die Standard-Bass-Swap-Technik prüfen (eine Low-EQ konsequent herunterfahren, siehe rekordbox-Kapitel zum Mixen). 2. Bleibt der Bass dünn, kurz einen der beiden Tracks für einen Moment stumm schalten, um zu hören, ob die Auslöschung tatsächlich durch Überlagerung entsteht – dann hilft nur, die Überlappungsdauer beider Basslinien zu verkürzen.',
      en: '1. First try the standard bass swap technique (cut one Low EQ fully — see the rekordbox mixing chapter). 2. If the bass still sounds thin, briefly mute one of the two tracks to check whether the cancellation is actually caused by overlap — in that case, the only fix is to shorten the duration both basslines run together.',
    },
  },
  {
    id: 'mixing-uebergang-unrund',
    cat: 'mixing',
    title: {
      de: 'Übergang klingt trotz aktivem Sync unrund',
      en: 'Transition sounds rough despite active Sync',
    },
    keywords: 'übergang unrund sync klingt schlecht mix passt nicht transition rough sync sounds bad mix does not fit',
    cause: {
      de: 'Sync gleicht nur Tempo und Beatgrid an, nicht die Groove-Struktur. Bei unterschiedlichem Rhythmusgefühl (z.B. straighter Four-on-the-Floor gegen Track mit Shuffle/Swing, oder stark unterschiedliches Energie-Level) wirkt der Übergang trotz exaktem Sync unpassend.',
      en: 'Sync only aligns tempo and beat grid, not groove structure. With different rhythmic feel (e.g. straight four-on-the-floor vs. a track with shuffle/swing, or a large energy difference), the transition can still sound wrong even with exact sync.',
    },
    fix: {
      de: '1. Vor dem Blend kurz gegenchecken, ob beide Tracks tatsächlich ähnlich groovy sind, nicht nur BPM-gleich. 2. Bei Genre- oder Energie-Sprüngen lieber kürzer überlappen oder einen härteren Cut statt langem Blend nutzen.',
      en: '1. Before blending, briefly check whether both tracks are actually similarly groovy — not just the same BPM. 2. At genre or energy jumps, prefer a shorter overlap or a hard cut over a long blend.',
    },
  },
  {
    id: 'mixing-master-clippt',
    cat: 'mixing',
    title: {
      de: 'Master-Anzeige dauerhaft rot, obwohl Master-Level niedrig steht',
      en: 'Master meter permanently red despite low master level',
    },
    keywords: 'master clippt rot trotz niedrigem regler gain staging übersteuert summe master clipping red low knob gain staging overdrive',
    tags: ['clipping', 'gain', 'master', 'pegel'],
    cause: {
      de: 'Das Clipping passiert nicht am Master-Level-Regler, sondern bereits früher in der Signalkette: ein oder mehrere Trim-Regler (Kanalverstärkungen) sind zu hoch eingestellt. Der Master-Level-Regler regelt nur den Ausgangspegel nach dem Clipping, kann ein bereits verzerrtes Signal also nicht reparieren.',
      en: 'Clipping is not happening at the master level knob but earlier in the signal chain: one or more trim knobs (channel gains) are set too high. The master level knob only controls the output level after clipping has already occurred — it cannot repair an already distorted signal.',
    },
    fix: {
      de: '1. Trim-Regler aller aktiven Kanäle einzeln prüfen – Pegelanzeige pro Kanal darf nur kurz ins Gelbe gehen, nicht dauerhaft rot. 2. Trim zuerst bei pausiertem Deck und lautem Track-Abschnitt einstellen, nicht während des Mixens. 3. Als Faustregel: Trim so eingestellt, dass die Pegelanzeige im Schnitt im grünen Bereich bleibt, auch wenn die Kick kurz gelb macht. 4. Danach Master-Level auf gewünschte Ausgangslautstärke einstellen.',
      en: '1. Check the trim on each active channel individually — the per-channel level meter should only briefly enter yellow, not stay permanently red. 2. Set trim with the deck paused at a loud section of the track, not during the mix. 3. Rule of thumb: trim set so the level meter averages in the green zone, even if the kick briefly hits yellow. 4. Then set master level to the desired output volume.',
    },
  },
  {
    id: 'mixing-brummen',
    cat: 'mixing',
    title: {
      de: 'Brummton (50/60 Hz) aus den Lautsprechern',
      en: 'Hum (50/60 Hz) from the speakers',
    },
    keywords: 'brummen brummton 50hz 60hz groundloop erde kabel hum ground loop earth cable',
    tags: ['brummen', 'kabel', 'störgeräusch'],
    cause: {
      de: 'Sogenannte Erdschleife (Ground Loop): zwei oder mehr Geräte im selben Setup (z.B. Laptop + Pult + Verstärker) sind über unterschiedliche Steckdosen oder mit unterschiedlichen Erdpotentialen verbunden. Die Spannungsdifferenz erzeugt einen 50 Hz- oder 60 Hz-Brummton.',
      en: 'A ground loop: two or more devices in the same setup (e.g. laptop + mixer + amplifier) are connected via different sockets or with different earth potentials. The voltage difference produces a 50 Hz or 60 Hz hum.',
    },
    fix: {
      de: '1. Alle Geräte des Setups über dieselbe Steckdosenleiste mit Erde betreiben. 2. Laptop-Netzteil ausstecken und nur auf Akku testen – verschwindet das Brummen, ist das Netzteil die Einstreuquelle, ein Trenntrafo oder Entstörfilter kann helfen. 3. Unsymmetrische Cinch-Kabel durch symmetrische XLR-Kabel ersetzen, wenn möglich. 4. Bei Laptop-Setups: Ground-Loop-Isolator in die Audiokette einfügen (günstige Lösung für ca. 10–20 €).',
      en: '1. Run all devices in the setup through the same earthed power strip. 2. Unplug the laptop charger and test on battery only — if the hum disappears, the charger is the interference source; an isolation transformer or filter can help. 3. Replace unbalanced RCA cables with balanced XLR cables where possible. 4. For laptop setups: insert a ground loop isolator into the audio chain (a cheap solution for around 10–20 €).',
    },
  },
  {
    id: 'mixing-knacken',
    cat: 'mixing',
    title: {
      de: 'Knacken oder Knistern beim Trackübergang oder Einblenden',
      en: 'Clicking or crackling during a track transition or fade-in',
    },
    keywords: 'knacken knistern popup click beim einblenden fader clicking crackling pop fader fade',
    cause: {
      de: 'Zu abruptes Bewegen des Channel-Faders oder Crossfaders bei aktivem Signal, oder ein Track startet nicht bei Stille (kein Auto Cue / kein Cue-Punkt am Trackbeginn), sodass beim Laden direkt ein Signalsprung entsteht.',
      en: 'Moving the channel fader or crossfader too abruptly while a signal is active, or a track not starting from silence (no Auto Cue / no cue point at the beginning of the track), causing an immediate signal jump when loaded.',
    },
    fix: {
      de: '1. Fader nie ruckartig öffnen – langsam und gleichmäßig hochziehen. 2. Auto Cue aktivieren, damit der Track beim Laden automatisch an der ersten hörbaren Stelle startet und keine Stille oder abrupte Wellenform am Anfang liegt. 3. Bei Tracks mit kurzen Einstiegsimpulsen (z.B. Synthesizer-Picks ohne Fade-In) einen Cue-Punkt kurz nach dem Einspielen setzen.',
      en: '1. Never jerk the fader open — pull it up slowly and smoothly. 2. Enable Auto Cue so the track automatically starts from the first audible moment when loaded, avoiding silence or an abrupt waveform at the beginning. 3. For tracks with short entry transients (e.g. synth stabs without a fade-in), set a cue point just after the initial sound.',
    },
  },
  {
    id: 'mixing-pa-verzerrt',
    cat: 'mixing',
    title: {
      de: 'Mix klingt gut im Kopfhörer, auf der PA aber zu laut oder verzerrt',
      en: 'Mix sounds good in headphones but too loud or distorted on the PA',
    },
    keywords: 'kopfhörer klingt gut pa verzerrt laut pa klingt anders headphones good pa distorted loud sounds different',
    tags: ['pa', 'lautstärke', 'monitoring'],
    cause: {
      de: 'Das Kopfhörer-Signal repräsentiert nicht immer den exakten Pegel, der zur PA geht. Booth-Monitor und Master-Out haben unterschiedliche Pegelregler, und ein zu hochgedrehter Trim klingt im Kopfhörer möglicherweise noch OK, ist aber auf der PA bereits am Limit.',
      en: 'The headphone signal does not always represent the exact level going to the PA. The booth monitor and master out have separate level controls, and a trim that is too high may still sound OK in headphones but is already at the limit on the PA.',
    },
    fix: {
      de: '1. Master-Pegelanzeige als Referenz nutzen, nicht nur den Kopfhörer. Dauerhaft rote Master-Anzeige → Trim runter. 2. Mixing-Regler im Kopfhörer kurz auf Master-Seite drehen und mit dem hören, was die PA bekommt. 3. PA-Endstufe oder aktive Lautsprecher haben oft eigene Gain-Regler – sicherstellen, dass diese nicht auch noch übermäßig aufgedreht sind.',
      en: '1. Use the master level meter as a reference, not just the headphones. Permanently red master meter → reduce trim. 2. Briefly turn the mixing knob to the master side in the headphones to hear what the PA is receiving. 3. PA amplifiers or active speakers often have their own gain controls — make sure these are not also turned up excessively.',
    },
  },
  {
    id: 'mixing-kein-festes-tempo',
    cat: 'mixing',
    title: {
      de: 'Track hat kein festes Tempo, Sync und Beatmatching funktionieren schlecht',
      en: 'Track has no fixed tempo, Sync and beatmatching work poorly',
    },
    keywords: 'track kein festes tempo tempo schwankt live eingespielt drift kein beatgrid track no fixed tempo fluctuating live drift no beatgrid',
    tags: ['tempo', 'beatgrid', 'sync', 'live'],
    cause: {
      de: 'Manche Tracks wurden ohne Metronom oder mit einem live eingespielten Drummer aufgenommen und haben leichte BPM-Schwankungen über die Länge. Sync und Quantize können das nicht ausgleichen, da beide auf ein starres Beatgrid angewiesen sind.',
      en: 'Some tracks were recorded without a metronome or with a live drummer and have slight BPM variations throughout. Sync and Quantize cannot compensate for this because both rely on a rigid beat grid.',
    },
    fix: {
      de: '1. Sync ausschalten und manuell per Tempo-Fader nachführen – Ohr entscheidet, nicht die Anzeige. 2. Kleineren Tempo-Fader-Bereich (±6 %) wählen für feinere Korrekturen. 3. In rekordbox mehrere Beatgrid-Marker über den Track verteilen, um die Schwankungen zu kartieren – danach funktioniert Sync deutlich besser. 4. Kurze Übergänge statt langer Blends wählen, solange das Tempo noch nicht perfekt liegt.',
      en: '1. Disable Sync and follow the tempo manually with the fader — your ear decides, not the display. 2. Choose a smaller fader range (±6 %) for finer corrections. 3. In rekordbox, place multiple beat grid markers distributed across the track to map the fluctuations — Sync then works much better. 4. Choose short transitions instead of long blends while the tempo is not yet perfectly matched.',
    },
  },
  {
    id: 'mixing-wie-lange-uebergang',
    cat: 'mixing',
    title: {
      de: 'Wie lange sollte ein Übergang dauern?',
      en: 'How long should a transition last?',
    },
    keywords: 'wie lange übergang überblenden dauer mix länge blend how long transition blend duration length',
    cause: {
      de: 'Keine feste Regel – die richtige Übergangs-Dauer hängt von Genre, Energie und Track-Struktur ab. Zu kurze Übergänge klingen abgehackt, zu lange lassen den Mix verwässern.',
      en: 'No fixed rule — the right transition length depends on genre, energy, and track structure. Too short sounds choppy; too long dilutes the mix.',
    },
    fix: {
      de: 'Faustregel nach Genre: House/Techno = 16–32 Beats (2–4 Takte) sind Standard, bei ähnlichem Energielevel auch länger. Drum\'n\'Bass/Jungle = oft kurze Cuts, da schnelle Bassline-Wechsel sonst Matsch erzeugen. Übergange immer an einer klar erkennbaren 8- oder 16-Takt-Grenze beginnen. Auf der Einblende-Seite: neuen Track kurz im Kopfhörer vorhören und sicherstellen, dass er an der Stelle auch tatsächlich "startet" (kein Intro-Brummen, kein zu langer Aufbau).',
      en: 'Genre rule of thumb: House/Techno = 16–32 beats (2–4 bars) is standard, longer if energy levels are similar. Drum\'n\'Bass/Jungle = often short cuts, as fast bassline changes otherwise create mud. Always start transitions at a clearly identifiable 8- or 16-bar boundary. On the incoming side: briefly pre-listen to the new track in the headphones and make sure it actually "starts" at that point (no intro hum, no build that is too long).',
    },
  },
  {
    id: 'mixing-rhythmisch-off',
    cat: 'mixing',
    title: {
      de: 'Tracks fühlen sich rhythmisch off an, obwohl BPM-Werte gleich sind',
      en: 'Tracks feel rhythmically off despite identical BPM values',
    },
    keywords: 'tracks passen nicht rhythmisch off bpm gleich trotzdem falsch tracks do not fit rhythmically off same bpm still wrong',
    cause: {
      de: 'Gleiches BPM bedeutet nicht automatisch gleicher Beat-Einsatz. Mögliche Ursachen: Der zweite Track ist phasenversetzt zum ersten (Downbeat sitzt auf Offbeat), oder ein Track hat Shuffle/Swing-Groove während der andere straight ist.',
      en: 'Same BPM does not automatically mean the same beat placement. Possible causes: the second track is phase-shifted relative to the first (downbeat lands on the offbeat), or one track has shuffle/swing groove while the other is straight.',
    },
    fix: {
      de: '1. Beat-Einsatz (Downbeat) beider Tracks im Kopfhörer vergleichen. 2. Am spielenden Deck kurz den Jogwheel leicht drücken (Pitch Bend), um den Track minimal vor oder zurückzuschieben, bis die Kick-Drums aufeinanderfallen. 3. Bei Tracks mit Shuffle-Groove grundsätzlich kürzere Übergänge bevorzugen – ein Straight-Track und ein Shuffle-Track klingen auch mit exakt gleichem BPM und Downbeat nicht lange zusammen gut.',
      en: '1. Compare the downbeat of both tracks in the headphones. 2. Lightly nudge the jogwheel on the playing deck (pitch bend) to shift the track slightly forward or back until the kick drums align. 3. For tracks with shuffle groove, prefer shorter transitions by default — a straight track and a shuffle track will not sound good together for long even at exactly the same BPM and downbeat.',
    },
  },
  {
    id: 'mixing-tonarten-unpassend',
    cat: 'mixing',
    title: {
      de: 'Zwei Tracks in nicht passenden Tonarten trotzdem kombinieren?',
      en: 'Can two tracks in incompatible keys still be combined?',
    },
    keywords: 'tonarten passen nicht camelot unpassend key clash keys do not match camelot incompatible clash',
    tags: ['tonart', 'key', 'harmonisch', 'camelot'],
    cause: {
      de: 'Laut Camelot Wheel dissonante Kombinationen (z.B. 8A gegen 3B) klingen bei langem gleichzeitigem Erklingen beider Tracks schräg, sind aber kein Problem, wenn beide nicht lange überlappen.',
      en: 'According to the Camelot Wheel, dissonant combinations (e.g. 8A against 3B) sound off when both tracks play simultaneously for a long time, but are not a problem if both do not overlap for long.',
    },
    fix: {
      de: '1. Bei harmonisch unpassenden Tracks: kurzer Cut oder Übergang ohne langen Blend statt langem Überblenden. 2. Alternativ Key Shift am Deck nutzen, um einen der beiden Tracks kurzzeitig in eine kompatiblere Tonart zu verschieben, siehe Camelot-Wheel-Abschnitt in Grundlagen.',
      en: '1. With harmonically incompatible tracks: use a short cut or quick transition rather than a long blend. 2. Alternatively, use Key Shift on the deck to briefly move one of the two tracks into a more compatible key — see the Camelot Wheel section in Basics.',
    },
  },
];