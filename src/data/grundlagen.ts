import { GrundlagenSection } from './types';

export const grundlagenSections: GrundlagenSection[] = [
  {
    id: 'signalweg',
    cat: 'Gain-Staging',
    tags: ['gain', 'pegel', 'signalweg', 'trim'],
    title: 'Signalweg: vom Track bis zum Lautsprecher',
    keywords: 'signalweg gain staging pegel reihenfolge',
    body: [
      {
        type: 'signalFlow',
        steps: ['Track', 'Trim/Gain', 'EQ (Hi/Mid/Low)', 'Colour FX/Filter', 'Channel-Fader', 'Crossfader', 'Master-Level', 'PA/Lautsprecher'],
      },
      {
        type: 'paragraph',
        text: 'Jede Stufe wirkt auf das, was aus der vorherigen Stufe herauskommt. Ein zu hoher Trim-Wert treibt bereits das EQ-Signal in die Übersteuerung, egal wie vorsichtig danach Fader und Master eingestellt werden. Gain-Staging wird deshalb immer von vorne nach hinten gemacht: erst Trim korrekt setzen, dann erst mit EQ, Fader und Master arbeiten.',
      },
    ],
  },
  {
    id: 'trim',
    cat: 'Gain-Staging',
    tags: ['gain', 'pegel', 'clipping', 'trim', 'übersteuerung'],
    title: 'Trim/Gain richtig einstellen',
    keywords: 'trim gain pegel clipping übersteuerung',
    body: [
      {
        type: 'paragraph',
        text: 'Track laden, Fader auf 0 dB (meist die Mittel- bis Oberstellung mit spürbarem Raster), dann Trim so weit aufdrehen, bis die Kanal-Pegelanzeige bei den lautesten Stellen des Tracks überwiegend grün mit gelegentlichem kurzen Gelb ausschlägt. Dauerhaft rot bedeutet Clipping. Das wird einmal pro Track gemacht, nicht während des laufenden Mixens ständig nachgeregelt.',
      },
      {
        type: 'warn',
        text: 'Zwei Tracks aus unterschiedlichen Quellen (z.B. sehr laut gemastertes Release neben einer leiseren Eigenproduktion) haben oft unterschiedliche Trim-Werte – das ist normal und kein Fehler.',
      },
    ],
  },
  {
    id: 'masterbooth',
    cat: 'Lautstärke',
    tags: ['lautstärke', 'pegel', 'master', 'booth'],
    title: 'Master- vs. Booth-Level: was hört wer',
    keywords: 'master booth level lautstärke pa monitor',
    body: [
      {
        type: 'paragraph',
        text: 'Master-Level steuert, was aus der PA kommt und damit was das Publikum hört. Booth-Level steuert ausschließlich die eigenen Monitor-Boxen im DJ-Bereich. Beide sind komplett unabhängig voneinander. In der Praxis: Master so einstellen, dass die Anlage im grünen Bereich sauber läuft, Booth danach unabhängig auf angenehme eigene Arbeitslautstärke.',
      },
    ],
  },
  {
    id: 'headphones',
    cat: 'Lautstärke',
    tags: ['kopfhörer', 'cue', 'lautstärke'],
    title: 'Kopfhörer: Cue-Tasten und Mixing-Regler zusammen nutzen',
    keywords: 'kopfhörer cue mixing headphone vorhören',
    body: [
      {
        type: 'paragraph',
        text: 'Um einen neuen Track vorzuhören und einzutakten, ohne dass das Publikum es hört: Cue-Taste des Ziel-Kanals aktivieren, dann mit dem Mixing-Regler zwischen dem, was gerade im Master läuft, und dem vorgehörten Cue-Signal überblenden. So lässt sich der neue Track im Kopfhörer exakt auf den laufenden Beat einzählen, bevor er über den Channel-Fader oder Crossfader überhaupt hörbar in den Master eingeblendet wird.',
      },
    ],
  },
  {
    id: 'diagnose',
    cat: 'Fehlerdiagnose',
    tags: ['verzerrt', 'clipping', 'bass', 'phase', 'eq', 'kopfhörer', 'pegel'],
    title: 'Woran man erkennt, dass etwas falsch eingestellt ist',
    keywords: 'fehler diagnose verzerrt leise bass matsch',
    body: [
      {
        type: 'paragraph',
        text: 'Verzerrter, kratziger Klang bei lauten Passagen: meist Trim zu hoch, seltener Master zu hoch. Auffällig leiser Track im Vergleich zum vorherigen bei gleicher Fader-Stellung: Trim zu niedrig. Bass-Matsch beim Übergang zwischen zwei Tracks: beide Low-EQs gleichzeitig offen, siehe Bass-Swap-Technik. Kopfhörer zu leise trotz aufgedrehtem Level: Mixing-Regler steht zu weit auf der falschen Seite (Cue statt Master oder umgekehrt).',
      },
    ],
  },
  {
    id: 'boxen',
    cat: 'Setup & Raum',
    tags: ['lautsprecher', 'aufstellung', 'stereo', 'raum'],
    title: 'Lautsprecher aufstellen und ausrichten',
    keywords: 'lautsprecher boxen monitor aufstellung ausrichtung stereo dreieck',
    body: [
      {
        type: 'paragraph',
        text: 'Stereo-Dreieck als Grundregel: Abstand zwischen den beiden Boxen sollte etwa dem Abstand jeder Box zum Hörplatz entsprechen. Hochtöner auf Ohrhöhe ausrichten, bei stehender Nutzung am Pult (Booth-Monitore) entsprechend höher kippen oder auf Ständer stellen, bei sitzender Nutzung tiefer.',
      },
      {
        type: 'paragraph',
        text: 'Mindestens 20–30 cm Abstand zur Rückwand halten. Nahe an der Wand verstärken sich tiefe Frequenzen deutlich (Bassdruck steigt), was schnell dröhnig statt druckvoll klingt. In Ecken verstärkt sich der Effekt noch weiter – Boxen in Raumecken klingen fast immer bassbetont und unpräzise.',
      },
      {
        type: 'paragraph',
        text: 'Symmetrie zum Raum beachten: Beide Boxen im gleichen Abstand zu den Seitenwänden aufstellen, sonst verschiebt sich das Stereobild und eine Seite klingt basslastiger als die andere.',
      },
    ],
  },
  {
    id: 'sub',
    cat: 'Setup & Raum',
    tags: ['bass', 'sub', 'subwoofer', 'raummoden', 'phase', 'crossover', 'eq'],
    title: 'Subwoofer aufstellen und einpegeln',
    keywords: 'subwoofer sub bass aufstellung raummoden standwellen crossover trennfrequenz',
    body: [
      {
        type: 'paragraph',
        text: 'Sub möglichst nicht direkt in eine Ecke stellen, auch wenn das den Bass subjektiv lauter macht: Ecken verstärken einzelne Frequenzen ungleichmäßig (Raummoden/Standwellen) und machen den Bass dröhnig statt kontrolliert. Für sauberen, tighten Bass – wichtig gerade bei Techno/Hypnotic mit durchgehender Kick-Bassline – lieber einen Meter von der Wand weg testen und die Position leicht verschieben, bis der Bass gleichmäßig klingt, ohne dass einzelne Töne stark hervortreten oder wegfallen.',
      },
      {
        type: 'paragraph',
        text: 'Praktischer Test: mit einem bekannten Referenztrack (mit durchgehender Basslinie) langsam im Raum herumgehen. Stellen, an denen der Bass fast verschwindet, sind Auslöschungen durch Raummoden – dort steht auch der Sub selbst ungünstig. Zwei kleinere Subs an unterschiedlichen Positionen gleichen Raummoden oft besser aus als ein einzelner großer Sub.',
      },
      {
        type: 'paragraph',
        text: 'Trennfrequenz (Crossover) zwischen Sub und Mains meist zwischen 80–120 Hz, abhängig von der Tieftongrenze der Hauptlautsprecher: je kleiner die Mains, desto höher die Trennfrequenz ansetzen, damit keine Lücke im Übergangsbereich entsteht.',
      },
      {
        type: 'paragraph',
        text: 'Pegel-Abgleich: Sub so einpegeln, dass er den Bassbereich stützt, ohne die Mains zu übertönen – im Zweifel eher etwas leiser als zu laut einstellen und mit mehreren Referenztracks aus dem eigenen Genre prüfen, nicht nur mit einem Track.',
      },
      {
        type: 'warn',
        text: 'Bei Heimsetup/Streaming-Platz: Sub auf dem Boden statt auf dem Tisch platzieren, direkter Bodenkontakt (ggf. mit Entkoppler/Pads) verhindert dröhnende Resonanzen über die Tischplatte.',
      },
    ],
  },
  {
    id: 'raumakustik',
    cat: 'Setup & Raum',
    tags: ['raum', 'akustik', 'reflexion', 'lautsprecher'],
    title: 'Raumakustik-Basics',
    keywords: 'raumakustik reflexionen absorption flatterecho',
    body: [
      {
        type: 'paragraph',
        text: 'Frühe Reflexionen von glatten, parallelen Wänden erzeugen einen unpräzisen, verwaschenen Klang. Teppich statt Fliesen/Laminat und Vorhänge oder Akustikpaneele an den Seitenwänden auf Ohrhöhe reduzieren das deutlich, ohne dass es viel kosten muss.',
      },
      {
        type: 'paragraph',
        text: 'Parallele kahle Wände ohne jede Absorption erzeugen oft ein hörbares Flatterecho (kurzes, metallisches Nachklingen bei Klatschen). Schon ein Teppich, ein Sofa oder Regale mit unregelmäßiger Oberfläche an einer der beiden parallelen Flächen helfen.',
      },
    ],
  },
  {
    id: 'camelot',
    cat: 'Harmonisches Mixen',
    tags: ['tonart', 'key', 'harmonisch', 'camelot'],
    title: 'Harmonisches Mixen mit dem Camelot Wheel',
    keywords: 'camelot wheel key harmonic mixing tonart harmonisch mixen',
    body: [
      {
        type: 'paragraph',
        text: 'Das Camelot Wheel ordnet alle 24 Tonarten (12 Dur/major als B, 12 Moll/minor als A) so an, dass benachbarte Zahlen harmonisch gut zusammenpassen. Je näher zwei Tracks auf dem Wheel beieinander liegen, desto reibungsloser klingt der Übergang, wenn beide gleichzeitig hörbar sind.',
      },
      { type: 'camelotWheel' },
      {
        type: 'paragraph',
        text: '<b>Regeln, an denen man sich orientiert:</b>',
      },
      {
        type: 'paragraph',
        text: '1. Gleiche Zahl, gleicher Buchstabe (z.B. 8A → 8A): identische Tonart, funktioniert immer.',
      },
      {
        type: 'paragraph',
        text: '2. Gleiche Zahl, anderer Buchstabe (z.B. 8A → 8B): relative Dur/Moll-Tonart, sehr harmonisch, leicht anderer Charakter (Moll wirkt dunkler, Dur heller).',
      },
      {
        type: 'paragraph',
        text: '3. Zahl ±1, gleicher Buchstabe (z.B. 8A → 9A oder 8A → 7A): benachbarte Tonart auf dem Wheel, funktioniert fast immer gut, minimal andere Farbe.',
      },
      {
        type: 'paragraph',
        text: '4. Zahl +2, gleicher Buchstabe (z.B. 8A → 10A): Energie-Boost-Technik, hörbar spannungsreicher, gezielt für einen Energieanstieg im Set einsetzbar, nicht wahllos.',
      },
      {
        type: 'paragraph',
        text: '5. Alles andere (z.B. 8A → 3B): dissonant, klingt beim Überlagern schräg. Kein Problem, wenn nacheinander ohne Überlappung gemixt wird, aber riskant bei langem Blend mit beiden Tracks gleichzeitig hörbar.',
      },
      {
        type: 'warn',
        text: 'rekordbox zeigt die erkannte Tonart in Camelot-Notation direkt in der Trackliste an (Spalte "Key"). Automatische Erkennung ist nicht immer perfekt, bei wichtigen Übergängen lieber per Ohr gegenchecken statt blind der Anzeige zu vertrauen.',
      },
    ],
  },
];
