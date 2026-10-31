import { GrundlagenSection } from './types';

export const grundlagenSections: GrundlagenSection[] = [
  {
    id: 'signalweg',
    cat: 'gainStaging',
    tags: ['gain', 'pegel', 'signalweg', 'trim'],
    title: {
      de: 'Signalweg: vom Track bis zum Lautsprecher',
      en: 'Signal path: from track to speaker',
    },
    keywords: 'signalweg gain staging pegel reihenfolge signal path level order',
    body: [
      {
        type: 'signalFlow',
        steps: [
          { de: 'Track', en: 'Track' },
          { de: 'Trim/Gain', en: 'Trim/Gain' },
          { de: 'EQ (Hi/Mid/Low)', en: 'EQ (Hi/Mid/Low)' },
          { de: 'Colour FX/Filter', en: 'Colour FX/Filter' },
          { de: 'Channel-Fader', en: 'Channel Fader' },
          { de: 'Crossfader', en: 'Crossfader' },
          { de: 'Master-Level', en: 'Master Level' },
          { de: 'PA/Lautsprecher', en: 'PA/Speaker' },
        ],
      },
      {
        type: 'paragraph',
        text: {
          de: 'Jede Stufe wirkt auf das, was aus der vorherigen Stufe herauskommt. Ein zu hoher Trim-Wert treibt bereits das EQ-Signal in die Übersteuerung, egal wie vorsichtig danach Fader und Master eingestellt werden. Gain-Staging wird deshalb immer von vorne nach hinten gemacht: erst Trim korrekt setzen, dann erst mit EQ, Fader und Master arbeiten.',
          en: 'Each stage processes the output of the previous one. A trim that is too high will push the EQ signal into distortion regardless of how carefully the fader and master are set afterwards. Gain staging is therefore always done front to back: set trim correctly first, then work with EQ, fader, and master.',
        },
      },
    ],
  },
  {
    id: 'trim',
    cat: 'gainStaging',
    tags: ['gain', 'pegel', 'clipping', 'trim', 'übersteuerung'],
    title: {
      de: 'Trim/Gain richtig einstellen',
      en: 'Setting Trim/Gain correctly',
    },
    keywords: 'trim gain pegel clipping übersteuerung trim gain level clipping distortion',
    body: [
      {
        type: 'paragraph',
        text: {
          de: 'Track laden, Fader auf 0 dB (meist die Mittel- bis Oberstellung mit spürbarem Raster), dann Trim so weit aufdrehen, bis die Kanal-Pegelanzeige bei den lautesten Stellen des Tracks überwiegend grün mit gelegentlichem kurzen Gelb ausschlägt. Dauerhaft rot bedeutet Clipping. Das wird einmal pro Track gemacht, nicht während des laufenden Mixens ständig nachgeregelt.',
          en: 'Load the track and set the fader to 0 dB (usually the middle-to-upper position with a noticeable detent), then turn up trim until the channel level meter peaks predominantly green with occasional brief yellow at the loudest parts of the track. Permanently red means clipping. Do this once per track — do not constantly readjust during a live mix.',
        },
      },
      {
        type: 'warn',
        text: {
          de: 'Zwei Tracks aus unterschiedlichen Quellen (z.B. sehr laut gemastertes Release neben einer leiseren Eigenproduktion) haben oft unterschiedliche Trim-Werte – das ist normal und kein Fehler.',
          en: 'Two tracks from different sources (e.g. a very loudly mastered release alongside a quieter self-produced track) often need different trim values — this is normal and not an error.',
        },
      },
    ],
  },
  {
    id: 'masterbooth',
    cat: 'lautstaerke',
    tags: ['lautstärke', 'pegel', 'master', 'booth'],
    title: {
      de: 'Master- vs. Booth-Level: was hört wer',
      en: 'Master vs. Booth Level: who hears what',
    },
    keywords: 'master booth level lautstärke pa monitor volume pa monitor',
    body: [
      {
        type: 'paragraph',
        text: {
          de: 'Master-Level steuert, was aus der PA kommt und damit was das Publikum hört. Booth-Level steuert ausschließlich die eigenen Monitor-Boxen im DJ-Bereich. Beide sind komplett unabhängig voneinander. In der Praxis: Master so einstellen, dass die Anlage im grünen Bereich sauber läuft, Booth danach unabhängig auf angenehme eigene Arbeitslautstärke.',
          en: 'Master Level controls what comes out of the PA and what the audience hears. Booth Level controls only your own monitor speakers in the DJ booth. Both are completely independent. In practice: set master so the system runs cleanly in the green zone, then set booth independently to a comfortable working level for yourself.',
        },
      },
    ],
  },
  {
    id: 'headphones',
    cat: 'lautstaerke',
    tags: ['kopfhörer', 'cue', 'lautstärke'],
    title: {
      de: 'Kopfhörer: Cue-Tasten und Mixing-Regler zusammen nutzen',
      en: 'Headphones: using cue buttons and mixing knob together',
    },
    keywords: 'kopfhörer cue mixing headphone vorhören headphone cue monitoring mixing',
    body: [
      {
        type: 'paragraph',
        text: {
          de: 'Um einen neuen Track vorzuhören und einzutakten, ohne dass das Publikum es hört: Cue-Taste des Ziel-Kanals aktivieren, dann mit dem Mixing-Regler zwischen dem, was gerade im Master läuft, und dem vorgehörten Cue-Signal überblenden. So lässt sich der neue Track im Kopfhörer exakt auf den laufenden Beat einzählen, bevor er über den Channel-Fader oder Crossfader überhaupt hörbar in den Master eingeblendet wird.',
          en: 'To pre-listen and count in a new track without the audience hearing it: activate the cue button on the target channel, then use the mixing knob to blend between what is currently playing in the master and the cued signal. This lets you count the new track in precisely in your headphones before it is audibly faded into the master via the channel fader or crossfader.',
        },
      },
    ],
  },
  {
    id: 'diagnose',
    cat: 'fehlerdiagnose',
    tags: ['verzerrt', 'clipping', 'bass', 'phase', 'eq', 'kopfhörer', 'pegel'],
    title: {
      de: 'Woran man erkennt, dass etwas falsch eingestellt ist',
      en: 'How to recognise a wrong setting',
    },
    keywords: 'fehler diagnose verzerrt leise bass matsch distortion quiet bass muddy',
    body: [
      {
        type: 'paragraph',
        text: {
          de: 'Verzerrter, kratziger Klang bei lauten Passagen: meist Trim zu hoch, seltener Master zu hoch. Auffällig leiser Track im Vergleich zum vorherigen bei gleicher Fader-Stellung: Trim zu niedrig. Bass-Matsch beim Übergang zwischen zwei Tracks: beide Low-EQs gleichzeitig offen, siehe Bass-Swap-Technik. Kopfhörer zu leise trotz aufgedrehtem Level: Mixing-Regler steht zu weit auf der falschen Seite (Cue statt Master oder umgekehrt).',
          en: 'Distorted, scratchy sound on loud passages: usually trim too high, occasionally master too high. Track noticeably quieter than the previous one at the same fader position: trim too low. Bass mud during a transition: both Low EQs open simultaneously — see bass swap technique. Headphones too quiet despite turned-up level: mixing knob is too far towards the wrong side (Cue instead of Master or vice versa).',
        },
      },
    ],
  },
  {
    id: 'boxen',
    cat: 'setupRaum',
    tags: ['lautsprecher', 'aufstellung', 'stereo', 'raum'],
    title: {
      de: 'Lautsprecher aufstellen und ausrichten',
      en: 'Positioning and aiming speakers',
    },
    keywords: 'lautsprecher boxen monitor aufstellung ausrichtung stereo dreieck speaker monitor placement alignment stereo triangle',
    body: [
      {
        type: 'paragraph',
        text: {
          de: 'Stereo-Dreieck als Grundregel: Abstand zwischen den beiden Boxen sollte etwa dem Abstand jeder Box zum Hörplatz entsprechen. Hochtöner auf Ohrhöhe ausrichten, bei stehender Nutzung am Pult (Booth-Monitore) entsprechend höher kippen oder auf Ständer stellen, bei sitzender Nutzung tiefer.',
          en: 'The stereo triangle as a basic rule: the distance between the two speakers should roughly equal the distance from each speaker to the listening position. Aim the tweeter at ear height — for standing use at the mixer (booth monitors) tilt upwards or use stands; for seated use, tilt down.',
        },
      },
      {
        type: 'paragraph',
        text: {
          de: 'Mindestens 20–30 cm Abstand zur Rückwand halten. Nahe an der Wand verstärken sich tiefe Frequenzen deutlich (Bassdruck steigt), was schnell dröhnig statt druckvoll klingt. In Ecken verstärkt sich der Effekt noch weiter – Boxen in Raumecken klingen fast immer bassbetont und unpräzise.',
          en: 'Keep at least 20–30 cm away from the back wall. Being close to a wall significantly boosts low frequencies (bass pressure increases), which quickly sounds boomy rather than punchy. The effect is even stronger in corners — speakers in room corners almost always sound bass-heavy and imprecise.',
        },
      },
      {
        type: 'paragraph',
        text: {
          de: 'Symmetrie zum Raum beachten: Beide Boxen im gleichen Abstand zu den Seitenwänden aufstellen, sonst verschiebt sich das Stereobild und eine Seite klingt basslastiger als die andere.',
          en: 'Observe room symmetry: place both speakers at the same distance from the side walls, otherwise the stereo image shifts and one side sounds more bass-heavy than the other.',
        },
      },
    ],
  },
  {
    id: 'sub',
    cat: 'setupRaum',
    tags: ['bass', 'sub', 'subwoofer', 'raummoden', 'phase', 'crossover', 'eq'],
    title: {
      de: 'Subwoofer aufstellen und einpegeln',
      en: 'Positioning and levelling a subwoofer',
    },
    keywords: 'subwoofer sub bass aufstellung raummoden standwellen crossover trennfrequenz subwoofer sub bass placement room modes standing waves crossover frequency',
    body: [
      {
        type: 'paragraph',
        text: {
          de: 'Sub möglichst nicht direkt in eine Ecke stellen, auch wenn das den Bass subjektiv lauter macht: Ecken verstärken einzelne Frequenzen ungleichmäßig (Raummoden/Standwellen) und machen den Bass dröhnig statt kontrolliert. Für sauberen, tighten Bass – wichtig gerade bei Techno/Hypnotic mit durchgehender Kick-Bassline – lieber einen Meter von der Wand weg testen und die Position leicht verschieben, bis der Bass gleichmäßig klingt, ohne dass einzelne Töne stark hervortreten oder wegfallen.',
          en: 'Avoid placing the sub directly in a corner, even if it subjectively makes the bass louder: corners boost certain frequencies unevenly (room modes/standing waves) and make the bass boomy rather than controlled. For clean, tight bass — especially important with Techno/Hypnotic and its continuous kick-bassline — test the sub a metre from the wall and shift it slightly until the bass sounds even, without individual notes jumping out or disappearing.',
        },
      },
      {
        type: 'paragraph',
        text: {
          de: 'Praktischer Test: mit einem bekannten Referenztrack (mit durchgehender Basslinie) langsam im Raum herumgehen. Stellen, an denen der Bass fast verschwindet, sind Auslöschungen durch Raummoden – dort steht auch der Sub selbst ungünstig. Zwei kleinere Subs an unterschiedlichen Positionen gleichen Raummoden oft besser aus als ein einzelner großer Sub.',
          en: 'Practical test: walk slowly around the room with a familiar reference track (with a continuous bassline). Spots where the bass almost disappears are cancellations caused by room modes — placing the sub there is also a bad position. Two smaller subs at different positions often compensate for room modes better than a single large sub.',
        },
      },
      {
        type: 'paragraph',
        text: {
          de: 'Trennfrequenz (Crossover) zwischen Sub und Mains meist zwischen 80–120 Hz, abhängig von der Tieftongrenze der Hauptlautsprecher: je kleiner die Mains, desto höher die Trennfrequenz ansetzen, damit keine Lücke im Übergangsbereich entsteht.',
          en: 'The crossover frequency between sub and mains is usually 80–120 Hz, depending on the low-frequency limit of the main speakers: the smaller the mains, the higher the crossover should be set, to avoid a gap in the transition range.',
        },
      },
      {
        type: 'paragraph',
        text: {
          de: 'Pegel-Abgleich: Sub so einpegeln, dass er den Bassbereich stützt, ohne die Mains zu übertönen – im Zweifel eher etwas leiser als zu laut einstellen und mit mehreren Referenztracks aus dem eigenen Genre prüfen, nicht nur mit einem Track.',
          en: 'Level matching: set the sub so it supports the bass range without overpowering the mains — when in doubt err on the quieter side and check with several reference tracks from your genre, not just one track.',
        },
      },
      {
        type: 'warn',
        text: {
          de: 'Bei Heimsetup/Streaming-Platz: Sub auf dem Boden statt auf dem Tisch platzieren, direkter Bodenkontakt (ggf. mit Entkoppler/Pads) verhindert dröhnende Resonanzen über die Tischplatte.',
          en: 'For home/streaming setups: place the sub on the floor, not on the desk. Direct floor contact (with decoupler pads if needed) prevents resonances from transferring through the desk surface.',
        },
      },
    ],
  },
  {
    id: 'raumakustik',
    cat: 'setupRaum',
    tags: ['raum', 'akustik', 'reflexion', 'lautsprecher'],
    title: {
      de: 'Raumakustik-Basics',
      en: 'Room acoustics basics',
    },
    keywords: 'raumakustik reflexionen absorption flatterecho room acoustics reflections absorption flutter echo',
    body: [
      {
        type: 'paragraph',
        text: {
          de: 'Frühe Reflexionen von glatten, parallelen Wänden erzeugen einen unpräzisen, verwaschenen Klang. Teppich statt Fliesen/Laminat und Vorhänge oder Akustikpaneele an den Seitenwänden auf Ohrhöhe reduzieren das deutlich, ohne dass es viel kosten muss.',
          en: 'Early reflections from smooth, parallel walls create an imprecise, smeared sound. Carpet instead of tiles/laminate, and curtains or acoustic panels on the side walls at ear height, significantly reduce this without needing to spend much.',
        },
      },
      {
        type: 'paragraph',
        text: {
          de: 'Parallele kahle Wände ohne jede Absorption erzeugen oft ein hörbares Flatterecho (kurzes, metallisches Nachklingen bei Klatschen). Schon ein Teppich, ein Sofa oder Regale mit unregelmäßiger Oberfläche an einer der beiden parallelen Flächen helfen.',
          en: 'Bare parallel walls without any absorption often produce a noticeable flutter echo (a short metallic ringing when you clap). Even a carpet, a sofa, or shelves with an irregular surface on one of the two parallel faces will help.',
        },
      },
    ],
  },
  {
    id: 'camelot',
    cat: 'harmonischesMixen',
    tags: ['tonart', 'key', 'harmonisch', 'camelot'],
    title: {
      de: 'Harmonisches Mixen mit dem Camelot Wheel',
      en: 'Harmonic mixing with the Camelot Wheel',
    },
    keywords: 'camelot wheel key harmonic mixing tonart harmonisch mixen key harmonic mixing',
    body: [
      {
        type: 'paragraph',
        text: {
          de: 'Das Camelot Wheel ordnet alle 24 Tonarten (12 Dur/major als B, 12 Moll/minor als A) so an, dass benachbarte Zahlen harmonisch gut zusammenpassen. Je näher zwei Tracks auf dem Wheel beieinander liegen, desto reibungsloser klingt der Übergang, wenn beide gleichzeitig hörbar sind.',
          en: 'The Camelot Wheel arranges all 24 keys (12 major as B, 12 minor as A) so that adjacent numbers fit together harmonically. The closer two tracks are on the wheel, the smoother the transition sounds when both are audible at the same time.',
        },
      },
      { type: 'camelotWheel' },
      {
        type: 'paragraph',
        text: {
          de: '<b>Regeln, an denen man sich orientiert:</b>',
          en: '<b>Rules to follow:</b>',
        },
      },
      {
        type: 'paragraph',
        text: {
          de: '1. Gleiche Zahl, gleicher Buchstabe (z.B. 8A → 8A): identische Tonart, funktioniert immer.',
          en: '1. Same number, same letter (e.g. 8A → 8A): identical key, always works.',
        },
      },
      {
        type: 'paragraph',
        text: {
          de: '2. Gleiche Zahl, anderer Buchstabe (z.B. 8A → 8B): relative Dur/Moll-Tonart, sehr harmonisch, leicht anderer Charakter (Moll wirkt dunkler, Dur heller).',
          en: '2. Same number, different letter (e.g. 8A → 8B): relative major/minor key, very harmonic, slightly different character (minor feels darker, major brighter).',
        },
      },
      {
        type: 'paragraph',
        text: {
          de: '3. Zahl ±1, gleicher Buchstabe (z.B. 8A → 9A oder 8A → 7A): benachbarte Tonart auf dem Wheel, funktioniert fast immer gut, minimal andere Farbe.',
          en: '3. Number ±1, same letter (e.g. 8A → 9A or 8A → 7A): adjacent key on the wheel, almost always works well, minimally different colour.',
        },
      },
      {
        type: 'paragraph',
        text: {
          de: '4. Zahl +2, gleicher Buchstabe (z.B. 8A → 10A): Energie-Boost-Technik, hörbar spannungsreicher, gezielt für einen Energieanstieg im Set einsetzbar, nicht wahllos.',
          en: '4. Number +2, same letter (e.g. 8A → 10A): energy boost technique, noticeably more tension, use deliberately for an energy lift in the set — not randomly.',
        },
      },
      {
        type: 'paragraph',
        text: {
          de: '5. Alles andere (z.B. 8A → 3B): dissonant, klingt beim Überlagern schräg. Kein Problem, wenn nacheinander ohne Überlappung gemixt wird, aber riskant bei langem Blend mit beiden Tracks gleichzeitig hörbar.',
          en: '5. Everything else (e.g. 8A → 3B): dissonant, sounds off when both tracks overlap. Not a problem if mixed consecutively without overlap, but risky during a long blend with both tracks audible at the same time.',
        },
      },
      {
        type: 'warn',
        text: {
          de: 'rekordbox zeigt die erkannte Tonart in Camelot-Notation direkt in der Trackliste an (Spalte "Key"). Automatische Erkennung ist nicht immer perfekt, bei wichtigen Übergängen lieber per Ohr gegenchecken statt blind der Anzeige zu vertrauen.',
          en: 'rekordbox displays the detected key in Camelot notation directly in the track list (Key column). Automatic detection is not always accurate — for important transitions, double-check by ear rather than blindly trusting the display.',
        },
      },
    ],
  },
];