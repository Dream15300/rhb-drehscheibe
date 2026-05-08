"use client";

import { useMemo, useState } from "react";
import Scene from "@/components/Scene";
import type { HotspotInfo, Locale } from "@/components/Turntable";

type Screen = "intro" | "explore" | "detail" | "quiz";

const uiText = {
  de: {
    appLabel: "DFB Entdecker-App",
    title: "Handbetriebene Furka-Drehscheibe",
    intro:
      "Erkunde eine historische handbetriebene Drehscheibe. Drehe das Modell mit dem Finger und öffne die markierten Bauteile.",
    start: "Objekt erkunden",
    hint: "Mit einem Finger horizontal oder vertikal drehen. Beschriftungen antippen.",
    component: "Bauteil",
    back: "Zurück",
    short: "Kurz erklärt",
    technical: "Technisch vertieft",
    why: "Warum wichtig?",
    discovered: "Als entdeckt markieren",
    discoveredDone: "Entdeckt",
    quiz: "Quizfrage",
    quizButton: "Quiz öffnen",
    correct: "Richtig",
    wrong: "Nochmals prüfen",
    hotspotsOn: "Beschriftungen AN",
    hotspotsOff: "Beschriftungen AUS",
  },

  fr: {
    appLabel: "Application découverte DFB",
    title: "Plaque tournante manuelle de la Furka",
    intro:
      "Explore une plaque tournante historique. Fais tourner le modèle avec le doigt et ouvre les éléments marqués.",
    start: "Explorer l'objet",
    hint: "Faire glisser avec un doigt horizontalement ou verticalement. Toucher les libellés.",
    component: "Élément",
    back: "Retour",
    short: "Explication courte",
    technical: "Détail technique",
    why: "Pourquoi important?",
    discovered: "Marquer comme découvert",
    discoveredDone: "Découvert",
    quiz: "Question",
    quizButton: "Ouvrir le quiz",
    correct: "Correct",
    wrong: "Vérifier encore",
    hotspotsOn: "Légendes ON",
    hotspotsOff: "Légendes OFF",
  },
} satisfies Record<Locale, Record<string, string>>;

