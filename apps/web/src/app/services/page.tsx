"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { Monitor, Bot, Cloud, ArrowRight, Code, Database, Lock, Cpu, Globe, Zap, Briefcase, Stethoscope, Truck, ShoppingBag, Home, GraduationCap, Layers, LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ParticleBackground from "@/components/ui/ParticleBackground";
import TiltCard from "@/components/ui/TiltCard";
import { supabase } from "@nexura/database";
import { useEffect, useState } from "react";
import { Service } from "@nexura/types";

const iconMap: Record<string, LucideIcon> = {
  Monitor, Bot, Cloud, Database, Lock, Globe, Zap, Code, Cpu,
  Briefcase, Stethoscope, Truck, ShoppingBag, Home, GraduationCap, Layers
};

export default function ServicesPage() {
  const { t, language } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Expanded icon set for visual variety if needed, though we map the main 3 first
  const serviceIcons = [Monitor, Bot, Cloud, Database, Lock, Globe];
  const industryIcons = [Briefcase, Stethoscope, Truck, ShoppingBag, Home, GraduationCap];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('id', { ascending: true }); // Ensure consistent ordering

        if (error) {
          console.error('Error fetching services:', error);
          return;
        }

        if (data) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mappedServices: Service[] = data.map((svc: any) => ({
            id: svc.id,
            slug: svc.slug,
            title: language === 'fr' ? svc.title_fr : svc.title_en,
            description: language === 'fr' ? svc.description_fr : svc.description_en,
            tags: svc.tags || [],
            system_load: svc.system_load || 85,
            icon_name: svc.icon_name
          }));
          setServices(mappedServices);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [language]);

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-electric-cyan selection:text-[#020617] overflow-x-hidden">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[80vh] flex items-center justify-center pt-20 overflow-hidden">
        <ParticleBackground />

        {/* Abstract Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-electric-cyan/10 rounded-[100%] blur-[120px] -z-10 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-cyan/5 border border-electric-cyan/20 text-electric-cyan text-sm font-mono mb-8 backdrop-blur-md">
              <Zap size={12} className="fill-current" />
              SYSTEM_CAPABILITIES_V1.0
            </div>

            <h1 className="text-5xl md:text-8xl font-bold font-sans text-white mb-8 tracking-tight">
              {t.services.title.split(' ')[0]} <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-purple-500">
                {t.services.title.split(' ').slice(1).join(' ')}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12">
              {t.services.subtitle}
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-electric-cyan/50 to-transparent"></div>
        </motion.div>
      </section>

      {/* --- SERVICE MATRIX --- */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none"></div>
        {/* Data Stream Effect */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 215, 215, .3) 25%, rgba(0, 215, 215, .3) 26%, transparent 27%, transparent 74%, rgba(0, 215, 215, .3) 75%, rgba(0, 215, 215, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 215, 215, .3) 25%, rgba(0, 215, 215, .3) 26%, transparent 27%, transparent 74%, rgba(0, 215, 215, .3) 75%, rgba(0, 215, 215, .3) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px'
          }}>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-12">
            {isLoading ? (
              <div className="text-center text-slate-500 font-mono animate-pulse">
                INITIALIZING_DB_CONNECTION... [ LOADING_DATA ]
              </div>
            ) : services.length > 0 ? (
              services.map((service, index) => {
                const IconComponent = (service.icon_name && iconMap[service.icon_name]) ? iconMap[service.icon_name] : (serviceIcons[index] || Monitor);
                const isEven = index % 2 === 0;

                return (
                  <Link key={index} href={`/services/${service.slug}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8 }}
                    >
                      <TiltCard className="h-full">
                        <div className="group relative bg-[#0B1221]/60 backdrop-blur-md border border-white/5 rounded-3xl p-8 md:p-12 overflow-hidden hover:border-electric-cyan/30 transition-all duration-500">

                          {/* Hover Gradient Background */}
                          <div className="absolute inset-0 bg-gradient-to-br from-electric-cyan/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                          <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-16 items-center">

                            {/* Icon Visual */}
                            <div className={`order-1 ${isEven ? 'md:order-1' : 'md:order-2'} shrink-0`}>
                              <div className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center">
                                {/* Rotating Rings */}
                                <div className="absolute inset-0 border border-electric-cyan/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                                <div className="absolute inset-4 border border-dashed border-purple-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

                                {/* Core Icon */}
                                <div className="bg-[#020617] p-6 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,215,215,0.15)] group-hover:scale-110 transition-transform duration-500">
                                  <IconComponent size={48} className="text-electric-cyan" />
                                </div>
                              </div>
                            </div>

                            {/* Content */}
                            <div className={`flex-1 text-center ${isEven ? 'md:text-left' : 'md:text-right'} order-2 ${isEven ? 'md:order-2' : 'md:order-1'}`}>

                              <div className={`flex items-center gap-4 mb-4 ${isEven ? 'justify-center md:justify-start' : 'justify-center md:justify-end'}`}>
                                <div className="inline-block px-3 py-1 text-xs font-mono text-electric-cyan border border-electric-cyan/20 rounded bg-electric-cyan/5">
                                  MODULE_0{index + 1}
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400">
                                  <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                                  </span>
                                  STATUS: ONLINE
                                </div>
                              </div>

                              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 group-hover:text-electric-cyan transition-colors">
                                {service.title}
                              </h2>
                              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                                {service.description}
                              </p>

                              {/* Tech Specs / Tags */}
                              <div className={`flex flex-wrap gap-3 mb-8 ${isEven ? 'justify-center md:justify-start' : 'justify-center md:justify-end'}`}>
                                {service.tags?.map((tag, tIdx) => (
                                  <span key={tIdx} className="px-3 py-1 bg-white/5 text-slate-300 text-sm rounded-full border border-white/5 group-hover:border-electric-cyan/20 transition-colors">
                                    {tag}
                                  </span>
                                ))}
                              </div>

                              {/* Mock System Metrics */}
                              <div className={`flex flex-col gap-2 max-w-xs ${isEven ? 'mr-auto' : 'ml-auto'}`}>
                                <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase">
                                  <span>System Load</span>
                                  <span>{service.system_load}%</span>
                                </div>
                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-electric-cyan/50"
                                    style={{ width: `${service.system_load}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </TiltCard>
                    </motion.div>
                  </Link>
                );
              })
            ) : (
              <div className="text-center text-slate-500">
                No services found. Please check database connection.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- FEATURE HIGHLIGHT / TECH STACK BREAK --- */}
      <section className="py-24 bg-[#020617] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-electric-cyan/5 opacity-20" style={{ backgroundImage: 'radial-gradient(#00d7d7 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h3 className="text-3xl font-bold text-white mb-16 tracking-wide">{t.aboutUs.coreServicesTitle}</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Code, label: "Full Stack", sub: "React / Node" },
              { icon: Cpu, label: "AI Models", sub: "LLMs / NLP" },
              { icon: Database, label: "Big Data", sub: "Postgres / Redis" },
              { icon: Cloud, label: "Cloud Native", sub: "AWS / Azure" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <TiltCard className="h-full">
                  <div className="flex flex-col items-center gap-4 p-8 border border-white/5 rounded-2xl bg-[#0B1221]/80 backdrop-blur-sm hover:bg-[#0B1221] transition-all duration-300 group h-full relative overflow-hidden">
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-electric-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div className="p-4 bg-white/5 rounded-full text-slate-400 group-hover:text-electric-cyan group-hover:bg-electric-cyan/10 transition-colors duration-300">
                      <item.icon size={32} />
                    </div>

                    <div className="text-center">
                      <span className="font-sans font-bold text-lg text-white block mb-1">{item.label}</span>
                      <span className="font-mono text-xs text-slate-500">{item.sub}</span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WORKFLOW TIMELINE --- */}
      <section className="py-24 bg-[#030B16] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t.process.title}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">{t.process.description}</p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 md:-translate-x-1/2"></div>

            <div className="space-y-12">
              {t.process.steps.map((step, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex items-start md:items-center gap-8 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Icon Node */}
                    <div className="absolute left-0 md:left-1/2 w-14 h-14 bg-[#0B1221] border-4 border-[#030B16] rounded-full z-10 flex items-center justify-center md:-translate-x-1/2 shadow-xl">
                      <div className="w-8 h-8 bg-electric-cyan/20 rounded-full flex items-center justify-center text-electric-cyan font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className={`w-full md:w-[calc(50%-40px)] pl-20 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                      <div className="bg-white/5 border border-white/5 p-6 rounded-xl hover:border-electric-cyan/30 transition-colors group">
                        <span className="text-xs font-mono text-electric-cyan mb-2 block">{step.subtitle}</span>
                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* --- INDUSTRIES GRID --- */}
      <section className="py-24 bg-[#020617] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t.industries.title}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">{t.industries.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.industries.items.map((industry, index) => {
              const Icon = industryIcons[index] || Layers;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-[#0B1221] border border-white/5 p-8 rounded-2xl hover:border-electric-cyan/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-slate-400 mb-6 group-hover:text-electric-cyan group-hover:bg-electric-cyan/10 transition-colors">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{industry.name}</h3>
                  <p className="text-slate-400 text-sm">{industry.desc}</p>
                </motion.div>
              );
            })}
          </div>
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
              className="relative px-14 py-6 bg-electric-cyan text-midnight-navy text-xl font-bold rounded-sm overflow-hidden group hover:shadow-[0_0_60px_rgba(0,215,215,0.5)] transition-all duration-300"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12"></span>
              <span className="relative z-10 flex items-center gap-3">
                {t.aboutUs.ctaButton}
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
