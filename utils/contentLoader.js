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
 * Load all YAML articles from ./data/docs recursively.
 * Supports files that contain a single object or an array of article objects.
 * Each article should ideally have at least a "title"; optional fields include:
 * - slug
 * - summary / description / excerpt
 * - date / publishedAt
 * - tags (array or comma-separated string)
 */
export async function loadAllArticles(baseDir = path.join(process.cwd(), 'data', 'docs')) {
  // Find all .yml and .yaml files under the base directory
  const patterns = [path.join(baseDir, '**/*.yml'), path.join(baseDir, '**/*.yaml')];
  const files = await glob(patterns, { nodir: true });

  const articles = [];

  for (const file of files) {
    try {
      const raw = await fs.readFile(file, 'utf8');
      const parsed = yaml.load(raw);

      const addItem = (item) => {
        if (!item || typeof item !== 'object') return;

        const title = item.title || item.name || null;
        if (!title) return;

        const slug =
          item.slug
            ? String(item.slug)
            : slugify(title || path.basename(file, path.extname(file)));

        const description = item.summary || item.description || item.excerpt || '';
        const date = item.date || item.publishedAt || null;

        const tags = Array.isArray(item.tags)
          ? item.tags
          : item.tags
          ? String(item.tags)
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
      };

      if (Array.isArray(parsed)) {
        parsed.forEach(addItem);
      } else {
        addItem(parsed);
      }
    } catch (err) {
      // If a file has invalid YAML, skip it but keep the server running
      console.warn(`Skipping invalid YAML file: ${file}\nReason: ${err.message}`);
    }
  }

  // Sort by date (desc), fallback to title
  articles.sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : 0;
    const db = b.date ? new Date(b.date).getTime() : 0;
    if (db !== da) return db - da;
    return a.title.localeCompare(b.title);
  });

  return articles;
}
