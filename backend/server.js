import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import countryRoutes from './routes/countries.js';
import productRoutes from './routes/products.js';
import translateRoutes from './routes/translate.js';
import ifuRoutes from './routes/ifu.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env'), quiet: true });
if (!process.env.GEMINI_API_KEY) {
  console.warn('GEMINI_API_KEY is not configured. Translation requests will fail until it is set.');
}

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/countries', countryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/translate', translateRoutes);
app.use('/api/ifu', ifuRoutes);

const distPath = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distPath, 'index.html');

if (fs.existsSync(indexPath)) {
  app.use(express.static(distPath));
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(indexPath);
  });
} else if (process.env.NODE_ENV === 'production') {
  console.warn('Production frontend build was not found. Run npm run build before starting the server.');
}

const PORT = process.env.PORT || 5090;
app.listen(PORT, () => {
  console.info(`TA EIFU Backend Server running on port ${PORT}`);
});
