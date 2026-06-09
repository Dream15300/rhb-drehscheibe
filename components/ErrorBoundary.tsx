"use client";

import { Component, type ReactNode } from "react";

type Props = {
  fallback: ReactNode;
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

/**
 * Minimaler Fehler-Rahmen für die WebGL-Canvas: Fängt Render-Fehler ab
 * (z. B. fehlende WebGL-Unterstützung) und zeigt einen verständlichen
 * Hinweis statt einer weißen Fläche.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
