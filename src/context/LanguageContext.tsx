"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useRouter, useParams } from "next/navigation";
import { en } from "@/locales/en";
import { fr } from "@/locales/fr";

type Language = "fr" | "en";
type Dictionary = typeof fr;

interface LanguageContextType {
  language: Language;
  t: Dictionary;
  toggleLanguage: (slug?: string) => void;
  setLanguage: (lang: Language, slug?: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setInternalLanguage] = useState<Language>("fr");
  const router = useRouter();
  const params = useParams();

  const setLanguage = (lang: Language, slug?: string) => {
    const oldLangData = language === "fr" ? fr : en;
    const newLangData = lang === "fr" ? fr : en;

    if (slug) {
      const currentService = oldLangData.services.items.find(item => item.slug === slug);
      if (currentService) {
        const newService = newLangData.services.items.find(item => item.id === currentService.id);
        if (newService) {
          router.push(`/services/${newService.slug}`);
        }
      }
    }
    setInternalLanguage(lang);
  };

  const toggleLanguage = (slug?: string) => {
    const newLang = language === "fr" ? "en" : "fr";
    setLanguage(newLang, slug);
  };

  const t = language === "fr" ? fr : en;

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}