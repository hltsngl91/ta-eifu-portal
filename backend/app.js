import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import countryRoutes from './routes/countries.js';
import productRoutes from './routes/products.js';
import translateRoutes from './routes/translate.js';
import ifuRoutes from './routes/ifu.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env'), quiet: true });

console.info(`Gemini env check: GEMINI_API_KEY=${process.env.GEMINI_API_KEY ? 'loaded' : 'missing'}`);

if (!process.env.GEMINI_API_KEY) {
  console.warn('GEMINI_API_KEY is not configured. Translation requests will fail until it is set.');
}

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/countries', countryRoutes);
app.get('/api/categories', (req, res, next) => {
  req.url = '/categories';
  productRoutes(req, res, next);
});
app.get('/api/subcategories', (req, res, next) => {
  req.url = `/subcategories${req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : ''}`;
  productRoutes(req, res, next);
});
app.use('/api/products', productRoutes);
app.use('/api/translate', translateRoutes);
app.use('/api/ifu', ifuRoutes);

export default app;
