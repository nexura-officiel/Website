"use client";

import { motion } from "framer-motion";

const technologies = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", 
  "FastAPI", "Docker", "AWS", "Azure", "PostgreSQL", 
  "GraphQL", "Tailwind CSS", "Framer Motion", "Flutter"
];

export default function TechStack() {
  return (
    <section className="py-12 bg-midnight-navy border-y border-white/5 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-midnight-navy to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-midnight-navy to-transparent z-10"></div>
      
      <div className="flex">
        <motion.div
          className="flex space-x-12 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
        >
          {[...technologies, ...technologies].map((tech, index) => (
            <span
              key={index}
              className="text-2xl font-mono font-bold text-slate-600 hover:text-electric-cyan transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
