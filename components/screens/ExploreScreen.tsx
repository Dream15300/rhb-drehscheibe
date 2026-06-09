"use client";

import Scene from "@/components/Scene";
import type { HotspotInfo, Locale } from "@/lib/hotspots";
import type { UiText } from "@/lib/i18n";

type Props = {
  text: UiText;
  locale: Locale;
  discoveredIds: string[];
  discoveredCount: number;
  total: number;
  showHotspots: boolean;
  onToggleHotspots: () => void;
  onSelectHotspot: (hotspot: HotspotInfo) => void;
  onHome: () => void;
};

export default function ExploreScreen({
  text,
  locale,
  discoveredIds,
  discoveredCount,
  total,
  showHotspots,
  onToggleHotspots,
  onSelectHotspot,
  onHome,
}: Props) {
  return (
    <>
      <header className="pointer-events-none absolute left-0 top-0 z-20 flex w-full items-start justify-between gap-3 px-5 py-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-red-700">
            {text.appLabel}
          </p>

          <h1 className="mt-1 max-w-[180px] text-[1.7rem] font-black leading-[0.98]">
            {text.title}
          </h1>
        </div>

        <p
          aria-live="polite"
          className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.08em] shadow-sm ${
            discoveredCount >= total
              ? "bg-green-700 text-white"
              : "bg-white/90 text-neutral-800"
          }`}
        >
          {discoveredCount} / {total} {text.progressLabel}
        </p>
      </header>

      <div className="absolute bottom-20 left-5 z-30">
        <button
          type="button"
          onClick={onHome}
          className="min-h-10 rounded-full border border-black/10 bg-white/90 px-4 text-[10px] font-black uppercase tracking-[0.12em] text-neutral-800 shadow-sm backdrop-blur"
        >
          ‹ {text.menu}
        </button>
      </div>

      <div className="absolute bottom-20 right-5 z-30">
        <button
          type="button"
          onClick={onToggleHotspots}
          aria-pressed={showHotspots}
          className={`
            min-h-10
            rounded-full
            border
            px-3
            text-[10px]
            font-black
            uppercase
            tracking-[0.12em]
            shadow-sm
            backdrop-blur
            ${
              showHotspots
                ? "border-red-700 bg-white/90 text-red-700"
                : "border-black/10 bg-black/70 text-white"
            }
          `}
        >
          {showHotspots ? text.hotspotsOn : text.hotspotsOff}
        </button>
      </div>

      <Scene
        locale={locale}
        discoveredIds={discoveredIds}
        showHotspots={showHotspots}
        errorLabel={text.webglError}
        onSelectHotspot={onSelectHotspot}
      />

      <div className="pointer-events-none absolute bottom-4 left-0 z-20 w-full px-5">
        <div className="rounded-2xl border border-black/10 bg-white/80 px-3 py-1.5 text-[11px] font-bold leading-5 text-neutral-800 shadow-sm">
          {text.hint}
        </div>
      </div>
    </>
  );
}
