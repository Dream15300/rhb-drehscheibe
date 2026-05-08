"use client";

import { Html, Line } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { type MutableRefObject, useRef } from "react";
import { Group, MathUtils } from "three";
import type { TargetRotation } from "./Scene";

export type Locale = "de" | "fr";

type LocalizedText = Record<Locale, string>;

export type HotspotInfo = {
  id: string;
  label: LocalizedText;
  title: LocalizedText;
  shortText: LocalizedText;
  technicalText: LocalizedText;
  whyText: LocalizedText;
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

const hotspots: HotspotInfo[] = [
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
    label: { de: "Antrieb", fr: "Commande" },
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

const trackAngles = [-8, 8, 185];

type Props = {
  locale: Locale;
  discoveredIds: string[];
  showHotspots: boolean;
  targetRotation: MutableRefObject<TargetRotation>;
  onSelectHotspot: (hotspot: HotspotInfo) => void;
};

function Steel({
  color = "#8f8a82",
  metalness = 0.75,
  roughness = 0.48,
}: {
  color?: string;
  metalness?: number;
  roughness?: number;
}) {
  return (
    <meshStandardMaterial
      color={color}
      metalness={metalness}
      roughness={roughness}
    />
  );
}

function Beam({
  position,
  rotation = [0, 0, 0],
  args,
  color = "#b8b4aa",
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  args: [number, number, number];
  color?: string;
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={args} />
      <Steel color={color} />
    </mesh>
  );
}

function Track({ angle }: { angle: number }) {
  return (
    <group rotation={[0, (angle * Math.PI) / 180, 0]}>
      <mesh position={[-0.18, 0.065, -4.35]}>
        <boxGeometry args={[0.052, 0.058, 2.18]} />
        <meshStandardMaterial
          color="#2e2e2e"
          metalness={0.95}
          roughness={0.22}
        />
      </mesh>

      <mesh position={[0.18, 0.065, -4.35]}>
        <boxGeometry args={[0.052, 0.058, 2.18]} />
        <meshStandardMaterial
          color="#2e2e2e"
          metalness={0.95}
          roughness={0.22}
        />
      </mesh>

      {[3.45, 3.85, 4.25, 4.65, 5.05, 5.45].map((z) => (
        <mesh key={z} position={[0, 0.02, -z]}>
          <boxGeometry args={[0.68, 0.04, 0.08]} />
          <meshStandardMaterial color="#6f5643" roughness={0.92} />
        </mesh>
      ))}
    </group>
  );
}

function LeftHandDrive() {
  return (
    <group position={[-2.82, 0.52, -0.44]}>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.1, 0.13, 0.06, 24]} />
        <meshStandardMaterial
          color="#d8d2c7"
          metalness={0.45}
          roughness={0.45}
        />
      </mesh>

      <mesh position={[0.05, 0.28, 0]} rotation={[0, 0, -0.28]}>
        <cylinderGeometry args={[0.025, 0.025, 0.56, 16]} />
        <meshStandardMaterial
          color="#e8e3da"
          metalness={0.75}
          roughness={0.3}
        />
      </mesh>

      <mesh position={[0.12, 0.57, 0]}>
        <boxGeometry args={[0.16, 0.035, 0.035]} />
        <meshStandardMaterial
          color="#e8e3da"
          metalness={0.75}
          roughness={0.3}
        />
      </mesh>

      <mesh position={[0.2, 0.68, 0]} rotation={[0.25, 0.2, 0.45]}>
        <torusGeometry args={[0.14, 0.014, 12, 48]} />
        <meshStandardMaterial
          color="#ded8cf"
          metalness={0.9}
          roughness={0.28}
        />
      </mesh>

      <mesh position={[0.31, 0.71, 0.04]} rotation={[0.2, 0.1, 0.75]}>
        <cylinderGeometry args={[0.015, 0.015, 0.18, 12]} />
        <meshStandardMaterial
          color="#ded8cf"
          metalness={0.9}
          roughness={0.28}
        />
      </mesh>

      <mesh position={[-0.28, 0.42, 0]} rotation={[0, 0, 0.6]}>
        <cylinderGeometry args={[0.018, 0.018, 0.72, 12]} />
        <meshStandardMaterial
          color="#c8c2b8"
          metalness={0.8}
          roughness={0.35}
        />
      </mesh>
    </group>
  );
}

