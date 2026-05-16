import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const archiveRoot = path.join(projectRoot, 'public', 'archive');

const inferLanguage = (filename) => {
  const normalized = filename.toLowerCase();

  if (normalized.includes('eng')) {
    return {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇬🇧'
    };
  }

  if (normalized.includes('de')) {
    return {
      code: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      flag: '🇩🇪'
    };
  }

  return {
    code: 'unknown',
    name: 'Unknown',
    nativeName: 'Unknown',
    flag: '📄'
  };
};

const inferArchiveDate = (filename) => {
  const normalized = filename.toLowerCase();
  const fullDateMatch = normalized.match(/\b(20\d{2})\s+\d{2}\s+\d{2}\b/);
  const yearMatch = normalized.match(/\b(20\d{2})\b/);
  const shortYearMatch = normalized.match(/(?:^|[^\d])25(?:[^\d]|$)/);

  if (fullDateMatch) return fullDateMatch[1];
  if (yearMatch) return yearMatch[1];
  if (shortYearMatch) return '2025';

  return '2025';
};

const createArchiveDocument = ({ id, filename }) => {
  const language = inferLanguage(filename);

  return {
    id,
    title: `IFU TA ${language.code.toUpperCase()}`,
    filename,
    language,
    versionLabel: inferArchiveDate(filename),
    status: 'archived',
    superseded: true,
    filePath: path.join(archiveRoot, filename),
    publicPath: `/archive/${encodeURIComponent(filename)}`,
    viewUrl: `/archive/${encodeURIComponent(filename)}`,
    downloadUrl: `/archive/${encodeURIComponent(filename)}`
  };
};

const archiveLanguagePriority = {
  en: 1,
  tr: 2,
  de: 3
};

const compareArchiveDocuments = (firstDocument, secondDocument) => {
  const firstYear = Number.parseInt(firstDocument.versionLabel, 10) || 0;
  const secondYear = Number.parseInt(secondDocument.versionLabel, 10) || 0;

  if (firstYear !== secondYear) {
    return secondYear - firstYear;
  }

  const firstLanguagePriority = archiveLanguagePriority[firstDocument.language.code] || 100;
  const secondLanguagePriority = archiveLanguagePriority[secondDocument.language.code] || 100;

  if (firstLanguagePriority !== secondLanguagePriority) {
    return firstLanguagePriority - secondLanguagePriority;
  }

  if (firstDocument.language.code !== secondDocument.language.code) {
    return firstDocument.language.code.localeCompare(secondDocument.language.code);
  }

  return firstDocument.filename.localeCompare(secondDocument.filename);
};

export const ifuArchiveDocuments = [
  createArchiveDocument({
    id: 'archive-2025-ifu-de',
    filename: '2025 ifu de.pdf'
  }),
  createArchiveDocument({
    id: 'archive-2025-ifu-eng-3',
    filename: '2025 ifu eng 3.pdf'
  }),
  createArchiveDocument({
    id: 'archive-t4-switch-plus-de-2022',
    filename: 'IFU_T4 switch plus de_final_2021 12 15 sign 2022 01 07.pdf'
  }),
  createArchiveDocument({
    id: 'archive-ta-ifu-eng-25-2',
    filename: 'TA ifu eng 25 - 2.pdf'
  })
].sort(compareArchiveDocuments);

export const getIfuArchiveDocumentById = (documentId) => (
  ifuArchiveDocuments.find((document) => document.id === documentId)
);
