import express from 'express';
import fs from 'fs';
import path from 'path';
import {
  getAvailableIfuDocuments,
  getIfuFileById,
  ifuLanguages,
  countryIfuPreferences,
  defaultIfuLanguageCodes
} from '../ifuCatalog.js';
import {
  getIfuArchiveDocumentById,
  ifuArchiveDocuments
} from '../ifuArchiveCatalog.js';

const router = express.Router();

router.get('/languages', (req, res) => {
  res.json({
    languages: ifuLanguages,
    countryPreferences: countryIfuPreferences,
    defaultLanguageCodes: defaultIfuLanguageCodes
  });
});

router.get('/documents', (req, res) => {
  const { productRef, countryCode } = req.query;

  if (!productRef) {
    return res.status(400).json({ error: 'productRef is required' });
  }

  const documents = getAvailableIfuDocuments({ productRef, countryCode });

  return res.json({
    productRef,
    countryCode: String(countryCode || '').toUpperCase(),
    documents
  });
});

router.get('/archive', (req, res) => {
  const documents = ifuArchiveDocuments.map((document) => ({
    id: document.id,
    title: document.title,
    filename: document.filename,
    language: document.language,
    versionLabel: document.versionLabel,
    status: document.status,
    superseded: document.superseded,
    publicPath: document.publicPath,
    viewUrl: document.viewUrl,
    downloadUrl: document.downloadUrl
  }));

  return res.json({ documents });
});

router.get('/archive/files/:documentId', (req, res) => {
  const document = getIfuArchiveDocumentById(req.params.documentId);

  if (!document) {
    return res.status(404).json({ error: 'Archived IFU file not found' });
  }

  if (!fs.existsSync(document.filePath)) {
    return res.status(404).json({ error: 'Mapped archived IFU PDF is missing' });
  }

  const download = req.query.download === '1' || req.query.download === 'true';

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `${download ? 'attachment' : 'inline'}; filename="${document.filename}"`);

  return fs.createReadStream(document.filePath).pipe(res);
});

router.get('/files/:fileId', (req, res) => {
  const file = getIfuFileById(req.params.fileId);

  if (!file) {
    return res.status(404).json({ error: 'IFU file not found' });
  }

  if (!fs.existsSync(file.filePath)) {
    return res.status(404).json({ error: 'Mapped IFU PDF is missing' });
  }

  const download = req.query.download === '1' || req.query.download === 'true';
  const filename = path.basename(file.filePath);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `${download ? 'attachment' : 'inline'}; filename="${filename}"`);

  return fs.createReadStream(file.filePath).pipe(res);
});

export default router;
