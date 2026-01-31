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

export default function ServiceDetailPage() {
  const { t } = useLanguage();
  const params = useParams();
  const { slug } = params;

  const service = t.services.items.find((item) => item.slug === slug);

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
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8 text-center overflow-hidden"
      >
        <ParticleBackground />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric-cyan/10 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Link href="/services" className="inline-flex items-center gap-2 text-slate-400 hover:text-electric-cyan transition-colors mb-8 group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              {t.serviceDetailPage.backToServices}
            </Link>
            
            <h1 className="text-5xl md:text-7xl font-bold font-sans text-white mb-6 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-purple-500">
                {service.title}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        </div>
      </motion.section>

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
            {service.projects.map((project, index) => (
              <Link key={project.id} href={`/services/${service.slug}/projects/${project.id}`}>
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