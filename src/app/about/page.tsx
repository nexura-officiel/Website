"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Code, Cpu, Globe, Server, Shield, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ParticleBackground from "@/components/ui/ParticleBackground";
import TiltCard from "@/components/ui/TiltCard";

export default function AboutPage() {
  const { t } = useLanguage();

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
    <main className="min-h-screen bg-[#020617] text-white selection:bg-electric-cyan selection:text-[#020617] overflow-x-hidden">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
        <ParticleBackground />
        
        {/* Abstract Gradient Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-cyan/20 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center lg:text-left"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-cyan/10 border border-electric-cyan/20 text-electric-cyan text-sm font-mono mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-cyan"></span>
              </span>
              nexura.system.about_module
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold font-sans tracking-tight text-white mb-6 leading-tight">
              More Than <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-purple-500">Just Code.</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t.aboutUs.extendedDescription}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
               <Link href="/contact" className="px-8 py-4 bg-electric-cyan text-[#020617] font-bold rounded-sm hover:shadow-[0_0_30px_rgba(0,215,215,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group">
                  Start Innovation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </Link>
               <Link href="#mission" className="px-8 py-4 border border-white/10 bg-white/5 backdrop-blur-sm text-white font-medium rounded-sm hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                  Our Philosophy
               </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative hidden lg:flex items-center justify-center min-h-[500px]"
          >
             {/* --- Engineering Core Visual --- */}
             <div className="relative w-full max-w-[550px] aspect-square flex items-center justify-center">
                
                {/* Outer Orbit */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-electric-cyan/10 rounded-full"
                >
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-electric-cyan rounded-full shadow-[0_0_15px_#00d7d7]"></div>
                </motion.div>

                {/* Middle Orbit */}
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[15%] border border-purple-500/20 rounded-full border-dashed"
                >
                   <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_15px_#a855f7] opacity-60"></div>
                </motion.div>

                {/* Inner Orbit */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[30%] border border-electric-cyan/30 rounded-full"
                >
                   <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff]"></div>
                </motion.div>

                {/* Central Core Glow */}
                <div className="absolute inset-1/3 bg-electric-cyan/10 rounded-full blur-[80px] animate-pulse"></div>

                {/* --- The Digital Monolith (Architectural Stack) --- */}
                <div className="relative w-80 h-96 [transform-style:preserve-3d] [transform:rotateX(60deg)_rotateZ(-45deg)]">
                  
                  {/* Layer 1: Infrastructure (Bottom) */}
                  <motion.div
                    initial={{ translateZ: 0, opacity: 0 }}
                    animate={{ translateZ: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 1 }}
                    className="absolute inset-0 bg-slate-900/80 border-2 border-slate-700/50 rounded-xl shadow-[0_0_30px_rgba(2,6,23,0.8)] backdrop-blur-sm grid grid-cols-4 grid-rows-4 gap-1 p-4"
                  >
                     {[...Array(16)].map((_, i) => (
                        <div key={i} className={`rounded-sm ${i % 3 === 0 ? 'bg-slate-700/30' : 'bg-transparent'}`}></div>
                     ))}
                     <div className="absolute -right-12 top-0 text-slate-500 text-xs font-mono -rotate-90 origin-top-left">INFRASTRUCTURE</div>
                  </motion.div>

                  {/* Layer 2: Logic (Middle) */}
                  <motion.div
                    initial={{ translateZ: 0, opacity: 0 }}
                    animate={{ translateZ: 80, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1, type: "spring" }}
                    className="absolute inset-0 bg-purple-900/20 border-2 border-purple-500/30 rounded-xl shadow-lg backdrop-blur-sm flex items-center justify-center overflow-hidden"
                  >
                     <div className="font-mono text-purple-300/50 text-xs p-2 leading-none whitespace-pre opacity-50">
{`function optimized() {
  return true;
}
class Core extends AI {
  init() { ... }
}`}
                     </div>
                     <div className="absolute -right-12 top-0 text-purple-400 text-xs font-mono -rotate-90 origin-top-left">LOGIC_CORE</div>
                  </motion.div>

                  {/* Layer 3: Interface (Top) */}
                  <motion.div
                    initial={{ translateZ: 0, opacity: 0 }}
                    animate={{ translateZ: 160, opacity: 1 }}
                    transition={{ delay: 1.0, duration: 1, type: "spring" }}
                    className="absolute inset-0 bg-electric-cyan/10 border-2 border-electric-cyan/50 rounded-xl shadow-[0_0_40px_rgba(0,215,215,0.2)] backdrop-blur-sm flex flex-col p-4 gap-2"
                  >
                     {/* Mock UI Elements */}
                     <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-electric-cyan/20 border border-electric-cyan/50"></div>
                        <div className="flex-1 h-8 rounded-md bg-electric-cyan/10"></div>
                     </div>
                     <div className="flex-1 rounded-md bg-electric-cyan/5 border border-electric-cyan/10 grid grid-cols-2 gap-2 p-2">
                        <div className="bg-electric-cyan/20 rounded"></div>
                        <div className="bg-electric-cyan/20 rounded"></div>
                     </div>
                     <div className="absolute -right-12 top-0 text-electric-cyan text-xs font-mono -rotate-90 origin-top-left">INTERFACE</div>
                  </motion.div>

                  {/* Central Data Beam */}
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: 200 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 bg-white/80 shadow-[0_0_20px_white] [transform:translateZ(0)] origin-bottom"
                  ></motion.div>

                   {/* Rising Particles */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ translateZ: [0, 200], opacity: [0, 1, 0] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: i * 0.8,
                        ease: "linear"
                      }}
                      className="absolute left-1/2 top-1/2 w-2 h-2 bg-electric-cyan rounded-full shadow-[0_0_10px_cyan]"
                    />
                  ))}

                </div>

                {/* Floating Data Points */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -40, 0],
                      x: [0, (i % 2 === 0 ? 30 : -30), 0],
                      opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${20 + Math.random() * 60}%`,
                    }}
                  />
                ))}
             </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
        >
          <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-electric-cyan/50 to-transparent"></div>
        </motion.div>
      </section>

      {/* --- MISSION SECTION --- */}
      <section id="mission" className="py-24 relative bg-[#0B1221]">
        {/* Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-bold mb-6">
               <span className="text-white">{t.aboutUs.missionTitle}</span>
             </h2>
             <div className="w-24 h-1 bg-electric-cyan mx-auto rounded-full mb-8"></div>
             <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
               "{t.aboutUs.missionDescription}"
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { icon: Code, title: "Engineering First", desc: "Rigorous code quality and architectural patterns." },
              { icon: Cpu, title: "AI Integration", desc: "Smart systems that learn and adapt to your data." },
              { icon: Globe, title: "Global Scale", desc: "Infrastructure built to handle millions of requests." }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors group"
              >
                <div className="w-14 h-14 bg-electric-cyan/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="text-electric-cyan w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PHILOSOPHY / POINTS SECTION --- */}
      <section className="py-24 bg-[#020617] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                {t.aboutUs.highlight}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-slate-400 mb-10 leading-relaxed"
              >
                {t.aboutUs.description}
              </motion.p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.aboutUs.points.map((point, i) => (
                  <TiltCard key={i} className="h-full">
                    <div className="p-6 bg-[#0F172A] border border-slate-800 rounded-xl h-full flex flex-col hover:border-electric-cyan/50 transition-colors duration-300">
                      <CheckCircle2 className="text-electric-cyan mb-4 w-8 h-8" />
                      <p className="text-slate-200 font-medium text-lg">{point}</p>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>

            <div className="relative lg:h-[600px] w-full flex items-center justify-center">
               {/* Abstract decorative graphic */}
               <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan/5 to-purple-500/5 rounded-full blur-3xl"></div>
               <div className="relative w-full h-full border border-white/5 bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-electric-cyan to-transparent opacity-50"></div>
                  
                  {/* Mock Code Interface */}
                  <div className="font-mono text-sm text-slate-500 space-y-4">
                    <div className="flex gap-4 border-b border-white/10 pb-4 mb-6">
                      <span className="text-white">nexus_core.tsx</span>
                      <span>system_config.json</span>
                      <span>deploy.yaml</span>
                    </div>
                    
                    <div className="space-y-2">
                        <p><span className="text-purple-400">import</span> <span className="text-yellow-300">{`{ Scalability, Security }`}</span> <span className="text-purple-400">from</span> <span className="text-green-400">'@nexura/core'</span>;</p>
                        <p>&nbsp;</p>
                        <p><span className="text-purple-400">export const</span> <span className="text-blue-400">BusinessTransformation</span> = <span className="text-yellow-300">async</span> (client) <span className="text-purple-400">=&gt;</span> &#123;</p>
                        <p className="pl-4"><span className="text-slate-600">// Initializing system analysis</span></p>
                        <p className="pl-4"><span className="text-purple-400">const</span> analysis = <span className="text-yellow-300">await</span> client.analyze();</p>
                        <p className="pl-4"><span className="text-purple-400">if</span> (analysis.potential === <span className="text-green-400">'HIGH'</span>) &#123;</p>
                        <p className="pl-8"><span className="text-purple-400">return</span> <span className="text-blue-400">Scalability</span>.boost(client, <span className="text-orange-400">100</span>);</p>
                        <p className="pl-4">&#125;</p>
                        <p className="pl-4"><span className="text-slate-600">// Implementing secure infrastructure</span></p>
                        <p className="pl-4"><span className="text-blue-400">Security</span>.fortify(client.infrastructure);</p>
                        <p className="pl-4"><span className="text-purple-400">return</span> <span className="text-green-400">"SUCCESS"</span>;</p>
                        <p>&#125;;</p>
                    </div>

                    <div className="mt-12 p-4 bg-black/40 rounded border-l-2 border-green-500">
                        <p className="text-green-400 font-bold">✓ BUILD SUCCESSFUL</p>
                        <p className="text-xs mt-1">Time: 1.24s | Optimized by Nexura Engine</p>
                    </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SERVICES TEASER --- */}
      <section className="py-20 bg-[#0B1221] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <h3 className="text-3xl font-bold text-white mb-6">
            {t.aboutUs.coreServicesTitle}
           </h3>
           <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            {t.aboutUs.servicesOverview}
           </p>
           <Link href="/services" className="inline-block relative px-8 py-3 overflow-hidden rounded-full group bg-transparent border border-electric-cyan text-electric-cyan font-semibold hover:text-[#020617] transition-colors duration-300">
             <span className="absolute inset-0 w-full h-full bg-electric-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
             <span className="relative z-10">Explore Technical Capabilities</span>
           </Link>
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
                    className="relative px-12 py-5 bg-electric-cyan text-midnight-navy text-lg font-bold rounded-sm overflow-hidden group hover:shadow-[0_0_40px_rgba(0,215,215,0.3)] transition-all duration-300"
                >
                    <span className="relative z-10">{t.aboutUs.ctaButton}</span>
                </Link>
                <Link
                    href="/services"
                    className="text-slate-300 hover:text-white underline underline-offset-4 decoration-electric-cyan/50 hover:decoration-electric-cyan transition-all"
                >
                    View Our Tech Stack
                </Link>
            </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

