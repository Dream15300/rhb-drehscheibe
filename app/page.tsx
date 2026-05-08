"use client";

import { useState } from "react";
import Scene from "@/components/Scene";
import type { HotspotInfo } from "@/components/Turntable";

export default function Home() {
  const [activeHotspot, setActiveHotspot] = useState<HotspotInfo | null>(null);

  return (
    <main className="fixed inset-0 h-dvh overflow-hidden bg-[#f5f1ea] text-neutral-950">
      {!activeHotspot && (
        <>
          <header className="pointer-events-none absolute left-0 top-0 z-20 w-full px-5 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-red-700">
              RhB Drehscheibe
            </p>

            <h1 className="mt-2 max-w-xs text-2xl font-bold leading-tight">
              Interaktive Drehscheibe
            </h1>

            <p className="mt-2 max-w-xs text-sm leading-6 text-neutral-700">
              Direkt drehen, Bauteile antippen, Details erkunden.
            </p>
          </header>

          <Scene onSelectHotspot={setActiveHotspot} />

          <div className="pointer-events-none absolute bottom-4 left-0 z-20 w-full px-5">
            <div className="rounded-2xl border border-black/10 bg-white/95 px-4 py-3 text-sm font-semibold text-neutral-800 shadow-lg">
              Mit einem Finger horizontal drehen. Beschriftungen antippen.
            </div>
          </div>
        </>
      )}

      {activeHotspot && (
        <section className="absolute inset-0 z-50 overflow-hidden bg-[#f5f1ea] px-5 py-5 text-neutral-950">
          <button
            type="button"
            onClick={() => setActiveHotspot(null)}
            className="mb-8 min-h-12 rounded-full border border-black/10 bg-white px-5 text-sm font-bold uppercase tracking-wider shadow-sm"
          >
            ← Zurück
          </button>

          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-red-700">
            Bauteil
          </p>

          <h2 className="mt-4 text-4xl font-bold leading-tight">
            {activeHotspot.title}
          </h2>

          <p className="mt-6 max-w-md text-lg leading-8 text-neutral-700">
            {activeHotspot.text}
          </p>
        </section>
      )}
    </main>
  );
}
