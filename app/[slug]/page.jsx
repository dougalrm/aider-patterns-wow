import path from 'path';
import Link from 'next/link';
import ArticleEnhancements from '../components/ArticleEnhancements';
import TableOfContents from '../components/TableOfContents';
import { loadArticleBySlug, resolveContentDir } from '../../lib/contentLoader';
import { FileText, ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';

export async function generateStaticParams() {
  // Optionally pre-generate can be implemented by loading all slugs; keep empty for on-demand.
  return [];
}

export async function generateMetadata({ params }) {
  const article = await loadArticleBySlug(params.slug);
  if (!article) return { title: 'Not Found' };
  return {
    title: article.title + ' • Team Patterns',
    description: article.description || 'Ways of working for your org — a curated set of articles.'
  };
}

function rewriteRelativeUrls(html, baseHref) {
  if (!baseHref) return html;
  return html.replace(/(src|href)="(?!https?:|\/|#)([^"]+)"/g, (_m, attr, url) => {
    return `${attr}="${baseHref}${url}"`;
  });
}
 
function slugify(text) {
  return String(text)
    .trim()
    .toLowerCase()
    .replace(/['"’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function injectHeadingIds(html) {
  if (!html) return html;
  return html.replace(/<h([2-4])([^>]*)>(.*?)<\/h\1>/gi, (m, level, attrs, inner) => {
    if (/\sid=/.test(attrs)) return m;
    const text = String(inner).replace(/<[^>]+>/g, '').trim();
    const id = slugify(text);
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
  });
}

function extractHeadings(html) {
  const items = [];
  if (!html) return items;
  html.replace(/<h([2-4])([^>]*)>(.*?)<\/h\1>/gi, (m, level, attrs, inner) => {
    const text = String(inner).replace(/<[^>]+>/g, '').trim();
    const idMatch = attrs.match(/\sid=["']([^"']+)["']/i) || m.match(/\sid=["']([^"']+)["']/i);
    const id = idMatch ? idMatch[1] : slugify(text);
    items.push({ id, text, level: Number(level) });
    return m;
  });
  return items;
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
  const htmlWithIds = injectHeadingIds(rewrittenHtml);
  const toc = extractHeadings(htmlWithIds);

  return (
    <>
      <section className="mb-10">
        <div className="relative overflow-hidden rounded-2xl border border-indigo-400/40 bg-gradient-to-br from-indigo-900/50 via-indigo-950/40 to-violet-950/40 backdrop-blur-xl p-6 md:p-8 shadow-lg shadow-purple-900/40">
          <div aria-hidden="true" className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />

          <div className="flex items-start gap-3">
            <div className="mt-1 rounded-lg bg-indigo-400/10 p-2 ring-1 ring-inset ring-indigo-300/20">
              <FileText aria-hidden="true" className="h-6 w-6 text-indigo-200" />
            </div>
            <div className="min-w-0">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-indigo-100 via-white to-indigo-100 bg-clip-text text-transparent">
                  {article.title}
                </span>
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-indigo-200/85">
                {article.date && (
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar aria-hidden="true" className="h-4 w-4 opacity-80" />
                    {new Date(article.date).toLocaleDateString()}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Clock aria-hidden="true" className="h-4 w-4 opacity-80" />
                  {readingTime}
                </span>
              </div>
            </div>
          </div>

          {article.description ? (
            <p className="mt-4 max-w-3xl text-indigo-100/95 leading-relaxed">
              {article.description}
            </p>
          ) : null}

          {article.tags?.length ? (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/articles?tag=${encodeURIComponent(String(tag).toLowerCase())}`}
                  className="inline-flex items-center gap-1 rounded-full border border-indigo-400/40 bg-indigo-950/30 px-2.5 py-1 text-xs text-indigo-200 transition hover:bg-indigo-900/40"
                >
                  <Tag aria-hidden="true" className="h-3.5 w-3.5 opacity-80" />
                  <span>{tag}</span>
                </Link>
              ))}
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-sm text-indigo-100 ring-1 ring-inset ring-white/10 transition hover:bg-white/10"
            >
              <ArrowLeft aria-hidden="true" className="h-5 w-5" />
              Back to Home
            </Link>
            {/* Copy link handled client-side below */}
          </div>
        </div>
      </section>

      <section className="relative">
        <div>
          <div className="mb-6 lg:hidden">
            <TableOfContents toc={toc} variant="inline" />
          </div>
          <div className="rounded-xl border border-indigo-400/50 bg-indigo-950/40 backdrop-blur-md shadow-lg shadow-purple-900/50">
            <div className="prose prose-lg max-w-none prose-img:rounded-lg js-article" dangerouslySetInnerHTML={{ __html: htmlWithIds }} />
          </div>
        </div>
        <aside className="hidden 2xl:block absolute top-0 right-full mr-8 w-[clamp(200px,18vw,240px)]">
          <div className="sticky top-24">
            <TableOfContents toc={toc} variant="floating" />
          </div>
        </aside>
      </section>

      <ArticleEnhancements />
    </>
  );
}

