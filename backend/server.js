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
console.log('Gemini key loaded:', Boolean(process.env.GEMINI_API_KEY));

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/countries', countryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/translate', translateRoutes);
app.use('/api/ifu', ifuRoutes);

const PORT = process.env.PORT || 5090;
app.listen(PORT, () => {
  console.log(`TA EIFU Backend Server running on port ${PORT}`);
});
