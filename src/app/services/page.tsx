"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image"; // For background image
import Link from "next/link"; // For CTA links
import { motion, AnimatePresence } from "framer-motion"; // For animations
import { Monitor, Bot, Cloud, ArrowRight } from "lucide-react"; // Icons for services and CTA
import { useLanguage } from "@/context/LanguageContext";
import TiltCard from "@/components/ui/TiltCard"; // For service cards

export default function ServicesPage() {
  const { t } = useLanguage();

  // Map icons to service items (ensure this order matches your translation file)
  const serviceIcons = [Monitor, Bot, Cloud]; 

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <main className="min-h-screen bg-midnight-navy text-white selection:bg-electric-cyan selection:text-midnight-navy">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#030B16] border-b border-white/10 overflow-hidden text-center">
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
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto"
        >
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold font-sans text-white leading-tight mb-4 text-shadow-glow">
            {t.services.title}
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto text-shadow-sm">
            {t.services.subtitle}
          </motion.p>
        </motion.div>
      </section>

      {/* --- SERVICES LIST --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.services.items.map((service, index) => {
            const IconComponent = serviceIcons[index] || Monitor; // Fallback icon
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <TiltCard className="h-full">
                  <div className="bg-white/5 p-8 rounded-lg border border-white/10 shadow-lg flex flex-col items-center text-center h-full hover:border-electric-cyan/30 transition-all duration-300 hover:shadow-electric-cyan/20">
                    <div className="w-16 h-16 bg-electric-cyan/10 rounded-full flex items-center justify-center mb-6 text-electric-cyan group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">{service.title}</h2>
                    <p className="text-slate-400 leading-relaxed">{service.description}</p>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </section>
      
   {/* --- CTA SECTION --- */}
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
     
      <Footer />
    </main>
  );
}
