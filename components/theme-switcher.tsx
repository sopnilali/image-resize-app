"use client";

import { useEffect, useState } from "react";

type ThemeMode = "system" | "dark" | "light";

const STORAGE_KEY = "image-resizer-theme";

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  if (mode === "system") {
    root.removeAttribute("data-theme");
    return;
  }
  root.setAttribute("data-theme", mode);
}

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Exclude<ThemeMode, "system">>("dark");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    const nextTheme: Exclude<ThemeMode, "system"> =
      saved === "dark" || saved === "light"
        ? saved
        : window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }, []);

  const setAndPersist = (mode: Exclude<ThemeMode, "system">) => {
    setTheme(mode);
    localStorage.setItem(STORAGE_KEY, mode);
    applyTheme(mode);
  };

  return (
    <div className="theme-switcher" role="group" aria-label="Theme switcher">
      <button
        type="button"
        className={`footer-theme-btn${theme === "dark" ? " active" : ""}`}
        onClick={() => setAndPersist("dark")}
      >
        Dark
      </button>
      <button
        type="button"
        className={`footer-theme-btn${theme === "light" ? " active" : ""}`}
        onClick={() => setAndPersist("light")}
      >
        Light
      </button>
    </div>
  );
}
