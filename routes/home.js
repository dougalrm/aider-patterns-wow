import express from 'express';
import { loadAllArticles } from '../utils/contentLoader.js';

const router = express.Router();

/**
 * GET /
 * Home page showing a list of articles discovered in ./data/docs (recursively loads .md)
 */
router.get('/', async (req, res, next) => {
  try {
    const articles = await loadAllArticles();

    const featured = articles[0] || null;
    const latest = featured ? articles.slice(1) : articles;

    const tagCounts = new Map();
    for (const a of articles) {
      (a.tags || []).forEach((t) => {
        const k = String(t).toLowerCase();
        tagCounts.set(k, (tagCounts.get(k) || 0) + 1);
      });
    }
    const trendingTags = Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 12)
      .map(([tag, count]) => ({ tag, count }));

    res.render('home', {
      title: 'Agile Ways of Working',
      featured,
      latest,
      trendingTags
    });
  } catch (err) {
    next(err);
  }
});

export default router;
