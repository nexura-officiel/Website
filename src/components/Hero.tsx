"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code, Database, Cpu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [nodes, setNodes] = useState<any[]>([]);

  useEffect(() => {
    const newNodes = [...Array(5)].map(() => ({
      width: Math.random() * 100 + 50,
      height: Math.random() * 100 + 50,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 5 + 5,
    }));
    setNodes(newNodes);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-midnight-navy">
      {/* Background Circuit Pattern (Simplified CSS/SVG) */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <svg
          className="w-full h-full animate-[pulse_4s_ease-in-out_infinite]"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="#00D7D7"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Nodes Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {nodes.map((node, i) => (
          <motion.div
            key={i}
            className="absolute bg-electric-cyan rounded-full opacity-20"
            style={{
              width: node.width,
              height: node.height,
              top: node.top,
              left: node.left,
              filter: "blur(40px)",
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: node.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan font-mono text-sm mb-6">
            v1.0 | SYSTEM ONLINE
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-white tracking-tight mb-6">
            The Intersection of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-blue-500">
              Logic & Growth
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            We bridge the gap between complex code and scalable digital solutions.
            Your partner in <span className="text-white font-medium">Software Engineering</span>, <span className="text-white font-medium">AI</span>, and <span className="text-white font-medium">Cloud Architecture</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#contact"
              className="group relative px-8 py-3 bg-electric-cyan text-midnight-navy font-bold rounded-sm overflow-hidden transition-all hover:bg-cyan-400"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start a Project <ArrowRight size={20} />
              </span>
            </Link>
            <Link
              href="#services"
              className="px-8 py-3 border border-slate-600 text-slate-300 font-medium rounded-sm hover:border-white hover:text-white transition-all"
            >
              Explore Services
            </Link>
          </div>
        </motion.div>

        {/* Tech Stack Icons Strip */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-20 pt-10 border-t border-white/5 flex justify-center gap-8 md:gap-16 text-slate-500"
        >
            <div className="flex flex-col items-center gap-2">
                <Code size={24} />
                <span className="text-xs font-mono">ENGINEERING</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Cpu size={24} />
                <span className="text-xs font-mono">AI CORE</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Database size={24} />
                <span className="text-xs font-mono">CLOUD DATA</span>
            </div>
        </motion.div>
      </div>
    </section>
  );
}