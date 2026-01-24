"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Monitor, Bot, Cloud, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import TiltCard from "./ui/TiltCard";

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      ...t.services.items[0],
      icon: Monitor,
      tags: ["Web", "Mobile", "SaaS"],
    },
    {
      ...t.services.items[1],
      icon: Bot,
      tags: ["LLMs", "Chatbots", "Workflows"],
    },
    {
      ...t.services.items[2],
      icon: Cloud,
      tags: ["DevOps", "Cybersecurity", "Audit"],
    },
  ];

  return (
    <section id="services" className="py-24 bg-midnight-navy relative perspective-1000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-white mb-4">
            {t.services.title}
          </h2>
          <div className="h-1 w-20 bg-electric-cyan mx-auto rounded-full"></div>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <TiltCard className="h-full">
                <div className="group relative bg-white/5 border border-white/10 p-8 rounded-xl hover:border-electric-cyan/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,215,215,0.1)] h-full">
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="text-electric-cyan" />
                  </div>
                  
                  <div className="w-14 h-14 bg-midnight-navy border border-electric-cyan/30 rounded-lg flex items-center justify-center mb-6 text-electric-cyan group-hover:bg-electric-cyan group-hover:text-midnight-navy transition-colors">
                    <service.icon size={28} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2 py-1 bg-white/5 text-slate-300 rounded border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="relative px-6 py-3 bg-transparent border border-electric-cyan text-electric-cyan font-sans font-semibold rounded-sm overflow-hidden group"
          >
            <div className="absolute inset-0 w-0 bg-electric-cyan transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
            <span className="relative group-hover:text-white transition-colors">{t.services.moreServicesButton}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
