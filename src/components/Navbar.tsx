"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.services, href: "#services" },
    { name: t.nav.vision, href: "#vision" },
    { name: t.nav.process, href: "#process" },
    { name: t.nav.contact, href: "#contact" },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-midnight-navy/90 backdrop-blur-md border-b border-white/10 shadow-lg" 
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/logo-transparent.png" 
                alt="Nexura Logo" 
                width={32} 
                height={32} 
                className="w-auto h-8"
              />
              <span className="font-sans font-bold text-2xl tracking-wider text-white">
                NEXURA
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-mono text-sm text-slate-300 hover:text-electric-cyan transition-colors duration-300"
                >
                  <span className="text-electric-cyan mr-1">&lt;</span>
                  {link.name}
                  <span className="text-electric-cyan ml-1">/&gt;</span>
                </Link>
              ))}
            </div>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 font-mono text-xs text-slate-400 hover:text-white border border-white/10 px-3 py-1 rounded bg-white/5 transition-colors"
            >
              <Globe size={14} />
              <span>{language === "fr" ? "FR" : "EN"}</span>
            </button>

            <Link
              href="#contact"
              className="font-sans font-semibold px-6 py-2 border border-electric-cyan text-electric-cyan hover:bg-electric-cyan hover:text-midnight-navy transition-all duration-300 rounded-sm"
            >
              {t.nav.startProject}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             {/* Mobile Language Switcher */}
             <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 font-mono text-xs text-slate-400 hover:text-white border border-white/10 px-3 py-1 rounded bg-white/5 transition-colors"
            >
              <span>{language === "fr" ? "FR" : "EN"}</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-midnight-navy border-b border-white/10 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-mono text-slate-300 hover:text-electric-cyan hover:bg-white/5"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}