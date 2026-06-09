"use client";

import type { UiText } from "@/lib/i18n";

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
  return (
    <section className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-[#f5f1ea] px-6 text-center text-neutral-950">
      <p className="text-xs font-bold uppercase tracking-[0.32em] text-red-700">
        {text.appLabel}
      </p>

      <h1 className="max-w-md text-4xl font-black leading-tight">
        {text.completedTitle}
      </h1>

      <p className="max-w-md text-lg leading-8 text-neutral-700">
        {text.completedText}
      </p>

      <p className="rounded-full bg-green-700 px-5 py-2 text-sm font-black uppercase tracking-wider text-white">
        {discoveredCount} / {total} {text.progressLabel}
      </p>

      <div className="mt-2 flex w-full max-w-xs flex-col gap-3">
        <button
          type="button"
          onClick={onBackToModel}
          className="min-h-14 rounded-2xl bg-red-700 px-5 text-base font-black uppercase tracking-wider text-white shadow-lg"
        >
          {text.toModel}
        </button>

        <button
          type="button"
          onClick={onReset}
          className="min-h-12 rounded-2xl border border-black/10 bg-white px-5 text-sm font-bold uppercase tracking-wider text-neutral-700 shadow-sm"
        >
          {text.reset}
        </button>
      </div>
    </section>
  );
}
