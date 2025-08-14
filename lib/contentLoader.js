import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

// Configure Markdown renderer to support GFM (tables, strikethrough), heading IDs, and safe link handling
marked.setOptions({
  gfm: true,
  headerIds: true,
  mangle: false,
  breaks: false
});

/**
 * Normalize Markdown to fix common authoring patterns that break GFM tables.
 */
function normalizeMarkdown(md) {
  const lines = md.split(/\r?\n/);
  const out = [];
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    const curr = lines[i];
    const trimmed = curr.trim();
    if (trimmed.startsWith('```')) {
      inFence = !inFence;
      out.push(curr);
      continue;
    }
    if (!inFence && trimmed === '' && i > 0 && i < lines.length - 1) {
      const prev = lines[i - 1].trim();
      const next = lines[i + 1].trim();
      if (prev.startsWith('|') && next.startsWith('|')) {
        continue;
      }
    }
    out.push(curr);
  }
  return out.join('\n');
}

/**
 * Convert arbitrary text to a URL-friendly slug.
 */
function slugify(text) {
  return String(text)
    .trim()
    .toLowerCase()
    .replace(/['"’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Resolve the base content directory robustly.
 */
export function resolveContentDir(customDir) {
  if (customDir) return path.resolve(customDir);
  if (process.env.CONTENT_DIR) return path.resolve(process.cwd(), process.env.CONTENT_DIR);
  return path.resolve(process.cwd(), 'data', 'docs');
}

/**
 * Load all Markdown (.md) articles.
 */
export async function loadAllArticles(baseDir) {
  const baseDirResolved = resolveContentDir(baseDir);
  const patterns = [path.join(baseDirResolved, '**/*.md')];
  const files = await glob(patterns, { nodir: true });

  const articles = [];

  for (const file of files) {
    try {
      const raw = await fs.readFile(file, 'utf8');

      // Extract optional YAML front matter: --- ... ---
      let meta = {};
      let body = raw;
      const fmMatch = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
      if (fmMatch) {
        try {
          meta = yaml.load(fmMatch[1]) || {};
        } catch (e) {
          console.warn(`Ignoring invalid front matter in: ${file}\nReason: ${e.message}`);
        }
        body = raw.slice(fmMatch[0].length);
      }

      // Normalize markdown to fix common table formatting issues
      const normalizedBody = normalizeMarkdown(body);

      // Derive title: front matter -> first H1 -> filename
      let title = meta.title || meta.name || null;
      if (!title) {
        const h1 = normalizedBody.match(/^\s*#\s+(.+)\s*$/m);
        title = h1 ? h1[1].trim() : path.basename(file, path.extname(file));
      }

      const slug = meta.slug ? String(meta.slug) : slugify(title);

      const description =
        meta.summary || meta.description || meta.excerpt || (() => {
          const lines = normalizedBody.split(/\r?\n/);
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;
            if (trimmed.startsWith('#')) continue;
            const plain = trimmed
              .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
              .replace(/[`*_~>#]/g, '')
              .replace(/!\[[^\]]*\]\([^)]+\)/g, '');
            if (plain) return plain.slice(0, 240);
          }
          return '';
        })();

      const date = meta.date || meta.publishedAt || null;

      const tags = Array.isArray(meta.tags)
        ? meta.tags
        : meta.tags
        ? String(meta.tags)
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : [];

      articles.push({
        title,
        slug,
        description,
        date,
        tags,
        sourcePath: file
      });
    } catch (err) {
      console.warn(`Skipping unreadable Markdown file: ${file}\nReason: ${err.message}`);
    }
  }

  // Sort by date (desc), fallback to title
  const getTime = (d) => {
    if (!d) return 0;
    const t = new Date(d).getTime();
    return Number.isFinite(t) ? t : 0;
  };
  articles.sort((a, b) => {
    const da = getTime(a.date);
    const db = getTime(b.date);
    if (db !== da) return db - da;
    return a.title.localeCompare(b.title);
  });

  return articles;
}

export async function loadArticleBySlug(slug, baseDir) {
  const baseDirResolved = resolveContentDir(baseDir);
  const patterns = [path.join(baseDirResolved, '**/*.md')];
  const files = await glob(patterns, { nodir: true });

  for (const file of files) {
    try {
      const raw = await fs.readFile(file, 'utf8');

      // Extract optional YAML front matter
      let meta = {};
      let body = raw;
      const fmMatch = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
      if (fmMatch) {
        try {
          meta = yaml.load(fmMatch[1]) || {};
        } catch (e) {
          console.warn(`Ignoring invalid front matter in: ${file}\nReason: ${e.message}`);
        }
        body = raw.slice(fmMatch[0].length);
      }

      // Normalize markdown
      const normalizedBody = normalizeMarkdown(body);

      // Determine title and slug
      let title = meta.title || meta.name || null;
      if (!title) {
        const h1 = normalizedBody.match(/^\s*#\s+(.+)\s*$/m);
        title = h1 ? h1[1].trim() : path.basename(file, path.extname(file));
      }
      const computedSlug = meta.slug ? String(meta.slug) : slugify(title);
      if (computedSlug !== slug) continue;

      const description = meta.summary || meta.description || meta.excerpt || '';
      const date = meta.date || meta.publishedAt || null;

      const tags = Array.isArray(meta.tags)
        ? meta.tags
        : meta.tags
        ? String(meta.tags)
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : [];

      const html = marked.parse(normalizedBody);

      return {
        title,
        slug: computedSlug,
        description,
        date,
        tags,
        html,
        sourcePath: file
      };
    } catch (err) {
      console.warn(`Failed to read Markdown file: ${file}\nReason: ${err.message}`);
    }
  }

  return null;
}
