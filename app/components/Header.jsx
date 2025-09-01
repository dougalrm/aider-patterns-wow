'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useEffect, useState } from 'react';
import { Mail, Aperture, Layers, Orbit, Sparkles, FlaskConical, BookOpen } from 'lucide-react';

function BrandGlyph() {
  // Change the selected value to try different brand icons:
  // 'orbit' | 'aperture' | 'layers' | 'sparkles' | 'hexagon' | 'book'
  const selected = 'flask';
  const className = 'h-6 w-6';
  switch (selected) {
    case 'aperture':
      return <Aperture aria-hidden="true" className={className} />;
    case 'layers':
      return <Layers aria-hidden="true" className={className} />;
    case 'sparkles':
      return <Sparkles aria-hidden="true" className={className} />;
    case 'flask':
      return <FlaskConical aria-hidden="true" className={className} />;
    case 'book':
      return <BookOpen aria-hidden="true" className={className} />;
    case 'orbit':
    default:
      return <Orbit aria-hidden="true" className={className} />;
  }
}



export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    function onScroll() {
      setScrolled(window.scrollY > 2);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 transition-shadow ${scrolled ? 'shadow-[0_10px_30px_rgba(30,41,59,0.12)]' : ''}`}
    >
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-glyph">
              <BrandGlyph />
            </span>
          </span>
          <span className="text-xl font-semibold tracking-tight text-glow">Ways of Working</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          <Link className="nav-link" href="/">Home</Link>
          <Link className="nav-link" href="/articles">Articles</Link>
          <Link className="nav-link" href="/collections">Collections</Link>
          <Link className="nav-link" href="/about">About</Link>
          <Link className="nav-link" href="/glossary">Glossary</Link>
          {mounted && <ThemeToggle />}
          <Link className="nav-cta" href="/contact">
            <Mail aria-hidden="true" className="h-5 w-5" />
            <span>Contact</span>
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center rounded-md border border-slate-600/40 bg-slate-900/50 px-3 py-2 text-sm text-slate-200 shadow-sm backdrop-blur transition hover:bg-slate-900/70"
        >
          <span className="sr-only">Open menu</span>
          <span className={`block h-0.5 w-5 bg-foreground transition ${open ? 'rotate-45 translate-y-1' : ''}`} />
          <span className={`block h-0.5 w-5 bg-foreground my-1 transition ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 bg-foreground transition ${open ? '-rotate-45 -translate-y-1' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="mobile-nav">
          <div className="mx-auto max-w-7xl px-6 py-4 grid gap-3">
            <Link className="nav-link" href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link className="nav-link" href="/articles" onClick={() => setOpen(false)}>Articles</Link>
            <Link className="nav-link" href="/collections" onClick={() => setOpen(false)}>Collections</Link>
            <Link className="nav-link" href="/about" onClick={() => setOpen(false)}>About</Link>
            <Link className="nav-link" href="/glossary" onClick={() => setOpen(false)}>Glossary</Link>
            <Link className="nav-cta w-full justify-center" href="/contact" onClick={() => setOpen(false)}>
              <Mail aria-hidden="true" className="h-5 w-5" />
              <span>Contact</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
