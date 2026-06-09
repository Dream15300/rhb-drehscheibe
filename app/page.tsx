"use client";

import { useEffect, useMemo, useState } from "react";
import DetailScreen from "@/components/screens/DetailScreen";
import ExploreScreen from "@/components/screens/ExploreScreen";
import IntroScreen from "@/components/screens/IntroScreen";
import QuizScreen from "@/components/screens/QuizScreen";
import type { HotspotInfo } from "@/lib/hotspots";
import { type Locale, uiText } from "@/lib/i18n";
import { usePersistentState } from "@/lib/usePersistentState";

type Screen = "intro" | "explore" | "detail" | "quiz";

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

  const text = uiText[locale];

  // `<html lang>` an die gewählte Sprache koppeln (Barrierefreiheit/SEO).
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

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
        <IntroScreen
          text={text}
          locale={locale}
          onSelectLocale={setLocale}
          onStart={() => setScreen("explore")}
        />
      )}

      {screen === "explore" && (
        <ExploreScreen
          text={text}
          locale={locale}
          discoveredIds={discoveredIds}
          showHotspots={showHotspots}
          onToggleHotspots={() => setShowHotspots((current) => !current)}
          onSelectHotspot={openHotspot}
        />
      )}

      {screen === "detail" && activeHotspot && (
        <DetailScreen
          text={text}
          locale={locale}
          hotspot={activeHotspot}
          isDiscovered={isDiscovered}
          onBack={goBackToExplore}
          onMarkDiscovered={markDiscovered}
          onOpenQuiz={() => setScreen("quiz")}
        />
      )}

      {screen === "quiz" && activeHotspot && (
        <QuizScreen
          text={text}
          locale={locale}
          hotspot={activeHotspot}
          selectedOptionId={quizAnswer}
          result={quizResult}
          onBack={() => setScreen("detail")}
          onAnswer={setQuizAnswer}
        />
      )}
    </main>
  );
}
