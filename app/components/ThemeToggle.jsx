'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldDark = stored === 'dark' || (!stored && prefersDark);
    root.classList.toggle('dark', shouldDark);
    setIsDark(shouldDark);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <button
      type="button"
      onClick={() => setIsDark((v) => !v)}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
      aria-label="Toggle dark mode"
    >
      <svg className={`h-4 w-4 ${isDark ? '' : 'hidden'}`} viewBox="0 0 24 24" fill="currentColor"><path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4a1 1 0 0 0 1-1v-1.05a1 1 0 1 0-2 0V21a1 1 0 0 0 1 1Zm0-18a1 1 0 0 0 1-1V2a1 1 0 1 0-2 0v1a1 1 0 0 0 1 1Zm10 9a1 1 0 0 0-1-1h-1.05a1 1 0 1 0 0 2H21a1 1 0 0 0 1-1ZM4.05 12a1 1 0 1 0 0-2H3a1 1 0 1 0 0 2h1.05ZM18.364 18.364a1 1 0 0 0 0-1.414l-.743-.743a1 1 0 1 0-1.414 1.414l.743.743a1 1 0 0 0 1.414 0ZM7.793 7.793a1 1 0 0 0 0-1.414l-.743-.743A1 1 0 1 0 5.636 7.05l.743.743a1 1 0 0 0 1.414 0Zm8.828-2.157a1 1 0 0 0-1.414 0l-.743.743a1 1 0 1 0 1.414 1.414l.743-.743a1 1 0 0 0 0-1.414ZM7.05 18.364a1 1 0 0 0 0-1.414l-.743-.743A1 1 0 1 0 4.893 17.62l.743.743a1 1 0 0 0 1.414 0Z"/></svg>
      <svg className={`h-4 w-4 ${isDark ? 'hidden' : ''}`} viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z"/></svg>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
