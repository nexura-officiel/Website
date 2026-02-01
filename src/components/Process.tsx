"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Code2, ShieldCheck, Rocket } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const icons = [Search, PenTool, Code2, ShieldCheck, Rocket];
const colors = [
  "from-blue-500 to-cyan-400",
  "from-cyan-400 to-teal-400",
  "from-teal-400 to-emerald-400",
  "from-emerald-400 to-blue-400",
  "from-blue-400 to-indigo-500"
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useLanguage();

  const steps = t.process.steps.map((step, index) => ({
    ...step,
    id: index + 1,
    icon: icons[index],
    color: colors[index]
  }));

  return (
    <section id="process" className="py-32 bg-[#030B16] relative overflow-hidden">
      {/* Background Decorative Data Lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-electric-cyan w-full"
            style={{ top: `${i * 10}%`, left: 0 }}
          ></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-electric-cyan font-mono text-sm mb-4"
            >
              <span className="w-8 h-px bg-electric-cyan"></span>
              {t.process.label}
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-white leading-tight">
              {t.process.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-blue-500">
                {t.process.highlight}
              </span>
            </h2>
          </div>
          <p className="text-slate-400 max-w-sm text-sm md:text-base mb-2">
            {t.process.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Navigation Sidebar (Mobile: Horizontal Scroll) */}
          <div className="lg:col-span-4 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onMouseEnter={() => setActiveStep(index)}
                onClick={() => setActiveStep(index)}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left min-w-[200px] lg:min-w-0 border ${activeStep === index
                    ? "bg-white/10 border-electric-cyan/50 shadow-[0_0_20px_rgba(0,215,215,0.1)]"
                    : "bg-transparent border-transparent hover:bg-white/5"
                  }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${activeStep === index ? "bg-electric-cyan border-electric-cyan text-midnight-navy" : "bg-midnight-navy border-white/10 text-slate-500"
                  }`}>
                  <step.icon size={20} />
                </div>
                <div>
                  <div className={`text-[10px] font-mono mb-px ${activeStep === index ? "text-electric-cyan" : "text-slate-600"}`}>
                    PHASE 0{step.id}
                  </div>
                  <div className={`font-bold transition-colors ${activeStep === index ? "text-white" : "text-slate-400"}`}>
                    {step.title}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Display Area */}
          <div className="lg:col-span-8">
            <div className="relative bg-midnight-navy border border-white/10 rounded-2xl p-8 md:p-12 overflow-hidden min-h-[400px] flex flex-col justify-center">
              {/* Animated Gradient Background */}
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${steps[activeStep].color} opacity-[0.03] blur-[100px] transition-all duration-700`}></div>

              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <div className="flex items-center gap-4 mb-6 text-electric-cyan">
                  <div className="h-px w-12 bg-electric-cyan/30"></div>
                  <span className="font-mono text-sm tracking-widest uppercase">{steps[activeStep].subtitle}</span>
                </div>

                <h3 className="text-3xl md:text-5xl font-bold text-white mb-8">
                  {steps[activeStep].title}
                </h3>

                <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
                  {steps[activeStep].description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400">
                    <div className="w-2 h-2 rounded-full bg-electric-cyan animate-pulse"></div>
                    {t.process.tags.engineers}
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400">
                    <div className="w-2 h-2 rounded-full bg-electric-cyan animate-pulse"></div>
                    {t.process.tags.architect}
                  </div>
                </div>
              </motion.div>

              {/* Step indicator */}
              <div className="absolute bottom-8 right-8 text-white/5 font-sans font-black text-8xl pointer-events-none select-none">
                0{steps[activeStep].id}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
