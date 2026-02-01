"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { usePathname } from "next/navigation";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative flex items-center bg-midnight-navy border border-white/20 rounded-lg p-1 gap-1 h-9 shadow-[0_0_15px_rgba(0,0,0,0.3)] overflow-hidden group">
      {/* Background Glitch/Scanline Effect */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none"></div>

      {/* Sliding Highlight */}
      <motion.div
        className="absolute h-[calc(100%-8px)] top-1 bg-electric-cyan rounded md:rounded-md shadow-[0_0_15px_rgba(0,215,215,0.6)] z-0"
        initial={false}
        animate={{
          left: language === "fr" ? "4px" : "50%",
          width: "calc(50% - 6px)",
          x: language === "en" ? "2px" : "0px"
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />

      {/* FR Button */}
      <button
        onClick={() => setLanguage("fr")}
        className={`relative z-10 flex-1 px-3 py-1 text-[11px] font-mono font-bold transition-colors duration-300 rounded ${language === "fr"
          ? "text-midnight-navy"
          : "text-slate-500 hover:text-white"
          }`}
      >
        FR
      </button>

      {/* Divider */}
      <div className="w-px h-3 bg-white/10 z-0"></div>

      {/* EN Button */}
      <button
        onClick={() => setLanguage("en")}
        className={`relative z-10 flex-1 px-3 py-1 text-[11px] font-mono font-bold transition-colors duration-300 rounded ${language === "en"
          ? "text-midnight-navy"
          : "text-slate-500 hover:text-white"
          }`}
      >
        EN
      </button>
    </div>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.services, href: isHomePage ? "#services" : "/#services" },
    { name: t.nav.aboutUs, href: isHomePage ? "#aboutUs" : "/#aboutUs" },
    { name: t.nav.process, href: isHomePage ? "#process" : "/#process" },
    { name: t.nav.contact, href: isHomePage ? "#contact" : "/#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
        ? "bg-midnight-navy/90 backdrop-blur-md border-b border-white/10 shadow-lg"
        : "bg-transparent border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-electric-cyan/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Image
                  src="/logo.png"
                  alt="Nexura Logo"
                  width={32}
                  height={32}
                  className="w-auto h-8 relative z-10"
                />
              </div>
              <span className="font-sans font-bold text-2xl tracking-wider text-white group-hover:text-shadow-glow transition-all">
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
                  className="font-mono text-sm text-slate-300 hover:text-electric-cyan transition-colors duration-300 relative group"
                >
                  <span className="text-electric-cyan mr-1 opacity-0 group-hover:opacity-100 transition-opacity">&lt;</span>
                  {link.name}
                  <span className="text-electric-cyan ml-1 opacity-0 group-hover:opacity-100 transition-opacity">/&gt;</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-electric-cyan group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            {/* Enhanced Language Switcher */}
            <LanguageToggle />

            <Link
              href={isHomePage ? "#contact" : "/#contact"}
              className="relative px-6 py-2 bg-transparent border border-electric-cyan text-electric-cyan font-sans font-semibold rounded-sm overflow-hidden group"
            >
              <div className="absolute inset-0 w-0 bg-electric-cyan transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
              <span className="relative group-hover:text-white transition-colors">{t.nav.startProject}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {/* Mobile Language Switcher */}
            <LanguageToggle />

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