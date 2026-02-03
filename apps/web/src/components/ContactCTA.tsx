"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function ContactCTA() {
    const { t } = useLanguage();

    return (
        <section className="relative py-32 overflow-hidden bg-[#020617] group">
            {/* --- BACKGROUND EFFECTS --- */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

            {/* Animated Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-electric-cyan/10 blur-[120px] rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-1000"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-1000 delay-100"></div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-electric-cyan text-sm font-mono tracking-widest uppercase mb-8 backdrop-blur-md">
                        <Sparkles size={14} />
                        <span>Not Just A Project</span>
                    </div>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-tight"
                >
                    <span className="block">{t.aboutUs.ctaTitle}</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                    {t.aboutUs.ctaDescription}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row justify-center items-center gap-6"
                >
                    <Link
                        href="/contact"
                        className="group relative px-10 py-5 bg-white text-black text-lg font-bold rounded-full overflow-hidden hover:scale-105 transition-transform duration-300"
                    >
                        {/* Button Gradient Hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan via-white to-electric-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] animate-gradient"></div>

                        <span className="relative z-10 flex items-center gap-3 group-hover:gap-4 transition-all">
                            {t.aboutUs.ctaButton}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
