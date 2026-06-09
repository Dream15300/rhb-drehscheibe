"use client";

import { useEffect, useMemo, useState } from "react";
import CompletedScreen from "@/components/screens/CompletedScreen";
import DetailScreen from "@/components/screens/DetailScreen";
import ExploreScreen from "@/components/screens/ExploreScreen";
import IntroScreen from "@/components/screens/IntroScreen";
import QuizScreen from "@/components/screens/QuizScreen";
import { type HotspotInfo, hotspots } from "@/lib/hotspots";
import { type Locale, uiText } from "@/lib/i18n";
import { usePersistentState } from "@/lib/usePersistentState";

type Screen = "intro" | "explore" | "detail" | "quiz" | "completed";

const total = hotspots.length;

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Pro Bauteil eine zufällige Reihenfolge der Antwort-IDs erzeugen.
function buildOptionOrders(): Record<string, string[]> {
  const orders: Record<string, string[]> = {};
  for (const hotspot of hotspots) {
    orders[hotspot.id] = shuffle(hotspot.quiz.options.map((option) => option.id));
  }
  return orders;
}

export default function Home() {
  const [locale, setLocale] = usePersistentState<Locale>("rhb.locale", "de");
  const [discoveredIds, setDiscoveredIds] = usePersistentState<string[]>(
    "rhb.discovered",
    [],
  );
  const [screen, setScreen] = useState<Screen>("intro");
  const [activeHotspot, setActiveHotspot] = useState<HotspotInfo | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [showHotspots, setShowHotspots] = useState(true);
  // Im aktuellen „Weiter"-Durchlauf bereits geöffnete Bauteile – damit jedes
  // pro Durchlauf höchstens einmal angesteuert wird (auch bei falschen Antworten).
  const [visitedIds, setVisitedIds] = useState<string[]>([]);
  // Zufällige Antwort-Reihenfolge je Bauteil: stabil pro Sitzung, neu bei
  // jedem Laden (neue Sitzung) und beim Zurücksetzen.
  const [optionOrders, setOptionOrders] =
    useState<Record<string, string[]>>(buildOptionOrders);

  const text = uiText[locale];

  // `<html lang>` an die gewählte Sprache koppeln (Barrierefreiheit/SEO).
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // Nur tatsächlich existierende Bauteile zählen (robust gegen alte Einträge).
  const discoveredCount = useMemo(
    () => hotspots.filter((hotspot) => discoveredIds.includes(hotspot.id)).length,
    [discoveredIds],
  );

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
    setVisitedIds((current) =>
      current.includes(hotspot.id) ? current : [...current, hotspot.id],
    );
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

  // Eine richtige Antwort markiert das Bauteil zugleich als entdeckt.
  function answerQuiz(optionId: string) {
    setQuizAnswer(optionId);
    if (activeHotspot && optionId === activeHotspot.quiz.correctOptionId) {
      markDiscovered();
    }
  }

  function backToModel() {
    setActiveHotspot(null);
    setQuizAnswer(null);
    setVisitedIds([]); // Durchlauf beenden -> Besuchsliste zurücksetzen.
    setScreen("explore");
  }

  // „Weiter" springt zum nächsten Bauteil, das in diesem Durchlauf noch nicht
  // besucht und noch nicht entdeckt wurde (in Reihenfolge, mit Umlauf). So wird
  // jedes Bauteil pro Durchlauf höchstens einmal angesteuert (max. 8). Gibt es
  // keins mehr, geht es zurück zum Modell.
  function goToNextHotspot() {
    if (!activeHotspot) return;

    const startIndex = hotspots.findIndex((h) => h.id === activeHotspot.id);
    for (let offset = 1; offset < hotspots.length; offset++) {
      const candidate = hotspots[(startIndex + offset) % hotspots.length];
      if (
        !visitedIds.includes(candidate.id) &&
        !discoveredIds.includes(candidate.id)
      ) {
        openHotspot(candidate);
        return;
      }
    }

    // Keine offenen Bauteile mehr -> zurück zum Modell.
    backToModel();
  }

  function resetProgress() {
    setDiscoveredIds([]);
    setActiveHotspot(null);
    setQuizAnswer(null);
    setVisitedIds([]);
    setOptionOrders(buildOptionOrders()); // Antworten neu mischen.
    setScreen("explore");
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-red-700 focus:px-4 focus:py-3 focus:text-sm focus:font-black focus:text-white focus:shadow-lg"
      >
        {text.skipToContent}
      </a>

      <main
        id="main-content"
        tabIndex={-1}
        className="fixed inset-0 h-dvh overflow-hidden bg-[#f5f1ea] text-neutral-950 outline-none"
      >
        {screen === "intro" && (
        <IntroScreen
          text={text}
          locale={locale}
          hasProgress={discoveredCount > 0}
          onSelectLocale={setLocale}
          onStart={() => setScreen("explore")}
          onReset={resetProgress}
        />
      )}

      {screen === "explore" && (
        <ExploreScreen
          text={text}
          locale={locale}
          discoveredIds={discoveredIds}
          discoveredCount={discoveredCount}
          total={total}
          showHotspots={showHotspots}
          onToggleHotspots={() => setShowHotspots((current) => !current)}
          onSelectHotspot={openHotspot}
          onHome={() => setScreen("intro")}
          onShowCompleted={() => setScreen("completed")}
        />
      )}

      {screen === "detail" && activeHotspot && (
        <DetailScreen
          text={text}
          locale={locale}
          hotspot={activeHotspot}
          isDiscovered={isDiscovered}
          onBack={backToModel}
          onMarkDiscovered={markDiscovered}
          onOpenQuiz={() => setScreen("quiz")}
        />
      )}

      {screen === "quiz" && activeHotspot && (
        <QuizScreen
          text={text}
          locale={locale}
          hotspot={activeHotspot}
          optionOrder={optionOrders[activeHotspot.id] ?? []}
          selectedOptionId={quizAnswer}
          result={quizResult}
          onBack={() => setScreen("detail")}
          onAnswer={answerQuiz}
          onNext={goToNextHotspot}
          onToModel={backToModel}
        />
      )}

      {screen === "completed" && (
        <CompletedScreen
          text={text}
          discoveredCount={discoveredCount}
          total={total}
          onBackToModel={() => setScreen("explore")}
          onReset={resetProgress}
        />
      )}
      </main>
    </>
  );
}
