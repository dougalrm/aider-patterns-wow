"use client";

import { useEffect, useState } from "react";

export default function ArticleEnhancements() {
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const article = document.querySelector(".js-article");
      if (!article) return;
      const total = article.scrollHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(window.scrollY - (article.offsetTop - 80), 0), total);
      const pct = total > 0 ? scrolled / total : 0;
      setProgress(pct);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-[52px] h-0.5 bg-brand-600/70 origin-left transition-transform duration-100 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
      <button
        type="button"
        onClick={copyLink}
        className="fixed bottom-6 right-6 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-3 text-sm text-white shadow hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a3 3 0 0 1 0 6h-1a1 1 0 1 1 0-2h1a1 1 0 1 0 0-2h-1a1 1 0 1 1 0-2h1Zm-8 6a3 3 0 0 1 0-6h1a1 1 0 1 1 0 2H8a1 1 0 1 0 0 2h1a1 1 0 1 1 0 2H8Z" />
          <path d="M9 11h6a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2Z" />
        </svg>
        <span>{copied ? "Link copied" : "Copy link"}</span>
      </button>
    </>
  );
}
