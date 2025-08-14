import express from 'express';
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

    return res.render('article', {
      title: article.title,
      article,
      content: article.html
    });
  } catch (err) {
    next(err);
  }
});

export default router;
