'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [year, setYear] = useState('');
  useEffect(() => setYear(String(new Date().getFullYear())), []);

  return (
    <footer className="mt-16">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="ornate-divider text-xs uppercase tracking-[0.2em] mb-8">Guild of Workings</div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="font-serif text-slate-800 mb-3">Navigate</h4>
            <ul className="space-y-1.5">
              <li><Link className="footer-link" href="/">Home</Link></li>
              <li><Link className="footer-link" href="/articles">Articles</Link></li>
              <li><Link className="footer-link" href="/collections">Collections</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-slate-800 mb-3">Learn</h4>
            <ul className="space-y-1.5">
              <li><Link className="footer-link" href="/about">About</Link></li>
              <li><Link className="footer-link" href="/glossary">Glossary</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-slate-800 mb-3">Connect</h4>
            <ul className="space-y-1.5">
              <li><Link className="footer-link" href="/contact">Contact</Link></li>
              <li><a className="footer-link" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-slate-800 mb-3">Legal</h4>
            <ul className="space-y-1.5">
              <li><Link className="footer-link" href="/terms">Terms</Link></li>
              <li><Link className="footer-link" href="/privacy">Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/30 pt-6 text-xs text-slate-600">
          <p>&copy; <span>{year}</span> Ways of Working. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
