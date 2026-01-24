"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail, Github, Facebook, Instagram } from "lucide-react";
import { useState } from "react"; // Import useState
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false); // State for copy feedback

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('nexura.officiel@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied status after 2 seconds
  };

  return (
    <footer className="bg-midnight-navy border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image 
                src="/logo-transparent.png" 
                alt="Nexura Logo" 
                width={28} 
                height={28} 
                className="w-auto h-7"
              />
              <span className="font-sans font-bold text-xl tracking-wider text-white">
                NEXURA
              </span>
            </Link>
            <p className="text-slate-400 max-w-sm mb-6">
              {t.footer.tagline}
            </p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/nexura-ma/about/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-electric-cyan transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="https://github.com/nexura-officiel" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-electric-cyan transition-colors">
                <Github size={24} />
              </a>
              <a href="https://www.facebook.com/nexura.ma" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-electric-cyan transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://www.instagram.com/nexura.ma" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-electric-cyan transition-colors">
                <Instagram size={24} />
              </a>
              <div className="relative">
                <button 
                  onClick={handleCopyEmail} 
                  className="text-slate-400 hover:text-electric-cyan transition-colors relative"
                  title="Copy email to clipboard"
                >
                  <Mail size={24} />
                </button>
                {copied && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-electric-cyan bg-midnight-navy px-2 py-1 rounded-md shadow-lg animate-fade-in-out">
                    Copied!
                  </span>
                )}
              </div>
            </div>
          </div>

    

          <div>
            <h4 className="text-white font-bold mb-6">{t.footer.headers.sitemap}</h4>
            <ul className="space-y-3 text-slate-400">
              <li><Link href="#services" className="hover:text-electric-cyan transition-colors">{t.nav.services}</Link></li>
              <li><Link href="#aboutUs" className="hover:text-electric-cyan transition-colors">{t.nav.aboutUs}</Link></li>
              <li><Link href="#process" className="hover:text-electric-cyan transition-colors">{t.nav.process}</Link></li>
              <li><Link href="#contact" className="hover:text-electric-cyan transition-colors">{t.nav.contact}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{t.footer.headers.legal}</h4>
            <ul className="space-y-3 text-slate-400">
              <li><Link href="/privacy" className="hover:text-electric-cyan transition-colors">{t.footer.links.privacy}</Link></li>
              <li><Link href="/terms" className="hover:text-electric-cyan transition-colors">{t.footer.links.terms}</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Nexura. {t.footer.rights}</p>
          <p className="mt-2 md:mt-0 font-mono">{t.footer.builtBy}</p>
        </div>
      </div>
    </footer>
  );
}