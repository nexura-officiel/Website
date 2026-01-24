"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion"; // Import motion
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-midnight-navy text-white selection:bg-electric-cyan selection:text-midnight-navy">
      <Navbar />

      {/* Improved Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-midnight-navy border-b border-white/10 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <Image
            src="/grid.svg"
            alt="background pattern"
            layout="fill"
            objectFit="cover"
            className="filter invert grayscale"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold font-sans text-white leading-tight mb-4"
            >
              {t.aboutUs.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300"
            >
              {t.aboutUs.extendedDescription}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center items-center"
          >
            <Image
              src="/Nexura.png"
              alt="Nexura visual"
              width={400}
              height={400}
              className="w-full max-w-sm h-auto opacity-80"
            />
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Our Mission Section */}
        <section className="mb-20 text-center">
            <h2 className="text-4xl font-bold text-white mb-8">{t.aboutUs.missionTitle}</h2>
            <p className="text-slate-400 text-xl leading-relaxed max-w-2xl mx-auto">
                {t.aboutUs.missionDescription}
            </p>
        </section>

        {/* Our Philosophy/Approach Section - Narrative Flow */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            {t.aboutUs.highlight}
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-10">
            {t.aboutUs.description}
          </p>

          <ul className="space-y-6 text-slate-300 text-lg leading-relaxed">
            {t.aboutUs.points.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <CheckCircle2 className="text-electric-cyan shrink-0 mt-1" size={24} /> 
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Services Overview Section - Integrated */}
        <section className="text-center bg-white/5 rounded-lg p-10 mt-20 border border-white/10">
          <h3 className="text-3xl font-bold text-white mb-6">
            {t.aboutUs.coreServicesTitle}
          </h3>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
            {t.aboutUs.servicesOverview}
          </p>
          <Link
            href="/services"
            className="relative px-8 py-3 bg-transparent border border-electric-cyan text-electric-cyan font-sans font-semibold rounded-sm overflow-hidden group"
          >
            <div className="absolute inset-0 w-0 bg-electric-cyan transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
            <span className="relative group-hover:text-white transition-colors">Explore All Services</span>
          </Link>
        </section>

        {/* Final Call to Action */}
        <section className="text-center mt-20 pt-10 border-t border-white/10">
            <h2 className="text-4xl font-bold text-white mb-6">{t.aboutUs.ctaTitle}</h2>
            <p className="text-slate-400 text-xl leading-relaxed max-w-2xl mx-auto mb-10">
                {t.aboutUs.ctaDescription}
            </p>
            <Link
                href="/contact"
                className="relative px-10 py-4 bg-electric-cyan text-midnight-navy font-sans font-bold rounded-sm overflow-hidden group hover:shadow-[0_0_25px_rgba(0,215,215,0.4)] transition-all duration-300"
            >
                <span className="relative z-10">{t.aboutUs.ctaButton}</span>
            </Link>
        </section>
      </div>
      <Footer />
    </main>
  );
}
