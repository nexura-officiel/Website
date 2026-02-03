"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactCTA() {
    const { t } = useLanguage();

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617] to-[#0B1221]"></div>
            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                    {t.aboutUs.ctaTitle}
                </h2>
                <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                    {t.aboutUs.ctaDescription}
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                    <Link
                        href="/contact"
                        className="relative px-14 py-6 bg-electric-cyan text-midnight-navy text-xl font-bold rounded-sm overflow-hidden group hover:shadow-[0_0_60px_rgba(0,215,215,0.5)] transition-all duration-300"
                    >
                        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12"></span>
                        <span className="relative z-10 flex items-center gap-3">
                            {t.aboutUs.ctaButton}
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
