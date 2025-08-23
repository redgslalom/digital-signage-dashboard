"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import enTranslations from '@/locales/en.json';
import esTranslations from '@/locales/es.json';

type Language = 'en' | 'es';

type Translations = {
  [key: string]: any;
};

const translations: Record<Language, Translations> = {
  en: enTranslations,
  es: esTranslations,
};

interface TranslationContextType {
  currentLanguage: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getLanguageInfo: () => { code: Language; name: string; flag: string };
  availableLanguages: { code: Language; name: string; flag: string }[];
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') as Language;
      return savedLang && ['en', 'es'].includes(savedLang) ? savedLang : 'en';
    }
    return 'en';
  });

  // Guardar idioma en localStorage cuando cambie
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', currentLanguage);
      document.documentElement.lang = currentLanguage;
    }
  }, [currentLanguage]);

  // Función para obtener traducción por identificador (key path)
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    // Si no encuentra la traducción, devolver la key o intentar en inglés
    if (value === undefined) {
      let fallbackValue: any = translations.en;
      for (const k of keys) {
        fallbackValue = fallbackValue?.[k];
        if (fallbackValue === undefined) break;
      }
      return fallbackValue || key;
    }
    
    return value;
  };

  // Cambiar idioma
  const changeLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  // Obtener información del idioma actual
  const getLanguageInfo = () => ({
    code: currentLanguage,
    name: currentLanguage === 'en' ? 'English' : 'Español',
    flag: currentLanguage === 'en' ? '🇺🇸' : '🇪🇸'
  });

  const availableLanguages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸' }
  ];

  return (
    <TranslationContext.Provider value={{
      currentLanguage,
      changeLanguage,
      t,
      getLanguageInfo,
      availableLanguages
    }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
