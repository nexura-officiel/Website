"use client";

import { useParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Briefcase, Code } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ParticleBackground from "@/components/ui/ParticleBackground";
import TiltCard from "@/components/ui/TiltCard";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { Service } from "@/types";

export default function ServiceDetailPage() {
  const { t, language } = useLanguage();
  const params = useParams();
  const { serviceSlug } = params;

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!serviceSlug) return;

      try {
        setLoading(true);
        // 1. Fetch Service
        const { data: serviceData, error: serviceError } = await supabase
          .from('services')
          .select('*')
          .eq('slug', serviceSlug)
          .single();

        if (serviceError || !serviceData) {
          console.error("Service not found", serviceError);
          setService(null);
          return;
        }

        const mappedService: Service = {
          id: serviceData.id,
          slug: serviceData.slug,
          title: language === 'fr' ? serviceData.title_fr : serviceData.title_en,
          description: language === 'fr' ? serviceData.description_fr : serviceData.description_en,
          tags: serviceData.tags || [],
          system_load: serviceData.system_load || 85,
          icon_name: serviceData.icon_name,
          projects: []
        };

        // 2. Fetch Projects for this service
        const { data: projectData } = await supabase
          .from('projects')
          .select('*')
          .eq('service_id', serviceData.id);

        if (projectData) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          mappedService.projects = projectData.map((p: any) => ({
            id: p.slug, // Use slug as ID for routing consistency
            slug: p.slug,
            name: language === 'fr' ? p.name_fr : p.name_en,
            description: language === 'fr' ? p.description_fr : p.description_en,
            longDescription: language === 'fr' ? p.long_description_fr : p.long_description_en,
            image: p.image,
            images: p.images || [],
            video: p.video,
            demoLink: p.demo_link,
            githubLink: p.github_link,
            tags: p.tags || []
          }));
        }

        setService(mappedService);

      } catch (err) {
        console.error("Error fetching details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serviceSlug, language]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        <div className="font-mono text-electric-cyan animate-pulse">LOADING_DATA...</div>
      </main>
    );
  }

  if (!service) {
    return (
      <main className="min-h-screen bg-[#020617] text-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.serviceDetailPage.serviceNotFound}</h1>
          <p className="text-slate-400 mb-8">{t.serviceDetailPage.serviceNotFoundMessage}</p>

        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-electric-cyan selection:text-[#020617] overflow-x-hidden">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <ParticleBackground />

        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-electric-cyan/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-30"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <Link href="/services" className="inline-flex items-center gap-2 text-slate-400 hover:text-electric-cyan transition-colors mb-8 group">
              <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-electric-cyan/10 group-hover:border-electric-cyan/20 transition-all">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              </div>
              <span className="text-sm font-mono tracking-wide uppercase">{t.serviceDetailPage.backToServices}</span>
            </Link>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold font-sans text-white mb-8 tracking-tight leading-none"
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500">
                {service.title}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed mb-10 border-l-2 border-electric-cyan/30 pl-6"
            >
              {service.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              {service.tags && service.tags.map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-electric-cyan backdrop-blur-sm">
                  #{tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Visual/Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 1, type: "spring" }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10">
              <TiltCard className="p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl">
                <div className="flex flex-col gap-8">
                  <div className="flex items-center justify-between border-b border-white/10 pb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-electric-cyan/20 flex items-center justify-center text-electric-cyan">
                        <Code size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-slate-400 font-mono">Service Type</p>
                        <p className="text-xl font-bold text-white">Premium</p>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-400">
                      <ArrowLeft className="rotate-180" size={20} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-slate-400 font-mono">System Load</span>
                      <span className="text-3xl font-bold text-electric-cyan">{service.system_load}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${service.system_load}%` }}
                        transition={{ delay: 1, duration: 1.5, ease: "circOut" }}
                        className="h-full bg-gradient-to-r from-electric-cyan to-purple-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="p-4 rounded-xl bg-black/20 border border-white/5">
                      <span className="block text-2xl font-bold text-white mb-1">{service.projects?.length || 0}</span>
                      <span className="text-xs text-slate-400 uppercase tracking-wider">Projects</span>
                    </div>
                    <div className="p-4 rounded-xl bg-black/20 border border-white/5">
                      <span className="block text-2xl font-bold text-white mb-1">24/7</span>
                      <span className="text-xs text-slate-400 uppercase tracking-wider">Support</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* Decorative Elements around card */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-electric-cyan rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }}></div>
          </motion.div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-cyan/5 border border-electric-cyan/20 text-electric-cyan text-sm font-mono mb-6 backdrop-blur-md">
              <Briefcase size={14} />
              {t.serviceDetailPage.ourPortfolio}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              {t.serviceDetailPage.relatedProjects}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {service.projects?.map((project, index) => (
              <Link key={project.id} href={`/services/${service.slug}/projects/${project.slug}`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <div className="group relative bg-[#0B1221]/50 backdrop-blur-lg border border-white/5 rounded-2xl h-full overflow-hidden transition-all duration-300 hover:border-electric-cyan/30 hover:shadow-2xl hover:shadow-electric-cyan/10">
                    <div className="relative h-60 w-full overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        style={{ objectFit: "cover" }}
                        className="group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    </div>
                    <div className="p-6 md:p-8">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-electric-cyan transition-colors duration-300">
                        {project.name}
                      </h3>
                      <p className="text-slate-400 text-base mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-3">

                        {project.tags.map((tag) => (
                          <span key={tag} className="text-sm font-mono px-3 py-1 bg-white/5 text-slate-300 rounded-full border border-white/10 group-hover:border-electric-cyan/20 transition-colors">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 px-3 py-1 text-xs font-mono text-electric-cyan border border-electric-cyan/20 rounded-full bg-electric-cyan/5 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {t.serviceDetailPage.caseStudy}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}