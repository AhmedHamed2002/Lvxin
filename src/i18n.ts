'use client'; 

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

// All supported language codes
export const SUPPORTED_LANGUAGE_CODES = ['en', 'zh', 'ar', 'es', 'fr', 'ja', 'rus'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGE_CODES[number];

// RTL languages
export const RTL_LANGUAGES: SupportedLanguage[] = ['ar'];

// Check if a language is RTL
export const isRTLLanguage = (lang: string) => RTL_LANGUAGES.includes(lang as SupportedLanguage);

// Apply document direction based on language
export const applyDocumentDirection = (lang: string) => {
  if (typeof document !== 'undefined') {
    document.documentElement.dir = isRTLLanguage(lang) ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }
};

// Get saved language from unified storage or default to Chinese
const getInitialLanguage = (): string => {
  if (typeof window === 'undefined') return 'zh'; // default on server

  const unified = localStorage.getItem('lvxin_unified_lang');
  if (unified && SUPPORTED_LANGUAGE_CODES.includes(unified as SupportedLanguage)) return unified;

  const saved = localStorage.getItem('lvxin_lang');
  if (saved && SUPPORTED_LANGUAGE_CODES.includes(saved as SupportedLanguage)) return saved;

  const googleLang = localStorage.getItem('lvxin_google_translate_lang');
  if (googleLang) {
    const googleToI18n: Record<string, string> = {
      'en': 'en',
      'zh-CN': 'zh',
      'zh': 'zh',
      'ar': 'ar',
      'es': 'es',
      'fr': 'fr',
      'ja': 'ja',
      'ru': 'rus',
    };
    const mapped = googleToI18n[googleLang];
    if (mapped && SUPPORTED_LANGUAGE_CODES.includes(mapped as SupportedLanguage)) return mapped;
  }

  return 'zh';
};

// init i18next
i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGUAGE_CODES as unknown as string[],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage'],
      lookupLocalStorage: 'lvxin_lang',
      caches: ['localStorage']
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json'
    },
    react: { useSuspense: false }
  });

// Apply initial document direction
if (typeof window !== 'undefined') applyDocumentDirection(getInitialLanguage());

// Save language changes to localStorage and apply RTL direction
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('lvxin_lang', lng);
    applyDocumentDirection(lng);
  }
});

export default i18n;
