'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useEffect, useState } from 'react';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <header className="sticky top-0 z-20 border-b border-white/20 bg-white/60 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/40">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 via-brand-500 to-cyan-400 text-white font-bold drop-shadow-neon">A</span>
          <span className="text-lg font-semibold tracking-tight text-glow">Agile Articles</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600 dark:text-slate-300">
          <Link className="transition hover:text-brand-600 dark:hover:text-brand-100 hover:underline underline-offset-4 decoration-brand-600/60" href="/">Home</Link>
          {mounted && <ThemeToggle />}
        </nav>
      </div>
    </header>
  );
}
