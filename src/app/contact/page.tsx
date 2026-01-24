"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Send, CheckCircle, Mail, MapPin, Clock, Terminal, Copy, Globe, Server, Shield, Radio } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import ParticleBackground from "@/components/ui/ParticleBackground";
import TiltCard from "@/components/ui/TiltCard";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { t } = useLanguage();

  // Hydration fix for random animations
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contact@nexura.ma');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-electric-cyan selection:text-[#020617] overflow-x-hidden">
      <Navbar />

      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-20 overflow-hidden">
        <ParticleBackground />
        
        {/* Abstract Gradient Glows */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-electric-cyan/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Visual & Info */}
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-cyan/10 border border-electric-cyan/20 text-electric-cyan text-sm font-mono mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-cyan opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-cyan"></span>
                  </span>
                  {t.contact.status}
                </div>
                
                <h1 className="text-5xl md:text-6xl font-sans font-bold text-white mb-6 leading-tight">
                  {t.contact.title} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-purple-500">
                    {t.contact.highlight}
                  </span>
                </h1>
                
                <p className="text-slate-400 text-lg mb-12 leading-relaxed max-w-lg">
                  {t.contact.description}
                </p>

                {/* --- 3D Holographic Comms Hub --- */}
                <div className="relative h-[300px] w-full max-w-md perspective-1000 hidden md:block">
                    {/* Floating Base */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-electric-cyan/5 rounded-full blur-xl animate-pulse"></div>
                    
                    {/* Central Node */}
                    <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-[#0B1221] to-[#1e293b] border border-electric-cyan/50 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,215,215,0.2)] z-10"
                    >
                        <Globe className="text-electric-cyan w-10 h-10 animate-spin-slow" />
                    </motion.div>

                    {/* Orbiting Satellites */}
                    {mounted && [
                        { Icon: Mail, delay: 0, radius: 100, speed: 10 },
                        { Icon: Server, delay: 2, radius: 140, speed: 15 },
                        { Icon: Shield, delay: 4, radius: 100, speed: 12, reverse: true },
                        { Icon: Radio, delay: 1, radius: 140, speed: 18, reverse: true },
                    ].map((orb, i) => (
                        <motion.div
                            key={i}
                            animate={{ rotate: orb.reverse ? -360 : 360 }}
                            transition={{ duration: orb.speed, repeat: Infinity, ease: "linear" }}
                            className="absolute top-1/2 left-1/2 -ml-3 -mt-3 w-6 h-6"
                            style={{ 
                                width: orb.radius * 2, 
                                height: orb.radius * 2,
                                marginLeft: -orb.radius,
                                marginTop: -orb.radius
                            }}
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#020617] p-2 rounded-full border border-white/10 shadow-lg text-slate-300">
                                <orb.Icon size={16} />
                            </div>
                        </motion.div>
                    ))}
                    
                    {/* Orbital Rings */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-white/5 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] border border-white/5 rounded-full border-dashed opacity-50"></div>
                </div>

                {/* Mobile Info Cards (visible on small screens instead of 3D visual) */}
                <div className="md:hidden space-y-4">
                     <div className="flex items-center gap-4 text-slate-300">
                        <Mail className="text-electric-cyan" /> <span>contact@nexura.ma</span>
                     </div>
                     <div className="flex items-center gap-4 text-slate-300">
                        <MapPin className="text-electric-cyan" /> <span>Casablanca, Morocco</span>
                     </div>
                </div>

              </motion.div>
            </div>

            {/* Right Column: Terminal Form */}
            <div className="order-1 lg:order-2">
              <TiltCard className="h-full">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-[#0B1221]/80 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                >
                  {/* Terminal Header */}
                  <div className="bg-white/5 px-4 py-3 border-b border-white/5 flex items-center justify-between">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    </div>
                    <div className="text-xs font-mono text-slate-500 flex items-center gap-2">
                      <Terminal size={12} />
                      secure_transmission_v2.0
                    </div>
                    <div className="w-12"></div>
                  </div>

                  <div className="p-8">
                    {submitted ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center h-[400px]">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring" }}
                          className="relative"
                        >
                          <div className="absolute inset-0 bg-electric-cyan/20 rounded-full blur-xl animate-pulse"></div>
                          <CheckCircle className="relative text-electric-cyan w-20 h-20 mb-6" />
                        </motion.div>
                        <h3 className="text-2xl text-white font-bold mb-2">{t.contact.form.successTitle}</h3>
                        <p className="text-slate-400 max-w-xs mx-auto mb-8">
                          {t.contact.form.successMsg}
                        </p>
                        <button 
                          onClick={() => setSubmitted(false)}
                          className="text-sm font-mono text-electric-cyan hover:text-white transition-colors"
                        >
                          {t.contact.form.reset}
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="group">
                            <label className={`block text-xs font-mono mb-2 transition-colors ${focusedField === 'name' ? 'text-electric-cyan' : 'text-slate-500'}`}>
                              {t.contact.form.nameLabel}
                            </label>
                            <input
                              type="text"
                              required
                              onFocus={() => setFocusedField('name')}
                              onBlur={() => setFocusedField(null)}
                              className="w-full bg-[#020617] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-electric-cyan/50 focus:ring-1 focus:ring-electric-cyan/50 transition-all placeholder:text-slate-700"
                              placeholder={t.contact.form.placeholders.name}
                            />
                          </div>
                          <div>
                            <label className={`block text-xs font-mono mb-2 transition-colors ${focusedField === 'email' ? 'text-electric-cyan' : 'text-slate-500'}`}>
                              {t.contact.form.emailLabel}
                            </label>
                            <input
                              type="email"
                              required
                              onFocus={() => setFocusedField('email')}
                              onBlur={() => setFocusedField(null)}
                              className="w-full bg-[#020617] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-electric-cyan/50 focus:ring-1 focus:ring-electric-cyan/50 transition-all placeholder:text-slate-700"
                              placeholder={t.contact.form.placeholders.email}
                            />
                          </div>
                        </div>

                        <div>
                          <label className={`block text-xs font-mono mb-2 transition-colors ${focusedField === 'type' ? 'text-electric-cyan' : 'text-slate-500'}`}>
                            {t.contact.form.typeLabel}
                          </label>
                          <select
                            onFocus={() => setFocusedField('type')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full bg-[#020617] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-electric-cyan/50 focus:ring-1 focus:ring-electric-cyan/50 transition-all [&>option]:bg-[#020617]"
                          >
                            {t.contact.form.types.map((type, i) => (
                              <option key={i}>{type}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className={`block text-xs font-mono mb-2 transition-colors ${focusedField === 'message' ? 'text-electric-cyan' : 'text-slate-500'}`}>
                            {t.contact.form.msgLabel}
                          </label>
                          <textarea
                            rows={4}
                            required
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full bg-[#020617] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-electric-cyan/50 focus:ring-1 focus:ring-electric-cyan/50 transition-all resize-none placeholder:text-slate-700"
                            placeholder={t.contact.form.placeholders.msg}
                          ></textarea>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-electric-cyan text-[#020617] font-bold py-4 rounded hover:shadow-[0_0_20px_rgba(0,215,215,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group"
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            {t.contact.form.btn} <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                          </span>
                        </button>
                      </form>
                    )}
                  </div>
                </motion.div>
              </TiltCard>
            </div>

          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-24 border-t border-white/5 bg-[#020617] relative">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { 
                      icon: Mail, 
                      label: t.contact.info.emailLabel, 
                      value: "contact@nexura.ma", 
                      sub: "Response < 24h",
                      action: (
                        <button onClick={handleCopyEmail} className="mt-3 text-xs font-mono text-electric-cyan hover:text-white transition-colors flex items-center gap-2 px-3 py-1.5 rounded bg-electric-cyan/10 border border-electric-cyan/20 hover:bg-electric-cyan/20">
                            {copiedEmail ? <CheckCircle size={12}/> : <Copy size={12}/>} 
                            {copiedEmail ? "COPIED_TO_CLIPBOARD" : "COPY_ADDRESS"}
                        </button>
                      )
                    },
                    { 
                      icon: MapPin, 
                      label: t.contact.info.locationLabel, 
                      value: t.contact.info.location, 
                      sub: t.contact.info.remote 
                    },
                    { 
                      icon: Clock, 
                      label: t.contact.info.timeLabel, 
                      value: t.contact.info.time, 
                      sub: "Mon-Fri, 09:00 - 18:00 (GMT+1)" 
                    }
                  ].map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="group relative bg-[#0B1221]/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:border-electric-cyan/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,215,215,0.05)] overflow-hidden"
                    >
                        {/* Hover Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-electric-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-[#020617] rounded-2xl flex items-center justify-center text-electric-cyan mb-6 shadow-lg border border-white/5 group-hover:scale-110 group-hover:border-electric-cyan/30 transition-all duration-300">
                                <item.icon size={28} className="group-hover:drop-shadow-[0_0_8px_rgba(0,215,215,0.5)] transition-all" />
                            </div>
                            
                            <h3 className="text-white font-bold text-lg mb-2">{item.label}</h3>
                            <p className="text-slate-300 font-mono text-sm mb-1">{item.value}</p>
                            <p className="text-slate-500 text-xs">{item.sub}</p>
                            
                            {item.action && <div className="mt-2">{item.action}</div>}
                        </div>
                    </motion.div>
                  ))}
              </div>
          </div>
      </section>

      <Footer />
    </main>
  );
}
