import express from 'express';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendDir = path.resolve(__dirname, '..');

dotenv.config({ path: path.join(backendDir, '.env'), quiet: true });

const router = express.Router();
const CACHE_FILE = path.join(backendDir, 'translation_cache.json');
const DEFAULT_MODELS = [
  'gemini-2.5-flash-lite',
  'gemini-flash-lite-latest',
  'gemini-2.5-flash',
  'gemini-flash-latest',
  'gemini-2.0-flash',
];

const LANGUAGE_NAMES = {
  tr: 'Turkish',
  de: 'German',
  fr: 'French',
  it: 'Italian',
  es: 'Spanish',
  ar: 'Arabic',
  fa: 'Persian',
  nl: 'Dutch',
};

const SUPPORTED_LANGUAGES = new Set(['en', ...Object.keys(LANGUAGE_NAMES)]);

const getModels = () => {
  const fromEnv = process.env.GEMINI_MODEL || process.env.GEMINI_MODELS;
  if (!fromEnv) return DEFAULT_MODELS;
  return fromEnv
    .split(',')
    .map((model) => model.trim())
    .filter(Boolean);
};

const loadCache = () => {
  try {
    if (!fs.existsSync(CACHE_FILE)) return {};
    return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  } catch (error) {
    console.error('[TRANSLATION CACHE READ ERROR]', error.message);
    return {};
  }
};

const saveCache = (cache) => {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  } catch (error) {
    console.error('[TRANSLATION CACHE WRITE ERROR]', error.message);
  }
};

const cacheKeyFor = (targetLanguage, text) => `${targetLanguage}::${text}`;

const extractGeminiText = (response) => (
  response.data?.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || '')
    .join('')
    .trim() || ''
);

