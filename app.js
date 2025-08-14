import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import homeRouter from './routes/home.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Views (EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static assets (if you add any under ./public)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', homeRouter);

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
