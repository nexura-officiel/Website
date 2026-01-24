"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutUs() {
  const { t } = useLanguage();

  return (
    <section id="aboutUs" className="py-24 bg-[#08182B] relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-electric-cyan/20 to-transparent"></div>
        
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-white mb-6">
              {t.aboutUs.title}<br />
              <span className="text-electric-cyan">{t.aboutUs.highlight}</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              {t.aboutUs.description}
            </p>

            <ul className="space-y-4">
              {t.aboutUs.points.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="text-electric-cyan shrink-0" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative"
          >
            {/* Abstract Code Visual */}
            <div className="bg-midnight-navy border border-white/10 rounded-lg p-6 font-mono text-sm relative shadow-2xl">
              <div className="flex gap-2 mb-4 border-b border-white/5 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="space-y-2 text-slate-400">
                <div className="flex">
                    <span className="text-slate-600 w-8 text-right mr-4 select-none">1</span>
                    <span><span className="text-purple-400">class</span> <span className="text-yellow-400">NexuraEngine</span> <span className="text-white">&lbrace;</span></span>
                </div>
                <div className="flex">
                    <span className="text-slate-600 w-8 text-right mr-4 select-none">2</span>
                    <span className="pl-4"><span className="text-purple-400">constructor</span>() <span className="text-white">&lbrace;</span></span>
                </div>
                <div className="flex">
                    <span className="text-slate-600 w-8 text-right mr-4 select-none">3</span>
                    <span className="pl-8"><span className="text-blue-400">this</span>.quality = <span className="text-electric-cyan">"Premium"</span>;</span>
                </div>
                <div className="flex">
                    <span className="text-slate-600 w-8 text-right mr-4 select-none">4</span>
                    <span className="pl-8"><span className="text-blue-400">this</span>.architecture = <span className="text-electric-cyan">"Scalable"</span>;</span>
                </div>
                <div className="flex">
                    <span className="text-slate-600 w-8 text-right mr-4 select-none">5</span>
                    <span className="pl-4"><span className="text-white">&rbrace;</span></span>
                </div>
                <div className="flex">
                    <span className="text-slate-600 w-8 text-right mr-4 select-none">6</span>
                    <span></span>
                </div>
                <div className="flex">
                    <span className="text-slate-600 w-8 text-right mr-4 select-none">7</span>
                    <span className="pl-4"><span className="text-purple-400">optimize</span>(<span className="text-orange-400">business</span>) <span className="text-white">&lbrace;</span></span>
                </div>
                <div className="flex">
                    <span className="text-slate-600 w-8 text-right mr-4 select-none">8</span>
                    <span className="pl-8"><span className="text-purple-400">return</span> business.growth * <span className="text-electric-cyan">2.0</span>;</span>
                </div>
                <div className="flex">
                    <span className="text-slate-600 w-8 text-right mr-4 select-none">9</span>
                    <span className="pl-4"><span className="text-white">&rbrace;</span></span>
                </div>
                <div className="flex">
                    <span className="text-slate-600 w-8 text-right mr-4 select-none">10</span>
                    <span className="text-white">&rbrace;</span>
                </div>
              </div>

              {/* Glowing Element behind */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-electric-cyan/5 blur-3xl rounded-full"></div>
            </div>
          </motion.div>

        </div>

        <div className="text-center mt-12">
          <Link
            href="/about"
            className="relative px-6 py-3 bg-transparent border border-electric-cyan text-electric-cyan font-sans font-semibold rounded-sm overflow-hidden group"
          >
            <div className="absolute inset-0 w-0 bg-electric-cyan transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
            <span className="relative group-hover:text-white transition-colors">{t.aboutUs.readMoreButton}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}