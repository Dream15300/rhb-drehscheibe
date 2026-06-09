"use client";

import { useCallback, useSyncExternalStore } from "react";

const CHANGE_EVENT = "rhb:persistent-state";

/**
 * Stabilisiert die geparsten Snapshots pro Key. `useSyncExternalStore` verlangt,
 * dass `getSnapshot` zwischen Renders eine referenz-stabile Ausgabe liefert –
 * sonst entstehen Endlos-Renders. Wir cachen das Ergebnis, solange sich der
 * rohe localStorage-String nicht ändert.
 */
const snapshotCache = new Map<string, { raw: string | null; value: unknown }>();

function readSnapshot<T>(key: string, initialValue: T): T {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    // localStorage nicht verfügbar – Initialwert verwenden.
  }

  const cached = snapshotCache.get(key);
  if (cached && cached.raw === raw) {
    return cached.value as T;
  }

  let value = initialValue;
  if (raw !== null) {
    try {
      value = JSON.parse(raw) as T;
    } catch {
      value = initialValue;
    }
  }

  snapshotCache.set(key, { raw, value });
  return value;
}

/**
 * Wie `useState`, aber der Wert wird in `localStorage` gespiegelt.
 *
 * Auf Basis von `useSyncExternalStore`: Server- und Hydrations-Render nutzen den
 * Initialwert (kein Hydration-Mismatch), nach der Hydration wird der gespeicherte
 * Wert übernommen. Änderungen werden zurückgeschrieben und über ein Custom-Event
 * an alle Verwender desselben Keys verteilt.
 */
export function usePersistentState<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const handler = (event: Event) => {
        if (event instanceof CustomEvent && event.detail !== key) return;
        onStoreChange();
      };
      window.addEventListener(CHANGE_EVENT, handler);
      window.addEventListener("storage", onStoreChange);
      return () => {
        window.removeEventListener(CHANGE_EVENT, handler);
        window.removeEventListener("storage", onStoreChange);
      };
    },
    [key],
  );

  const value = useSyncExternalStore(
    subscribe,
    () => readSnapshot(key, initialValue),
    () => initialValue,
  );

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const resolved =
        typeof next === "function"
          ? (next as (prev: T) => T)(readSnapshot(key, initialValue))
          : next;

      try {
        window.localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        // Schreiben fehlgeschlagen (z. B. privater Modus) – still ignorieren.
      }

      window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: key }));
    },
    [key, initialValue],
  );

  return [value, setValue];
}
