import path from 'path';
import { loadArticleBySlug, resolveContentDir } from '../../lib/contentLoader';

export async function generateStaticParams() {
  // Optionally pre-generate can be implemented by loading all slugs; keep empty for on-demand.
  return [];
}

function rewriteRelativeUrls(html, baseHref) {
  if (!baseHref) return html;
  return html.replace(/(src|href)="(?!https?:|\/|#)([^"]+)"/g, (_m, attr, url) => {
    return `${attr}="${baseHref}${url}"`;
  });
}

export default async function ArticlePage({ params }) {
  const { slug } = params;
  const article = await loadArticleBySlug(slug);

  if (!article) {
    // Next will render the 404 page
    return null;
  }

  // Compute base href for relative images under /content
  const CONTENT_DIR = resolveContentDir();
  const relDir = path.relative(CONTENT_DIR, path.dirname(article.sourcePath));
  const baseHref = '/content/' + (relDir ? relDir.replace(/\\/g, '/') + '/' : '');

  // Estimate reading time (~200 wpm) from rendered HTML text
  const text = String(article.html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text ? text.split(' ').length : 0;
  const minutes = Math.max(1, Math.round(words / 200));
  const readingTime = `${minutes} min read`;

  const rewrittenHtml = rewriteRelativeUrls(article.html, baseHref);

  return (
    <>
      <section className="mb-8">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-brand-600/10 via-indigo-500/5 to-sky-500/10 p-6 dark:border-slate-700">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{article.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
            {article.date && <span>{new Date(article.date).toLocaleDateString()}</span>}
            <span aria-hidden="true">•</span>
            <span>{readingTime}</span>
          </div>
          {article.tags?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">{tag}</span>
              ))}
            </div>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M7.707 14.707a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414l4-4A1 1 0 0 1 8 6v2h6a1 1 0 1 1 0 2H8v2a1 1 0 0 1-.293.707Z"/></svg>
              Back
            </a>
            {/* Copy link handled client-side below */}
          </div>
        </div>
      </section>

      <section>
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-3xl mx-auto prose-a:text-brand-700 hover:prose-a:text-brand-600 prose-img:rounded-lg js-article" dangerouslySetInnerHTML={{ __html: rewrittenHtml }} />
      </section>

      <ArticleEnhancements />
    </>
  );
}

function ArticleEnhancements() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
(function () {
  // Copy current URL to clipboard
  const btn = document.createElement('button');
  btn.id = 'copy-link';
  btn.className = 'fixed bottom-6 right-6 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-3 py-1.5 text-sm text-white shadow hover:bg-brand-700';
  btn.innerHTML = '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a3 3 0 0 1 0 6h-1a1 1 0 1 1 0-2h1a1 1 0 1 0 0-2h-1a1 1 0 1 1 0-2h1Zm-8 6a3 3 0 0 1 0-6h1a1 1 0 1 1 0 2H8a1 1 0 1 0 0 2h1a1 1 0 1 1 0 2H8Z"/><path d="M9 11h6a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2Z"/></svg><span>Copy link</span>';
  document.body.appendChild(btn);

  btn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      btn.querySelector('span').textContent = 'Link copied';
      setTimeout(() => (btn.querySelector('span').textContent = 'Copy link'), 1500);
    } catch {}
  });

  // Reading progress bar
  const article = document.querySelector('.js-article');
  if (!article) return;
  const bar = document.createElement('div');
  bar.setAttribute('aria-hidden', 'true');
  bar.className = 'fixed inset-x-0 top-[52px] h-0.5 bg-brand-600/70 origin-left scale-x-0 transition-transform duration-100 ease-out';
  document.body.appendChild(bar);

  function onScroll() {
    const total = article.scrollHeight - window.innerHeight;
    const scrolled = Math.min(Math.max(window.scrollY - (article.offsetTop - 80), 0), total);
    const pct = total > 0 ? scrolled / total : 0;
    bar.style.transform = 'scaleX(' + pct + ')';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
        `.trim()
      }}
    />
  );
}
