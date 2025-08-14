'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useEffect, useState } from 'react';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-blue-400 text-white font-bold">A</span>
          <span className="text-lg font-semibold tracking-tight">Agile Articles</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600 dark:text-slate-300">
          <Link className="hover:text-slate-900 dark:hover:text-white" href="/">Home</Link>
          {mounted && <ThemeToggle />}
        </nav>
      </div>
    </header>
  );
}
