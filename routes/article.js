import express from 'express';
import path from 'path';
import { loadArticleBySlug } from '../utils/contentLoader.js';

const router = express.Router();

/**
 * GET /:slug
 * Renders a full article page for the given slug by loading the Markdown file,
 * parsing optional front matter, and converting the body to HTML.
 */
router.get('/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params;
    const article = await loadArticleBySlug(slug);

    if (!article) {
      return res.status(404).render('error', {
        title: 'Article Not Found',
        message: `No article found for “${slug}”.`
      });
    }

    // Compute base href so relative image paths in Markdown resolve to the file's directory
    const CONTENT_DIR = process.env.CONTENT_DIR
      ? path.resolve(process.cwd(), process.env.CONTENT_DIR)
      : path.resolve(process.cwd(), 'data', 'docs');
    const relDir = path.relative(CONTENT_DIR, path.dirname(article.sourcePath));
    const baseHref = '/content/' + (relDir ? relDir.replace(/\\/g, '/') + '/' : '');

    // Estimate reading time (~200 wpm) from rendered HTML text
    const text = String(article.html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const words = text ? text.split(' ').length : 0;
    const minutes = Math.max(1, Math.round(words / 200));
    const readingTime = `${minutes} min read`;

    return res.render('article', {
      title: article.title,
      description: article.description,
      article,
      content: article.html,
      baseHref,
      readingTime
    });
  } catch (err) {
    next(err);
  }
});

export default router;
