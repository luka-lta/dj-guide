import { Control, Device, DeviceId } from './types';

function mirrorDeck(list: Control[]): Control[] {
  const out = [...list];
  list
    .filter(c => c.zone === 'deckL')
    .forEach(c =>
      out.push({ name: c.name, zone: 'deckR', desc: c.desc, tip: c.tip, label: c.label }),
    );
  return out;
}

const rx3_raw: Control[] = [
  {
    name: { de: 'Jogwheel', en: 'Jogwheel' },
    zone: 'deckL',
    desc: {
      de: 'Die große Scheibe zum Scratchen und Pitch-Bending. Oberseite berühren und drehen = Vinyl-Modus scratcht den Track direkt. Am Rand drehen (ohne Auflage zu berühren) = Pitch Bend, zieht den Track kurzzeitig schneller oder langsamer, ohne den Tempo-Fader zu verstellen. Das Display in der Mitte zeigt Track-Position, BPM und Wellenform.',
      en: 'The large platter for scratching and pitch-bending. Touch and spin the top surface = Vinyl mode scratches the track directly. Spin the outer rim (without touching the surface) = Pitch Bend, nudges the track temporarily faster or slower without moving the tempo fader. The display in the centre shows track position, BPM, and waveform.',
    },
  },
  {
    name: { de: 'Vinyl-Taste', en: 'Vinyl Button' },
    zone: 'deckL',
    label: 'VINYL',
    desc: {
      de: 'Schaltet zwischen Vinyl-Modus (Oberseite scratcht) und CDJ-Modus (Oberseite bewegt nur die Track-Anzeige, kein Scratchen) um.',
      en: 'Switches between Vinyl mode (top surface scratches) and CDJ mode (top surface only moves the track display, no scratching).',
    },
  },
  {
    name: { de: 'Play/Pause', en: 'Play/Pause' },
    zone: 'deckL',
    label: 'PLAY / PAUSE',
    desc: {
      de: 'Startet bzw. pausiert die Wiedergabe des Decks. Blinkt am Trackende bei aktivem Loop.',
      en: 'Starts or pauses playback on the deck. Blinks at the end of the track when a loop is active.',
    },
  },
  {
    name: { de: 'Cue', en: 'Cue' },
    zone: 'deckL',
    label: 'CUE',
    desc: {
      de: 'Springt zum gesetzten Cue-Punkt zurück. Ohne gesetzten Punkt: setzt beim Pausieren automatisch einen temporären Cue-Punkt an der aktuellen Stelle. Gedrückt halten während der Wiedergabe = Stottereffekt, springt zurück zum Cue-Punkt solange die Taste gehalten wird.',
      en: 'Jumps back to the set cue point. Without a set point: automatically sets a temporary cue point at the current position when paused. Hold during playback = stutter effect, returns to the cue point as long as the button is held.',
    },
  },
  {
    name: { de: 'Beat Sync', en: 'Beat Sync' },
    zone: 'deckL',
    label: 'SYNC',
    desc: {
      de: 'Gleicht Tempo und Beat-Raster automatisch an das andere, bereits laufende Deck an. Einmal drücken tempo-syncen, längeres Verhalten je nach Einstellung auch Beatgrid-Sync.',
      en: 'Automatically aligns tempo and beat grid to the other, already playing deck. One press syncs tempo; depending on settings, it can also sync the beat grid.',
    },
  },
  {
    name: { de: 'Tempo-Fader', en: 'Tempo Fader' },
    zone: 'deckL',
    label: 'TEMPO',
    desc: {
      de: 'Regelt die Wiedergabegeschwindigkeit des Tracks. Bereich einstellbar (±6/10/16/100 %) über die Taste daneben. Mitte = Nullstellung, spürbarer Rasterpunkt bei 0.',
      en: 'Controls the playback speed of the track. Range adjustable (±6/10/16/100 %) via the button next to it. Centre = zero position, with a noticeable detent at 0.',
    },
    tip: {
      de: 'Nach oben (Richtung Gerät) langsamer, nach unten schneller – bei den meisten Pioneer-Geräten steht oben \'+\' (langsamer) und unten \'−\' (schneller). Kleiner Regelbereich (±6 %) erlaubt feineres Beatmatching, großer Bereich (±16 % oder mehr) für stärkere Tempo-Sprünge zwischen Genres, aber ungenauer bei kleinen Korrekturen.',
      en: 'Up (towards the device) = slower, down = faster — on most Pioneer devices \'+\' is at the top (slower) and \'−\' at the bottom (faster). A small range (±6 %) allows finer beatmatching; a large range (±16 % or more) is for bigger tempo jumps between genres, but less precise for small corrections.',
    },
  },
  {
    name: { de: 'Tempo-Range-Taste', en: 'Tempo Range Button' },
    zone: 'deckL',
    label: 'WIDE',
    desc: {
      de: 'Ändert den Regelbereich des Tempo-Faders, z.B. von ±6 % auf ±16 % für stärkere Tempoanpassungen.',
      en: 'Changes the range of the tempo fader, e.g. from ±6 % to ±16 % for larger tempo adjustments.',
    },
    tip: {
      de: 'Kleinerer Bereich wählen für präzises manuelles Beatmatching innerhalb eines Genres, größeren Bereich nur, wenn tatsächlich stark unterschiedliche BPM-Bereiche gemischt werden – sonst wird die Fader-Bewegung pro Prozentpunkt zu grob.',
      en: 'Choose a smaller range for precise manual beatmatching within a genre; use a larger range only when mixing across very different BPM zones — otherwise each fader movement covers too many BPM per mm.',
    },
  },
  {
    name: { de: 'Master Tempo', en: 'Master Tempo' },
    zone: 'deckL',
    label: 'MT / MASTER TEMPO',
    desc: {
      de: 'Hält die Tonhöhe (Pitch) konstant, auch wenn das Tempo verändert wird. Ohne diese Funktion wird ein schnellerer Track automatisch höher, ein langsamerer tiefer (wie bei echtem Vinyl).',
      en: 'Keeps the pitch constant even when the tempo is changed. Without this function, a faster track automatically plays higher in pitch and a slower one lower — just like real vinyl.',
    },
    tip: {
      de: 'Bei aktiviertem Master Tempo klingt ein stark hochgezogener Tempo-Fader ab einem gewissen Punkt leicht künstlich/verzerrt, da die Tonhöhenkorrektur digital gerechnet wird. Für harmonisches, natürliches Mixen meist eingeschaltet lassen, bei sehr großen Tempo-Sprüngen kann Ausschalten manchmal natürlicher klingen.',
      en: 'With Master Tempo active, a heavily shifted tempo fader can sound slightly artificial at extreme values because pitch correction is calculated digitally. Generally leave it on for harmonic, natural-sounding mixes; turning it off can occasionally sound more natural at very large tempo shifts.',
    },
  },
  {
    name: { de: 'Loop In / Loop Out', en: 'Loop In / Loop Out' },
    zone: 'deckL',
    label: 'IN / OUT',
    desc: {
      de: 'Setzt den Start- (IN) und Endpunkt (OUT) einer Wiederholungsschleife. Nach dem Setzen von OUT läuft der Bereich dazwischen endlos im Loop.',
      en: 'Sets the start (IN) and end point (OUT) of a repeat loop. After setting OUT, the section in between loops continuously.',
    },
  },
  {
    name: { de: 'Reloop/Exit', en: 'Reloop/Exit' },
    zone: 'deckL',
    label: 'RELOOP / EXIT',
    desc: {
      de: 'Verlässt einen aktiven Loop und kehrt zur normalen Wiedergabe zurück (EXIT) bzw. springt zurück zum zuletzt gesetzten Loop (RELOOP).',
      en: 'Exits an active loop and returns to normal playback (EXIT), or jumps back to the last set loop (RELOOP).',
    },
  },
  {
    name: { de: 'Auto Loop', en: 'Auto Loop' },
    zone: 'deckL',
    label: 'AUTO LOOP',
    desc: {
      de: 'Setzt automatisch einen Loop mit fester Länge (z.B. 4 Beats) ab der aktuellen Position, ohne dass IN/OUT manuell gesetzt werden müssen.',
      en: 'Automatically sets a loop of a fixed length (e.g. 4 beats) from the current position, without having to set IN/OUT manually.',
    },
  },
  {
    name: { de: 'Loop-Halbieren/Verdoppeln', en: 'Loop Halve/Double' },
    zone: 'deckL',
    label: '1/2X, 2X',
    desc: {
      de: 'Halbiert oder verdoppelt die Länge eines aktiven Loops in Echtzeit, z.B. von 4 auf 8 oder auf 2 Beats.',
      en: 'Halves or doubles the length of an active loop in real time, e.g. from 4 to 8 or down to 2 beats.',
    },
  },
  {
    name: { de: 'Performance-Pads', en: 'Performance Pads' },
    zone: 'deckL',
    label: 'PAD 1–8',
    desc: {
      de: 'Acht anschlagsempfindliche Pads pro Deck, deren Funktion vom gewählten Pad-Modus abhängt: Hot Cue, Pad FX, Beat Jump, Beat Loop, Keyboard, Key Shift, Sampler oder Beat Sync – je nach Modus lösen sie unterschiedliche Aktionen aus.',
      en: 'Eight velocity-sensitive pads per deck whose function depends on the selected pad mode: Hot Cue, Pad FX, Beat Jump, Beat Loop, Keyboard, Key Shift, Sampler, or Beat Sync — each mode triggers different actions.',
    },
  },
  {
    name: { de: 'Pad-Modus-Tasten', en: 'Pad Mode Buttons' },
    zone: 'deckL',
    label: 'HOT CUE, PAD FX, BEAT JUMP …',
    desc: {
      de: 'Wählen aus, welche Funktion die 8 Performance-Pads gerade ausführen. Hot Cue = Sprungmarken setzen/anspringen, Beat Jump = feste Beat-Anzahl vor/zurück springen, Pad FX = kurzzeitige Soundeffekte pro Pad, Sampler = kurze Samples abspielen.',
      en: 'Select which function the 8 performance pads currently perform. Hot Cue = set/trigger jump markers, Beat Jump = jump forward/backward a fixed number of beats, Pad FX = brief sound effects per pad, Sampler = play short samples.',
    },
  },
  {
    name: { de: 'Hot Cue', en: 'Hot Cue' },
    zone: 'deckL',
    desc: {
      de: 'Bis zu 8 (je nach Modus mehr über Bank-Wechsel) frei setzbare Sprungmarken im Track. Pad gedrückt halten zum Setzen, kurz drücken zum Anspringen, Shift+Pad zum Löschen. Bleiben beim Speichern im Track (rekordbox-Bibliothek oder USB) erhalten.',
      en: 'Up to 8 freely placeable jump markers in the track (more with bank switching in some modes). Hold pad to set, quick press to jump to it, Shift + Pad to delete. Saved with the track (rekordbox library or USB).',
    },
  },
  {
    name: { de: 'Beat Jump', en: 'Beat Jump' },
    zone: 'deckL',
    desc: {
      de: 'Springt eine feste, einstellbare Anzahl an Beats (z.B. 1, 2, 4, 8, 16, 32) vor oder zurück, ohne das Tempo zu beeinflussen. Nützlich für schnelles Navigieren im Beat-Raster.',
      en: 'Jumps a fixed, adjustable number of beats (e.g. 1, 2, 4, 8, 16, 32) forward or backward without affecting tempo. Useful for quickly navigating within the beat grid.',
    },
  },
  {
    name: { de: 'Keyboard-Modus', en: 'Keyboard Mode' },
    zone: 'deckL',
    desc: {
      de: 'Verwandelt die Pads in eine Mini-Tastatur, mit der der Track in Halbtonschritten transponiert und live \'gespielt\' werden kann.',
      en: 'Turns the pads into a mini keyboard with which the track can be transposed in semitone steps and played live.',
    },
  },
  {
    name: { de: 'Key Shift', en: 'Key Shift' },
    zone: 'deckL',
    desc: {
      de: 'Verschiebt die Tonart (Key) des Tracks in Halbtonschritten nach oben oder unten, unabhängig vom Tempo – nützlich für harmonisches Mixen.',
      en: 'Shifts the key of the track up or down in semitone steps, independently of tempo — useful for harmonic mixing.',
    },
  },
  {
    name: { de: 'Shift-Taste', en: 'Shift Button' },
    zone: 'deckL',
    label: 'SHIFT',
    desc: {
      de: 'Modifikator wie Shift auf einer Tastatur: in Kombination mit anderen Tasten werden Zusatzfunktionen aufgerufen, z.B. Shift+Cue = zurück zum Trackanfang, Shift+Hot-Cue-Pad = Hot Cue löschen.',
      en: 'Modifier like Shift on a keyboard: combined with other buttons it triggers secondary functions, e.g. Shift + Cue = back to track start, Shift + Hot Cue pad = delete hot cue.',
    },
  },
  {
    name: { de: 'Slip-Modus', en: 'Slip Mode' },
    zone: 'deckL',
    label: 'SLIP',
    desc: {
      de: 'Der Track läuft im Hintergrund unhörbar weiter, während Loops, Scratches oder Hot Cues ausgelöst werden. Nach der Aktion springt die Wiedergabe zur Stelle, an der sie ohne Eingriff wäre – für nahtlose Effekte, ohne den Beat zu verlieren.',
      en: 'The track continues running silently in the background while loops, scratches, or hot cues are triggered. After the action, playback jumps to the position it would have been at without the interruption — for seamless effects without losing the beat.',
    },
    tip: {
      de: 'Besonders nützlich in Kombination mit Loops: Loop aktivieren, kreativ mit Hot Cues spielen, und beim Verlassen des Loops (Reloop/Exit) läuft der Track exakt an der Stelle weiter, an der er ohne die Spielerei wäre – der Song bleibt im Grundtakt, das Publikum merkt vom internen Eingriff nichts.',
      en: 'Especially useful with loops: activate a loop, play creatively with hot cues, and when you exit the loop (Reloop/Exit) the track resumes exactly where it would have been without the loop — the song stays in time and the audience notices nothing.',
    },
  },
  {
    name: { de: 'Quantize', en: 'Quantize' },
    zone: 'deckL',
    label: 'QUANTIZE',
    desc: {
      de: 'Rastet gesetzte Hot Cues, Loops und Loop-Aktionen automatisch auf das nächste Beat-Raster ein, damit sie exakt im Takt liegen, auch bei ungenauem manuellem Antippen.',
      en: 'Automatically snaps set hot cues, loops, and loop actions to the nearest beat grid position, so they land exactly in time even with imprecise manual tapping.',
    },
    tip: {
      de: 'Für Anfänger fast immer aktiviert lassen, das erspart viel manuelles Nachjustieren. Voraussetzung ist ein korrektes Beatgrid in rekordbox – bei fehlerhaftem Grid rastet Quantize an der falschen Stelle ein, dann hilft nur die Korrektur des Beatgrids am Laptop, nicht das Ausschalten von Quantize.',
      en: 'For beginners, almost always leave it on — it saves a lot of manual adjustment. A correct beat grid in rekordbox is required: with a faulty grid, Quantize snaps to the wrong position and only fixing the beat grid on the laptop will help, not disabling Quantize.',
    },
  },
  {
    name: { de: 'Load / Track laden', en: 'Load / Load Track' },
    zone: 'deckL',
    label: 'LOAD',
    desc: {
      de: 'Lädt den im Browser markierten Track auf dieses Deck. Bei laufender Wiedergabe des Ziel-Decks meist Bestätigung nötig, um versehentliches Überschreiben zu vermeiden.',
      en: 'Loads the track highlighted in the browser onto this deck. If the target deck is already playing, a confirmation is usually required to prevent accidental overwriting.',
    },
  },
  {
    name: { de: 'Search (Deck-Vorlauf)', en: 'Search (Deck Fast-Forward)' },
    zone: 'deckL',
    label: 'SEARCH ◀▶',
    desc: {
      de: 'Spult schnell vor oder zurück durch den Track, gedrückt halten für kontinuierlichen Vorlauf.',
      en: 'Fast-forwards or rewinds through the track; hold for continuous fast-forward/rewind.',
    },
  },
  {
    name: { de: 'Sampler Volume', en: 'Sampler Volume' },
    zone: 'deckL',
    label: 'SAMPLER VOL',
    desc: {
      de: 'Separater Lautstärkeregler für den Sampler-Pad-Modus, unabhängig vom Channel-Fader – steuert nur die Lautstärke der abgespielten Samples, nicht den Track selbst.',
      en: 'Separate volume control for the sampler pad mode, independent of the channel fader — controls only the volume of played samples, not the track itself.',
    },
  },
  {
    name: { de: 'Needle Search (Touch-Wellenform)', en: 'Needle Search (Touch Waveform)' },
    zone: 'deckL',
    desc: {
      de: 'Antippen einer Stelle in der Wellenform-Übersicht auf dem Touchscreen springt direkt an diese Position im Track, ähnlich einer Vinyl-Nadel.',
      en: 'Tapping a position on the waveform overview on the touchscreen jumps directly to that position in the track, similar to dropping a vinyl needle.',
    },
  },
  {
    name: { de: 'Track-Vor-/Zurück', en: 'Track Previous/Next' },
    zone: 'deckL',
    label: 'TRACK ◀ ▶',
    desc: {
      de: 'Springt im Browser zum nächsten oder vorherigen Track der aktuellen Playlist oder des geöffneten Ordners. Die laufende Wiedergabe des Decks wird dabei nicht unterbrochen – der neue Track wird nur im Browser markiert und kann anschließend per LOAD-Taste auf das Deck geladen werden.',
      en: 'Jumps to the next or previous track in the current playlist or open folder in the browser. The deck\'s ongoing playback is not interrupted — the new track is only highlighted in the browser and can then be loaded with the LOAD button.',
    },
    tip: {
      de: 'Nützlich zum Vorbereiten des nächsten Tracks: während Deck A spielt, mit Track ◀/▶ am Deck B den gewünschten Nachfolger durchblättern, ohne zu hetzen.',
      en: 'Useful for preparing the next track: while Deck A plays, browse for the desired next track with Track ◀/▶ on Deck B without rushing.',
    },
  },
  {
    name: { de: 'Beat Loop (Pad-Modus)', en: 'Beat Loop (Pad Mode)' },
    zone: 'deckL',
    label: 'BEAT LOOP',
    desc: {
      de: 'Pad-Modus, in dem jedes der 8 Pads direkt eine bestimmte Loop-Länge auslöst (z.B. 1/2, 1, 2, 4, 8, 16, 32 Beats). Im Gegensatz zu Auto Loop startet der Loop sofort in der am Pad hinterlegten Länge, ein anderes Pad drücken wechselt die Loop-Länge in Echtzeit, ohne den Loop zu unterbrechen.',
      en: 'Pad mode where each of the 8 pads directly triggers a specific loop length (e.g. 1/2, 1, 2, 4, 8, 16, 32 beats). Unlike Auto Loop, the loop starts immediately at the length assigned to the pad; pressing another pad changes the loop length in real time without interrupting the loop.',
    },
    tip: {
      de: 'Unterschied zu Auto Loop: Beat Loop erlaubt das blitzschnelle Wechseln der Loop-Länge per Pad-Druck. Auto Loop hingegen setzt immer eine fest eingestellte Länge und lässt sich nur per 1/2X/2X-Taste anpassen.',
      en: 'Difference from Auto Loop: Beat Loop allows instant switching of loop length by pressing a pad. Auto Loop always sets a fixed preset length and can only be adjusted with the 1/2X/2X buttons.',
    },
  },
  {
    name: { de: 'Memory-Cue', en: 'Memory Cue' },
    zone: 'deckL',
    label: 'MEMORY',
    desc: {
      de: 'Speichert die aktuelle Position als dauerhaften Cue-Punkt auf dem USB-Stick oder in der rekordbox-Bibliothek. Beim nächsten Laden des Tracks springt Auto Cue automatisch auf den zuerst gesetzten Memory-Cue. Memory-Cues erscheinen als weiße Dreiecke in der Wellenform.',
      en: 'Saves the current position as a permanent cue point on the USB drive or in the rekordbox library. The next time the track is loaded, Auto Cue automatically jumps to the first-set memory cue. Memory cues appear as white triangles in the waveform.',
    },
    tip: {
      de: 'Memory-Cues ≠ Hot Cues: Memory-Cues sind persistent und dienen als Startpunkt-Markierung, Hot Cues sind die Live-Sprungmarken der Performance-Pads. Sinnvoll, um den Einstiegspunkt eines Tracks dauerhaft zu fixieren, z.B. wenn der Track eine lange Stille oder ein unnötiges Intro hat.',
      en: 'Memory cues ≠ Hot cues: memory cues are persistent and serve as start-point markers; hot cues are the live jump markers on the performance pads. Useful for permanently fixing a track\'s entry point, e.g. when the track has a long silence or an unnecessary intro.',
    },
  },

  {
    name: { de: 'Power-Schalter', en: 'Power Switch' },
    zone: 'mixer',
    label: 'STANDBY/ON',
    desc: {
      de: 'Schaltet das gesamte Gerät ein bzw. in den Standby-Modus. Vor dem Ausschalten sollten laufende Exportvorgänge oder Link-Verbindungen beendet sein.',
      en: 'Powers the entire device on or puts it into standby. Any ongoing export processes or link connections should be ended before switching off.',
    },
  },
  {
    name: { de: 'Preview (Touchscreen)', en: 'Preview (Touchscreen)' },
    zone: 'mixer',
    desc: {
      de: 'Ein im Browser markierter Track lässt sich über das Preview-Symbol auf dem Touchscreen vorab im Kopfhörer anhören, ohne ihn auf ein Deck zu laden und damit ohne ein laufendes Deck zu unterbrechen.',
      en: 'A track highlighted in the browser can be pre-listened to in the headphones via the preview symbol on the touchscreen, without loading it onto a deck and without interrupting a running deck.',
    },
  },
  {
    name: { de: 'Wellenform-Zoom (Touchscreen)', en: 'Waveform Zoom (Touchscreen)' },
    zone: 'mixer',
    desc: {
      de: 'Vergrößert oder verkleinert die Detailansicht der Wellenform auf dem Display, hilfreich um Cue-Punkte oder Loop-Grenzen präzise zu setzen.',
      en: 'Zooms in or out on the waveform detail view on the display — helpful for placing cue points or loop boundaries precisely.',
    },
  },
  {
    name: { de: 'Kanal-Trim/Gain', en: 'Channel Trim/Gain' },
    zone: 'mixer',
    label: 'TRIM',
    desc: {
      de: 'Passt den Eingangspegel eines Kanals an, bevor er auf EQ, Fader und die Summe geht. Grundlage für sauberes Gain-Staging: Trim so einstellen, dass die Pegelanzeige im grünen bis leicht gelben Bereich bleibt.',
      en: 'Adjusts the input level of a channel before it reaches the EQ, fader, and master sum. The foundation of clean gain staging: set trim so the level meter stays in the green to slightly yellow range.',
    },
    tip: {
      de: 'Rechtsdrehen erhöht den Pegel, Linksdrehen senkt ihn – ganz links ist stumm. Trim wird bei geladenem Track und Fader auf 0 dB eingestellt, bevor überhaupt eingeblendet wird, nicht während des Mixens nachgeregelt. Zu hoher Trim führt zu Verzerrung/Clipping (rote Anzeige), zu niedriger zu Rauschen, weil später am Master zu stark nachverstärkt werden muss. Zwei Tracks mit sehr unterschiedlicher Mastering-Lautheit brauchen unterschiedliche Trim-Werte, damit beide beim Überblenden gleich laut wirken.',
      en: 'Turn right to increase level, left to decrease — fully left is mute. Set trim with the track loaded and fader at 0 dB before blending in, not readjusted during the mix. Too-high trim causes distortion/clipping (red meter); too-low causes noise because the master has to compensate too much. Two tracks with very different mastering loudness need different trim values so both sound equally loud during the crossfade.',
    },
  },
  {
    name: { de: '3-Band-EQ', en: '3-Band EQ' },
    zone: 'mixer',
    label: 'HI / MID / LOW',
    desc: {
      de: 'Klangregelung pro Kanal für Höhen, Mitten und Bässe. Bei vollständigem Herunterdrehen (Kill) wird das jeweilige Frequenzband komplett stummgeschaltet – Standardtechnik beim Bass-Swap zwischen zwei Tracks.',
      en: 'Per-channel tone control for highs, mids, and lows. Turning a band fully down (Kill) mutes that frequency band completely — the standard technique in the bass swap between two tracks.',
    },
    tip: {
      de: 'Mittelstellung (12 Uhr) = neutral, keine Veränderung. Rechtsdrehen hebt das Band an, Linksdrehen senkt es ab, ganz links schneidet es komplett weg (Kill). Low regelt den Bassbereich (ca. unter 200 Hz), Mid die Mitten (Stimmen, Snares, viele Synths), Hi die Höhen (Hi-Hats, Cymbals, Luftigkeit). Faustregel: nie zwei Basslines gleichzeitig voll laufen lassen, das erzeugt Mulm im Mix.',
      en: 'Centre (12 o\'clock) = neutral, no change. Turning right boosts the band; turning left cuts it; fully left removes it completely (Kill). Low controls the bass range (roughly below 200 Hz), Mid controls midrange (voices, snares, many synths), Hi controls highs (hi-hats, cymbals, air). Rule of thumb: never run two basslines at full volume simultaneously — it creates mud in the mix.',
    },
  },
  {
    name: { de: 'Colour FX / Filter', en: 'Colour FX / Filter' },
    zone: 'mixer',
    label: 'COLOR',
    desc: {
      de: 'Ein Effektregler pro Kanal, meist als Filter (Low-Pass/High-Pass) belegt. Mittelstellung = kein Effekt, nach links = High-Pass (Bässe werden entfernt), nach rechts = Low-Pass (Höhen werden entfernt). Zusatztaste wählt oft zwischen mehreren Colour-FX-Typen.',
      en: 'One effect knob per channel, usually assigned to a filter (Low-Pass/High-Pass). Centre = no effect, left = High-Pass (bass removed), right = Low-Pass (highs removed). A secondary button often switches between several Colour FX types.',
    },
    tip: {
      de: 'Richtung merken: links = von unten wegfiltern (dünn, blechern, spannungsaufbauend), rechts = von oben wegfiltern (dumpf, gedämpft, unter Wasser). Klassischer Einsatz: Regler vor einem Break langsam nach links drehen, um Spannung aufzubauen, beim Drop zurück auf Mitte für vollen Klang.',
      en: 'Remember the direction: left = filter from below (thin, metallic, tension-building), right = filter from above (dull, muffled, underwater). Classic use: slowly turn left before a break to build tension, then return to centre at the drop for full sound.',
    },
  },
  {
    name: { de: 'Colour FX Typ-Taste', en: 'Colour FX Type Button' },
    zone: 'mixer',
    label: 'COLOR TYPE',
    desc: {
      de: 'Taste direkt neben oder unter dem Colour-FX-Regler, die zwischen den verfügbaren Colour-FX-Typen umschaltet (z.B. Filter, Jet, Pitch oder Dub Echo). Welcher Typ aktiv ist, zeigt eine LED-Anzeige daneben an.',
      en: 'Button directly beside or below the Colour FX knob that switches between the available Colour FX types (e.g. Filter, Jet, Pitch, or Dub Echo). An LED indicator shows which type is active.',
    },
    tip: {
      de: 'Filter ist der mit Abstand häufigste Typ im Club-Kontext und der Standardwert beim Einschalten. Die anderen Typen erzeugen stärker eingefärbte Effekte, die schnell dominant klingen – daher sparsam und situativ einsetzen.',
      en: 'Filter is by far the most common type in a club context and the default on power-up. The other types produce more heavily coloured effects that can easily dominate the sound — use sparingly and situationally.',
    },
  },
  {
    name: { de: 'Crossfader-Zuweisung (A / THRU / B)', en: 'Crossfader Assignment (A / THRU / B)' },
    zone: 'mixer',
    label: 'ASSIGN A / THRU / B',
    desc: {
      de: 'Dreistelliger Kippschalter oder Taste pro Kanal, der festlegt, ob der Kanal der linken Crossfader-Seite (A), der rechten Seite (B) zugeordnet oder vom Crossfader komplett ausgenommen ist (THRU). Bei THRU ist der Kanal immer hörbar, egal wo der Crossfader steht.',
      en: 'Three-position toggle switch or button per channel that determines whether the channel is assigned to the left crossfader side (A), the right side (B), or is completely excluded from the crossfader (THRU). With THRU, the channel is always audible regardless of crossfader position.',
    },
    tip: {
      de: 'Klassische Club-Konfiguration: Deck 1 → A, Deck 2 → B, Crossfader-Mitte = beide gleich laut. Für Scratching beide Decks auf A und B setzen, scharfe Crossfader-Kurve wählen. THRU eignet sich für Mikrofon oder einen dauerhaft laufenden Hintergrundkanal, der nie weggefadet werden soll.',
      en: 'Classic club configuration: Deck 1 → A, Deck 2 → B, crossfader centre = both equally loud. For scratching, assign both decks to A and B and choose a sharp crossfader curve. THRU is ideal for the microphone or a permanently running background channel that should never be faded out.',
    },
  },
  {
    name: { de: 'Kanal-Pegelanzeige', en: 'Channel Level Meter' },
    zone: 'mixer',
    label: 'LEVEL METER',
    desc: {
      de: 'LED- oder LCD-Balkenanzeige pro Kanal, die den Signalpegel nach EQ und vor dem Channel-Fader zeigt. Grüner Bereich = normal, gelb = laut aber noch OK, rot = Clipping/Verzerrung droht.',
      en: 'LED or LCD bar meter per channel showing the signal level after the EQ and before the channel fader. Green range = normal, yellow = loud but still OK, red = clipping/distortion imminent.',
    },
    tip: {
      de: 'Trim so einstellen, dass der Pegel während lauter Stellen gerade noch im gelben Bereich bleibt und nur sehr selten kurz ins Rote geht. Dauerhaft rote Anzeige bedeutet Clipping – das klingt verzerrt und kann Lautsprecher und Endstufen belasten.',
      en: 'Set trim so that the level only just reaches yellow during loud passages and only very rarely briefly hits red. A permanently red meter means clipping — it sounds distorted and can stress speakers and amplifiers.',
    },
  },
  {
    name: { de: 'Master-Pegelanzeige', en: 'Master Level Meter' },
    zone: 'mixer',
    label: 'MASTER METER',
    desc: {
      de: 'Zeigt den Pegel des summierten Master-Signals. Gibt Auskunft darüber, ob das Gesamtsignal sauber ist, bevor es zur PA geht. Ziel: im grünen bis leicht gelben Bereich, nicht dauerhaft rot.',
      en: 'Shows the level of the summed master signal. Indicates whether the overall signal is clean before it goes to the PA. Target: in the green to slightly yellow range, not permanently red.',
    },
    tip: {
      de: 'Die Master-Pegelanzeige reagiert auf das summierte Signal aller aktiven Kanäle. Auch wenn einzelne Trim-Regler niedrig sind, kann die Summe vieler gleichzeitig laufender Kanäle trotzdem hoch ausfallen. Im Zweifel Master-Level-Regler etwas zurücknehmen.',
      en: 'The master level meter responds to the summed signal from all active channels. Even if individual trims are low, the sum of many simultaneously active channels can still be high. When in doubt, lower the master level knob slightly.',
    },
  },
  {
    name: { de: 'Channel-Fader', en: 'Channel Fader' },
    zone: 'mixer',
    desc: {
      de: 'Regelt die Lautstärke des jeweiligen Kanals in der Summe. Fader-Kurve teils in den Utility-Einstellungen anpassbar.',
      en: 'Controls the volume of the respective channel in the master sum. Fader curve is partly adjustable in the Utility settings.',
    },
    tip: {
      de: 'Nach oben lauter, nach unten leiser, ganz unten stumm. Beim Einblenden eines neuen Tracks Fader langsam hochziehen, während der Crossfader (falls genutzt) bereits auf der Zielseite steht – vermeidet ruckartige Lautstärkesprünge.',
      en: 'Up = louder, down = quieter, fully down = mute. When blending in a new track, pull the fader up slowly while the crossfader (if used) is already at the target side — avoids abrupt volume jumps.',
    },
  },
  {
    name: { de: 'Cue-Taste (Kopfhörer)', en: 'Cue Button (Headphones)' },
    zone: 'mixer',
    label: 'HEADPHONES CUE',
    desc: {
      de: 'Schickt das Signal dieses Kanals auf den Kopfhörerausgang, unabhängig davon, ob der Kanal im Master hörbar ist. Mehrere Cue-Tasten gleichzeitig aktivierbar zum Vor-Abhören.',
      en: 'Sends this channel\'s signal to the headphone output, regardless of whether the channel is audible in the master. Multiple cue buttons can be activated simultaneously for pre-listening.',
    },
    tip: {
      de: 'Damit wird der nächste Track im Kopfhörer vorgehört und eingezählt, bevor er im Master hörbar ist.',
      en: 'Use this to pre-listen and count in the next track in your headphones before it becomes audible in the master.',
    },
  },
  {
    name: { de: 'Crossfader', en: 'Crossfader' },
    zone: 'mixer',
    desc: {
      de: 'Überblendet zwischen der linken und rechten Kanalzuordnung. Zuordnung (Assign) über Schalter A/THRU/B pro Kanal einstellbar; Kurvenverlauf (scharf/weich) in den Einstellungen wählbar.',
      en: 'Crossfades between the left and right channel assignments. Assignment (Assign) configurable per channel via A/THRU/B switches; curve shape (sharp/smooth) selectable in settings.',
    },
    tip: {
      de: 'Ganz links = nur Kanal A hörbar, ganz rechts = nur Kanal B, Mitte = beide gleich laut. THRU-Stellung eines Kanals umgeht den Crossfader komplett. Scharfe Kurve eignet sich für Scratch/Cut, weiche Kurve für sanfte Überblendungen.',
      en: 'Fully left = only channel A audible, fully right = only channel B, centre = both equally loud. THRU on a channel bypasses the crossfader completely. A sharp curve suits scratching/cutting; a smooth curve suits gentle crossfades.',
    },
  },
  {
    name: { de: 'Master-Level', en: 'Master Level' },
    zone: 'mixer',
    label: 'MASTER LEVEL',
    desc: {
      de: 'Regelt die Gesamtlautstärke des Summensignals, das an die Lautsprecher/PA geht.',
      en: 'Controls the overall volume of the summed signal sent to the speakers/PA.',
    },
    tip: {
      de: 'Rechtsdrehen lauter, Linksdrehen leiser. Master-Pegelanzeige im grünen Bereich halten, nur gelegentlich kurz ins Gelbe – dauerhaft rot bedeutet Clipping/Verzerrung.',
      en: 'Turn right for louder, left for quieter. Keep the master level meter in the green range, only occasionally briefly into yellow — permanently red means clipping/distortion.',
    },
  },
  {
    name: { de: 'Booth-Level', en: 'Booth Level' },
    zone: 'mixer',
    label: 'BOOTH',
    desc: {
      de: 'Separater Lautstärkeregler für den Booth-Ausgang (Monitor-Boxen des DJs), unabhängig vom Master-Pegel.',
      en: 'Separate volume control for the Booth output (DJ monitor speakers), independent of master level.',
    },
    tip: {
      de: 'Verändert nur die eigene Monitor-Lautstärke, nicht das, was das Publikum hört. Auf angenehme Arbeitslautstärke einstellen, nicht auf Maximum.',
      en: 'Only changes your own monitor volume, not what the audience hears. Set to a comfortable working level, not maximum.',
    },
  },
  {
    name: { de: 'Mic-Level & Mic-EQ', en: 'Mic Level & Mic EQ' },
    zone: 'mixer',
    label: 'MIC',
    desc: {
      de: 'Lautstärke- und Klangregelung für das angeschlossene Mikrofon. Bei Bedarf mit Talkover-Funktion kombinierbar, die andere Kanäle beim Sprechen automatisch absenkt.',
      en: 'Volume and tone control for the connected microphone. Can be combined with the Talkover function, which automatically lowers other channels while speaking.',
    },
    tip: {
      de: 'Mic-Level auf 0 lassen, wenn kein Mikrofon angeschlossen ist, sonst Rauschen/Rückkopplungsgefahr.',
      en: 'Leave mic level at 0 when no microphone is connected, otherwise you risk hiss or feedback.',
    },
  },
  {
    name: { de: 'Kopfhörer Mixing/Level', en: 'Headphones Mixing/Level' },
    zone: 'mixer',
    label: 'HP MIXING / LEVEL',
    desc: {
      de: 'MIXING-Regler blendet zwischen Cue-Signal (Kopfhörer-Kanäle) und Master-Signal im Kopfhörer. LEVEL-Regler bestimmt die Gesamtlautstärke im Kopfhörer.',
      en: 'The MIXING knob blends between the Cue signal (headphone channels) and the Master signal in the headphones. The LEVEL knob sets the overall headphone volume.',
    },
    tip: {
      de: 'MIXING ganz auf CUE-Seite = nur die per Cue-Taste gewählten Kanäle hörbar, ganz auf MASTER-Seite = nur das, was auch die Lautsprecher spielen.',
      en: 'MIXING fully to CUE side = only the channels selected via cue buttons are audible; fully to MASTER side = only what the speakers are playing.',
    },
  },
  {
    name: { de: 'Beat FX Sektion', en: 'Beat FX Section' },
    zone: 'mixer',
    label: 'BEAT FX',
    desc: {
      de: 'Digitale Effekteinheit (z.B. Echo, Delay, Reverb, Flanger, Filter). BPM wird automatisch vom Deck übernommen oder manuell per TAP eingegeben. Kanal-Wähler bestimmt, worauf der Effekt wirkt, ON/OFF aktiviert ihn, LEVEL/DEPTH regelt die Intensität.',
      en: 'Digital effects unit (e.g. Echo, Delay, Reverb, Flanger, Filter). BPM is taken automatically from the deck or entered manually via TAP. The channel selector determines what the effect is applied to; ON/OFF activates it; LEVEL/DEPTH controls intensity.',
    },
    tip: {
      de: 'LEVEL/DEPTH bestimmt die Stärke des Effekts. Falsche BPM-Basis lässt den Effekt aus dem Takt laufen – im Zweifel BPM manuell per TAP-Taste antippen.',
      en: 'LEVEL/DEPTH determines the strength of the effect. An incorrect BPM base will make the effect run out of time — when in doubt, tap the BPM manually with the TAP button.',
    },
  },
  {
    name: { de: 'Beat FX Typ-Wähler', en: 'Beat FX Type Selector' },
    zone: 'mixer',
    label: 'BEAT FX TYPE',
    desc: {
      de: 'Drehregler oder Liste zum Auswählen des gewünschten Beat-Effekt-Typs: Echo, Delay, Reverb, Flanger, Phaser, Filter, Roll, Spiral, Helix, Reverb, Crush, Noise, Vinyl Brake u.a. je nach Firmware-Version. Der gewählte Typ bestimmt, welchen klanglichen Charakter der Effekt hat.',
      en: 'Rotary knob or list for selecting the desired Beat FX type: Echo, Delay, Reverb, Flanger, Phaser, Filter, Roll, Spiral, Helix, Crush, Noise, Vinyl Brake, and others depending on firmware version. The selected type determines the sonic character of the effect.',
    },
    tip: {
      de: 'Echo und Reverb sind die häufigsten Live-Einsätze im Club: Echo für einen ausklinkenden Nachhall am Trackende, Reverb für ein räumliches Auflösen eines Breaks. Roll (Stutter-Effekt) und Flanger klingen schnell aggressiv – sparsam einsetzen.',
      en: 'Echo and Reverb are the most common live uses in a club: Echo for a fading tail at the end of a track, Reverb for a spatial dissolution of a break. Roll (stutter effect) and Flanger sound aggressive quickly — use sparingly.',
    },
  },
  {
    name: { de: 'Beat FX Level/Depth', en: 'Beat FX Level/Depth' },
    zone: 'mixer',
    label: 'LEVEL / DEPTH',
    desc: {
      de: 'Regler für die Intensität des aktiven Beat-FX-Effekts. Links = minimaler Effektanteil (fast trocken), rechts = maximaler Effektanteil (stark bearbeitet). Steht dieser Regler auf null, ist der Effekt auch bei aktiviertem ON/OFF nicht hörbar.',
      en: 'Knob for the intensity of the active Beat FX effect. Left = minimal effect (almost dry), right = maximum effect (heavily processed). If this knob is at zero, the effect is not audible even when ON/OFF is activated.',
    },
    tip: {
      de: 'Für subtile Übergänge Depth moderat einstellen (ca. 9–11 Uhr), nicht auf Anschlag drehen – sonst klingt der Effekt schnell übertrieben und ablenkend.',
      en: 'For subtle transitions, set depth moderately (around 9–11 o\'clock) — do not turn to maximum, otherwise the effect quickly sounds exaggerated and distracting.',
    },
  },
  {
    name: { de: 'Master Cue', en: 'Master Cue' },
    zone: 'mixer',
    label: 'MASTER CUE',
    desc: {
      de: 'Schickt zusätzlich das Master-Summensignal auf den Kopfhörer. Nützlich um zu prüfen, wie der Mix gerade für das Publikum klingt, ohne eine extra Cue-Taste pro Kanal aktivieren zu müssen.',
      en: 'Also sends the master sum signal to the headphones. Useful for checking how the mix currently sounds for the audience without having to activate a separate cue button per channel.',
    },
    tip: {
      de: 'Wird Master Cue zusammen mit einer Kanal-Cue-Taste aktiviert, hört man im Kopfhörer den Mix beider Signale. Mixing-Regler bestimmt die Balance. Nützlich kurz vor einem Drop, um den Mix final zu checken, bevor der Kanal hochgezogen wird.',
      en: 'When Master Cue is activated together with a channel cue button, you hear the blend of both signals in the headphones. The mixing knob sets the balance. Useful just before a drop to do a final check of the mix before pulling up the channel.',
    },
  },
  {
    name: { de: 'Beat FX Channel Select', en: 'Beat FX Channel Select' },
    zone: 'mixer',
    desc: {
      de: 'Legt fest, auf welchen Kanal (Deck 1, Deck 2, Mic oder Master) der Beat-FX-Effekt angewendet wird.',
      en: 'Determines which channel (Deck 1, Deck 2, Mic, or Master) the Beat FX effect is applied to.',
    },
    tip: {
      de: 'Master auswählen, wenn der Effekt auf die gesamte Summe wirken soll.',
      en: 'Select Master when you want the effect to be applied to the entire sum.',
    },
  },
  {
    name: { de: 'Beat FX ON/OFF', en: 'Beat FX ON/OFF' },
    zone: 'mixer',
    desc: {
      de: 'Schaltet den ausgewählten Beat-FX-Effekt scharf. Kann auch kurz angetippt für Effekt-Schübe im Takt genutzt werden.',
      en: 'Activates the selected Beat FX effect. Can also be tapped briefly for rhythmic effect bursts in time.',
    },
    tip: {
      de: 'Meist gezielt im Takt an- und ausgeschaltet, z.B. für einen Echo-Ausklang am Trackende.',
      en: 'Usually switched on and off deliberately in time, e.g. for an echo tail at the end of a track.',
    },
  },
  {
    name: { de: 'Beat FX Time (TAP)', en: 'Beat FX Time (TAP)' },
    zone: 'mixer',
    label: 'TAP',
    desc: {
      de: 'Legt die Zeitbasis des Effekts in Bruchteilen des Takts fest (1/4, 1/2, 1, 2, 4 Beats). Bei falscher automatischer BPM-Erkennung lässt sich hier im Songtempo mitgetippt werden, um die Zeitbasis manuell zu korrigieren.',
      en: 'Sets the time base of the effect in fractions of a bar (1/4, 1/2, 1, 2, 4 beats). If the automatic BPM detection is wrong, tap here at the song tempo to manually correct the time base.',
    },
  },
  {
    name: { de: 'Talk Over', en: 'Talk Over' },
    zone: 'mixer',
    label: 'TALK OVER',
    desc: {
      de: 'Senkt automatisch die Lautstärke der Musikkanäle ab, sobald über das Mikrofon gesprochen wird, damit Ansagen klar hörbar bleiben, ohne die Musik manuell herunterregeln zu müssen.',
      en: 'Automatically lowers the volume of the music channels as soon as the microphone is spoken into, so announcements remain clearly audible without having to manually lower the music.',
    },
  },
  {
    name: { de: 'Master-Display (Touchscreen)', en: 'Master Display (Touchscreen)' },
    zone: 'mixer',
    desc: {
      de: 'Der zentrale Farbbildschirm zeigt Wellenformen, Browser, Track-Infos, BPM/Key und dient zur Touch-Steuerung von Browsing und Wiedergabe direkt am Gerät, unabhängig vom Laptop.',
      en: 'The central colour display shows waveforms, browser, track info, BPM/key, and is used for touch control of browsing and playback directly on the device, independently of the laptop.',
    },
  },
  {
    name: { de: 'Utility-Menü: Auto Cue', en: 'Utility Menu: Auto Cue' },
    zone: 'mixer',
    label: 'UTILITY → AUTO CUE',
    desc: {
      de: 'Legt fest, ob beim Laden eines Tracks automatisch ein Cue-Punkt an der ersten hörbaren Stelle (nach der Stille) gesetzt wird.',
      en: 'Determines whether a cue point is automatically set at the first audible moment (after silence) when a track is loaded.',
    },
    tip: {
      de: 'Für den Einstieg aktiviert lassen: Play drücken startet dann exakt am Trackbeginn ohne Stille davor, ohne dass man selbst suchen muss.',
      en: 'Leave enabled when starting out: pressing Play will then start exactly at the beginning of the track without any preceding silence, without having to search manually.',
    },
  },
  {
    name: { de: 'Utility-Menü: Fader Start', en: 'Utility Menu: Fader Start' },
    zone: 'mixer',
    label: 'UTILITY → FADER START',
    desc: {
      de: 'Startet die Wiedergabe automatisch, sobald der Channel-Fader oder Crossfader aus der untersten Position hochgezogen wird, ohne extra Play zu drücken.',
      en: 'Starts playback automatically as soon as the channel fader or crossfader is pulled up from the bottom position, without pressing Play separately.',
    },
  },
  {
    name: { de: 'Utility-Menü: Hot Cue Auto Load', en: 'Utility Menu: Hot Cue Auto Load' },
    zone: 'mixer',
    label: 'UTILITY → HOT CUE AUTO LOAD',
    desc: {
      de: 'Bestimmt, ob beim erneuten Laden eines Tracks die zuvor gesetzten Hot Cues automatisch wieder aktiv sind oder neu gesetzt werden müssen.',
      en: 'Determines whether previously set hot cues are automatically reloaded when a track is loaded again, or whether they need to be set anew.',
    },
  },
  {
    name: { de: 'Utility-Menü: Wellenform-Farbe', en: 'Utility Menu: Waveform Colour' },
    zone: 'mixer',
    label: 'UTILITY → WAVEFORM COLOR',
    desc: {
      de: 'Ändert die Farbdarstellung der Wellenform im Display (z.B. nach Frequenz eingefärbt oder einfarbig) – reine Ansichtssache, keine Funktionsänderung.',
      en: 'Changes the colour display of the waveform (e.g. frequency-coloured or single-colour) — purely a visual preference, no functional change.',
    },
  },
  {
    name: { de: 'Utility-Menü: Zeitanzeige', en: 'Utility Menu: Time Display' },
    zone: 'mixer',
    label: 'UTILITY → TIME MODE',
    desc: {
      de: 'Schaltet die Zeitanzeige zwischen verstrichener Spielzeit und verbleibender Restzeit um, hilfreich um das Trackende im Blick zu behalten.',
      en: 'Switches the time display between elapsed play time and remaining time — helpful for keeping an eye on the end of the track.',
    },
  },
  {
    name: { de: 'Utility-Menü: Jog-Helligkeit/Display-Helligkeit', en: 'Utility Menu: Jog/Display Brightness' },
    zone: 'mixer',
    label: 'UTILITY → BRIGHTNESS',
    desc: {
      de: 'Passt die Helligkeit von Jogwheel-Beleuchtung und Display an die Umgebungslichtverhältnisse an, z.B. dunkler im Club, heller am helleren Arbeitsplatz.',
      en: 'Adjusts the brightness of the jogwheel lighting and display to ambient light conditions, e.g. dimmer in a dark club, brighter in a brighter workspace.',
    },
  },
  {
    name: { de: 'Utility-Menü: Sprache', en: 'Utility Menu: Language' },
    zone: 'mixer',
    label: 'UTILITY → LANGUAGE',
    desc: {
      de: 'Stellt die Menüsprache des Geräts um, unabhängig von der Sprache der rekordbox-Software am Laptop.',
      en: 'Changes the device\'s menu language, independently of the language of the rekordbox software on the laptop.',
    },
  },
  {
    name: { de: 'Utility-Menü: Netzwerk/Link-Einstellungen', en: 'Utility Menu: Network/Link Settings' },
    zone: 'mixer',
    label: 'UTILITY → NETWORK',
    desc: {
      de: 'Konfiguriert LAN/WLAN für Link Export sowie Link-Verbindungen zu weiteren Pioneer-Geräten im selben Netzwerk.',
      en: 'Configures LAN/Wi-Fi for Link Export as well as link connections to other Pioneer devices on the same network.',
    },
  },
  {
    name: { de: 'Master Out (XLR/Cinch)', en: 'Master Out (XLR/RCA)' },
    zone: 'mixer',
    label: 'MASTER OUT',
    desc: {
      de: 'Rückseitiger Ausgang zur PA, meist doppelt vorhanden als symmetrischer XLR- und unsymmetrischer Cinch/RCA-Ausgang. XLR für längere Kabelwege und weniger Störgeräusche, Cinch für den Anschluss an einfachere Heim-/Hifi-Verstärker.',
      en: 'Rear output to the PA, usually available both as a balanced XLR and an unbalanced RCA output. XLR for longer cable runs and less interference; RCA for connecting to simpler home/hi-fi amplifiers.',
    },
  },
  {
    name: { de: 'Booth Out (Cinch)', en: 'Booth Out (RCA)' },
    zone: 'mixer',
    label: 'BOOTH OUT',
    desc: {
      de: 'Separater Cinch-Ausgang für Monitor-Lautsprecher im DJ-Bereich, unabhängig vom Master-Signal regelbar über den Booth-Level-Regler.',
      en: 'Separate RCA output for monitor speakers in the DJ booth, independently controllable via the Booth Level knob.',
    },
  },
  {
    name: { de: 'Mic-Eingang (XLR/Klinke-Combo)', en: 'Mic Input (XLR/Jack Combo)' },
    zone: 'mixer',
    label: 'MIC INPUT',
    desc: {
      de: 'Kombinierter Eingang für XLR- oder 6,3-mm-Klinkenstecker-Mikrofone auf der Rückseite bzw. Vorderseite je nach Ausführung.',
      en: 'Combined input for XLR or 6.3 mm jack microphones, located on the rear or front panel depending on the model.',
    },
  },
  {
    name: { de: 'Kopfhörerausgänge (6,3 mm & 3,5 mm)', en: 'Headphone Outputs (6.3 mm & 3.5 mm)' },
    zone: 'mixer',
    label: 'HEADPHONES',
    desc: {
      de: 'Zwei Kopfhörerbuchsen in unterschiedlicher Größe, gleichzeitig nutzbar, z.B. für zwei DJs gleichzeitig beim Übergabe-Set.',
      en: 'Two headphone sockets of different sizes, usable simultaneously, e.g. for two DJs during a back-to-back set.',
    },
  },
  {
    name: { de: 'USB-B-Anschluss (Audio-Interface)', en: 'USB-B Port (Audio Interface)' },
    zone: 'mixer',
    label: 'USB-B',
    desc: {
      de: 'Verbindet das Gerät als externe Soundkarte mit einem Laptop, z.B. um Software wie Serato oder eine DAW über den XDJ-RX3-Mixer laufen zu lassen, unabhängig vom rekordbox-Export/Link-Betrieb.',
      en: 'Connects the device as an external sound card to a laptop, e.g. to run software like Serato or a DAW through the XDJ-RX3\'s mixer, independently of rekordbox export/link operation.',
    },
  },
  {
    name: { de: 'Kensington-Sicherheitsschloss', en: 'Kensington Security Lock' },
    zone: 'mixer',
    label: 'KENSINGTON LOCK',
    desc: {
      de: 'Mechanische Diebstahlsicherung an der Rückseite, um das Gerät z.B. im Club oder auf Veranstaltungen an einem festen Punkt zu verankern.',
      en: 'Mechanical anti-theft lock on the rear panel for anchoring the device to a fixed point, e.g. in a club or at events.',
    },
  },

  {
    name: { de: 'USB-Anschlüsse', en: 'USB Ports' },
    zone: 'browser',
    label: 'USB 1 / USB 2',
    desc: {
      de: 'Zwei USB-Ports zum Anschließen von USB-Sticks/Festplatten mit exportierter rekordbox-Bibliothek, oder für Link Export direkt von rekordbox. Beide Slots gleichzeitig nutzbar, z.B. für Back-to-Back-Sets.',
      en: 'Two USB ports for connecting USB drives with an exported rekordbox library, or for Link Export directly from rekordbox. Both slots usable simultaneously, e.g. for back-to-back sets.',
    },
  },
  {
    name: { de: 'Link Export / LAN-Anschluss', en: 'Link Export / LAN Port' },
    zone: 'browser',
    label: 'LINK',
    desc: {
      de: 'Verbindet das XDJ-RX3 per Netzwerkkabel oder WLAN direkt mit dem rekordbox-Laptop. Dabei wird kein USB-Export benötigt – die Bibliothek wird live vom Rechner gestreamt, solange rekordbox läuft.',
      en: 'Connects the XDJ-RX3 via network cable or Wi-Fi directly to the rekordbox laptop. No USB export is needed — the library is streamed live from the computer as long as rekordbox is running.',
    },
  },
  {
    name: { de: 'Dreh-/Drück-Regler', en: 'Rotary Selector' },
    zone: 'browser',
    label: 'ROTARY SELECTOR',
    desc: {
      de: 'Navigiert durch Ordner, Playlists und Tracks im Browser. Drehen = auswählen, Drücken = bestätigen/öffnen bzw. laden, je nach Kontext.',
      en: 'Navigates through folders, playlists, and tracks in the browser. Rotate = select, press = confirm/open or load, depending on context.',
    },
  },
  {
    name: { de: 'Back-Taste', en: 'Back Button' },
    zone: 'browser',
    label: 'BACK',
    desc: {
      de: 'Springt in der Browser-Ordnerstruktur eine Ebene zurück.',
      en: 'Goes back one level in the browser folder structure.',
    },
  },
  {
    name: { de: 'Tag-Taste', en: 'Tag Button' },
    zone: 'browser',
    label: 'TAG',
    desc: {
      de: 'Markiert einen Track im Browser als \'getaggt\', um daraus schnell eine temporäre Playlist für das aktuelle Set zusammenzustellen, ohne die Bibliothek dauerhaft zu verändern.',
      en: 'Marks a track in the browser as \'tagged\' to quickly assemble a temporary playlist for the current set without permanently altering the library.',
    },
  },
  {
    name: { de: 'Search (Browser-Suche)', en: 'Search (Browser)' },
    zone: 'browser',
    label: 'SEARCH',
    desc: {
      de: 'Öffnet eine Texteingabe zum direkten Suchen nach Titel, Künstler oder Album innerhalb der geladenen Bibliothek.',
      en: 'Opens a text input for directly searching by title, artist, or album within the loaded library.',
    },
  },
  {
    name: { de: 'Sort-Taste', en: 'Sort Button' },
    zone: 'browser',
    label: 'SORT',
    desc: {
      de: 'Ändert die Sortierreihenfolge der Trackliste, z.B. nach Titel, BPM, Künstler oder Hinzufügedatum.',
      en: 'Changes the sort order of the track list, e.g. by title, BPM, artist, or date added.',
    },
  },
];

