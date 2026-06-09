"use client";

import { useEffect, useRef } from "react";

/**
 * Setzt beim Mounten den Fokus auf das referenzierte Element.
 * Genutzt für Fokus-Management beim Screenwechsel (Barrierefreiheit):
 * Tastatur- und Screenreader-Nutzer landen auf der neuen Überschrift statt
 * den Kontext zu verlieren. Das Zielelement sollte `tabIndex={-1}` tragen.
 */
export function useFocusOnMount<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return ref;
}
