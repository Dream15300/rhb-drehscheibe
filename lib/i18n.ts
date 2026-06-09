export type Locale = "de" | "fr" | "en";

export type LocalizedText = Record<Locale, string>;

export const locales: Locale[] = ["de", "fr", "en"];

export type UiText = {
  appLabel: string;
  title: string;
  intro: string;
  start: string;
  hint: string;
  component: string;
  back: string;
  short: string;
  technical: string;
  why: string;
  discovered: string;
  discoveredDone: string;
  quiz: string;
  quizButton: string;
  correct: string;
  wrong: string;
  hotspotsOn: string;
  hotspotsOff: string;
  languageLabel: string;
  webglError: string;
  progressLabel: string;
  next: string;
  completedTitle: string;
  completedText: string;
  toModel: string;
  reset: string;
  menu: string;
};

export const uiText = {
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
    languageLabel: "Sprache wählen",
    webglError:
      "Die 3D-Ansicht konnte nicht geladen werden. Bitte aktualisiere die Seite oder verwende einen Browser mit WebGL-Unterstützung.",
    progressLabel: "entdeckt",
    next: "Weiter zum nächsten Bauteil",
    completedTitle: "Alles entdeckt! 🎉",
    completedText:
      "Du hast alle Bauteile der Drehscheibe erkundet. Gut gemacht!",
    toModel: "Zurück zum Modell",
    reset: "Fortschritt zurücksetzen",
    menu: "Menü",
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
    languageLabel: "Choisir la langue",
    webglError:
      "La vue 3D n'a pas pu être chargée. Veuillez actualiser la page ou utiliser un navigateur compatible WebGL.",
    progressLabel: "découverts",
    next: "Élément suivant",
    completedTitle: "Tout est découvert! 🎉",
    completedText:
      "Tu as exploré tous les éléments de la plaque tournante. Bravo!",
    toModel: "Retour au modèle",
    reset: "Réinitialiser la progression",
    menu: "Menu",
  },

  en: {
    appLabel: "DFB Explorer App",
    title: "Hand-operated Furka turntable",
    intro:
      "Explore a historic hand-operated railway turntable. Rotate the model with your finger and open the marked components.",
    start: "Explore the object",
    hint: "Drag with one finger horizontally or vertically. Tap the labels.",
    component: "Component",
    back: "Back",
    short: "In brief",
    technical: "Technical detail",
    why: "Why it matters",
    discovered: "Mark as discovered",
    discoveredDone: "Discovered",
    quiz: "Quiz question",
    quizButton: "Open quiz",
    correct: "Correct",
    wrong: "Try again",
    hotspotsOn: "Labels ON",
    hotspotsOff: "Labels OFF",
    languageLabel: "Choose language",
    webglError:
      "The 3D view could not be loaded. Please reload the page or use a browser that supports WebGL.",
    progressLabel: "discovered",
    next: "Next component",
    completedTitle: "All discovered! 🎉",
    completedText:
      "You have explored every component of the turntable. Well done!",
    toModel: "Back to the model",
    reset: "Reset progress",
    menu: "Menu",
  },
} satisfies Record<Locale, UiText>;
