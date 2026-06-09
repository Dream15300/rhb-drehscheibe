"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import ErrorBoundary from "./ErrorBoundary";
import Turntable from "./Turntable";
import type { HotspotInfo, Locale } from "@/lib/hotspots";
import type { UiText } from "@/lib/i18n";

type Props = {
  locale: Locale;
  text: UiText;
  discoveredIds: string[];
  showHotspots: boolean;
  onSelectHotspot: (hotspot: HotspotInfo) => void;
};

export type TargetRotation = {
  x: number;
  y: number;
};

const MIN_TILT = -0.32;
const MAX_TILT = 0.18;
const STEP_Y = 0.35; // ~20° pro Tastendruck/Klick
const STEP_X = 0.09;

const clampTilt = (value: number) =>
  Math.min(MAX_TILT, Math.max(MIN_TILT, value));

export default function Scene({
  locale,
  text,
  discoveredIds,
  showHotspots,
  onSelectHotspot,
}: Props) {
  const targetRotation = useRef<TargetRotation>({ x: 0, y: 0 });
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const rotationStart = useRef<TargetRotation>({ x: 0, y: 0 });
  const isDragging = useRef(false);

  // Diskrete Drehung per Tastatur/Schaltflächen (Bedienung ohne präzise Geste).
  function rotateBy(deltaY: number, deltaX: number) {
    targetRotation.current.y += deltaY;
    targetRotation.current.x = clampTilt(targetRotation.current.x + deltaX);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    isDragging.current = true;
    dragStartX.current = event.clientX;
    dragStartY.current = event.clientY;
    rotationStart.current = {
      x: targetRotation.current.x,
      y: targetRotation.current.y,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!isDragging.current) return;

    const deltaX = event.clientX - dragStartX.current;
    const deltaY = event.clientY - dragStartY.current;

    targetRotation.current.y = rotationStart.current.y + deltaX * 0.01;
    targetRotation.current.x = clampTilt(
      rotationStart.current.x + deltaY * 0.0045,
    );
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!isDragging.current) return;

    isDragging.current = false;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case "ArrowLeft":
        rotateBy(-STEP_Y, 0);
        break;
      case "ArrowRight":
        rotateBy(STEP_Y, 0);
        break;
      case "ArrowUp":
        rotateBy(0, -STEP_X);
        break;
      case "ArrowDown":
        rotateBy(0, STEP_X);
        break;
      default:
        return;
    }
    event.preventDefault(); // Seiten-Scroll durch Pfeiltasten verhindern.
  }

  return (
    <ErrorBoundary
      fallback={
        <div className="absolute inset-0 z-0 flex items-center justify-center px-8">
          <p className="max-w-sm text-center text-sm font-bold leading-6 text-neutral-800">
            {text.webglError}
          </p>
        </div>
      }
    >
      <div
        role="application"
        aria-label={text.modelLabel}
        tabIndex={0}
        className="absolute inset-0 z-0 touch-none select-none outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-red-700/40"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        onContextMenu={(event) => event.preventDefault()}
      >
        <Canvas
          camera={{ position: [0, 5.4, 7.4], fov: 41 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={["#f5f1ea"]} />

          <ambientLight intensity={1.7} />
          <directionalLight position={[4.5, 8, 5]} intensity={2.7} />
          <directionalLight position={[-4, 4, -3]} intensity={1.1} />

          <Turntable
            locale={locale}
            discoveredIds={discoveredIds}
            showHotspots={showHotspots}
            targetRotation={targetRotation}
            onSelectHotspot={onSelectHotspot}
          />

          <Suspense fallback={null}>
            <Environment preset="sunset" />
          </Suspense>
        </Canvas>
      </div>
    </ErrorBoundary>
  );
}