const flx4_raw: Control[] = [
  {
    name: { de: 'Jogwheel', en: 'Jogwheel' },
    zone: 'deckL',
    desc: {
      de: 'Kleineres, nicht motorisiertes Jogwheel ohne eigenes Display. Scratchen und Pitch Bend funktionieren gleich wie beim XDJ-RX3, aber ohne Wellenform-Anzeige direkt am Jog.',
      en: 'Smaller, non-motorised jogwheel without its own display. Scratching and pitch bend work the same as on the XDJ-RX3, but without a waveform display on the jog itself.',
    },
  },
  {
    name: { de: 'Play/Pause', en: 'Play/Pause' },
    zone: 'deckL',
    label: 'PLAY / PAUSE',
    desc: {
      de: 'Startet bzw. pausiert die Wiedergabe, gleiche Funktion wie beim XDJ-RX3.',
      en: 'Starts or pauses playback — same function as on the XDJ-RX3.',
    },
  },
  {
    name: { de: 'Cue', en: 'Cue' },
    zone: 'deckL',
    label: 'CUE',
    desc: {
      de: 'Springt zum gesetzten Cue-Punkt zurück bzw. setzt beim Pausieren automatisch einen temporären Cue-Punkt, gleiche Logik wie beim XDJ-RX3.',
      en: 'Jumps back to the set cue point or automatically sets a temporary cue point when paused — same logic as the XDJ-RX3.',
    },
  },
  {
    name: { de: 'Beat Sync', en: 'Beat Sync' },
    zone: 'deckL',
    label: 'SYNC',
    desc: {
      de: 'Gleicht Tempo und Beatgrid automatisch an das andere Deck an, gleiche Funktion wie beim XDJ-RX3.',
      en: 'Automatically aligns tempo and beat grid to the other deck — same function as the XDJ-RX3.',
    },
  },
  {
    name: { de: 'Shift-Taste', en: 'Shift Button' },
    zone: 'deckL',
    label: 'SHIFT',
    desc: {
      de: 'Modifikator-Taste: in Kombination mit anderen Tasten werden Zusatzfunktionen aufgerufen, z.B. Shift+Cue springt zum Trackanfang, Shift+Hot-Cue-Pad löscht die Marke.',
      en: 'Modifier button: combined with other buttons triggers secondary functions, e.g. Shift + Cue jumps to the track start, Shift + Hot Cue pad deletes the marker.',
    },
  },
  {
    name: { de: 'Performance-Pads', en: 'Performance Pads' },
    zone: 'deckL',
    label: 'PAD 1–8',
    desc: {
      de: '8 Pads mit Hot Cue, Beat Jump, Pad FX und Sampler-Modus, gleiche Logik wie beim XDJ-RX3.',
      en: '8 pads with Hot Cue, Beat Jump, Pad FX, and Sampler modes — same logic as the XDJ-RX3.',
    },
  },
  {
    name: { de: 'Pad-Modus-Tasten', en: 'Pad Mode Buttons' },
    zone: 'deckL',
    label: 'HOT CUE, BEAT JUMP, PAD FX, SAMPLER',
    desc: {
      de: 'Wählen die Funktion der 8 Pads, identische Modi wie beim XDJ-RX3, gesteuert über die rekordbox- oder Serato-Software im Hintergrund.',
      en: 'Select the function of the 8 pads — identical modes to the XDJ-RX3, controlled via rekordbox or Serato software in the background.',
    },
  },
  {
    name: { de: 'Tempo-Fader', en: 'Tempo Fader' },
    zone: 'deckL',
    desc: {
      de: 'Gleiche Bedienung wie beim XDJ-RX3, meist mit festem ±10 %-Bereich statt umschaltbarer Range.',
      en: 'Same operation as the XDJ-RX3, usually with a fixed ±10 % range instead of a switchable range.',
    },
  },
  {
    name: { de: 'Loop-Tasten (Auto Loop, In/Out, Reloop/Exit)', en: 'Loop Buttons (Auto Loop, In/Out, Reloop/Exit)' },
    zone: 'deckL',
    desc: {
      de: 'Auto Loop und manuelle Loop-Funktionen wie beim XDJ-RX3, über dedizierte Tasten gesteuert.',
      en: 'Auto Loop and manual loop functions as on the XDJ-RX3, controlled via dedicated buttons.',
    },
  },
  {
    name: { de: 'Quantize', en: 'Quantize' },
    zone: 'deckL',
    label: 'QUANTIZE',
    desc: {
      de: 'Rastet Hot Cues und Loops aufs Beat-Raster ein, gleiche Funktion und gleiche Abhängigkeit von einem korrekten Beatgrid wie beim XDJ-RX3.',
      en: 'Snaps hot cues and loops to the beat grid — same function and same dependence on a correct beat grid as the XDJ-RX3.',
    },
  },
  {
    name: { de: 'Slip-Modus', en: 'Slip Mode' },
    zone: 'deckL',
    label: 'SLIP',
    desc: {
      de: 'Wie beim XDJ-RX3: Track läuft im Hintergrund weiter, während Loops, Scratches oder Hot Cues aktiv sind. Am FLX4 über SHIFT + eine Deck-Taste erreichbar, keine dedizierte SLIP-Taste wie beim XDJ-RX3.',
      en: 'Same as the XDJ-RX3: the track continues running in the background while loops, scratches, or hot cues are active. On the FLX4, accessed via SHIFT + a deck button — there is no dedicated SLIP button as on the XDJ-RX3.',
    },
    tip: {
      de: 'Da kein eigener SLIP-Button vorhanden ist, die SHIFT-Kombination vorher üben, damit sie im Set sitzt. Funktion und Nutzen identisch zum XDJ-RX3.',
      en: 'Since there is no dedicated SLIP button, practise the SHIFT combination beforehand so it is second nature during a set. Function and benefit are identical to the XDJ-RX3.',
    },
  },
  {
    name: { de: 'Beat Loop (Pad-Modus)', en: 'Beat Loop (Pad Mode)' },
    zone: 'deckL',
    label: 'BEAT LOOP',
    desc: {
      de: 'Pad-Modus zum direkten Auslösen von Loops definierter Länge per Pad, gleiche Logik wie beim XDJ-RX3.',
      en: 'Pad mode for directly triggering loops of a defined length via pad — same logic as the XDJ-RX3.',
    },
  },
  {
    name: { de: 'Kein eigenständiger Betrieb', en: 'Not Standalone' },
    zone: 'deckL',
    desc: {
      de: 'Anders als der XDJ-RX3 kann das FLX4 keinen USB-Stick direkt einlesen und abspielen. Es ist ein reiner Controller: ohne angeschlossenen und laufenden Laptop mit rekordbox oder Serato passiert gar nichts.',
      en: 'Unlike the XDJ-RX3, the FLX4 cannot read and play directly from a USB drive. It is a pure controller: without a connected, running laptop with rekordbox or Serato, nothing happens at all.',
    },
  },
  {
    name: { de: 'Trim/Gain', en: 'Trim/Gain' },
    zone: 'mixer',
    label: 'GAIN',
    desc: {
      de: 'Regelt den Eingangspegel pro Kanal, gleiche Funktion und gleiches Gain-Staging-Prinzip wie beim XDJ-RX3.',
      en: 'Controls the input level per channel — same function and same gain staging principle as the XDJ-RX3.',
    },
  },
  {
    name: { de: '3-Band-EQ', en: '3-Band EQ' },
    zone: 'mixer',
    label: 'HI / MID / LOW',
    desc: {
      de: 'Klangregelung pro Kanal, gleiche Funktion wie beim XDJ-RX3, inklusive Kill-Funktion bei Vollausschlag nach links.',
      en: 'Per-channel tone control — same function as the XDJ-RX3, including kill function at full left.',
    },
  },
  {
    name: { de: 'Filter', en: 'Filter' },
    zone: 'mixer',
    label: 'FILTER',
    desc: {
      de: 'Ein Filterregler pro Kanal für Low-Pass/High-Pass, gleiche Richtungslogik wie der Colour-FX-Regler des XDJ-RX3: links = High-Pass, rechts = Low-Pass.',
      en: 'One filter knob per channel for low-pass/high-pass — same direction logic as the Colour FX knob on the XDJ-RX3: left = high-pass, right = low-pass.',
    },
  },
  {
    name: { de: 'Crossfader-Zuweisung (A / THRU / B)', en: 'Crossfader Assignment (A / THRU / B)' },
    zone: 'mixer',
    label: 'ASSIGN A / THRU / B',
    desc: {
      de: 'Schalter pro Kanal zum Zuweisen an die linke (A) oder rechte (B) Crossfader-Seite, oder THRU, um den Kanal vom Crossfader komplett auszunehmen. Beim FLX4 oft als Software-Einstellung in rekordbox oder Serato statt als Hardware-Kippschalter ausgeführt.',
      en: 'Switch per channel to assign to the left (A) or right (B) crossfader side, or THRU to exclude the channel from the crossfader entirely. On the FLX4, often implemented as a software setting in rekordbox or Serato rather than a hardware toggle switch.',
    },
    tip: {
      de: 'Gleiche Logik wie beim XDJ-RX3. Im Controller-Modus prüfen, ob die Zuweisung in der Software statt am Gerät selbst geändert wird.',
      en: 'Same logic as the XDJ-RX3. In controller mode, check whether the assignment is changed in software rather than on the device itself.',
    },
  },
  {
    name: { de: 'Kanal-Pegelanzeige', en: 'Channel Level Meter' },
    zone: 'mixer',
    label: 'LEVEL METER',
    desc: {
      de: 'LED-Anzeige pro Kanal zur Kontrolle des Eingangspegels nach EQ und vor dem Fader. Grün = OK, Gelb = laut, Rot = Clipping droht.',
      en: 'LED meter per channel for checking the input level after the EQ and before the fader. Green = OK, yellow = loud, red = clipping imminent.',
    },
    tip: {
      de: 'Trim so einstellen, dass die Anzeige selten rot wird. Dauerhaft rotes Leuchten bedeutet Verzerrung.',
      en: 'Set trim so the meter rarely hits red. Permanently red means distortion.',
    },
  },
  {
    name: { de: 'Smart CFX', en: 'Smart CFX' },
    zone: 'mixer',
    label: 'SMART CFX',
    desc: {
      de: 'Ein kombinierter Effektregler, der mehrere Effekte gleichzeitig steuert (z.B. Filter, Echo, Noise in einer Bewegung) – eine vereinfachte Variante gegenüber der getrennten Beat-FX/Colour-FX-Sektion des XDJ-RX3, für schnelle, unkomplizierte Effekteinsätze gedacht.',
      en: 'A combined effect knob that controls multiple effects simultaneously (e.g. Filter, Echo, Noise in one movement) — a simplified alternative to the separate Beat FX/Colour FX section of the XDJ-RX3, designed for quick, uncomplicated effect use.',
    },
  },
  {
    name: { de: 'Channel-Fader', en: 'Channel Fader' },
    zone: 'mixer',
    desc: {
      de: 'Gleiche Bedienung wie beim XDJ-RX3, Kurve meist nur eingeschränkt in der Software einstellbar statt am Gerät selbst.',
      en: 'Same operation as the XDJ-RX3 — curve usually only adjustable to a limited extent in software rather than on the device itself.',
    },
  },
  {
    name: { de: 'Crossfader', en: 'Crossfader' },
    zone: 'mixer',
    desc: {
      de: 'Gleiche Funktion wie beim XDJ-RX3, Kurve über die Software statt Hardware-Schalter einstellbar.',
      en: 'Same function as the XDJ-RX3 — curve adjustable via software rather than a hardware switch.',
    },
  },
  {
    name: { de: 'Cue-Tasten (Kopfhörer)', en: 'Cue Buttons (Headphones)' },
    zone: 'mixer',
    desc: {
      de: 'Schicken das jeweilige Kanalsignal auf den Kopfhörerausgang zum Vorhören, gleiche Funktion wie beim XDJ-RX3.',
      en: 'Send the respective channel signal to the headphone output for pre-listening — same function as the XDJ-RX3.',
    },
  },
  {
    name: { de: 'Kopfhörer Mixing/Level', en: 'Headphones Mixing/Level' },
    zone: 'mixer',
    label: 'HEADPHONES MIXING/LEVEL',
    desc: {
      de: 'MIXING blendet zwischen Cue- und Master-Signal im Kopfhörer, LEVEL regelt die Kopfhörer-Gesamtlautstärke, gleiche Funktion wie beim XDJ-RX3.',
      en: 'MIXING blends between Cue and Master signal in the headphones; LEVEL controls overall headphone volume — same function as the XDJ-RX3.',
    },
  },
  {
    name: { de: 'Master-Level', en: 'Master Level' },
    zone: 'mixer',
    label: 'MASTER LEVEL',
    desc: {
      de: 'Regelt die Gesamtlautstärke am Master-Ausgang, gleiche Funktion wie beim XDJ-RX3. Kein separater Booth-Ausgang wie bei den größeren All-in-one-Geräten.',
      en: 'Controls the overall volume at the master output — same function as the XDJ-RX3. No separate Booth output as on the larger all-in-one devices.',
    },
  },
  {
    name: { de: 'Software-Wahlschalter', en: 'Software Switch' },
    zone: 'mixer',
    label: 'REKORDBOX / SERATO',
    desc: {
      de: 'Schaltet um, mit welcher Software (rekordbox oder Serato DJ Lite/Pro) das Gerät gerade angesteuert wird.',
      en: 'Switches which software (rekordbox or Serato DJ Lite/Pro) the device is currently controlled by.',
    },
  },
  {
    name: { de: 'Power-Schalter', en: 'Power Switch' },
    zone: 'mixer',
    label: 'STANDBY/ON',
    desc: {
      de: 'Schaltet das Gerät ein bzw. aus. Da das FLX4 seine Stromversorgung meist über das USB-Kabel vom Laptop bezieht, ist kein separates Netzteil nötig.',
      en: 'Turns the device on or off. Since the FLX4 usually draws power via the USB cable from the laptop, no separate power supply is needed.',
    },
  },
  {
    name: { de: 'Browse-Regler', en: 'Browse Knob' },
    zone: 'browser',
    label: 'BROWSE',
    desc: {
      de: 'Dreh-/Drück-Regler zur Navigation durch die rekordbox- oder Serato-Bibliothek am Laptop-Bildschirm, da kein eigenes Gerätedisplay vorhanden ist.',
      en: 'Rotary/push knob for navigating the rekordbox or Serato library on the laptop screen, since the device has no display of its own.',
    },
  },
  {
    name: { de: 'Load-Tasten', en: 'Load Buttons' },
    zone: 'browser',
    label: 'LOAD',
    desc: {
      de: 'Laden den im Laptop-Browser markierten Track auf das jeweilige Deck, gleiche Funktion wie die Load-Taste beim XDJ-RX3.',
      en: 'Load the track highlighted in the laptop browser onto the respective deck — same function as the Load button on the XDJ-RX3.',
    },
  },
  {
    name: { de: 'Back-Taste', en: 'Back Button' },
    zone: 'browser',
    label: 'BACK',
    desc: {
      de: 'Springt in der Ordnerstruktur der Software eine Ebene zurück.',
      en: 'Goes back one level in the software folder structure.',
    },
  },
  {
    name: { de: 'Kein Browser-Display', en: 'No Browser Display' },
    zone: 'browser',
    desc: {
      de: 'Es gibt keinen Touchscreen und keinen Dreh-/Drück-Regler mit eigenem Bildschirm. Gebrowst wird ausschließlich am Laptop-Bildschirm in rekordbox oder Serato, das Gerät selbst dient nur zur Steuerung von Wiedergabe und Effekten.',
      en: 'There is no touchscreen and no rotary selector with its own display. Browsing is done exclusively on the laptop screen in rekordbox or Serato — the device itself only controls playback and effects.',
    },
  },
  {
    name: { de: 'USB-B-Anschluss zum Laptop', en: 'USB-B Port to Laptop' },
    zone: 'browser',
    label: 'USB',
    desc: {
      de: 'Ein einzelnes USB-Kabel verbindet das FLX4 mit dem Laptop, überträgt sowohl Steuerbefehle als auch Audio (eingebaute Soundkarte) und meist auch die Stromversorgung. Kein separater USB-Stick-Slot für Musik wie beim XDJ-RX3.',
      en: 'A single USB cable connects the FLX4 to the laptop, transmitting both control commands and audio (built-in sound card) and usually power as well. No separate USB slot for music drives as on the XDJ-RX3.',
    },
  },
  {
    name: { de: 'Kopfhörerausgang', en: 'Headphone Output' },
    zone: 'browser',
    label: 'HEADPHONES',
    desc: {
      de: 'Eine Kopfhörerbuchse an der Vorderseite, meist mit 3,5-mm- und 6,3-mm-Option je nach Adapter.',
      en: 'One headphone socket on the front panel, usually with 3.5 mm and 6.3 mm options depending on the adapter.',
    },
  },
  {
    name: { de: 'Master Out (Cinch)', en: 'Master Out (RCA)' },
    zone: 'browser',
    label: 'MASTER OUT',
    desc: {
      de: 'Unsymmetrischer Cinch/RCA-Ausgang zur Anlage auf der Rückseite. Kein zusätzlicher XLR-Ausgang wie beim XDJ-RX3, entsprechend eher für Heimsetup als für große PA-Systeme gedacht.',
      en: 'Unbalanced RCA output to the amplifier on the rear panel. No additional XLR output as on the XDJ-RX3 — more suited to home setups than large PA systems.',
    },
  },
];

export const devices: Record<DeviceId, Device> = {
  rx3: { label: 'XDJ-RX3', full: 'Pioneer XDJ-RX3', note: null, controls: mirrorDeck(rx3_raw) },
  flx4: {
    label: 'DDJ-FLX4',
    full: 'Pioneer DDJ-FLX4',
    note: {
      de: 'Reiner USB-Controller, kein Standalone-Gerät: läuft nur mit angeschlossenem, laufendem Laptop (rekordbox oder Serato). Kein Touchscreen, kein eigener USB-Musik-Slot, dafür günstiger Einstieg mit vereinfachter Smart-CFX-Effektsektion statt getrennter Beat-FX/Colour-FX-Regler.',
      en: 'Pure USB controller, not standalone: only works with a connected, running laptop (rekordbox or Serato). No touchscreen, no dedicated USB music slot — but a more affordable entry point with a simplified Smart CFX effects section instead of separate Beat FX/Colour FX knobs.',
    },
    controls: mirrorDeck(flx4_raw),
  },
};