function RightHandDrive() {
  return (
    <group position={[2.82, 0.52, -0.42]}>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.13, 0.16, 0.06, 24]} />
        <meshStandardMaterial
          color="#d0cabf"
          metalness={0.45}
          roughness={0.5}
        />
      </mesh>

      <mesh position={[0, 0.31, 0]}>
        <cylinderGeometry args={[0.024, 0.024, 0.58, 16]} />
        <meshStandardMaterial
          color="#ddd7ce"
          metalness={0.78}
          roughness={0.32}
        />
      </mesh>

      <mesh position={[0, 0.62, 0]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshStandardMaterial
          color="#ddd7ce"
          metalness={0.78}
          roughness={0.32}
        />
      </mesh>

      <mesh position={[0.34, 0.63, 0]} rotation={[0, 0, Math.PI / 2.85]}>
        <cylinderGeometry args={[0.018, 0.018, 0.9, 12]} />
        <meshStandardMaterial
          color="#bdb7ad"
          metalness={0.8}
          roughness={0.35}
        />
      </mesh>

      <mesh position={[-0.17, 0.58, 0]} rotation={[0, 0, -0.75]}>
        <cylinderGeometry args={[0.016, 0.016, 0.28, 12]} />
        <meshStandardMaterial
          color="#bdb7ad"
          metalness={0.8}
          roughness={0.35}
        />
      </mesh>

      <mesh position={[-0.08, 0.47, 0]} rotation={[0.15, 0, 0.2]}>
        <torusGeometry args={[0.095, 0.012, 12, 40]} />
        <meshStandardMaterial color="#d8d2c7" metalness={0.9} roughness={0.3} />
      </mesh>
    </group>
  );
}

