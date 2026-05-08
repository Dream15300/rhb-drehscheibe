"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useRef } from "react";
import type { PointerEvent } from "react";
import Turntable, { type HotspotInfo } from "./Turntable";

type Props = {
  onSelectHotspot: (hotspot: HotspotInfo) => void;
};

export default function Scene({ onSelectHotspot }: Props) {
  const targetRotation = useRef(0);
  const dragStartX = useRef(0);
  const rotationStart = useRef(0);
  const isDragging = useRef(false);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    isDragging.current = true;
    dragStartX.current = event.clientX;
    rotationStart.current = targetRotation.current;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!isDragging.current) return;

    const deltaX = event.clientX - dragStartX.current;
    targetRotation.current = rotationStart.current + deltaX * 0.01;
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!isDragging.current) return;

    isDragging.current = false;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <div
      className="absolute inset-0 z-0 touch-none select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
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
          targetRotation={targetRotation}
          onSelectHotspot={onSelectHotspot}
        />

        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}
