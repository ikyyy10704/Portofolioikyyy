"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

export type Language = "en" | "id";

export const LANGUAGES: Language[] = ["en", "id"];

const STORAGE_KEY = "portfolio-language";
const CHANGE_EVENT = "portfolio-language-change";

/**
 * Language lives in localStorage rather than in React state so that every component
 * reads the same value without a provider having to sit above all of them, and so a
 * second tab picks the change up through the native storage event.
 */
function subscribe(onStoreChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function readStoredLanguage(): Language {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "id" ? "id" : "en";
  } catch {
    return "en";
  }
}

// English is the default, so the server and the hydration pass always agree on it.
function readDefaultLanguage(): Language {
  return "en";
}

export function useLanguage() {
  const language = useSyncExternalStore(subscribe, readStoredLanguage, readDefaultLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // A blocked storage API should not stop the toggle from working for this render.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return { language, setLanguage };
}

/** Picks the active language out of a bilingual record. */
export function translate<T>(entry: Record<Language, T>, language: Language): T {
  return entry[language] ?? entry.en;
}
