import type { Locale, LocalizedText } from "./i18n";

export type { Locale, LocalizedText };

export type HotspotInfo = {
  id: string;
  label: LocalizedText;
  title: LocalizedText;
  shortText: LocalizedText;
  technicalText: LocalizedText;
  whyText: LocalizedText;
  /** Optional: erst gesetzt, sobald ein echtes Foto vorliegt. */
  image?: string;
  imageAlt: LocalizedText;
  anchorPosition: [number, number, number];
  labelPosition: [number, number, number];
  mobileLabelPosition: [number, number, number];
  quiz: {
    question: LocalizedText;
    correctOptionId: string;
    options: {
      id: string;
      label: LocalizedText;
    }[];
  };
};

export const hotspots: HotspotInfo[] = [
  {
    id: "bridge",
    label: { de: "Brücke", fr: "Pont", en: "Bridge" },
    title: {
      de: "Drehscheibenbrücke",
      fr: "Pont de la plaque tournante",
      en: "Turntable bridge",
    },
    shortText: {
      de: "Die Gleisbrücke trägt das meterspurige Gleis der Drehscheibe über der Grube.",
      fr: "Le pont porte la voie métrique au-dessus de la fosse.",
      en: "The track bridge carries the metre-gauge track of the turntable across the pit.",
    },
    technicalText: {
      de: "Die Brücke besteht aus genieteten bzw. verschraubten Stahlträgern mit Querverbänden. Sie nimmt das Gewicht von Lokomotiven und Wagen auf und leitet die Kräfte in Lager und Laufkranz ab. Die schmale Bauweise ist typisch für kleinere Schmalspur-Drehscheiben im Depotbetrieb.",
      fr: "Le pont se compose de poutres métalliques rivetées ou boulonnées avec entretoises. Il reprend les charges des locomotives et des voitures et transmet les forces au pivot et à la couronne de roulement.",
      en: "The bridge consists of riveted or bolted steel girders with cross-bracing. It carries the weight of locomotives and carriages and transfers the loads into the pivot and running rim. The slim design is typical of smaller narrow-gauge turntables in depot use.",
    },
    whyText: {
      de: "Nur eine steife und exakt geführte Brücke ermöglicht das sichere Ausrichten der Gleise – heute im DFB-Depot Realp, wohin diese RhB-Drehscheibe aus Pontresina versetzt wurde.",
      fr: "Seul un pont rigide et guidé avec précision permet un alignement sûr des voies, aujourd'hui au dépôt DFB de Realp, où cette plaque tournante RhB de Pontresina a été déplacée.",
      en: "Only a rigid, precisely guided bridge allows the tracks to be aligned safely – today at the DFB depot in Realp, where this RhB turntable from Pontresina was relocated.",
    },
    image: "/images/Drehscheibenbrücke.jpg",
    imageAlt: {
      de: "Detailbild der Drehscheibenbrücke im Depot Realp.",
      fr: "Image de détail du pont de la plaque tournante au dépôt de Realp.",
      en: "Close-up of the turntable bridge at the Realp depot.",
    },
    anchorPosition: [-1.55, 0.58, -0.32],
    labelPosition: [-2.28, 1.08, -0.95],
    mobileLabelPosition: [-1.95, 1.22, -1.15],
    quiz: {
      question: {
        de: "Welche Aufgabe hat die Gleisbrücke?",
        fr: "Quelle est la fonction du pont de voie?",
        en: "What is the job of the track bridge?",
      },
      correctOptionId: "load",
      options: [
        {
          id: "load",
          label: {
            de: "Sie trägt das Gleis und verteilt die Last.",
            fr: "Il porte la voie et répartit la charge.",
            en: "It carries the track and distributes the load.",
          },
        },
        {
          id: "decoration",
          label: {
            de: "Sie ist nur eine Verzierung.",
            fr: "Il sert seulement de décoration.",
            en: "It is only a decoration.",
          },
        },
      ],
    },
  },

  {
    id: "truss",
    label: { de: "Fachwerk", fr: "Treillis", en: "Truss" },
    title: {
      de: "Fachwerkträger",
      fr: "Poutre en treillis",
      en: "Truss girder",
    },
    shortText: {
      de: "Das Stahlfachwerk macht die Drehscheibe leicht und gleichzeitig verwindungssteif.",
      fr: "Le treillis métallique rend la plaque légère et rigide.",
      en: "The steel truss keeps the turntable light yet resistant to twisting.",
    },
    technicalText: {
      de: "Die radialen und diagonalen Streben bilden ein Fachwerk aus Dreiecken. Diese Bauweise reduziert das Gewicht und erleichtert den Handbetrieb der Drehscheibe. Solche Konstruktionen waren bei meterspurigen Bahnen wie der Rhätischen Bahn (RhB) üblich, von der diese Drehscheibe ursprünglich stammt.",
      fr: "Les barres radiales et diagonales forment une structure triangulée. Cette construction réduit le poids et facilite la rotation manuelle. De telles structures étaient courantes sur les réseaux métriques comme les Chemins de fer rhétiques (RhB), d'où provient cette plaque tournante.",
      en: "The radial and diagonal struts form a truss made of triangles. This design reduces weight and makes the turntable easier to operate by hand. Such structures were common on metre-gauge railways like the Rhaetian Railway (RhB), which this turntable originally came from.",
    },
    whyText: {
      de: "Je geringer die bewegte Masse ist, desto einfacher lässt sich die Drehscheibe von Hand bewegen.",
      fr: "Plus la masse mobile est faible, plus la plaque tournante peut être tournée facilement à la main.",
      en: "The lower the moving mass, the easier the turntable is to rotate by hand.",
    },
    image: "/images/Fachwerkträger.jpg",
    imageAlt: {
      de: "Detailbild des Fachwerkträgers der Drehscheibenbrücke.",
      fr: "Image de détail de la poutre en treillis du pont de la plaque tournante.",
      en: "Close-up of the truss girder of the turntable bridge.",
    },
    anchorPosition: [-2.0, 0.24, 1.05],
    labelPosition: [-3.0, 0.74, 1.56],
    mobileLabelPosition: [-2.35, 0.98, 1.38],
    quiz: {
      question: {
        de: "Warum ist ein Fachwerk sinnvoll?",
        fr: "Pourquoi un treillis est-il utile?",
        en: "Why is a truss useful?",
      },
      correctOptionId: "stiff",
      options: [
        {
          id: "stiff",
          label: {
            de: "Es ist steif und materialsparend.",
            fr: "Il est rigide et économise de la matière.",
            en: "It is rigid and saves material.",
          },
        },
        {
          id: "heavy",
          label: {
            de: "Es macht die Scheibe möglichst schwer.",
            fr: "Il rend la plaque aussi lourde que possible.",
            en: "It makes the turntable as heavy as possible.",
          },
        },
      ],
    },
  },

  {
    id: "rails",
    label: { de: "Gleis", fr: "Voie", en: "Track" },
    title: { de: "Brückengleis", fr: "Voie du pont", en: "Bridge track" },
    shortText: {
      de: "Das Brückengleis verbindet die Drehscheibe mit den Anschlussgleisen des Depots.",
      fr: "La voie du pont relie la plaque aux voies du dépôt.",
      en: "The bridge track connects the turntable to the depot's approach tracks.",
    },
    technicalText: {
      de: "Die Schienen der Drehscheibe müssen exakt mit den Anschlussgleisen fluchten. Bereits kleine Abweichungen bei Höhe, Richtung oder Spurweite können den sicheren Fahrzeugübergang verhindern.",
      fr: "Les rails doivent être alignés précisément avec les voies d’accès. De faibles écarts peuvent empêcher un passage sûr.",
      en: "The turntable rails must line up exactly with the approach tracks. Even small deviations in height, direction or gauge can prevent a safe transfer of vehicles.",
    },
    whyText: {
      de: "Die präzise Gleisausrichtung ist entscheidend, damit Lokomotiven und Wagen sicher verschoben werden können.",
      fr: "L’alignement précis des rails est essentiel pour déplacer les véhicules en sécurité.",
      en: "Precise track alignment is essential so locomotives and carriages can be moved safely.",
    },
    image: "/images/Brückengleis.jpg",
    imageAlt: {
      de: "Detailbild des Brückengleises und der Anschlussgleise.",
      fr: "Image de détail de la voie du pont et des voies de raccordement.",
      en: "Close-up of the bridge track and the approach tracks.",
    },
    anchorPosition: [0.95, 0.64, 0.14],
    labelPosition: [1.6, 1.14, -0.68],
    mobileLabelPosition: [1.45, 1.16, -0.82],
    quiz: {
      question: {
        de: "Was muss beim Ausrichten stimmen?",
        fr: "Que faut-il aligner correctement?",
        en: "What must be correct when aligning?",
      },
      correctOptionId: "alignment",
      options: [
        {
          id: "alignment",
          label: {
            de: "Richtung und Spurweite.",
            fr: "La direction et l’écartement.",
            en: "Direction and gauge.",
          },
        },
        {
          id: "color",
          label: {
            de: "Nur die Farbe der Schienen.",
            fr: "Seulement la couleur des rails.",
            en: "Only the colour of the rails.",
          },
        },
      ],
    },
  },

  {
    id: "pivot",
    label: { de: "Lager", fr: "Pivot", en: "Pivot" },
    title: {
      de: "Königszapfen / Mittellager",
      fr: "Pivot central / palier central",
      en: "King pin / centre bearing",
    },
    shortText: {
      de: "Das zentrale Lager bildet die Drehachse der Drehscheibe.",
      fr: "Le pivot central forme l’axe de rotation.",
      en: "The central bearing forms the turntable's axis of rotation.",
    },
    technicalText: {
      de: "Im Zentrum der Grube befindet sich das Drehlager der Brücke. Zusammen mit Laufkranz und Laufrollen führt es die Konstruktion beim Drehen und nimmt einen Teil der auftretenden Kräfte auf.",
      fr: "Au centre de la fosse se trouve le pivot de la structure. Avec la couronne et les galets, il guide la rotation et reprend une partie des forces.",
      en: "The bridge's pivot bearing sits at the centre of the pit. Together with the running rim and rollers it guides the structure as it turns and absorbs part of the forces involved.",
    },
    whyText: {
      de: "Ohne präzise Lagerung könnte die Brücke nicht exakt auf die Gleise des Depots Realp ausgerichtet werden.",
      fr: "Sans guidage précis, le pont ne pourrait pas être aligné correctement sur les voies du dépôt de Realp.",
      en: "Without precise bearings the bridge could not be aligned exactly with the tracks of the Realp depot.",
    },
    image: "/images/Koenigsstuhl.png",
    imageAlt: {
      de: "Detailbild des Königszapfens (Mittellager) der Drehscheibe.",
      fr: "Image de détail du pivot central de la plaque tournante.",
      en: "Close-up of the king pin (centre bearing) of the turntable.",
    },
    anchorPosition: [0, 0.5, 0],
    labelPosition: [0.62, 1.08, 0.74],
    mobileLabelPosition: [0.2, 1.02, 1.08],
    quiz: {
      question: {
        de: "Welche Funktion hat das zentrale Lager?",
        fr: "Quelle est la fonction du pivot central?",
        en: "What is the function of the central bearing?",
      },
      correctOptionId: "axis",
      options: [
        {
          id: "axis",
          label: {
            de: "Es bildet die Drehachse.",
            fr: "Il forme l’axe de rotation.",
            en: "It forms the axis of rotation.",
          },
        },
        {
          id: "brake",
          label: {
            de: "Es ersetzt alle Bremsen.",
            fr: "Il remplace tous les freins.",
            en: "It replaces all the brakes.",
          },
        },
      ],
    },
  },

  {
    id: "handwheel",
    label: { de: "Handantrieb", fr: "Manivelle", en: "Hand drive" },
    title: {
      de: "Handkurbelantrieb",
      fr: "Entraînement à manivelle",
      en: "Hand crank drive",
    },
    shortText: {
      de: "Die Drehscheibe wird von Hand bewegt und ausgerichtet.",
      fr: "La plaque tournante est déplacée manuellement.",
      en: "The turntable is moved and aligned by hand.",
    },
    technicalText: {
      de: "Diese handbetriebene Drehscheibe stammt ursprünglich aus Pontresina von der Rhätischen Bahn (RhB) und steht heute im DFB-Depot Realp. Über Hebel und Handantrieb wird die Brücke langsam von Hand gedreht, bis das gewünschte Anschlussgleis erreicht ist.",
      fr: "Cette plaque tournante manuelle provient à l'origine de Pontresina, des Chemins de fer rhétiques (RhB), et se trouve aujourd'hui au dépôt DFB de Realp. À l'aide de leviers et d'une commande manuelle, le pont est tourné lentement jusqu'à la voie de raccordement souhaitée.",
      en: "This hand-operated turntable originally comes from Pontresina on the Rhaetian Railway (RhB) and now stands at the DFB depot in Realp. Using levers and a hand drive, the bridge is slowly turned until the desired connecting track is reached.",
    },
    whyText: {
      de: "Der Handbetrieb ist robust, wartungsarm und unabhängig von elektrischer Energie.",
      fr: "La commande manuelle est robuste, simple et indépendante de l’électricité.",
      en: "Hand operation is robust, low-maintenance and independent of electrical power.",
    },
    image: "/images/Handkurbelantrieb.png",
    imageAlt: {
      de: "Detailbild des Handkurbelantriebs der Drehscheibe.",
      fr: "Image de détail de l’entraînement à manivelle de la plaque tournante.",
      en: "Close-up of the hand crank drive of the turntable.",
    },
    anchorPosition: [2.86, 0.82, -0.42],
    labelPosition: [3.36, 1.22, -1.12],
    mobileLabelPosition: [2.45, 1.18, -1.18],
    quiz: {
      question: {
        de: "Warum ist der Handantrieb historisch passend?",
        fr: "Pourquoi la commande manuelle est-elle adaptée historiquement?",
        en: "Why is the hand drive historically fitting?",
      },
      correctOptionId: "manual",
      options: [
        {
          id: "manual",
          label: {
            de: "Er funktioniert ohne elektrischen Antrieb.",
            fr: "Elle fonctionne sans entraînement électrique.",
            en: "It works without an electric drive.",
          },
        },
        {
          id: "automatic",
          label: {
            de: "Er steuert die Drehscheibe automatisch.",
            fr: "Elle commande la plaque automatiquement.",
            en: "It controls the turntable automatically.",
          },
        },
      ],
    },
  },

  {
    id: "ring",
    label: { de: "Laufkranz", fr: "Couronne", en: "Running rim" },
    title: {
      de: "Laufkranz / Ringschiene",
      fr: "Couronne de roulement / rail annulaire",
      en: "Running rim / ring rail",
    },
    shortText: {
      de: "Der Laufkranz stabilisiert die Drehscheibe am Rand der Grube.",
      fr: "La couronne de roulement stabilise la plaque au bord de la fosse.",
      en: "The running rim stabilises the turntable at the edge of the pit.",
    },
    technicalText: {
      de: "Die Brücke läuft mit Laufrollen auf dem ringförmigen Schienenkranz der Grube. Dadurch werden Kräfte verteilt und die Drehbewegung stabil geführt.",
      fr: "Le pont repose sur des galets roulant sur un anneau circulaire. Cela répartit les forces et stabilise la rotation.",
      en: "The bridge runs on rollers along the ring-shaped rail at the rim of the pit. This distributes the forces and keeps the rotation steady.",
    },
    whyText: {
      de: "Der Laufkranz verhindert Kippbewegungen und sorgt für ruhigen Lauf beim Drehen und Befahren.",
      fr: "La couronne réduit les mouvements de basculement et assure une rotation régulière.",
      en: "The running rim prevents tilting and ensures smooth running when turning and being driven over.",
    },
    image: "/images/Laufkranz.jpg",
    imageAlt: {
      de: "Detailbild des Laufkranzes (Ringschiene) am Rand der Drehscheibengrube.",
      fr: "Image de détail de la couronne de roulement au bord de la fosse.",
      en: "Close-up of the running rim (ring rail) at the edge of the turntable pit.",
    },
    anchorPosition: [0.15, 0.06, 3.08],
    labelPosition: [0.92, 0.72, 2.72],
    mobileLabelPosition: [0.9, 0.9, 2.48],
    quiz: {
      question: {
        de: "Wozu dient der Laufkranz?",
        fr: "À quoi sert la couronne de roulement?",
        en: "What is the running rim for?",
      },
      correctOptionId: "guide",
      options: [
        {
          id: "guide",
          label: {
            de: "Er führt und stabilisiert die Drehbewegung.",
            fr: "Il guide et stabilise la rotation.",
            en: "It guides and stabilises the rotation.",
          },
        },
        {
          id: "paint",
          label: {
            de: "Er dient nur als Farbrand.",
            fr: "Il sert seulement de bord coloré.",
            en: "It is only a coloured border.",
          },
        },
      ],
    },
  },

  {
    id: "locking",
    label: { de: "Verriegelung", fr: "Verrou", en: "Locking" },
    title: {
      de: "Gleisverriegelung / Verriegelungsbolzen",
      fr: "Verrouillage de voie / verrou",
      en: "Track lock / locking bolt",
    },
    shortText: {
      de: "Die Verriegelung fixiert die Drehscheibe exakt auf einem Anschlussgleis.",
      fr: "Le verrouillage fixe précisément la plaque sur une voie.",
      en: "The locking mechanism fixes the turntable exactly on an approach track.",
    },
    technicalText: {
      de: "Nach dem Ausrichten wird die Brücke mechanisch verriegelt. Dadurch kann sie sich beim Befahren nicht unbeabsichtigt verdrehen. Historische Drehscheiben wie diese aus Pontresina (RhB) verwendeten einfache, robuste Sperr- und Riegelsysteme.",
      fr: "Après l'alignement, le pont est verrouillé mécaniquement. Cela empêche toute rotation involontaire pendant le passage des véhicules. Les plaques tournantes historiques comme celle-ci, issue de Pontresina (RhB), utilisaient des systèmes de verrouillage simples et robustes.",
      en: "After alignment the bridge is locked mechanically so it cannot turn unintentionally while being driven over. Historic turntables such as this one from Pontresina (RhB) used simple, robust locking and bolt systems.",
    },
    whyText: {
      de: "Ohne Verriegelung könnten sich die Schienen beim Befahren verschieben. Das würde den sicheren Fahrzeugübergang gefährden.",
      fr: "Sans verrouillage, les rails pourraient se déplacer pendant le passage des véhicules.",
      en: "Without locking the rails could shift while being driven over, endangering the safe transfer of vehicles.",
    },
    imageAlt: {
      de: "Detailbild einer mechanischen Verriegelung oder Gleissperre.",
      fr: "Image de détail d’un verrouillage mécanique ou d’un dispositif de blocage.",
      en: "Close-up of a mechanical locking device or track lock.",
    },
    anchorPosition: [2.32, 0.42, 0.24],
    labelPosition: [3.1, 0.95, 0.88],
    mobileLabelPosition: [2.02, 0.96, 0.92],
    quiz: {
      question: {
        de: "Warum ist die Verriegelung wichtig?",
        fr: "Pourquoi le verrouillage est-il important?",
        en: "Why is the locking important?",
      },
      correctOptionId: "safety",
      options: [
        {
          id: "safety",
          label: {
            de: "Sie verhindert ein Verdrehen beim Befahren.",
            fr: "Il empêche une rotation pendant le passage.",
            en: "It prevents rotation while being driven over.",
          },
        },
        {
          id: "decoration",
          label: {
            de: "Sie dient nur zur Markierung.",
            fr: "Il sert uniquement de marquage.",
            en: "It only serves as a marking.",
          },
        },
      ],
    },
  },

  {
    id: "pit",
    label: { de: "Grube", fr: "Fosse", en: "Pit" },
    title: {
      de: "Drehscheibengrube",
      fr: "Fosse de la plaque tournante",
      en: "Turntable pit",
    },
    shortText: {
      de: "Die Grube nimmt die Konstruktion der Drehscheibe auf.",
      fr: "La fosse accueille la structure de la plaque tournante.",
      en: "The pit houses the structure of the turntable.",
    },
    technicalText: {
      de: "Die Drehscheibe liegt in einer kreisförmigen Grube aus Beton und Mauerwerk. In ihr befinden sich Lager, Laufrollen und der umlaufende Laufkranz. Solche Grubenbauweisen waren bei Schweizer Schmalspurbahnen wie der Rhätischen Bahn (RhB) weit verbreitet.",
      fr: "La plaque se trouve dans une fosse circulaire en béton et maçonnerie. Elle contient le pivot, les galets et la couronne de roulement. De telles fosses étaient répandues sur les chemins de fer suisses à voie étroite comme les Chemins de fer rhétiques (RhB).",
      en: "The turntable sits in a circular pit of concrete and masonry. It contains the bearing, the rollers and the running rim. Such pit constructions were widespread on Swiss narrow-gauge railways like the Rhaetian Railway (RhB).",
    },
    whyText: {
      de: "Die Grube ermöglicht eine niedrige Bauhöhe und führt die Drehscheibe stabil im Boden.",
      fr: "La fosse permet une faible hauteur de construction et guide la plaque de manière stable.",
      en: "The pit allows a low overall height and holds the turntable steadily in the ground.",
    },
    image: "/images/Drehscheibengrube.jpg",
    imageAlt: {
      de: "Übersichtsbild der Drehscheibengrube in Grubenbauweise.",
      fr: "Vue d’ensemble de la fosse de la plaque tournante.",
      en: "Overview of the turntable pit in pit construction.",
    },
    anchorPosition: [-0.62, -0.11, 2.25],
    labelPosition: [-1.55, 0.42, 3.08],
    mobileLabelPosition: [-1.02, 0.55, 2.38],
    quiz: {
      question: {
        de: "Welche Aufgabe hat die Grube?",
        fr: "Quelle est la fonction de la fosse?",
        en: "What is the job of the pit?",
      },
      correctOptionId: "support",
      options: [
        {
          id: "support",
          label: {
            de: "Sie nimmt Lager und Laufkranz auf.",
            fr: "Elle contient le pivot et la couronne.",
            en: "It houses the bearing and the running rim.",
          },
        },
        {
          id: "water",
          label: {
            de: "Sie dient als Wasserreservoir.",
            fr: "Elle sert de réservoir d’eau.",
            en: "It serves as a water reservoir.",
          },
        },
      ],
    },
  },
];

export const trackAngles = [-8, 8, 185];
