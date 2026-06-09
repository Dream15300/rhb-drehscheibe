"use client";

import { useEffect } from "react";

/**
 * Registriert den Service Worker für den Offline-Betrieb.
 * Nur in Produktion aktiv – im Dev-Modus würde aggressives Caching die
 * Hot-Reload-Entwicklung stören.
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {
        // Registrierung fehlgeschlagen – App funktioniert weiterhin online.
      });
    };

    window.addEventListener("load", register);
    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}
