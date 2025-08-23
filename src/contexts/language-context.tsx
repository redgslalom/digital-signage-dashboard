"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = {
  code: string;
  name: string;
  flag: string;
};

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

type LanguageContextType = {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  languages: Language[];
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traducciones básicas
const translations = {
  en: {
    "dashboard": "Dashboard",
    "content-management": "Content Management",
    "scheduling": "Scheduling",
    "devices": "Devices",
    "analytics": "Analytics",
    "users": "Users",
    "connectivity": "Connectivity",
    "notifications": "Notifications",
    "settings": "Settings",
    "help": "Help",
    "total-revenue": "Total Revenue",
    "subscriptions": "Subscriptions",
    "sales": "Sales",
    "active-now": "Active Now",
    "revenue-overview": "Revenue Overview",
    "calendar": "Calendar",
    "recent-activity": "Recent Activity",
    "activity-goals": "Activity Goals",
    "performance-analytics": "Performance Analytics",
    "upload-content": "Upload Content",
    "content": "Content",
    "programming": "Programming",
    "total-devices": "Total Devices",
    "online": "Online",
    "offline": "Offline",
    "warnings": "Warnings",
    "add-device": "Add Device",
    "new-schedule": "New Schedule",
    "device-management": "Device Management",
    "content-programming": "Content Programming"
  },
  es: {
    "dashboard": "Dashboard",
    "content-management": "Gestión de Contenido",
    "scheduling": "Programación",
    "devices": "Dispositivos",
    "analytics": "Analíticas",
    "users": "Usuarios",
    "connectivity": "Conectividad",
    "notifications": "Notificaciones",
    "settings": "Configuración",
    "help": "Ayuda",
    "total-revenue": "Ingresos Totales",
    "subscriptions": "Suscripciones",
    "sales": "Ventas",
    "active-now": "Activos Ahora",
    "revenue-overview": "Resumen de Ingresos",
    "calendar": "Calendario",
    "recent-activity": "Actividad Reciente",
    "activity-goals": "Objetivos de Actividad",
    "performance-analytics": "Analíticas de Rendimiento",
    "upload-content": "Subir Contenido",
    "content": "Contenido",
    "programming": "Programación",
    "total-devices": "Total Dispositivos",
    "online": "En Línea",
    "offline": "Desconectados",
    "warnings": "Con Advertencias",
    "add-device": "Agregar Dispositivo",
    "new-schedule": "Nueva Programación",
    "device-management": "Gestión de Dispositivos",
    "content-programming": "Programación de Contenido"
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]); // Default to English

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    // Aquí puedes agregar lógica para persistir el idioma en localStorage
    localStorage.setItem('preferred-language', language.code);
  };

  const t = (key: string): string => {
    const languageTranslations = translations[currentLanguage.code as keyof typeof translations];
    return languageTranslations?.[key as keyof typeof languageTranslations] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, languages, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
