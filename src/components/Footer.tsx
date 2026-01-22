"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail, Github } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-midnight-navy border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
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
              <a href="#" className="text-slate-400 hover:text-electric-cyan transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-slate-400 hover:text-electric-cyan transition-colors">
                <Github size={24} />
              </a>
              <a href="mailto:contact@nexura.com" className="text-slate-400 hover:text-electric-cyan transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{t.footer.headers.services}</h4>
            <ul className="space-y-3 text-slate-400">
              <li><Link href="#" className="hover:text-electric-cyan transition-colors">{t.footer.links.web}</Link></li>
              <li><Link href="#" className="hover:text-electric-cyan transition-colors">{t.footer.links.mobile}</Link></li>
              <li><Link href="#" className="hover:text-electric-cyan transition-colors">{t.footer.links.ai}</Link></li>
              <li><Link href="#" className="hover:text-electric-cyan transition-colors">{t.footer.links.cloud}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{t.footer.headers.legal}</h4>
            <ul className="space-y-3 text-slate-400">
              <li><Link href="#" className="hover:text-electric-cyan transition-colors">{t.footer.links.privacy}</Link></li>
              <li><Link href="#" className="hover:text-electric-cyan transition-colors">{t.footer.links.terms}</Link></li>
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