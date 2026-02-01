"use client";

import { motion } from "framer-motion";
import { Cpu, Layers, Box, Terminal, Database, Cloud, Code, Shield, Smartphone, Server, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Enhanced data structure with icons and categories
const technologies = [
  { name: "React", category: "Frontend", icon: Box },
  { name: "Next.js", category: "Framework", icon: Layers },
  { name: "TypeScript", category: "Language", icon: Code },
  { name: "Node.js", category: "Backend", icon: Terminal },
  { name: "Python", category: "AI / ML", icon: Cpu },
  { name: "AWS", category: "Cloud", icon: Cloud },
  { name: "Docker", category: "DevOps", icon: Server },
  { name: "PostgreSQL", category: "Database", icon: Database },
  { name: "FastAPI", category: "Backend", icon: Zap },
  { name: "Tailwind", category: "Design", icon: Layers },
  { name: "Flutter", category: "Mobile", icon: Smartphone },
  { name: "Security", category: "Audit", icon: Shield },
];

const TechCard = ({ tech }: { tech: typeof technologies[0] }) => (
  <div className="relative group/card flex items-center gap-4 px-5 py-4 mx-3 bg-[#0A1625]/80 backdrop-blur-sm border border-white/5 rounded-xl min-w-[220px] hover:border-electric-cyan/40 hover:bg-[#0A1625] transition-all duration-300 cursor-default overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-electric-cyan/10 to-transparent translate-x-[-150%] group-hover/card:translate-x-[150%] transition-transform duration-1000 ease-in-out"></div>
    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 group-hover/card:text-electric-cyan group-hover/card:border-electric-cyan/20 group-hover/card:shadow-[0_0_15px_rgba(0,215,215,0.15)] transition-all">
      <tech.icon size={20} strokeWidth={1.5} />
    </div>
    <div className="relative z-10">
      <div className="text-slate-200 font-bold text-sm tracking-wide group-hover/card:text-white transition-colors">
        {tech.name}
      </div>
      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider group-hover/card:text-electric-cyan/70 transition-colors">
        {tech.category}
      </div>
    </div>
    <div className="absolute top-3 right-3 flex gap-1">
      <div className="w-1 h-1 rounded-full bg-slate-700 group-hover/card:bg-electric-cyan transition-colors"></div>
      <div className="w-1 h-1 rounded-full bg-slate-700 group-hover/card:bg-electric-cyan transition-colors delay-75"></div>
    </div>
  </div>
);

export default function TechStack() {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 bg-[#030B16] border-y border-white/5 z-20">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.05] pointer-events-none"></div>

      {/* Center Label */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
        <div className="bg-[#030B16] px-6 py-2 border border-white/10 rounded-full flex items-center gap-3 shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-cyan"></span>
          </div>
          <span className="text-[10px] font-mono text-electric-cyan font-bold tracking-[0.2em] uppercase">
            {t.techStack.label}
          </span>
        </div>
      </div>

      <div className="relative overflow-hidden">
        {/* Gradient Masks */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#030B16] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[#030B16] to-transparent z-10 pointer-events-none"></div>

        <div className="flex flex-col gap-8">
          {/* Row 1: Forward */}
          <div className="flex">
            <motion.div
              className="flex"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 40,
              }}
            >
              {[...technologies, ...technologies].map((tech, index) => (
                <TechCard key={`r1-${index}`} tech={tech} />
              ))}
            </motion.div>
          </div>

          {/* Row 2: Reverse */}
          <div className="flex">
            <motion.div
              className="flex"
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 50,
              }}
            >
              {[...technologies].reverse().concat([...technologies].reverse()).map((tech, index) => (
                <TechCard key={`r2-${index}`} tech={tech} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}