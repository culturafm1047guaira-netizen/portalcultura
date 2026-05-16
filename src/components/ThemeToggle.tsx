"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button className="p-1.5 rounded-full bg-white/10 w-8 h-8" aria-label="Toggle theme" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors w-8 h-8 flex items-center justify-center"
      aria-label={isDark ? "Modo Claro" : "Modo Noturno"}
      title={isDark ? "Modo Claro" : "Modo Noturno"}
    >
      {/* Sol */}
      <svg
        className={`w-4 h-4 fill-yellow-300 transition-all duration-300 absolute ${isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
        viewBox="0 0 24 24"
      >
        <path d="M12 4.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V5a.75.75 0 01.75-.75zM5 12a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 12zm14 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM7.05 7.05a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06L7.05 8.11a.75.75 0 010-1.06zm9.9 9.9a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM12 8.5A3.5 3.5 0 1012 15a3.5 3.5 0 000-7z" />
      </svg>
      {/* Lua */}
      <svg
        className={`w-4 h-4 fill-blue-200 transition-all duration-300 absolute ${isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`}
        viewBox="0 0 24 24"
      >
        <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    </button>
  );
}
