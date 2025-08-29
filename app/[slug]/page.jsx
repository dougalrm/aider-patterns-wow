import path from 'path';
import Link from 'next/link';
import ArticleEnhancements from '../components/ArticleEnhancements';
import TableOfContents from '../components/TableOfContents';
import { loadArticleBySlug, resolveContentDir } from '../../lib/contentLoader';

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
      <section className="mb-8">
        <div className="relative overflow-hidden rounded-xl border border-indigo-400/50 bg-indigo-950/40 backdrop-blur-md p-6 shadow-lg shadow-purple-900/50">
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide">{article.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-indigo-200/85">
            {article.date && <span>{new Date(article.date).toLocaleDateString()}</span>}
            <span aria-hidden="true">•</span>
            <span>{readingTime}</span>
          </div>
          {article.tags?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center rounded-full border border-indigo-400/40 bg-indigo-950/30 px-2.5 py-1 text-xs text-indigo-200">{tag}</span>
              ))}
            </div>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/" className="inline-flex items-center gap-2 rounded-lg border border-indigo-400/40 bg-indigo-950/30 px-3 py-1.5 text-sm text-indigo-200 hover:bg-indigo-900/40">
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M7.707 14.707a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414l4-4A1 1 0 0 1 8 6v2h6a1 1 0 1 1 0 2H8v2a1 1 0 0 1-.293.707Z"/></svg>
              Back
            </Link>
            {/* Copy link handled client-side below */}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <aside className="order-last lg:order-first lg:col-span-1">
          <TableOfContents toc={toc} />
        </aside>
        <div className="lg:col-span-2 rounded-xl border border-indigo-400/50 bg-indigo-950/40 p-4 backdrop-blur-md shadow-lg shadow-purple-900/50">
          <div className="prose prose-lg prose-invert max-w-3xl mx-auto prose-a:text-indigo-300 hover:prose-a:text-fuchsia-300 prose-img:rounded-lg js-article" dangerouslySetInnerHTML={{ __html: htmlWithIds }} />
        </div>
      </section>

      <ArticleEnhancements />
    </>
  );
}

