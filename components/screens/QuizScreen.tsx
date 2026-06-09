"use client";

import type { HotspotInfo, Locale } from "@/lib/hotspots";
import type { UiText } from "@/lib/i18n";

type Props = {
  text: UiText;
  locale: Locale;
  hotspot: HotspotInfo;
  selectedOptionId: string | null;
  result: boolean | null;
  onBack: () => void;
  onAnswer: (optionId: string) => void;
};

export default function QuizScreen({
  text,
  locale,
  hotspot,
  selectedOptionId,
  result,
  onBack,
  onAnswer,
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

      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-8">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-red-700">
          {text.quiz}
        </p>

        <h2 className="mt-4 text-3xl font-black leading-tight">
          {hotspot.quiz.question[locale]}
        </h2>

        <div className="mt-8 space-y-3">
          {hotspot.quiz.options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onAnswer(option.id)}
              aria-pressed={selectedOptionId === option.id}
              className={`min-h-14 w-full rounded-2xl border px-4 text-left text-base font-bold shadow-sm ${
                selectedOptionId === option.id
                  ? "border-red-700 bg-red-700 text-white"
                  : "border-black/10 bg-white text-neutral-950"
              }`}
            >
              {option.label[locale]}
            </button>
          ))}
        </div>

        {result !== null && (
          <p
            aria-live="polite"
            className={`mt-6 rounded-2xl px-4 py-4 text-base font-black ${
              result
                ? "bg-green-100 text-green-900"
                : "bg-yellow-100 text-yellow-900"
            }`}
          >
            {result ? text.correct : text.wrong}
          </p>
        )}
      </div>
    </section>
  );
}
