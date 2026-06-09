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
    label: { de: "Brücke", fr: "Pont" },
    title: { de: "Gleisbrücke", fr: "Pont de voie" },
    shortText: {
      de: "Die Gleisbrücke trägt das meterspurige Gleis der Drehscheibe über der Grube.",
      fr: "Le pont porte la voie métrique au-dessus de la fosse.",
    },
    technicalText: {
      de: "Die Brücke besteht aus genieteten bzw. verschraubten Stahlträgern mit Querverbänden. Sie nimmt das Gewicht von Lokomotiven und Wagen auf und leitet die Kräfte in Lager und Laufring ab. Die schmale Bauweise ist typisch für kleinere Schmalspur-Drehscheiben im Depotbetrieb.",
      fr: "Le pont se compose de poutres métalliques rivetées ou boulonnées avec entretoises. Il reprend les charges des locomotives et des voitures et transmet les forces au pivot et à l’anneau de roulement.",
    },
    whyText: {
      de: "Nur eine steife und exakt geführte Brücke ermöglicht das sichere Ausrichten der Gleise im Depot Realp.",
      fr: "Seul un pont rigide et guidé avec précision permet un alignement sûr des voies du dépôt de Realp.",
    },
    imageAlt: {
      de: "Detailbild der Gleisbrücke der Drehscheibe in Realp.",
      fr: "Image de détail du pont de voie de la plaque tournante à Realp.",
    },
    anchorPosition: [-1.55, 0.58, -0.32],
    labelPosition: [-2.28, 1.08, -0.95],
    mobileLabelPosition: [-1.95, 1.22, -1.15],
    quiz: {
      question: {
        de: "Welche Aufgabe hat die Gleisbrücke?",
        fr: "Quelle est la fonction du pont de voie?",
      },
      correctOptionId: "load",
      options: [
        {
          id: "load",
          label: {
            de: "Sie trägt das Gleis und verteilt die Last.",
            fr: "Il porte la voie et répartit la charge.",
          },
        },
        {
          id: "decoration",
          label: {
            de: "Sie ist nur eine Verzierung.",
            fr: "Il sert seulement de décoration.",
          },
        },
      ],
    },
  },

  {
    id: "truss",
    label: { de: "Fachwerk", fr: "Treillis" },
    title: { de: "Stahlfachwerk", fr: "Treillis métallique" },
    shortText: {
      de: "Das Stahlfachwerk macht die Drehscheibe leicht und gleichzeitig verwindungssteif.",
      fr: "Le treillis métallique rend la plaque légère et rigide.",
    },
    technicalText: {
      de: "Die radialen und diagonalen Streben bilden ein Fachwerk aus Dreiecken. Diese Bauweise reduziert das Gewicht und erleichtert den Handbetrieb der Drehscheibe. Solche Konstruktionen waren bei meterspurigen Bergbahnen üblich.",
      fr: "Les barres radiales et diagonales forment une structure triangulée. Cette construction réduit le poids et facilite la rotation manuelle.",
    },
    whyText: {
      de: "Je geringer die bewegte Masse ist, desto einfacher lässt sich die Drehscheibe von Hand bewegen.",
      fr: "Plus la masse mobile est faible, plus la plaque tournante peut être tournée facilement à la main.",
    },
    imageAlt: {
      de: "Detailbild des Stahlfachwerks der handbetriebenen Drehscheibe.",
      fr: "Image de détail du treillis métallique de la plaque tournante manuelle.",
    },
    anchorPosition: [-2.0, 0.24, 1.05],
    labelPosition: [-3.0, 0.74, 1.56],
    mobileLabelPosition: [-2.35, 0.98, 1.38],
    quiz: {
      question: {
        de: "Warum ist ein Fachwerk sinnvoll?",
        fr: "Pourquoi un treillis est-il utile?",
      },
      correctOptionId: "stiff",
      options: [
        {
          id: "stiff",
          label: {
            de: "Es ist steif und materialsparend.",
            fr: "Il est rigide et économise de la matière.",
          },
        },
        {
          id: "heavy",
          label: {
            de: "Es macht die Scheibe möglichst schwer.",
            fr: "Il rend la plaque aussi lourde que possible.",
          },
        },
      ],
    },
  },

  {
    id: "rails",
    label: { de: "Gleis", fr: "Voie" },
    title: { de: "Brückengleis", fr: "Voie du pont" },
    shortText: {
      de: "Das Brückengleis verbindet die Drehscheibe mit den Anschlussgleisen des Depots.",
      fr: "La voie du pont relie la plaque aux voies du dépôt.",
    },
    technicalText: {
      de: "Die Schienen der Drehscheibe müssen exakt mit den Anschlussgleisen fluchten. Bereits kleine Abweichungen bei Höhe, Richtung oder Spurweite können den sicheren Fahrzeugübergang verhindern.",
      fr: "Les rails doivent être alignés précisément avec les voies d’accès. De faibles écarts peuvent empêcher un passage sûr.",
    },
    whyText: {
      de: "Die präzise Gleisausrichtung ist entscheidend, damit Lokomotiven und Wagen sicher verschoben werden können.",
      fr: "L’alignement précis des rails est essentiel pour déplacer les véhicules en sécurité.",
    },
    imageAlt: {
      de: "Detailbild des Brückengleises und der Anschlussgleise.",
      fr: "Image de détail de la voie du pont et des voies de raccordement.",
    },
    anchorPosition: [0.95, 0.64, 0.14],
    labelPosition: [1.6, 1.14, -0.68],
    mobileLabelPosition: [1.45, 1.16, -0.82],
    quiz: {
      question: {
        de: "Was muss beim Ausrichten stimmen?",
        fr: "Que faut-il aligner correctement?",
      },
      correctOptionId: "alignment",
      options: [
        {
          id: "alignment",
          label: {
            de: "Richtung und Spurweite.",
            fr: "La direction et l’écartement.",
          },
        },
        {
          id: "color",
          label: {
            de: "Nur die Farbe der Schienen.",
            fr: "Seulement la couleur des rails.",
          },
        },
      ],
    },
  },

  {
    id: "pivot",
    label: { de: "Lager", fr: "Pivot" },
    title: { de: "Zentrales Drehlager", fr: "Pivot central" },
    shortText: {
      de: "Das zentrale Lager bildet die Drehachse der Drehscheibe.",
      fr: "Le pivot central forme l’axe de rotation.",
    },
    technicalText: {
      de: "Im Zentrum der Grube befindet sich das Drehlager der Brücke. Zusammen mit Laufring und Laufrollen führt es die Konstruktion beim Drehen und nimmt einen Teil der auftretenden Kräfte auf.",
      fr: "Au centre de la fosse se trouve le pivot de la structure. Avec l’anneau et les galets, il guide la rotation et reprend une partie des forces.",
    },
    whyText: {
      de: "Ohne präzise Lagerung könnte die Brücke nicht exakt auf die Gleise des Depots Realp ausgerichtet werden.",
      fr: "Sans guidage précis, le pont ne pourrait pas être aligné correctement sur les voies du dépôt de Realp.",
    },
    imageAlt: {
      de: "Detailbild des zentralen Drehlagers der Drehscheibe.",
      fr: "Image de détail du pivot central de la plaque tournante.",
    },
    anchorPosition: [0, 0.5, 0],
    labelPosition: [0.62, 1.08, 0.74],
    mobileLabelPosition: [0.2, 1.02, 1.08],
    quiz: {
      question: {
        de: "Welche Funktion hat das zentrale Lager?",
        fr: "Quelle est la fonction du pivot central?",
      },
      correctOptionId: "axis",
      options: [
        {
          id: "axis",
          label: {
            de: "Es bildet die Drehachse.",
            fr: "Il forme l’axe de rotation.",
          },
        },
        {
          id: "brake",
          label: {
            de: "Es ersetzt alle Bremsen.",
            fr: "Il remplace tous les freins.",
          },
        },
      ],
    },
  },

  {
    id: "handwheel",
    label: { de: "Handantrieb", fr: "Commande manuelle" },
    title: { de: "Handantrieb", fr: "Commande manuelle" },
    shortText: {
      de: "Die Drehscheibe wird von Hand bewegt und ausgerichtet.",
      fr: "La plaque tournante est déplacée manuellement.",
    },
    technicalText: {
      de: "Kleinere Drehscheiben der Furka-Oberalp-Bahn und der heutigen DFB wurden von Hand bedient. Über Hebel und Handantrieb wird die Brücke langsam gedreht, bis das gewünschte Anschlussgleis erreicht ist.",
      fr: "Les petites plaques tournantes du FO et du DFB étaient commandées manuellement. Des leviers permettent de tourner lentement le pont jusqu’à la voie voulue.",
    },
    whyText: {
      de: "Der Handbetrieb ist robust, wartungsarm und unabhängig von elektrischer Energie.",
      fr: "La commande manuelle est robuste, simple et indépendante de l’électricité.",
    },
    imageAlt: {
      de: "Detailbild des Handantriebs mit Hebel oder Kurbel.",
      fr: "Image de détail de la commande manuelle avec levier ou manivelle.",
    },
    anchorPosition: [2.86, 0.82, -0.42],
    labelPosition: [3.36, 1.22, -1.12],
    mobileLabelPosition: [2.45, 1.18, -1.18],
    quiz: {
      question: {
        de: "Warum ist der Handantrieb historisch passend?",
        fr: "Pourquoi la commande manuelle est-elle adaptée historiquement?",
      },
      correctOptionId: "manual",
      options: [
        {
          id: "manual",
          label: {
            de: "Er funktioniert ohne elektrischen Antrieb.",
            fr: "Elle fonctionne sans entraînement électrique.",
          },
        },
        {
          id: "automatic",
          label: {
            de: "Er steuert die Drehscheibe automatisch.",
            fr: "Elle commande la plaque automatiquement.",
          },
        },
      ],
    },
  },

  {
    id: "ring",
    label: { de: "Laufring", fr: "Anneau" },
    title: { de: "Umlaufender Laufring", fr: "Anneau de roulement" },
    shortText: {
      de: "Der Laufring stabilisiert die Drehscheibe am Rand der Grube.",
      fr: "L’anneau de roulement stabilise la plaque au bord de la fosse.",
    },
    technicalText: {
      de: "Die Brücke läuft mit Laufrollen auf dem ringförmigen Schienenkranz der Grube. Dadurch werden Kräfte verteilt und die Drehbewegung stabil geführt.",
      fr: "Le pont repose sur des galets roulant sur un anneau circulaire. Cela répartit les forces et stabilise la rotation.",
    },
    whyText: {
      de: "Der Laufring verhindert Kippbewegungen und sorgt für ruhigen Lauf beim Drehen und Befahren.",
      fr: "L’anneau réduit les mouvements de basculement et assure une rotation régulière.",
    },
    imageAlt: {
      de: "Detailbild des umlaufenden Laufrings am Rand der Drehscheibengrube.",
      fr: "Image de détail de l’anneau de roulement au bord de la fosse.",
    },
    anchorPosition: [0.15, 0.06, 3.08],
    labelPosition: [0.92, 0.72, 2.72],
    mobileLabelPosition: [0.9, 0.9, 2.48],
    quiz: {
      question: {
        de: "Wozu dient der Laufring?",
        fr: "À quoi sert l’anneau de roulement?",
      },
      correctOptionId: "guide",
      options: [
        {
          id: "guide",
          label: {
            de: "Er führt und stabilisiert die Drehbewegung.",
            fr: "Il guide et stabilise la rotation.",
          },
        },
        {
          id: "paint",
          label: {
            de: "Er dient nur als Farbrand.",
            fr: "Il sert seulement de bord coloré.",
          },
        },
      ],
    },
  },

  {
    id: "locking",
    label: { de: "Verriegelung", fr: "Verrou" },
    title: {
      de: "Mechanische Verriegelung",
      fr: "Verrouillage mécanique",
    },
    shortText: {
      de: "Die Verriegelung fixiert die Drehscheibe exakt auf einem Anschlussgleis.",
      fr: "Le verrouillage fixe précisément la plaque sur une voie.",
    },
    technicalText: {
      de: "Nach dem Ausrichten wird die Brücke mechanisch verriegelt. Dadurch kann sie sich beim Befahren nicht unbeabsichtigt verdrehen. Historische Drehscheiben der Furka-Oberalp-Bahn und der heutigen DFB verwendeten einfache, robuste Sperr- und Riegelsysteme.",
      fr: "Après l’alignement, le pont est verrouillé mécaniquement. Cela empêche toute rotation involontaire pendant le passage des véhicules.",
    },
    whyText: {
      de: "Ohne Verriegelung könnten sich die Schienen beim Befahren verschieben. Das würde den sicheren Fahrzeugübergang gefährden.",
      fr: "Sans verrouillage, les rails pourraient se déplacer pendant le passage des véhicules.",
    },
    imageAlt: {
      de: "Detailbild einer mechanischen Verriegelung oder Gleissperre.",
      fr: "Image de détail d’un verrouillage mécanique ou d’un dispositif de blocage.",
    },
    anchorPosition: [2.32, 0.42, 0.24],
    labelPosition: [3.1, 0.95, 0.88],
    mobileLabelPosition: [2.02, 0.96, 0.92],
    quiz: {
      question: {
        de: "Warum ist die Verriegelung wichtig?",
        fr: "Pourquoi le verrouillage est-il important?",
      },
      correctOptionId: "safety",
      options: [
        {
          id: "safety",
          label: {
            de: "Sie verhindert ein Verdrehen beim Befahren.",
            fr: "Il empêche une rotation pendant le passage.",
          },
        },
        {
          id: "decoration",
          label: {
            de: "Sie dient nur zur Markierung.",
            fr: "Il sert uniquement de marquage.",
          },
        },
      ],
    },
  },

  {
    id: "pit",
    label: { de: "Grube", fr: "Fosse" },
    title: {
      de: "Drehscheibengrube",
      fr: "Fosse de la plaque tournante",
    },
    shortText: {
      de: "Die Grube nimmt die Konstruktion der Drehscheibe auf.",
      fr: "La fosse accueille la structure de la plaque tournante.",
    },
    technicalText: {
      de: "Die Drehscheibe liegt in einer kreisförmigen Grube aus Beton und Mauerwerk. In ihr befinden sich Lager, Laufrollen und der umlaufende Laufring. Solche Grubenbauweisen waren bei Schweizer Schmalspurbahnen weit verbreitet.",
      fr: "La plaque se trouve dans une fosse circulaire en béton et maçonnerie. Elle contient le pivot, les galets et l’anneau de roulement.",
    },
    whyText: {
      de: "Die Grube ermöglicht eine niedrige Bauhöhe und führt die Drehscheibe stabil im Boden.",
      fr: "La fosse permet une faible hauteur de construction et guide la plaque de manière stable.",
    },
    imageAlt: {
      de: "Übersichtsbild der Drehscheibengrube in Grubenbauweise.",
      fr: "Vue d’ensemble de la fosse de la plaque tournante.",
    },
    anchorPosition: [-0.62, -0.11, 2.25],
    labelPosition: [-1.55, 0.42, 3.08],
    mobileLabelPosition: [-1.02, 0.55, 2.38],
    quiz: {
      question: {
        de: "Welche Aufgabe hat die Grube?",
        fr: "Quelle est la fonction de la fosse?",
      },
      correctOptionId: "support",
      options: [
        {
          id: "support",
          label: {
            de: "Sie nimmt Lager und Laufring auf.",
            fr: "Elle contient le pivot et l’anneau.",
          },
        },
        {
          id: "water",
          label: {
            de: "Sie dient als Wasserreservoir.",
            fr: "Elle sert de réservoir d’eau.",
          },
        },
      ],
    },
  },
];

export const trackAngles = [-8, 8, 185];
