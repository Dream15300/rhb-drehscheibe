"use client";

import type { HotspotInfo, Locale } from "@/lib/hotspots";
import type { UiText } from "@/lib/i18n";
import { useFocusOnMount } from "@/lib/useFocusOnMount";

type Props = {
  text: UiText;
  locale: Locale;
  hotspot: HotspotInfo;
  /** Zufällige Reihenfolge der Antwort-IDs (von der Sitzung vorgegeben). */
  optionOrder: string[];
  selectedOptionId: string | null;
  result: boolean | null;
  onBack: () => void;
  onAnswer: (optionId: string) => void;
  onNext: () => void;
  onToModel: () => void;
};

export default function QuizScreen({
  text,
  locale,
  hotspot,
  optionOrder,
  selectedOptionId,
  result,
  onBack,
  onAnswer,
  onNext,
  onToModel,
}: Props) {
  const answered = selectedOptionId !== null;
  const correctId = hotspot.quiz.correctOptionId;
  const headingRef = useFocusOnMount<HTMLHeadingElement>();

  // Antworten in der vorgegebenen Reihenfolge anzeigen; bei fehlender/ungültiger
  // Reihenfolge auf die Originalreihenfolge zurückfallen.
  const orderedByPrefs = optionOrder
    .map((id) => hotspot.quiz.options.find((option) => option.id === id))
    .filter((option) => option !== undefined);
  const orderedOptions =
    orderedByPrefs.length === hotspot.quiz.options.length
      ? orderedByPrefs
      : hotspot.quiz.options;

  function optionClasses(optionId: string) {
    const base =
      "min-h-14 w-full rounded-2xl border px-4 text-left text-base font-bold shadow-sm transition-colors";

    if (!answered) {
      return `${base} border-black/10 bg-white text-neutral-950`;
    }

    // Nach der Antwort: richtige Option immer grün, gewählte falsche rot.
    if (optionId === correctId) {
      return `${base} border-green-800 bg-green-700 text-white`;
    }
    if (optionId === selectedOptionId) {
      return `${base} border-red-700 bg-red-700 text-white`;
    }
    return `${base} border-black/10 bg-white text-neutral-600`;
  }

  return (
    <section className="absolute inset-0 z-50 flex flex-col overflow-hidden bg-[#f5f1ea] text-neutral-950">
      <div className="mx-auto flex w-full max-w-2xl shrink-0 items-center justify-between gap-3 px-5 pt-5">
        <button
          type="button"
          onClick={onBack}
          className="mb-7 min-h-12 rounded-full border border-black/10 bg-white px-5 text-sm font-black uppercase tracking-wider shadow-sm"
        >
          ← {text.back}
        </button>

        <button
          type="button"
          onClick={onToModel}
          className="mb-7 min-h-12 rounded-full border border-black/10 bg-white px-5 text-sm font-black uppercase tracking-wider shadow-sm"
        >
          {text.toModel}
        </button>
      </div>

      <div className="mx-auto w-full max-w-2xl min-h-0 flex-1 overflow-y-auto px-5 pb-32">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-red-700">
          {text.quiz}
        </p>

        <h2
          ref={headingRef}
          tabIndex={-1}
          className="mt-4 text-3xl font-black leading-tight outline-none"
        >
          {hotspot.quiz.question[locale]}
        </h2>

        <div className="mt-8 space-y-3">
          {orderedOptions.map((option) => {
            const isCorrect = option.id === correctId;
            const isSelectedWrong =
              answered && option.id === selectedOptionId && !isCorrect;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onAnswer(option.id)}
                aria-pressed={selectedOptionId === option.id}
                className={optionClasses(option.id)}
              >
                <span className="flex items-center justify-between gap-3">
                  <span>{option.label[locale]}</span>

                  {answered && isCorrect && (
                    <span className="text-xl leading-none">
                      <span aria-hidden="true">✓</span>
                      <span className="sr-only">{text.correct}</span>
                    </span>
                  )}

                  {isSelectedWrong && (
                    <span className="text-xl leading-none">
                      <span aria-hidden="true">✗</span>
                      <span className="sr-only">{text.wrong}</span>
                    </span>
                  )}
                </span>
              </button>
            );
          })}
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

      {answered && (
        <div className="absolute bottom-0 left-0 z-10 w-full border-t border-black/10 bg-[#f5f1ea]/95 px-5 pb-5 pt-4 backdrop-blur">
          <button
            type="button"
            onClick={onNext}
            className="mx-auto block min-h-14 w-full max-w-2xl rounded-2xl bg-red-700 px-4 text-sm font-black uppercase tracking-wider text-white shadow-sm"
          >
            {text.next} →
          </button>
        </div>
      )}
    </section>
  );
}