const parseTranslations = (rawText, sourceTexts) => {
  const jsonText = rawText
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```$/i, '')
    .trim();

  let parsed;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    const start = jsonText.indexOf('{');
    const end = jsonText.lastIndexOf('}');
    if (start < 0 || end < 0 || end <= start) throw new Error('Gemini response was not JSON.');
    parsed = JSON.parse(jsonText.slice(start, end + 1));
  }

  if (Array.isArray(parsed)) {
    return sourceTexts.reduce((acc, source, index) => {
      acc[source] = parsed[index] || source;
      return acc;
    }, {});
  }

  if (parsed && typeof parsed === 'object' && parsed.translations && typeof parsed.translations === 'object') {
    return parsed.translations;
  }

  if (parsed && typeof parsed === 'object') {
    return parsed;
  }

  throw new Error('Gemini response JSON had an unsupported shape.');
};

const buildPrompt = (texts, targetLanguage, context = 'ui') => {
  const targetName = LANGUAGE_NAMES[targetLanguage] || targetLanguage;

  if (context === 'country-selection') {
    return `Translate these geographic continent and country names from English or their common local English database spelling to ${targetName}.
Return valid JSON only, with this exact shape:
{"translations":{"Original text":"Translated text"}}

Rules:
- Keep every original string as an exact JSON key.
- Translate continent names and country names naturally for a country selector UI.
- Preserve punctuation and official naming where appropriate.
- Examples: Türkiye should become Turchia in Italian, Almanya is German in Turkish, United States is Amerika Birleşik Devletleri in Turkish.
- Do not add explanations, markdown, or extra keys.

Texts:
${JSON.stringify(texts, null, 2)}`;
  }

  return `Translate only these dental eIFU portal UI strings from English to ${targetName}.
Return valid JSON only, with this exact shape:
{"translations":{"Original English text":"Translated text"}}

Rules:
- Keep every original string as an exact JSON key.
- Translate UI labels, buttons, placeholders, headings, and short helper text naturally.
- Do not translate country names, product names, REF numbers, implant technical names, brand names, or codes if they appear.
- Do not add explanations, markdown, or extra keys.

Texts:
${JSON.stringify(texts, null, 2)}`;
};

const callGemini = async (prompt) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    const error = new Error('GEMINI_API_KEY is not loaded.');
    error.code = 'MISSING_GEMINI_API_KEY';
    throw error;
  }

  let lastError;

  for (const model of getModels()) {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.1,
            responseMimeType: 'application/json',
          },
        },
        { timeout: 20000 }
      );

      return {
        modelUsed: model,
        text: extractGeminiText(response),
      };
    } catch (error) {
      lastError = error;
      const message = error.response?.data?.error?.message || error.message;
      console.error(`[GEMINI ERROR] model=${model}:`, message);
    }
  }

  throw lastError || new Error('Gemini request failed.');
};

const normalizeTexts = (body) => {
  if (Array.isArray(body.texts)) return body.texts;
  if (Array.isArray(body.text)) return body.text;
  if (typeof body.text === 'string') return [body.text];
  return [];
};

router.get('/test', async (req, res) => {
  const source = 'Select your country';
  const targetLanguage = 'tr';
  const keyLoaded = Boolean(process.env.GEMINI_API_KEY);

  try {
    const { modelUsed, text } = await callGemini(buildPrompt([source], targetLanguage));
    const translations = parseTranslations(text, [source]);

    return res.json({
      ok: true,
      keyLoaded,
      modelUsed,
      source,
      targetLanguage,
      translated: translations[source] || source,
    });
  } catch (error) {
    return res.status(502).json({
      ok: false,
      keyLoaded,
      modelUsed: null,
      source,
      targetLanguage,
      translated: source,
      error: error.response?.data?.error?.message || error.message,
    });
  }
});

router.post('/', async (req, res) => {
  const targetLanguage = req.body?.targetLanguage;
  const context = req.body?.context === 'country-selection' ? 'country-selection' : 'ui';
  const texts = normalizeTexts(req.body)
    .map((text) => (typeof text === 'string' ? text.trim() : ''))
    .filter(Boolean);

  if (!targetLanguage || !SUPPORTED_LANGUAGES.has(targetLanguage)) {
    return res.status(400).json({
      ok: false,
      error: 'A supported targetLanguage is required.',
    });
  }

  if (texts.length === 0) {
    return res.status(400).json({
      ok: false,
      error: 'texts must be a non-empty array of strings.',
    });
  }

  const uniqueTexts = [...new Set(texts)];
  const translations = {};

  if (targetLanguage === 'en') {
    uniqueTexts.forEach((text) => {
      translations[text] = text;
    });
    return res.json({ ok: true, modelUsed: null, translations });
  }

  const cache = loadCache();
  const missingTexts = [];

  uniqueTexts.forEach((text) => {
    const cached = cache[cacheKeyFor(targetLanguage, text)];
    if (cached) {
      translations[text] = cached;
    } else {
      missingTexts.push(text);
    }
  });

  let modelUsed = null;

  if (missingTexts.length > 0) {
    try {
      const geminiResult = await callGemini(buildPrompt(missingTexts, targetLanguage, context));
      modelUsed = geminiResult.modelUsed;

      const freshTranslations = parseTranslations(geminiResult.text, missingTexts);

      missingTexts.forEach((sourceText) => {
        const translated = typeof freshTranslations[sourceText] === 'string'
          ? freshTranslations[sourceText].trim()
          : sourceText;

        translations[sourceText] = translated || sourceText;
        cache[cacheKeyFor(targetLanguage, sourceText)] = translations[sourceText];
      });

      saveCache(cache);
    } catch (error) {
      const message = error.response?.data?.error?.message || error.message;
      console.error(`[TRANSLATION ERROR] ${targetLanguage}:`, message);

      missingTexts.forEach((sourceText) => {
        translations[sourceText] = sourceText;
      });

      return res.status(502).json({
        ok: false,
        modelUsed,
        translations,
        error: message,
      });
    }
  }

  uniqueTexts.forEach((sourceText) => {
    if (!translations[sourceText]) translations[sourceText] = sourceText;
  });

  return res.json({
    ok: true,
    modelUsed,
    translations,
  });
});

export default router;
