import { Chapter } from './types';

export const chapters: Chapter[] = [
  {
    cat: 'Einrichtung',
    title: 'Erste Schritte: Installation & erster Start',
    steps: [
      { t: 'Software herunterladen', d: 'rekordbox von rekordbox.com herunterladen (Version für Windows oder Mac). Kostenloser Pioneer-DJ-Account wird für Download und Lizenzaktivierung benötigt.' },
      { t: 'Installieren & Account verknüpfen', d: 'Installer ausführen, beim ersten Start mit dem Pioneer-DJ-Account einloggen. Die kostenlose Version reicht für Export-Nutzung mit dem Pult (kein Abo nötig, solange keine Performance-Modus-Funktionen am Laptop selbst gebraucht werden).' },
      { t: 'Analyse-Einstellungen prüfen', d: 'Unter Einstellungen → Analyse festlegen, ob BPM- und Key-Erkennung automatisch beim Import laufen soll. Für den Einstieg beides aktiviert lassen.' },
    ],
  },
  {
    cat: 'Bibliothek',
    title: 'Musik importieren',
    steps: [
      { t: 'Ordner hinzufügen', d: 'Im linken Baum unter \'PLAYLISTS\' bzw. über \'Datei → Ordner/Datei hinzufügen\' den Musikordner vom Rechner in rekordbox einbinden. Tracks per Drag & Drop in die Collection ziehen funktioniert ebenso.' },
      { t: 'Analyse abwarten', d: 'Neu importierte Tracks werden automatisch analysiert (BPM, Beatgrid, Wellenform, Tonart). Fortschritt unten rechts im Analyse-Fenster sichtbar. Bei großen Bibliotheken kann das etwas dauern, im Hintergrund weiterarbeitbar.' },
      { t: 'Beatgrid kontrollieren', d: 'Bei Tracks mit Tempowechseln oder unsauberem Intro die automatische Beatgrid-Erkennung manuell prüfen (Track doppelklicken → Grid-Editier-Modus). Falsches Grid führt später zu ungenauem Sync und falsch sitzenden Auto-Loops.' },
    ],
  },
  {
    cat: 'Bibliothek',
    title: 'Bibliothek organisieren',
    steps: [
      { t: 'Playlists anlegen', d: 'Rechtsklick auf \'PLAYLISTS\' → Neue Playlist. Tracks per Drag & Drop hinein ziehen. Playlists lassen sich in Ordnern gruppieren, z.B. nach Genre, BPM-Bereich oder Set-Thema.' },
      { t: 'Tags & My Tag vergeben', d: 'Über die Tag-Spalte oder Rechtsklick → Tag hinzufügen lassen sich Tracks nach Energie, Genre oder Stimmung markieren. Erleichtert späteres Filtern direkt am Pult.' },
      { t: 'Cue-Punkte & Hot Cues vorbereiten (optional)', d: 'Bereits in rekordbox am Laptop lassen sich Hot Cues, Loops und Memory Cues setzen (Wellenform-Ansicht im Track-Editor). Diese werden mit exportiert und stehen am Pult sofort zur Verfügung.' },
    ],
  },
  {
    cat: 'Bibliothek',
    title: 'Intelligente Playlists (Smart Playlists) nutzen',
    steps: [
      { t: 'Was sie sind', d: 'Eine intelligente Playlist füllt sich automatisch nach festen Regeln (z.B. BPM-Bereich, Tonart, Genre, Bewertung, My Tag, Hinzufügedatum, Play Count) und aktualisiert sich selbstständig, sobald neue Tracks ins Raster passen. Eine normale Playlist bleibt dagegen statisch, bis manuell etwas hinzugefügt wird.' },
      { t: 'Anlegen', d: 'Rechtsklick auf \'PLAYLISTS\' → Neue intelligente Playlist. Regeln festlegen, z.B. BPM zwischen 118 und 124 UND Genre gleich Techno. Mehrere Regeln lassen sich per UND/ODER verknüpfen, für engere oder weitere Auswahl.' },
      { t: 'Typische Einsatzzwecke', d: 'Warm-up-Liste nach BPM-Bereich, \'lange nicht gespielt\' nach Play Count und Datum, Favoriten nach Sternebewertung, oder automatische Genre-Listen für Back-to-Back-Sets zu zweit, ohne die Auswahl jedes Mal von Hand zu pflegen.' },
      { t: 'Nutzung am Pult', d: 'Intelligente Playlists werden wie normale Playlists exportiert bzw. über Link Export bereitgestellt und erscheinen im Browser des Pults. Sie aktualisieren sich dort erst beim nächsten USB-Export bzw. bei aktiver Link-Verbindung neu, nicht automatisch in Echtzeit auf dem bereits exportierten Stick.' },
    ],
  },
  {
    cat: 'Export & Link',
    title: 'Musik auf USB exportieren',
    steps: [
      { t: 'USB-Stick anschließen', d: 'USB-Stick an den Rechner anschließen, er erscheint links unter \'DEVICES\'.' },
      { t: 'Playlist/Tracks auf das Gerät ziehen', d: 'Gewünschte Playlist oder einzelne Tracks per Drag & Drop auf den USB-Geräteeintrag ziehen. rekordbox kopiert Audiodateien und Analyse-/Cue-Daten in eine eigene rekordbox-Ordnerstruktur auf dem Stick.' },
      { t: 'Export abwarten & sicher entfernen', d: 'Fortschrittsbalken unten beachten, Stick erst nach Abschluss des Exports über \'sicher entfernen\' auswerfen. Danach direkt in einen der USB-Ports am Pult stecken – das Gerät liest die rekordbox-Struktur automatisch ein.' },
    ],
  },
  {
    cat: 'Export & Link',
    title: 'Direktverbindung per Link Export (ohne USB)',
    steps: [
      { t: 'Verbindung herstellen', d: 'Pult per Netzwerkkabel mit dem Laptop verbinden, oder beide im selben WLAN. Am Pult den LINK-Modus aktivieren.' },
      { t: 'In rekordbox aktivieren', d: 'In rekordbox oben rechts auf \'Link Export\' bzw. das entsprechende Verbindungssymbol klicken, Gerät muss als verbunden erscheinen.' },
      { t: 'Bibliothek live nutzen', d: 'Sobald verbunden, steht die komplette rekordbox-Bibliothek am Pult zur Verfügung, ohne vorherigen Export. Praktisch für spontane Änderungen an der Playlist während rekordbox weiterläuft, aber abhängig von stabiler Verbindung und laufendem Laptop während des gesamten Sets.' },
    ],
  },
  {
    cat: 'Am Pult',
    title: 'Am Pult browsen und laden',
    steps: [
      { t: 'USB-Slot wählen', d: 'Am Display den aktiven USB-Slot (1 oder 2) auswählen, dessen Inhalt im Browser erscheinen soll.' },
      { t: 'Navigieren', d: 'Mit dem Dreh-/Drück-Regler durch Ordner, Playlists und Tags navigieren. Die Search-Taste erlaubt direkte Texteingabe nach Titel oder Künstler.' },
      { t: 'Track laden', d: 'Gewünschten Track markieren, LOAD-Taste des Ziel-Decks drücken. Bei bereits laufendem Deck erscheint eine Sicherheitsabfrage, um versehentliches Überschreiben zu verhindern.' },
    ],
  },
  {
    cat: 'Am Pult',
    title: 'Hot Cues, Loops & Beat Jump im Set nutzen',
    steps: [
      { t: 'Hot Cues setzen', d: 'Pad-Modus \'Hot Cue\' wählen, während der Wiedergabe ein leeres Pad drücken, um an dieser Stelle eine Marke zu setzen. Kurzes Antippen springt später zur Marke, Shift+Pad löscht sie wieder.' },
      { t: 'Auto Loop einsetzen', d: 'AUTO LOOP-Taste drückt eine Standard-Loop-Länge (z.B. 4 Beats) ab der aktuellen Position. Über die Halbieren/Verdoppeln-Tasten die Länge live anpassen, RELOOP/EXIT verlässt bzw. reaktiviert den Loop.' },
      { t: 'Beat Jump für schnelle Übergänge', d: 'Beat-Jump-Modus wählen, mit den Pads in festen Beat-Schritten vor/zurück springen, um z.B. ein Break oder einen Drop exakt zu treffen, ohne den Sync zu verlieren.' },
    ],
  },
  {
    cat: 'Mixing',
    title: 'Mixen: EQ, Filter & Übergänge',
    steps: [
      { t: 'Gain-Staging zuerst', d: 'Vor dem Einmischen den Trim-Regler des neuen Kanals so einstellen, dass die Pegelanzeige ähnlich hoch ausschlägt wie beim bereits laufenden Kanal. Verhindert Lautstärkesprünge beim Überblenden.' },
      { t: 'Bass-Swap als Standardtechnik', d: 'Beim Übergang die Low-EQ des einlaufenden Tracks zunächst herunterdrehen, den Track einblenden, dann die Low-EQ des auslaufenden Tracks absenken, während die des neuen Tracks wieder hochgezogen wird. Vermeidet Bass-Matsch bei zwei gleichzeitig laufenden Basslines.' },
      { t: 'Colour-FX/Filter für fließende Übergänge', d: 'Den Filter-Regler eines Kanals vor dem Einblenden nach links drehen (High-Pass), Track einblenden, dann den Filter langsam zur Mitte zurückdrehen – ergibt einen weichen, energetischen Einstieg.' },
    ],
  },
  {
    cat: 'Mixing',
    title: 'Beat FX & Sync gezielt einsetzen',
    steps: [
      { t: 'Effekt & Kanal wählen', d: 'Im Beat-FX-Bereich zunächst den Zielkanal wählen (Deck 1, Deck 2 oder Master), dann den Effekttyp (z.B. Echo, Delay) über den Wähler einstellen.' },
      { t: 'Zeitbasis festlegen', d: 'BPM wird meist automatisch vom laufenden Deck übernommen. Über die Beat-Taste die Effektlänge in Bruchteilen des Takts (1/4, 1/2, 1, 2, 4 Beats) wählen.' },
      { t: 'Sync bewusst einsetzen, nicht blind', d: 'Beat Sync gleicht Tempo automatisch an, ersetzt aber kein sauberes Beatmatching-Verständnis. Gerade bei Genre-Wechseln mit unterschiedlicher Groove-Struktur (z.B. Techno zu Breakbeat) kann automatischer Sync unpassend wirken – hier lieber manuell antasten.' },
    ],
  },
];
