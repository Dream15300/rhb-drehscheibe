"use client";

import Image from "next/image";
import type { UiText } from "@/lib/i18n";
import { useFocusOnMount } from "@/lib/useFocusOnMount";

type Props = {
  text: UiText;
  discoveredCount: number;
  total: number;
  onBackToModel: () => void;
  onReset: () => void;
};

export default function CompletedScreen({
  text,
  discoveredCount,
  total,
  onBackToModel,
  onReset,
}: Props) {
  const headingRef = useFocusOnMount<HTMLHeadingElement>();

  return (
    // Höhen-adaptiv (siehe IntroScreen): passt immer ohne Scrollen.
    <section
      style={{ fontSize: "clamp(10px, 2.15dvh, 19px)" }}
      className="absolute inset-0 z-50 flex h-full flex-col items-center justify-center gap-[1em] overflow-hidden bg-[#f5f1ea] px-[1.5em] py-[1.3em] text-center text-neutral-950"
    >
      <Image
        src="/dfb-logo.svg"
        alt="Dampfbahn Furka-Bergstrecke"
        width={1200}
        height={495}
        unoptimized
        className="h-[3em] w-auto"
      />

      <p className="text-[0.8em] font-bold uppercase tracking-[0.32em] text-red-700">
        {text.appLabel}
      </p>

      <h1
        ref={headingRef}
        tabIndex={-1}
        className="max-w-[18em] text-[2.2em] font-black leading-[1.1] outline-none"
      >
        {text.completedTitle}
      </h1>

      <p className="max-w-[22em] text-[1.05em] leading-[1.4] text-neutral-700">
        {text.completedText}
      </p>

      <p className="rounded-full bg-green-700 px-[1.2em] py-[0.4em] text-[0.85em] font-black uppercase tracking-wider text-white">
        {discoveredCount} / {total} {text.progressLabel}
      </p>

      <div className="mt-[0.4em] flex w-full max-w-[18em] flex-col gap-[0.6em]">
        <button
          type="button"
          onClick={onBackToModel}
          className="min-h-[3em] rounded-[0.9em] bg-red-700 px-[1.3em] text-[1.05em] font-black uppercase tracking-wider text-white shadow-lg"
        >
          {text.toModel}
        </button>

        <button
          type="button"
          onClick={onReset}
          className="min-h-[2.6em] rounded-[0.9em] border border-black/10 bg-white px-[1.3em] text-[0.85em] font-bold uppercase tracking-wider text-neutral-700 shadow-sm"
        >
          {text.reset}
        </button>
      </div>
    </section>
  );
}
