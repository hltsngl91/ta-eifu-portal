import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const publicIfuPath = (filename) => `/ifu/${encodeURIComponent(filename)}`;

export const ifuLanguages = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧'
  },
  {
    code: 'tr',
    name: 'Turkish',
    nativeName: 'Türkçe',
    flag: '🇹🇷'
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪'
  },
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹'
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷'
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦'
  },
  {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺'
  }
];

export const countryIfuPreferences = [
  {
    countryCode: 'TR',
    languageCodes: ['tr', 'en']
  }
];

export const defaultIfuLanguageCodes = ['en'];

export const ifuFiles = [
  {
    id: 'ta-general-en-01-26',
    productRef: '*',
    languageCode: 'en',
    filename: 'IFU TA EN 01-26.pdf',
    filePath: path.join(projectRoot, 'public', 'ifu', 'IFU TA EN 01-26.pdf'),
    publicPath: publicIfuPath('IFU TA EN 01-26.pdf'),
    version: '01-26',
    validFrom: '2026-01-01',
    countryCodes: null,
    isFallback: true
  },
  {
    id: 'ta-general-tr-01-26',
    productRef: '*',
    languageCode: 'tr',
    filename: 'IFU TA TR 01-26.pdf',
    filePath: path.join(projectRoot, 'public', 'ifu', 'IFU TA TR 01-26.pdf'),
    publicPath: publicIfuPath('IFU TA TR 01-26.pdf'),
    version: '01-26',
    validFrom: '2026-01-01',
    countryCodes: ['TR'],
    isFallback: false
  }
];

export const getIfuLanguage = (languageCode) => (
  ifuLanguages.find((language) => language.code === languageCode)
);

export const getCountryLanguagePreference = (countryCode) => {
  const normalizedCountryCode = String(countryCode || '').toUpperCase();
  return countryIfuPreferences.find((preference) => preference.countryCode === normalizedCountryCode);
};

export const getIfuFileById = (fileId) => (
  ifuFiles.find((file) => file.id === fileId)
);

const appliesToProduct = (file, productRef) => (
  file.productRef === '*' || String(file.productRef) === String(productRef)
);

const appliesToCountry = (file, countryCode) => {
  if (!file.countryCodes || file.countryCodes.length === 0) return true;
  return file.countryCodes.includes(String(countryCode || '').toUpperCase());
};

export const getAvailableIfuDocuments = ({ productRef, countryCode }) => {
  const normalizedCountryCode = String(countryCode || '').toUpperCase();
  const preference = getCountryLanguagePreference(normalizedCountryCode);
  const preferredLanguageCodes = preference?.languageCodes || defaultIfuLanguageCodes;
  const orderedLanguageCodes = [...new Set([...preferredLanguageCodes, ...defaultIfuLanguageCodes])];

  const candidateFiles = ifuFiles.filter((file) => (
    appliesToProduct(file, productRef) && appliesToCountry(file, normalizedCountryCode)
  ));

  return orderedLanguageCodes
    .map((languageCode) => {
      const exactProductFile = candidateFiles.find((file) => (
        file.languageCode === languageCode && file.productRef === String(productRef)
      ));
      const wildcardFile = candidateFiles.find((file) => (
        file.languageCode === languageCode && file.productRef === '*'
      ));
      const file = exactProductFile || wildcardFile;
      const language = getIfuLanguage(languageCode);

      if (!file || !language) return null;

      return {
        id: file.id,
        productRef,
        language,
        version: file.version,
        validFrom: file.validFrom,
        isFallback: Boolean(file.isFallback),
        viewUrl: file.publicPath,
        downloadUrl: file.publicPath
      };
    })
    .filter(Boolean);
};
