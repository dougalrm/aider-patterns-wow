import path from 'path';
import Link from 'next/link';
import ArticleEnhancements from '../components/ArticleEnhancements';
import { loadArticleBySlug, resolveContentDir } from '../../lib/contentLoader';

export async function generateStaticParams() {
  // Optionally pre-generate can be implemented by loading all slugs; keep empty for on-demand.
  return [];
}

export async function generateMetadata({ params }) {
  const article = await loadArticleBySlug(params.slug);
  if (!article) return { title: 'Not Found' };
  return {
    title: article.title + ' • Agile Articles',
    description: article.description || 'Agile ways of working — a curated set of articles.'
  };
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
            <Link href="/" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M7.707 14.707a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414l4-4A1 1 0 0 1 8 6v2h6a1 1 0 1 1 0 2H8v2a1 1 0 0 1-.293.707Z"/></svg>
              Back
            </Link>
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

