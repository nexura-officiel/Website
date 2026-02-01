"use client";

import { motion } from "framer-motion";
import { Quote, TrendingUp, Clock, Shield } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const icons = [Clock, TrendingUp, Shield];

export default function Testimonials() {
  const { t } = useLanguage();

  const testimonials = t.testimonials.items.map((item, index) => ({
    ...item,
    icon: icons[index]
  }));

  return (
    <section className="py-24 bg-midnight-navy relative overflow-hidden">
      {/* Background Map / Network Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-electric-cyan/10 via-midnight-navy to-midnight-navy"></div>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" className="text-slate-700" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-white mb-2">
              {t.testimonials.title}
            </h2>
            <div className="h-1 w-20 bg-electric-cyan rounded-full mb-4"></div>
            <p className="text-slate-400 max-w-xl">
              {t.testimonials.subtitle}
            </p>
          </div>
          <div className="hidden md:block">
            <span className="text-electric-cyan font-mono text-sm border border-electric-cyan/30 px-4 py-2 rounded-full bg-electric-cyan/5">
              {t.testimonials.satisfaction}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group relative bg-[#0A1625] border border-white/5 p-8 rounded-2xl hover:border-electric-cyan/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(0,215,215,0.1)]"
            >
              {/* Top Accent Gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-electric-cyan/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl"></div>

              <div className="flex justify-between items-start mb-6">
                <Quote className="text-slate-600 group-hover:text-electric-cyan transition-colors" size={32} />
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/5 group-hover:border-electric-cyan/20 transition-colors">
                  <item.icon size={14} className="text-electric-cyan" />
                  <span className="text-xs font-bold text-white font-mono">{item.metric}</span>
                </div>
              </div>

              <p className="text-slate-300 mb-8 leading-relaxed text-sm md:text-base">
                &quot;{item.quote}&quot;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-bold text-sm">
                  {item.role.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{item.role.split(',')[0]}</h4> {/* Using role part as name placeholder logic is simplified */}
                  <span className="text-slate-500 text-xs font-mono block">{item.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
