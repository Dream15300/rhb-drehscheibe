"use client";

import Image from "next/image";
import type { HotspotInfo, Locale } from "@/lib/hotspots";
import type { UiText } from "@/lib/i18n";

type Props = {
  text: UiText;
  locale: Locale;
  hotspot: HotspotInfo;
  isDiscovered: boolean;
  onBack: () => void;
  onMarkDiscovered: () => void;
  onOpenQuiz: () => void;
};

export default function DetailScreen({
  text,
  locale,
  hotspot,
  isDiscovered,
  onBack,
  onMarkDiscovered,
  onOpenQuiz,
}: Props) {
  return (
    <section className="absolute inset-0 z-50 flex flex-col overflow-hidden bg-[#f5f1ea] text-neutral-950">
      <div className="shrink-0 px-5 pt-5">
        <button
          type="button"
          onClick={onBack}
          className="mb-7 min-h-12 rounded-full border border-black/10 bg-white px-5 text-sm font-black uppercase tracking-wider shadow-sm"
        >
          ← {text.back}
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-32">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-red-700">
          {text.component}
        </p>

        <h2 className="mt-4 max-w-full break-words text-[2rem] font-black leading-[0.95]">
          {hotspot.title[locale]}
        </h2>

        {hotspot.image && (
          <div className="mt-5 overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={hotspot.image}
                alt={hotspot.imageAlt[locale]}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>

            <p className="border-t border-black/5 px-4 py-3 text-xs leading-5 text-neutral-600">
              {hotspot.imageAlt[locale]}
            </p>
          </div>
        )}

        <div className="mt-6 space-y-5">
          <section>
            <h3 className="text-sm font-black uppercase tracking-wider">
              {text.short}
            </h3>

            <p className="mt-2 max-w-md text-base leading-7 text-neutral-700">
              {hotspot.shortText[locale]}
            </p>
          </section>

          <section>
            <h3 className="text-sm font-black uppercase tracking-wider">
              {text.technical}
            </h3>

            <p className="mt-2 max-w-md text-base leading-7 text-neutral-700">
              {hotspot.technicalText[locale]}
            </p>
          </section>

          <section>
            <h3 className="text-sm font-black uppercase tracking-wider">
              {text.why}
            </h3>

            <p className="mt-2 max-w-md text-base leading-7 text-neutral-700">
              {hotspot.whyText[locale]}
            </p>
          </section>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-10 flex w-full gap-3 border-t border-black/10 bg-[#f5f1ea]/95 px-5 pb-5 pt-4 backdrop-blur">
        <button
          type="button"
          onClick={onMarkDiscovered}
          className={`min-h-14 flex-1 rounded-2xl border px-4 text-sm font-black uppercase tracking-wider shadow-sm ${
            isDiscovered
              ? "border-green-800 bg-green-700 text-white"
              : "border-black/10 bg-white text-neutral-950"
          }`}
        >
          {isDiscovered ? text.discoveredDone : text.discovered}
        </button>

        <button
          type="button"
          onClick={onOpenQuiz}
          className="min-h-14 flex-1 rounded-2xl bg-red-700 px-4 text-sm font-black uppercase tracking-wider text-white shadow-sm"
        >
          {text.quizButton}
        </button>
      </div>
    </section>
  );
}
