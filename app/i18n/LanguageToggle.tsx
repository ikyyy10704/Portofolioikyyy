"use client";

import { LANGUAGES, useLanguage } from "./LanguageProvider";

const labels: Record<string, string> = { en: "EN", id: "ID" };

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center rounded-full bg-slate-100 p-0.5 dark:bg-white/10"
    >
      {LANGUAGES.map((option) => {
        const isActive = option === language;
        return (
          <button
            key={option}
            type="button"
            onClick={() => setLanguage(option)}
            aria-pressed={isActive}
            className={`rounded-full px-2.5 py-1 text-xs font-bold transition-colors ${
              isActive
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            {labels[option]}
          </button>
        );
      })}
    </div>
  );
}
