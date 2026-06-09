"use client";

import Image from "next/image";
import { type Locale, locales, type UiText } from "@/lib/i18n";
import { useFocusOnMount } from "@/lib/useFocusOnMount";

type Props = {
  text: UiText;
  locale: Locale;
  hasProgress: boolean;
  onSelectLocale: (locale: Locale) => void;
  onStart: () => void;
  onReset: () => void;
};

export default function IntroScreen({
  text,
  locale,
  hasProgress,
  onSelectLocale,
  onStart,
  onReset,
}: Props) {
  const headingRef = useFocusOnMount<HTMLHeadingElement>();

  return (
    // Höhen-adaptiv: Basis-Schriftgröße folgt der Viewport-Höhe (clamp + dvh),
    // alle Innenmaße in `em` – so passt der Screen immer ohne Scrollen.
    <section
      style={{ fontSize: "clamp(10px, 2.05dvh, 18px)" }}
      className="absolute inset-0 z-50 flex h-full flex-col overflow-hidden bg-[#f5f1ea] px-[1.4em] py-[1.3em]"
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <p className="text-[0.8em] font-bold uppercase tracking-[0.32em] text-red-700">
          {text.appLabel}
        </p>

        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mt-[0.8em] max-w-[12em] text-[2em] font-black leading-[1.05] outline-none"
        >
          {text.title}
        </h1>

        <div className="relative mt-[0.9em] aspect-[2/1] w-full max-w-[26em] max-h-[15em] overflow-hidden rounded-[0.9em] border border-black/10 shadow-sm">
          <Image
            src="/images/drehscheibe.png"
            alt={text.introImageAlt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        <p className="mt-[0.9em] max-w-[24em] text-[1.05em] leading-[1.4] text-neutral-700">
          {text.intro}
        </p>

        <div
          className="mt-[1em] inline-flex w-fit rounded-full border border-black/10 bg-white p-[0.2em] shadow-sm"
          role="group"
          aria-label={text.languageLabel}
        >
          {locales.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onSelectLocale(option)}
              aria-pressed={locale === option}
              className={`min-h-[2.6em] rounded-full px-[1.3em] text-[0.95em] font-bold ${
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

      <div className="mt-[0.8em] flex flex-col gap-[0.6em]">
        <button
          type="button"
          onClick={onStart}
          className="min-h-[3em] rounded-[0.9em] bg-red-700 px-[1.3em] text-[1.05em] font-black uppercase tracking-wider text-white shadow-lg"
        >
          {text.start}
        </button>

        {hasProgress && (
          <button
            type="button"
            onClick={onReset}
            className="min-h-[2.6em] self-center text-[0.85em] font-bold uppercase tracking-wider text-neutral-600 underline underline-offset-4"
          >
            {text.reset}
          </button>
        )}
      </div>
    </section>
  );
}
