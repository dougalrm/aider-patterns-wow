import express from 'express';
import { loadAllArticles } from '../utils/contentLoader.js';

const router = express.Router();

/**
 * GET /
 * Home page showing a list of articles discovered in ./data/docs (recursively loads .yml and .yaml)
 */
router.get('/', async (req, res, next) => {
  try {
    const articles = await loadAllArticles();
    res.render('home', {
      title: 'Agile Ways of Working',
      articles
    });
  } catch (err) {
    next(err);
  }
});

export default router;
