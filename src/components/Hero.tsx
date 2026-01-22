"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code, Database, Cpu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ParticleBackground from "./ui/ParticleBackground";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

export default function Hero() {
  const [text, setText] = useState("Logic & Growth");
  const finalText = "Logic & Growth";

  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;

    const startScramble = () => {
      clearInterval(interval);
      interval = setInterval(() => {
        setText((prev) =>
          prev
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return finalText[index];
              }
              return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            })
            .join("")
        );

        if (iteration >= finalText.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3; // Speed control
      }, 30);
    };

    // Delay start slightly
    setTimeout(startScramble, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-midnight-navy">
      {/* 1. Canvas Particle System */}
      <ParticleBackground />

      {/* 2. Background Grid (Subtle overlay) */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pointer-events-auto"
        >
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-electric-cyan/10 border border-electric-cyan/20 text-electric-cyan font-mono text-xs mb-8 hover:bg-electric-cyan/20 transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-cyan"></span>
            </span>
            SYSTEM OPERATIONAL | v1.0
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-bold text-white tracking-tight mb-8 leading-[1.1]">
            <span className="block text-slate-300 text-3xl md:text-5xl lg:text-6xl mb-2 font-medium">The Intersection of</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-cyan-400 to-blue-600 font-mono">
              {text}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            We bridge the gap between complex code and scalable digital solutions.
            Your partner in <span className="text-white font-medium">Software Engineering</span>, <span className="text-white font-medium">AI</span>, and <span className="text-white font-medium">Cloud Architecture</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="#contact"
              className="group relative px-8 py-4 bg-electric-cyan text-midnight-navy font-bold rounded overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(0,215,215,0.4)] hover:scale-105"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
              <span className="relative z-10 flex items-center gap-2">
                Start a Project <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link
              href="#services"
              className="px-8 py-4 border border-slate-700 text-slate-300 font-medium rounded hover:border-electric-cyan hover:text-electric-cyan transition-all hover:bg-electric-cyan/5"
            >
              Explore Services
            </Link>
          </div>
        </motion.div>

        {/* Tech Stack Icons Strip */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-24 pt-12 border-t border-white/5 flex justify-center gap-12 md:gap-24 text-slate-600 pointer-events-auto"
        >
            {[
                { icon: Code, label: "ENGINEERING" },
                { icon: Cpu, label: "AI CORE" },
                { icon: Database, label: "CLOUD DATA" }
            ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3 group cursor-default">
                    <div className="p-3 rounded-lg bg-white/5 group-hover:bg-electric-cyan/10 group-hover:text-electric-cyan transition-colors duration-300">
                        <item.icon size={24} />
                    </div>
                    <span className="text-[10px] tracking-[0.2em] font-mono group-hover:text-electric-cyan transition-colors">{item.label}</span>
                </div>
            ))}
        </motion.div>
      </div>
    </section>
  );
}