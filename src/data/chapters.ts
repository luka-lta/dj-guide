import { Chapter } from './types';

export const chapters: Chapter[] = [
  {
    cat: 'einrichtung',
    title: {
      de: 'Erste Schritte: Installation & erster Start',
      en: 'Getting Started: Installation & First Launch',
    },
    steps: [
      {
        t: { de: 'Software herunterladen', en: 'Download the software' },
        d: {
          de: 'rekordbox von rekordbox.com herunterladen (Version für Windows oder Mac). Kostenloser Pioneer-DJ-Account wird für Download und Lizenzaktivierung benötigt.',
          en: 'Download rekordbox from rekordbox.com (Windows or Mac version). A free Pioneer DJ account is required for download and licence activation.',
        },
      },
      {
        t: { de: 'Installieren & Account verknüpfen', en: 'Install & link account' },
        d: {
          de: 'Installer ausführen, beim ersten Start mit dem Pioneer-DJ-Account einloggen. Die kostenlose Version reicht für Export-Nutzung mit dem Pult (kein Abo nötig, solange keine Performance-Modus-Funktionen am Laptop selbst gebraucht werden).',
          en: 'Run the installer, then log in with your Pioneer DJ account on first launch. The free tier is sufficient for export use with the mixer — no subscription needed unless you want Performance Mode features on the laptop itself.',
        },
      },
      {
        t: { de: 'Analyse-Einstellungen prüfen', en: 'Check analysis settings' },
        d: {
          de: 'Unter Einstellungen → Analyse festlegen, ob BPM- und Key-Erkennung automatisch beim Import laufen soll. Für den Einstieg beides aktiviert lassen.',
          en: 'Under Preferences → Analysis, choose whether BPM and key detection should run automatically on import. For beginners, leave both enabled.',
        },
      },
    ],
  },
  {
    cat: 'bibliothek',
    title: {
      de: 'Musik importieren',
      en: 'Importing music',
    },
    steps: [
      {
        t: { de: 'Ordner hinzufügen', en: 'Add folder' },
        d: {
          de: 'Im linken Baum unter \'PLAYLISTS\' bzw. über \'Datei → Ordner/Datei hinzufügen\' den Musikordner vom Rechner in rekordbox einbinden. Tracks per Drag & Drop in die Collection ziehen funktioniert ebenso.',
          en: 'In the left panel under PLAYLISTS, or via File → Add Folder/File, add your music folder to rekordbox. Drag and drop tracks into the collection also works.',
        },
      },
      {
        t: { de: 'Analyse abwarten', en: 'Wait for analysis' },
        d: {
          de: 'Neu importierte Tracks werden automatisch analysiert (BPM, Beatgrid, Wellenform, Tonart). Fortschritt unten rechts im Analyse-Fenster sichtbar. Bei großen Bibliotheken kann das etwas dauern, im Hintergrund weiterarbeitbar.',
          en: 'Newly imported tracks are analysed automatically (BPM, beat grid, waveform, key). Progress is shown bottom-right in the analysis window. For large libraries this takes time — you can keep working in the background.',
        },
      },
      {
        t: { de: 'Beatgrid kontrollieren', en: 'Check the beat grid' },
        d: {
          de: 'Bei Tracks mit Tempowechseln oder unsauberem Intro die automatische Beatgrid-Erkennung manuell prüfen (Track doppelklicken → Grid-Editier-Modus). Falsches Grid führt später zu ungenauem Sync und falsch sitzenden Auto-Loops.',
          en: 'For tracks with tempo changes or messy intros, manually check the auto beat-grid detection (double-click track → grid edit mode). An incorrect grid will cause imprecise sync and misaligned auto loops later.',
        },
      },
    ],
  },
  {
    cat: 'bibliothek',
    title: {
      de: 'Bibliothek organisieren',
      en: 'Organising the library',
    },
    steps: [
      {
        t: { de: 'Playlists anlegen', en: 'Create playlists' },
        d: {
          de: 'Rechtsklick auf \'PLAYLISTS\' → Neue Playlist. Tracks per Drag & Drop hinein ziehen. Playlists lassen sich in Ordnern gruppieren, z.B. nach Genre, BPM-Bereich oder Set-Thema.',
          en: 'Right-click PLAYLISTS → New Playlist. Drag and drop tracks into it. Playlists can be grouped in folders, e.g. by genre, BPM range, or set theme.',
        },
      },
      {
        t: { de: 'Tags & My Tag vergeben', en: 'Assign tags & My Tag' },
        d: {
          de: 'Über die Tag-Spalte oder Rechtsklick → Tag hinzufügen lassen sich Tracks nach Energie, Genre oder Stimmung markieren. Erleichtert späteres Filtern direkt am Pult.',
          en: 'Use the tag column or right-click → Add Tag to label tracks by energy, genre, or mood. Makes filtering directly on the mixer much easier later.',
        },
      },
      {
        t: { de: 'Cue-Punkte & Hot Cues vorbereiten (optional)', en: 'Prepare cue points & hot cues (optional)' },
        d: {
          de: 'Bereits in rekordbox am Laptop lassen sich Hot Cues, Loops und Memory Cues setzen (Wellenform-Ansicht im Track-Editor). Diese werden mit exportiert und stehen am Pult sofort zur Verfügung.',
          en: 'Hot cues, loops and memory cues can already be set in rekordbox on the laptop (waveform view in the track editor). They are exported along with the track and are immediately available on the mixer.',
        },
      },
    ],
  },
  {
    cat: 'bibliothek',
    title: {
      de: 'Intelligente Playlists (Smart Playlists) nutzen',
      en: 'Using Smart Playlists',
    },
    steps: [
      {
        t: { de: 'Was sie sind', en: 'What they are' },
        d: {
          de: 'Eine intelligente Playlist füllt sich automatisch nach festen Regeln (z.B. BPM-Bereich, Tonart, Genre, Bewertung, My Tag, Hinzufügedatum, Play Count) und aktualisiert sich selbstständig, sobald neue Tracks ins Raster passen. Eine normale Playlist bleibt dagegen statisch, bis manuell etwas hinzugefügt wird.',
          en: 'A smart playlist fills itself automatically based on fixed rules (e.g. BPM range, key, genre, rating, My Tag, date added, play count) and updates itself whenever new tracks match the criteria. A regular playlist stays static until you manually add to it.',
        },
      },
      {
        t: { de: 'Anlegen', en: 'Creating one' },
        d: {
          de: 'Rechtsklick auf \'PLAYLISTS\' → Neue intelligente Playlist. Regeln festlegen, z.B. BPM zwischen 118 und 124 UND Genre gleich Techno. Mehrere Regeln lassen sich per UND/ODER verknüpfen, für engere oder weitere Auswahl.',
          en: 'Right-click PLAYLISTS → New Smart Playlist. Set rules, e.g. BPM between 118 and 124 AND genre equals Techno. Multiple rules can be combined with AND/OR for narrower or broader selections.',
        },
      },
      {
        t: { de: 'Typische Einsatzzwecke', en: 'Typical use cases' },
        d: {
          de: 'Warm-up-Liste nach BPM-Bereich, \'lange nicht gespielt\' nach Play Count und Datum, Favoriten nach Sternebewertung, oder automatische Genre-Listen für Back-to-Back-Sets zu zweit, ohne die Auswahl jedes Mal von Hand zu pflegen.',
          en: 'Warm-up list by BPM range, "not played in a while" by play count and date, favourites by star rating, or automatic genre lists for back-to-back sets — without having to curate the selection manually each time.',
        },
      },
      {
        t: { de: 'Nutzung am Pult', en: 'Using on the mixer' },
        d: {
          de: 'Intelligente Playlists werden wie normale Playlists exportiert bzw. über Link Export bereitgestellt und erscheinen im Browser des Pults. Sie aktualisieren sich dort erst beim nächsten USB-Export bzw. bei aktiver Link-Verbindung neu, nicht automatisch in Echtzeit auf dem bereits exportierten Stick.',
          en: 'Smart playlists are exported or made available via Link Export just like regular playlists and appear in the mixer browser. They only update at the next USB export or via an active link connection — not automatically in real-time on an already-exported stick.',
        },
      },
    ],
  },
  {
    cat: 'exportLink',
    title: {
      de: 'Musik auf USB exportieren',
      en: 'Exporting music to USB',
    },
    steps: [
      {
        t: { de: 'USB-Stick anschließen', en: 'Connect USB drive' },
        d: {
          de: 'USB-Stick an den Rechner anschließen, er erscheint links unter \'DEVICES\'.',
          en: 'Plug the USB drive into the computer — it appears on the left under DEVICES.',
        },
      },
      {
        t: { de: 'Playlist/Tracks auf das Gerät ziehen', en: 'Drag playlist/tracks to the device' },
        d: {
          de: 'Gewünschte Playlist oder einzelne Tracks per Drag & Drop auf den USB-Geräteeintrag ziehen. rekordbox kopiert Audiodateien und Analyse-/Cue-Daten in eine eigene rekordbox-Ordnerstruktur auf dem Stick.',
          en: 'Drag the desired playlist or individual tracks onto the USB device entry. rekordbox copies the audio files and analysis/cue data into its own folder structure on the drive.',
        },
      },
      {
        t: { de: 'Export abwarten & sicher entfernen', en: 'Wait for export & eject safely' },
        d: {
          de: 'Fortschrittsbalken unten beachten, Stick erst nach Abschluss des Exports über \'sicher entfernen\' auswerfen. Danach direkt in einen der USB-Ports am Pult stecken – das Gerät liest die rekordbox-Struktur automatisch ein.',
          en: 'Watch the progress bar at the bottom and eject the drive via "safely remove" only after the export finishes. Then plug it directly into one of the USB ports on the mixer — the device reads the rekordbox structure automatically.',
        },
      },
    ],
  },
  {
    cat: 'exportLink',
    title: {
      de: 'Direktverbindung per Link Export (ohne USB)',
      en: 'Direct connection via Link Export (without USB)',
    },
    steps: [
      {
        t: { de: 'Verbindung herstellen', en: 'Establish connection' },
        d: {
          de: 'Pult per Netzwerkkabel mit dem Laptop verbinden, oder beide im selben WLAN. Am Pult den LINK-Modus aktivieren.',
          en: 'Connect the mixer to the laptop with a network cable, or have both on the same Wi-Fi. Enable LINK mode on the mixer.',
        },
      },
      {
        t: { de: 'In rekordbox aktivieren', en: 'Activate in rekordbox' },
        d: {
          de: 'In rekordbox oben rechts auf \'Link Export\' bzw. das entsprechende Verbindungssymbol klicken, Gerät muss als verbunden erscheinen.',
          en: 'Click Link Export or the corresponding connection icon in the top-right of rekordbox — the device must appear as connected.',
        },
      },
      {
        t: { de: 'Bibliothek live nutzen', en: 'Use library live' },
        d: {
          de: 'Sobald verbunden, steht die komplette rekordbox-Bibliothek am Pult zur Verfügung, ohne vorherigen Export. Praktisch für spontane Änderungen an der Playlist während rekordbox weiterläuft, aber abhängig von stabiler Verbindung und laufendem Laptop während des gesamten Sets.',
          en: 'Once connected, the entire rekordbox library is available on the mixer without a prior export. Useful for spontaneous playlist changes while rekordbox keeps running, but dependent on a stable connection and laptop running throughout the whole set.',
        },
      },
    ],
  },
  {
    cat: 'amPult',
    title: {
      de: 'Am Pult browsen und laden',
      en: 'Browsing and loading on the mixer',
    },
    steps: [
      {
        t: { de: 'USB-Slot wählen', en: 'Select USB slot' },
        d: {
          de: 'Am Display den aktiven USB-Slot (1 oder 2) auswählen, dessen Inhalt im Browser erscheinen soll.',
          en: 'Select the active USB slot (1 or 2) on the display whose contents should appear in the browser.',
        },
      },
      {
        t: { de: 'Navigieren', en: 'Navigate' },
        d: {
          de: 'Mit dem Dreh-/Drück-Regler durch Ordner, Playlists und Tags navigieren. Die Search-Taste erlaubt direkte Texteingabe nach Titel oder Künstler.',
          en: 'Use the rotary selector to navigate through folders, playlists, and tags. The Search button allows direct text entry by title or artist.',
        },
      },
      {
        t: { de: 'Track laden', en: 'Load track' },
        d: {
          de: 'Gewünschten Track markieren, LOAD-Taste des Ziel-Decks drücken. Bei bereits laufendem Deck erscheint eine Sicherheitsabfrage, um versehentliches Überschreiben zu verhindern.',
          en: 'Highlight the desired track and press the LOAD button on the target deck. If the deck is already playing, a confirmation prompt appears to prevent accidental overwriting.',
        },
      },
    ],
  },
  {
    cat: 'amPult',
    title: {
      de: 'Hot Cues, Loops & Beat Jump im Set nutzen',
      en: 'Using Hot Cues, Loops & Beat Jump in a set',
    },
    steps: [
      {
        t: { de: 'Hot Cues setzen', en: 'Set hot cues' },
        d: {
          de: 'Pad-Modus \'Hot Cue\' wählen, während der Wiedergabe ein leeres Pad drücken, um an dieser Stelle eine Marke zu setzen. Kurzes Antippen springt später zur Marke, Shift+Pad löscht sie wieder.',
          en: 'Select the Hot Cue pad mode, then press an empty pad during playback to set a marker at that position. A quick tap jumps back to the marker; Shift + Pad deletes it.',
        },
      },
      {
        t: { de: 'Auto Loop einsetzen', en: 'Use auto loop' },
        d: {
          de: 'AUTO LOOP-Taste drückt eine Standard-Loop-Länge (z.B. 4 Beats) ab der aktuellen Position. Über die Halbieren/Verdoppeln-Tasten die Länge live anpassen, RELOOP/EXIT verlässt bzw. reaktiviert den Loop.',
          en: 'Pressing AUTO LOOP sets a default loop length (e.g. 4 beats) from the current position. Use the halve/double buttons to adjust the length on the fly; RELOOP/EXIT exits or reactivates the loop.',
        },
      },
      {
        t: { de: 'Beat Jump für schnelle Übergänge', en: 'Beat Jump for quick transitions' },
        d: {
          de: 'Beat-Jump-Modus wählen, mit den Pads in festen Beat-Schritten vor/zurück springen, um z.B. ein Break oder einen Drop exakt zu treffen, ohne den Sync zu verlieren.',
          en: 'Select Beat Jump mode and use the pads to jump forward or backward in fixed beat increments — useful for hitting a break or drop exactly without losing sync.',
        },
      },
    ],
  },
  {
    cat: 'mixing',
    title: {
      de: 'Mixen: EQ, Filter & Übergänge',
      en: 'Mixing: EQ, Filter & Transitions',
    },
    steps: [
      {
        t: { de: 'Gain-Staging zuerst', en: 'Gain staging first' },
        d: {
          de: 'Vor dem Einmischen den Trim-Regler des neuen Kanals so einstellen, dass die Pegelanzeige ähnlich hoch ausschlägt wie beim bereits laufenden Kanal. Verhindert Lautstärkesprünge beim Überblenden.',
          en: 'Before blending in, set the trim on the incoming channel so its level meter hits a similar level to the playing channel. This prevents volume jumps during the crossfade.',
        },
      },
      {
        t: { de: 'Bass-Swap als Standardtechnik', en: 'Bass swap as standard technique' },
        d: {
          de: 'Beim Übergang die Low-EQ des einlaufenden Tracks zunächst herunterdrehen, den Track einblenden, dann die Low-EQ des auslaufenden Tracks absenken, während die des neuen Tracks wieder hochgezogen wird. Vermeidet Bass-Matsch bei zwei gleichzeitig laufenden Basslines.',
          en: 'At the transition, first cut the Low EQ of the incoming track, blend it in, then lower the Low EQ of the outgoing track while gradually restoring the incoming track\'s Low EQ. This avoids bass clash when two basslines run simultaneously.',
        },
      },
      {
        t: { de: 'Colour-FX/Filter für fließende Übergänge', en: 'Colour FX/Filter for smooth transitions' },
        d: {
          de: 'Den Filter-Regler eines Kanals vor dem Einblenden nach links drehen (High-Pass), Track einblenden, dann den Filter langsam zur Mitte zurückdrehen – ergibt einen weichen, energetischen Einstieg.',
          en: 'Turn the filter knob of a channel to the left (high-pass) before blending it in, then slowly return it to centre as you bring the track up — creates a smooth, energetic entry.',
        },
      },
    ],
  },
  {
    cat: 'mixing',
    title: {
      de: 'Beat FX & Sync gezielt einsetzen',
      en: 'Using Beat FX & Sync deliberately',
    },
    steps: [
      {
        t: { de: 'Effekt & Kanal wählen', en: 'Choose effect & channel' },
        d: {
          de: 'Im Beat-FX-Bereich zunächst den Zielkanal wählen (Deck 1, Deck 2 oder Master), dann den Effekttyp (z.B. Echo, Delay) über den Wähler einstellen.',
          en: 'In the Beat FX section, first select the target channel (Deck 1, Deck 2, or Master), then choose the effect type (e.g. Echo, Delay) using the selector.',
        },
      },
      {
        t: { de: 'Zeitbasis festlegen', en: 'Set the time base' },
        d: {
          de: 'BPM wird meist automatisch vom laufenden Deck übernommen. Über die Beat-Taste die Effektlänge in Bruchteilen des Takts (1/4, 1/2, 1, 2, 4 Beats) wählen.',
          en: 'BPM is usually taken automatically from the running deck. Use the Beat button to select the effect length in fractions of a bar (1/4, 1/2, 1, 2, 4 beats).',
        },
      },
      {
        t: { de: 'Sync bewusst einsetzen, nicht blind', en: 'Use sync deliberately, not blindly' },
        d: {
          de: 'Beat Sync gleicht Tempo automatisch an, ersetzt aber kein sauberes Beatmatching-Verständnis. Gerade bei Genre-Wechseln mit unterschiedlicher Groove-Struktur (z.B. Techno zu Breakbeat) kann automatischer Sync unpassend wirken – hier lieber manuell antasten.',
          en: 'Beat Sync adjusts tempo automatically, but it\'s no substitute for understanding beatmatching. Especially at genre transitions with different groove structures (e.g. Techno to Breakbeat), automatic sync can sound off — better to nudge manually there.',
        },
      },
    ],
  },
];