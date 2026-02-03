"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import Services from "@/components/Services";
import AboutUs from "@/components/AboutUs";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { motion } from "framer-motion";
import { Send, CheckCircle, Mail, MapPin, Clock, Terminal } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <main className="min-h-screen bg-midnight-navy text-white selection:bg-electric-cyan selection:text-midnight-navy">
      <Navbar />
      <Hero />
      <TechStack />
      <Services />
      <AboutUs />
      <Process />
      <Testimonials />

      <section id="contact" className="py-24 bg-[#030B16] relative overflow-hidden">
        {/* Background Digital Grid */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left Column: Context & Info */}
            <div className="lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 text-electric-cyan font-mono text-sm mb-6">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-cyan opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-electric-cyan"></span>
                  </span>
                  {t.contact.status}
                </div>

                <h2 className="text-4xl md:text-5xl font-sans font-bold text-white mb-6">
                  {t.contact.title} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-blue-500">
                    {t.contact.highlight}
                  </span>
                </h2>

                <p className="text-slate-400 text-lg mb-12 leading-relaxed">
                  {t.contact.description}
                </p>

                <div className="space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-electric-cyan/10 rounded-lg flex items-center justify-center text-electric-cyan shrink-0">
                      <Mail size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-500">{t.contact.info.emailLabel}</span>
                      <a href="mailto:contact@nexura.ma" className="text-slate-400 hover:text-electric-cyan transition-colors font-mono">
                        contact@nexura.ma
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 shrink-0 text-electric-cyan">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">{t.contact.info.locationLabel}</h4>
                      <p className="text-slate-400">
                        {t.contact.info.location}<br />
                        <span className="text-xs text-slate-500">{t.contact.info.remote}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 shrink-0 text-electric-cyan">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">{t.contact.info.timeLabel}</h4>
                      <p className="text-slate-400">
                        {t.contact.info.time}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Terminal Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Terminal Window */}
              <div className="bg-midnight-navy border border-white/10 rounded-xl overflow-hidden shadow-2xl relative group">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-electric-cyan opacity-50"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-electric-cyan opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-electric-cyan opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-electric-cyan opacity-50"></div>

                {/* Terminal Header */}
                <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="flex-1 text-center font-mono text-xs text-slate-500 flex items-center justify-center gap-2">
                    <Terminal size={12} />
                    root@nexura-uplink:~
                  </div>
                  <div className="w-12"></div> {/* Spacer for balance */}
                </div>

                <div className="p-8">
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center h-[400px]">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                      >
                        <CheckCircle className="text-electric-cyan w-20 h-20 mb-6" />
                      </motion.div>
                      <h3 className="text-2xl text-white font-bold mb-2">{t.contact.form.successTitle}</h3>
                      <p className="text-slate-400 max-w-xs mx-auto mb-8">
                        {t.contact.form.successMsg}
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="text-sm font-mono text-electric-cyan hover:underline"
                      >
                        {t.contact.form.reset}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                          <label className={`block text-xs font-mono mb-2 transition-colors ${focusedField === '"name"' ? '"text-electric-cyan"' : '"text-slate-500"'}`}>
                            {t.contact.form.nameLabel}
                          </label>
                          <input
                            type="text"
                            required
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full bg-[#050C16] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-electric-cyan/50 focus:ring-1 focus:ring-electric-cyan/50 transition-all placeholder:text-slate-700"
                            placeholder={t.contact.form.placeholders.name}
                          />
                        </div>
                        <div>
                          <label className={`block text-xs font-mono mb-2 transition-colors ${focusedField === '"email"' ? '"text-electric-cyan"' : '"text-slate-500"'}`}>
                            {t.contact.form.emailLabel}
                          </label>
                          <input
                            type="email"
                            required
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full bg-[#050C16] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-electric-cyan/50 focus:ring-1 focus:ring-electric-cyan/50 transition-all placeholder:text-slate-700"
                            placeholder={t.contact.form.placeholders.email}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={`block text-xs font-mono mb-2 transition-colors ${focusedField === '"type"' ? '"text-electric-cyan"' : '"text-slate-500"'}`}>
                          {t.contact.form.typeLabel}
                        </label>
                        <select
                          onFocus={() => setFocusedField('type')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-[#050C16] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-electric-cyan/50 focus:ring-1 focus:ring-electric-cyan/50 transition-all [&>option]:bg-midnight-navy"
                        >
                          {t.contact.form.types.map((type, i) => (
                            <option key={i}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className={`block text-xs font-mono mb-2 transition-colors ${focusedField === '"message"' ? '"text-electric-cyan"' : '"text-slate-500"'}`}>
                          {t.contact.form.msgLabel}
                        </label>
                        <textarea
                          rows={4}
                          required
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-[#050C16] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-electric-cyan/50 focus:ring-1 focus:ring-electric-cyan/50 transition-all resize-none placeholder:text-slate-700"
                          placeholder={t.contact.form.placeholders.msg}
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-electric-cyan text-midnight-navy font-bold py-4 rounded hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2 group relative overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {t.contact.form.btn} <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  );
}