export default function Home() {
  const [locale, setLocale] = useState<Locale>("de");

  const [screen, setScreen] = useState<Screen>("intro");

  const [activeHotspot, setActiveHotspot] = useState<HotspotInfo | null>(null);

  const [discoveredIds, setDiscoveredIds] = useState<string[]>([]);

  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

  const [showHotspots, setShowHotspots] = useState(true);

  const text = uiText[locale];

  const isDiscovered = activeHotspot
    ? discoveredIds.includes(activeHotspot.id)
    : false;

  const quizResult = useMemo(() => {
    if (!activeHotspot || quizAnswer === null) return null;

    return quizAnswer === activeHotspot.quiz.correctOptionId;
  }, [activeHotspot, quizAnswer]);

  function openHotspot(hotspot: HotspotInfo) {
    setActiveHotspot(hotspot);
    setQuizAnswer(null);
    setScreen("detail");
  }

  function markDiscovered() {
    if (!activeHotspot) return;

    setDiscoveredIds((current) =>
      current.includes(activeHotspot.id)
        ? current
        : [...current, activeHotspot.id],
    );
  }

  function goBackToExplore() {
    setScreen("explore");
    setActiveHotspot(null);
    setQuizAnswer(null);
  }

  return (
    <main className="fixed inset-0 h-dvh overflow-hidden bg-[#f5f1ea] text-neutral-950">
      {screen === "intro" && (
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

            <div className="mt-6 inline-flex rounded-full border border-black/10 bg-white p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setLocale("de")}
                className={`min-h-11 rounded-full px-5 text-sm font-bold ${
                  locale === "de"
                    ? "bg-red-700 text-white"
                    : "bg-transparent text-neutral-800"
                }`}
              >
                DE
              </button>

              <button
                type="button"
                onClick={() => setLocale("fr")}
                className={`min-h-11 rounded-full px-5 text-sm font-bold ${
                  locale === "fr"
                    ? "bg-red-700 text-white"
                    : "bg-transparent text-neutral-800"
                }`}
              >
                FR
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setScreen("explore")}
            className="min-h-14 rounded-2xl bg-red-700 px-5 text-base font-black uppercase tracking-wider text-white shadow-lg"
          >
            {text.start}
          </button>
        </section>
      )}

      {screen === "explore" && (
        <>
          <header className="pointer-events-none absolute left-0 top-0 z-20 w-full px-5 py-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-red-700">
              {text.appLabel}
            </p>

            <h1 className="mt-1 max-w-[180px] text-[1.7rem] font-black leading-[0.98]">
              {text.title}
            </h1>
          </header>

          <div className="absolute bottom-20 right-5 z-30">
            <button
              type="button"
              onClick={() => setShowHotspots((current) => !current)}
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
            onSelectHotspot={openHotspot}
          />

          <div className="pointer-events-none absolute bottom-4 left-0 z-20 w-full px-5">
            <div className="rounded-2xl border border-black/10 bg-white/80 px-3 py-1.5 text-[11px] font-bold leading-5 text-neutral-800 shadow-sm">
              {text.hint}
            </div>
          </div>
        </>
      )}

      {screen === "detail" && activeHotspot && (
        <section className="absolute inset-0 z-50 flex flex-col overflow-hidden bg-[#f5f1ea] text-neutral-950">
          <div className="shrink-0 px-5 pt-5">
            <button
              type="button"
              onClick={goBackToExplore}
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
              {activeHotspot.title[locale]}
            </h2>

            <div className="mt-6 space-y-5">
              <section>
                <h3 className="text-sm font-black uppercase tracking-wider">
                  {text.short}
                </h3>

                <p className="mt-2 max-w-md text-base leading-7 text-neutral-700">
                  {activeHotspot.shortText[locale]}
                </p>
              </section>

              <section>
                <h3 className="text-sm font-black uppercase tracking-wider">
                  {text.technical}
                </h3>

                <p className="mt-2 max-w-md text-base leading-7 text-neutral-700">
                  {activeHotspot.technicalText[locale]}
                </p>
              </section>

              <section>
                <h3 className="text-sm font-black uppercase tracking-wider">
                  {text.why}
                </h3>

                <p className="mt-2 max-w-md text-base leading-7 text-neutral-700">
                  {activeHotspot.whyText[locale]}
                </p>
              </section>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 z-10 flex w-full gap-3 border-t border-black/10 bg-[#f5f1ea]/95 px-5 pb-5 pt-4 backdrop-blur">
            <button
              type="button"
              onClick={markDiscovered}
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
              onClick={() => setScreen("quiz")}
              className="min-h-14 flex-1 rounded-2xl bg-red-700 px-4 text-sm font-black uppercase tracking-wider text-white shadow-sm"
            >
              {text.quizButton}
            </button>
          </div>
        </section>
      )}

      {screen === "quiz" && activeHotspot && (
        <section className="absolute inset-0 z-50 flex flex-col overflow-hidden bg-[#f5f1ea] text-neutral-950">
          <div className="shrink-0 px-5 pt-5">
            <button
              type="button"
              onClick={() => setScreen("detail")}
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
              {activeHotspot.quiz.question[locale]}
            </h2>

            <div className="mt-8 space-y-3">
              {activeHotspot.quiz.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setQuizAnswer(option.id)}
                  className={`min-h-14 w-full rounded-2xl border px-4 text-left text-base font-bold shadow-sm ${
                    quizAnswer === option.id
                      ? "border-red-700 bg-red-700 text-white"
                      : "border-black/10 bg-white text-neutral-950"
                  }`}
                >
                  {option.label[locale]}
                </button>
              ))}
            </div>

            {quizResult !== null && (
              <p
                className={`mt-6 rounded-2xl px-4 py-4 text-base font-black ${
                  quizResult
                    ? "bg-green-100 text-green-900"
                    : "bg-yellow-100 text-yellow-900"
                }`}
              >
                {quizResult ? text.correct : text.wrong}
              </p>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
