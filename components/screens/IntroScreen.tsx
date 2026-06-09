"use client";

import { type Locale, locales, type UiText } from "@/lib/i18n";

type Props = {
  text: UiText;
  locale: Locale;
  onSelectLocale: (locale: Locale) => void;
  onStart: () => void;
};

export default function IntroScreen({
  text,
  locale,
  onSelectLocale,
  onStart,
}: Props) {
  return (
    <section className="absolute inset-0 z-50 flex flex-col justify-between bg-[#f5f1ea] px-5 py-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-red-700">
          {text.appLabel}
        </p>

        <h1 className="mt-5 max-w-sm text-4xl font-black leading-tight">
          {text.title}
        </h1>

        <p className="mt-5 max-w-md text-lg leading-8 text-neutral-700">
          {text.intro}
        </p>

        <div
          className="mt-6 inline-flex rounded-full border border-black/10 bg-white p-1 shadow-sm"
          role="group"
          aria-label={text.languageLabel}
        >
          {locales.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onSelectLocale(option)}
              aria-pressed={locale === option}
              className={`min-h-11 rounded-full px-5 text-sm font-bold ${
                locale === option
                  ? "bg-red-700 text-white"
                  : "bg-transparent text-neutral-800"
              }`}
            >
              {option.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="min-h-14 rounded-2xl bg-red-700 px-5 text-base font-black uppercase tracking-wider text-white shadow-lg"
      >
        {text.start}
      </button>
    </section>
  );
}
