import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import app from './app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
