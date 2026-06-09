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

  // Nur tatsächlich existierende Bauteile zählen (robust gegen alte Einträge).
  const discoveredCount = useMemo(
    () => hotspots.filter((hotspot) => discoveredIds.includes(hotspot.id)).length,
    [discoveredIds],
  );
  const allDiscovered = total > 0 && discoveredCount === total;

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

  // Eine richtige Antwort markiert das Bauteil zugleich als entdeckt.
  function answerQuiz(optionId: string) {
    setQuizAnswer(optionId);
    if (activeHotspot && optionId === activeHotspot.quiz.correctOptionId) {
      markDiscovered();
    }
  }

  function goToNextHotspot() {
    if (!activeHotspot) return;
    const index = hotspots.findIndex((h) => h.id === activeHotspot.id);
    openHotspot(hotspots[(index + 1) % hotspots.length]);
  }

  // Nach dem Erkunden zurück ins Modell – oder zum Abschluss-Screen,
  // sobald alle Bauteile entdeckt wurden.
  function leaveDetail() {
    setActiveHotspot(null);
    setQuizAnswer(null);
    setScreen(allDiscovered ? "completed" : "explore");
  }

  function resetProgress() {
    setDiscoveredIds([]);
    setActiveHotspot(null);
    setQuizAnswer(null);
    setScreen("explore");
  }

  return (
    <main className="fixed inset-0 h-dvh overflow-hidden bg-[#f5f1ea] text-neutral-950">
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
        />
      )}

      {screen === "detail" && activeHotspot && (
        <DetailScreen
          text={text}
          locale={locale}
          hotspot={activeHotspot}
          isDiscovered={isDiscovered}
          onBack={leaveDetail}
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
          onAnswer={answerQuiz}
          onNext={goToNextHotspot}
          onToModel={leaveDetail}
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
  );
}
