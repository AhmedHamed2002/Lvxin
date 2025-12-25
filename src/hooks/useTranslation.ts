import { useState, useEffect } from 'react';
import i18n, { SUPPORTED_LANGUAGE_CODES, isRTLLanguage, applyDocumentDirection } from '../i18n';

export type Language = typeof SUPPORTED_LANGUAGE_CODES[number];

export function useTranslation() {
    const [currentLanguage, setCurrentLanguage] = useState<Language>(
        (i18n.language as Language) || 'en'
    );

    useEffect(() => {
        const handleChange = (lng: string) => {
        const lang = lng as Language;
        setCurrentLanguage(lang);
        applyDocumentDirection(lang); 
        };

        i18n.on('languageChanged', handleChange);
        return () => i18n.off('languageChanged', handleChange);
    }, []);

    const t = (key: string) => i18n.t(key);

    const changeLanguage = (lng: Language) => {
        if (currentLanguage === lng) return;
        i18n.changeLanguage(lng);
        setCurrentLanguage(lng);
        applyDocumentDirection(lng);
    };

    const isRTL = isRTLLanguage(currentLanguage);

    return { t, currentLanguage, changeLanguage, isRTL };
}
