import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import expressLayouts from 'express-ejs-layouts';
import homeRouter from './routes/home.js';
import articleRouter from './routes/article.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Views (EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');

// Static assets (if you add any under ./public)
app.use(express.static(path.join(__dirname, 'public')));

// Serve article assets (images, etc.) from the content directory at /content
const CONTENT_DIR = process.env.CONTENT_DIR
  ? path.resolve(process.cwd(), process.env.CONTENT_DIR)
  : path.resolve(process.cwd(), 'data', 'docs');
app.use('/content', express.static(CONTENT_DIR));

// Routes
app.use('/', homeRouter);
app.use('/', articleRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).render('error', {
    title: 'Not Found',
    message: 'The page you are looking for does not exist.'
  });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).render('error', {
    title: 'Server Error',
    message: 'Something went wrong while rendering the page.'
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://localhost:${port}`);
});
