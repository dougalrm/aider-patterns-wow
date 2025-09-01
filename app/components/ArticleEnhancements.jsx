"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Link as LinkIcon, Check } from "lucide-react";

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
      toast.success('Link copied');
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  const displayed = progress < 0.005 ? 0 : progress;

  return (
    <>
      <div className="pointer-events-none fixed left-0 bottom-0 z-50 w-full">
        <div
          role="progressbar"
          aria-label="Reading progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(displayed * 100)}
          className="progress-bar h-2 bg-indigo-500/90 transition-[width,opacity] duration-200 ease-out"
          style={{ width: `${displayed * 100}%`, opacity: displayed < 0.1 ? 0 : 1 }}
        />
      </div>
      <button
        type="button"
        onClick={copyLink}
        className="btn btn-primary fixed bottom-6 right-6 shadow"
      >
        {copied ? <Check aria-hidden="true" className="h-5 w-5" /> : <LinkIcon aria-hidden="true" className="h-5 w-5" />}
        <span>{copied ? "Link copied" : "Copy link"}</span>
      </button>
    </>
  );
}
