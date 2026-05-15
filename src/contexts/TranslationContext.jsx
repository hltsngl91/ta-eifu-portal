import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const TranslationContext = createContext(null);

export const useTranslation = () => useContext(TranslationContext);

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
  { code: 'it', name: 'Italiano' },
  { code: 'es', name: 'Español' },
  { code: 'ar', name: 'العربية' },
  { code: 'fa', name: 'فارسی' },
  { code: 'nl', name: 'Nederlands' },
];

const RTL_LANGUAGES = new Set(['ar', 'fa']);
const STORAGE_KEY = 'ta_eifu_language';
const LEGACY_STORAGE_KEY = 'app_lang';

const getInitialLanguage = () => {
  const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
  if (LANGUAGES.some((language) => language.code === saved)) return saved;

  const browserLanguage = navigator.language.split('-')[0];
  return LANGUAGES.some((language) => language.code === browserLanguage) ? browserLanguage : 'en';
};

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage);
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(false);

  const translationsRef = useRef(translations);

  useEffect(() => {
    translationsRef.current = translations;
  }, [translations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.dir = RTL_LANGUAGES.has(language) ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const translateBatch = useCallback(async (texts, options = {}) => {
    const uniqueTexts = [...new Set(
      texts
        .filter((text) => typeof text === 'string')
        .map((text) => text.trim())
        .filter(Boolean)
    )];

    if (uniqueTexts.length === 0 || language === 'en') return;

    const existingTranslations = translationsRef.current[language] || {};
    const missingTexts = uniqueTexts.filter((text) => !existingTranslations[text]);
    if (missingTexts.length === 0) return;

    setLoading(true);

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          texts: missingTexts,
          targetLanguage: language,
          context: options.context || 'ui',
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.ok || !data.translations) {
        console.error('Translation API failed:', data.error || response.statusText);
        return;
      }

      setTranslations((prev) => ({
        ...prev,
        [language]: {
          ...(prev[language] || {}),
          ...data.translations,
        },
      }));
    } catch (error) {
      console.error('Frontend translation error:', error);
    } finally {
      setLoading(false);
    }
  }, [language]);

  const t = useCallback((text) => {
    if (language === 'en') return text;
    return translations[language]?.[text] || text;
  }, [language, translations]);

  const value = {
    language,
    setLanguage,
    t,
    translateBatch,
    languages: LANGUAGES,
    loading,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};
