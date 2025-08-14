import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import yaml from 'js-yaml';

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

/**
 * Load all Markdown (.md) articles from ./data/docs recursively.
 * Supports optional YAML front matter at the top of each file (between --- blocks).
 * Each article should ideally have at least a "title" (from front matter or first H1); optional fields include:
 * - slug
 * - summary / description / excerpt
 * - date / publishedAt
 * - tags (array or comma-separated string)
 */
export async function loadAllArticles(baseDir = path.join(process.cwd(), 'data', 'docs')) {
  // Find all .md files under the base directory
  const patterns = [path.join(baseDir, '**/*.md')];
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

      // Derive title: front matter -> first H1 -> filename
      let title = meta.title || meta.name || null;
      if (!title) {
        const h1 = body.match(/^\s*#\s+(.+)\s*$/m);
        title = h1 ? h1[1].trim() : path.basename(file, path.extname(file));
      }

      const slug = meta.slug ? String(meta.slug) : slugify(title);

      const description =
        meta.summary || meta.description || meta.excerpt || (() => {
          // Take first non-empty, non-heading paragraph as excerpt
          const lines = body.split(/\r?\n/);
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;
            if (trimmed.startsWith('#')) continue;
            // Strip inline markdown links/code emphasis for a cleaner excerpt
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
      // If a file cannot be read, skip it but keep the server running
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
