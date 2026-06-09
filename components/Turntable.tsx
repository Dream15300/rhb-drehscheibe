"use client";

import { Html, Line } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { type RefObject, useRef, useSyncExternalStore } from "react";
import { Group, MathUtils } from "three";
import type { TargetRotation } from "./Scene";
import { type HotspotInfo, hotspots, type Locale, trackAngles } from "@/lib/hotspots";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * Spiegelt die CSS-Media-Query `prefers-reduced-motion` als boolean.
 * Bei `true` verzichten wir auf das weiche Nachlaufen der Drehung.
 */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

type Props = {
  locale: Locale;
  discoveredIds: string[];
  showHotspots: boolean;
  targetRotation: RefObject<TargetRotation>;
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
  const prefersReducedMotion = usePrefersReducedMotion();

  useFrame(() => {
    if (!groupRef.current) return;

    // Bei reduzierter Bewegung folgt das Modell der Eingabe direkt,
    // ohne weiches Nachlaufen (Easing).
    const yEase = prefersReducedMotion ? 1 : 0.18;
    const xEase = prefersReducedMotion ? 1 : 0.16;

    groupRef.current.rotation.y = MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current.y,
      yEase,
    );

    groupRef.current.rotation.x = MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotation.current.x,
      xEase,
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
                    text-[0.5rem]
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