export default function Turntable({
  locale,
  discoveredIds,
  showHotspots,
  targetRotation,
  onSelectHotspot,
}: Props) {
  const groupRef = useRef<Group>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 6;

  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y = MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current.y,
      0.18,
    );

    groupRef.current.rotation.x = MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotation.current.x,
      0.16,
    );
  });

  return (
    <group
      ref={groupRef}
      position={isMobile ? [0, -0.34, 0] : [0, -0.5, 0]}
      scale={isMobile ? 0.58 : 0.9}
    >
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.18, 0]}>
        <circleGeometry args={[5.15, 160]} />
        <meshStandardMaterial color="#b6aea2" roughness={1} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.13, 0]}>
        <circleGeometry args={[3.2, 160]} />
        <meshStandardMaterial color="#6f6a63" roughness={0.95} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.045, 0]}>
        <ringGeometry args={[3.25, 3.6, 180]} />
        <meshStandardMaterial color="#c8c1b6" roughness={0.82} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.045, 0]}>
        <ringGeometry args={[3.03, 3.14, 180]} />
        <meshStandardMaterial
          color="#4d4a45"
          metalness={0.9}
          roughness={0.28}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.115, 0]}>
        <ringGeometry args={[2.72, 2.86, 180]} />
        <meshStandardMaterial
          color="#d9d5cc"
          metalness={0.7}
          roughness={0.38}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.13, 0]}>
        <ringGeometry args={[1.18, 1.28, 160]} />
        <meshStandardMaterial
          color="#c9c3ba"
          metalness={0.65}
          roughness={0.42}
        />
      </mesh>

      {Array.from({ length: 24 }).map((_, index) => {
        const angle = (index / 24) * Math.PI * 2;

        return (
          <Beam
            key={`radial-${index}`}
            position={[0, 0.15, 0]}
            rotation={[0, angle, 0]}
            args={[0.032, 0.036, 5.55]}
            color="#d8d3ca"
          />
        );
      })}

      {Array.from({ length: 24 }).map((_, index) => {
        const angle = (index / 24) * Math.PI * 2;
        const x = Math.sin(angle) * 1.42;
        const z = Math.cos(angle) * 1.42;

        return (
          <Beam
            key={`diag-a-${index}`}
            position={[x, 0.19, z]}
            rotation={[0, angle + Math.PI / 4, 0]}
            args={[0.026, 0.032, 2.85]}
            color="#cfc8bd"
          />
        );
      })}

      {Array.from({ length: 24 }).map((_, index) => {
        const angle = (index / 24) * Math.PI * 2;
        const x = Math.sin(angle) * 1.42;
        const z = Math.cos(angle) * 1.42;

        return (
          <Beam
            key={`diag-b-${index}`}
            position={[x, 0.21, z]}
            rotation={[0, angle - Math.PI / 4, 0]}
            args={[0.024, 0.03, 2.65]}
            color="#aaa299"
          />
        );
      })}

      {Array.from({ length: 16 }).map((_, index) => {
        const angle = (index / 16) * Math.PI * 2;
        const x = Math.sin(angle) * 2.1;
        const z = Math.cos(angle) * 2.1;

        return (
          <mesh key={`node-${index}`} position={[x, 0.25, z]}>
            <cylinderGeometry args={[0.055, 0.055, 0.025, 16]} />
            <meshStandardMaterial
              color="#77716a"
              metalness={0.7}
              roughness={0.42}
            />
          </mesh>
        );
      })}

      {trackAngles.map((angle) => (
        <Track key={angle} angle={angle} />
      ))}

      <Beam
        position={[0, 0.36, -0.3]}
        args={[5.9, 0.085, 0.06]}
        color="#7e1f1b"
      />
      <Beam
        position={[0, 0.36, 0.3]}
        args={[5.9, 0.085, 0.06]}
        color="#7e1f1b"
      />
      <Beam
        position={[0, 0.55, -0.3]}
        args={[5.9, 0.052, 0.045]}
        color="#9b2a24"
      />
      <Beam
        position={[0, 0.55, 0.3]}
        args={[5.9, 0.052, 0.045]}
        color="#9b2a24"
      />

      {[-2.55, -1.95, -1.35, -0.75, -0.15, 0.45, 1.05, 1.65, 2.25, 2.75].map(
        (x) => (
          <Beam
            key={`bridge-cross-${x}`}
            position={[x, 0.44, 0]}
            args={[0.045, 0.048, 0.66]}
            color="#731f1b"
          />
        ),
      )}

      <mesh position={[0, 0.505, 0]}>
        <boxGeometry args={[5.55, 0.032, 0.34]} />
        <meshStandardMaterial color="#6b5948" roughness={0.94} />
      </mesh>

      <mesh position={[0, 0.61, 0.13]}>
        <boxGeometry args={[5.5, 0.055, 0.045]} />
        <meshStandardMaterial color="#262626" metalness={1} roughness={0.18} />
      </mesh>

      <mesh position={[0, 0.61, -0.13]}>
        <boxGeometry args={[5.5, 0.055, 0.045]} />
        <meshStandardMaterial color="#262626" metalness={1} roughness={0.18} />
      </mesh>

      {[-2.4, -1.8, -1.2, -0.6, 0, 0.6, 1.2, 1.8, 2.4].map((x) => (
        <mesh key={x} position={[x, 0.55, 0]}>
          <boxGeometry args={[0.08, 0.045, 0.58]} />
          <meshStandardMaterial color="#5d4535" roughness={0.95} />
        </mesh>
      ))}

      <mesh position={[0, 0.47, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.09, 48]} />
        <meshStandardMaterial color="#4d4d4d" metalness={1} roughness={0.24} />
      </mesh>

      <mesh position={[0, 0.515, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.035, 48]} />
        <meshStandardMaterial color="#2f2f2f" metalness={1} roughness={0.2} />
      </mesh>

      <LeftHandDrive />
      <RightHandDrive />

      {showHotspots &&
        hotspots.map((hotspot) => {
          const isDiscovered = discoveredIds.includes(hotspot.id);
          const labelPosition = isMobile
            ? hotspot.mobileLabelPosition
            : hotspot.labelPosition;

          return (
            <group key={hotspot.id}>
              <Line
                points={[hotspot.anchorPosition, labelPosition]}
                color={isDiscovered ? "#15803d" : "#b00000"}
                lineWidth={isDiscovered ? 2.8 : 2.1}
                transparent
                opacity={isDiscovered ? 0.95 : 0.72}
              />

              <mesh position={hotspot.anchorPosition}>
                <sphereGeometry args={[isDiscovered ? 0.075 : 0.055, 20, 20]} />
                <meshStandardMaterial
                  color={isDiscovered ? "#15803d" : "#b00000"}
                  roughness={0.45}
                />
              </mesh>

              <Html position={labelPosition} center distanceFactor={7}>
                <button
                  type="button"
                  aria-label={
                    isDiscovered
                      ? `${hotspot.title[locale]} entdeckt`
                      : hotspot.title[locale]
                  }
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.stopPropagation();
                    onSelectHotspot(hotspot);
                  }}
                  className={`
                  flex
                  min-h-8
                  min-w-[64px]
                  items-center
                  justify-center
                  rounded-full
                  border
                  px-2.5
                  text-[8px]
                  font-black
                  uppercase
                  tracking-[0.08em]
                  shadow-[0_2px_6px_rgba(0,0,0,0.14)]
                  outline-none
                  focus-visible:ring-4
                  ${
                    isDiscovered
                      ? "border-green-700/70 bg-green-700 text-white focus-visible:ring-green-700/30"
                      : "border-red-600/80 bg-white/96 text-red-700 focus-visible:ring-red-700/30"
                  }
                `}
                >
                  {isDiscovered
                    ? `${hotspot.label[locale]} ✓`
                    : hotspot.label[locale]}
                </button>
              </Html>
            </group>
          );
        })}
    </group>
  );
}
