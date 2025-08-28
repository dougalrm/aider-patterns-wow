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

  return (
    <>
      <div
        aria-hidden="true"
        className="progress-bar"
        style={{ transform: `scaleX(${progress})` }}
      />
      <button
        type="button"
        onClick={copyLink}
        className="btn btn-primary fixed bottom-6 right-6 shadow"
      >
        {copied ? <Check className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
        <span>{copied ? "Link copied" : "Copy link"}</span>
      </button>
    </>
  );
}
