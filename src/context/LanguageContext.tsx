"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { en } from "@/locales/en";
import { fr } from "@/locales/fr";

type Language = "fr" | "en";
type Dictionary = typeof fr; // Using French as the type definition source

interface LanguageContextType {
  language: Language;
  t: Dictionary;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr"); // Default to French

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "fr" ? "en" : "fr"));
  };

  const t = language === "fr" ? fr : en;

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
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
