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
  const currentPathname = typeof window !== 'undefined' ? window.location.pathname : '';

  const setLanguage = (lang: Language, serviceSlugParam?: string, projectSlugParam?: string) => {
    const oldLangData = language === "fr" ? fr : en;
    const newLangData = lang === "fr" ? fr : en;

    let newPath = '';

    if (serviceSlugParam) {
      const currentService = oldLangData.services.items.find(item => item.slug === serviceSlugParam);
      if (currentService) {
        const newService = newLangData.services.items.find(item => item.id === currentService.id);
        if (newService) {
          newPath = `/services/${newService.slug}`;
          if (projectSlugParam) {
            const currentProject = currentService.projects.find(item => item.id === projectSlugParam);
            if (currentProject) {
              const newProject = newService.projects.find(item => item.id === currentProject.id);
              if (newProject) {
                newPath += `/projects/${newProject.id}`;
              }
            }
          }
        }
      }
    } else {
        // Handle root services page or other non-slug routes
        if (currentPathname.startsWith('/services')) {
          newPath = '/services';
        } else {
          newPath = currentPathname; // Fallback to current path if no service slug
        }
    }
    
    setInternalLanguage(lang);
    if (newPath && newPath !== currentPathname) {
      router.push(newPath);
    }
  };

  const toggleLanguage = (serviceSlugParam?: string, projectSlugParam?: string) => {
    const newLang = language === "fr" ? "en" : "fr";
    setLanguage(newLang, serviceSlugParam, projectSlugParam);
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