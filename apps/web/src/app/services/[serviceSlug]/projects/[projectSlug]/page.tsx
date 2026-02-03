"use client";

import { useParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import { ArrowLeft, ExternalLink, Github, Layers, Zap, Clock, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { supabase } from "@nexura/database";
import { useEffect, useState, useRef } from "react";
import { Project } from "@nexura/types";
import TiltCard from "@/components/ui/TiltCard";

// Interface for the raw database response
interface DBProject {
  id: string;
  slug: string;
  name_en: string;
  name_fr: string;
  description_en: string;
  description_fr: string;
  long_description_en: string;
  long_description_fr: string;
  image: string;
  images: string[];
  video?: string;
  demo_link?: string;
  github_link?: string;
  tags: string[];
  service_id: string;
  created_at: string;
}

export default function ProjectDetailPage() {
  const { t, language } = useLanguage();
  const params = useParams();
  const { serviceSlug, projectSlug } = params;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Additional state for navigation and lightbox
  const [prevProject, setPrevProject] = useState<Project | null>(null);
  const [nextProject, setNextProject] = useState<Project | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.1]);
  const heroOpacity = useTransform(scrollY, [0, 800], [0.6, 0]);

  useEffect(() => {
    const fetchProject = async () => {
      if (!serviceSlug || !projectSlug) return;

      try {
        setLoading(true);

        // 1. Fetch current service to get ID
        const { data: serviceData } = await supabase
          .from('services')
          .select('id')
          .eq('slug', serviceSlug)
          .single();

        if (!serviceData) throw new Error("Service not found");

        // 2. Fetch all projects for this service to calculate Next/Prev
        const { data: rawData } = await supabase
          .from('projects')
          .select('*')
          .eq('service_id', serviceData.id)
          .order('sort_order', { ascending: true });

        if (!rawData) throw new Error("No projects found");

        // Cast raw data to defined interface
        const allProjectsData = rawData as DBProject[];

        const currentIndex = allProjectsData.findIndex((p) => p.slug === projectSlug);

        if (currentIndex === -1) {
          setProject(null);
          return;
        }

        // Helper to map DB project to UI Project
        const mapProject = (p: DBProject): Project => ({
          id: p.id,
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
        });

        // Current Project
        const currentProjectData = allProjectsData[currentIndex];
        const mappedProject = mapProject(currentProjectData);

        setProject(mappedProject);
        setActiveImageIndex(0);

        // Set Prev/Next
        if (currentIndex > 0) {
          setPrevProject(mapProject(allProjectsData[currentIndex - 1]));
        } else {
          setPrevProject(null);
        }

        if (currentIndex < allProjectsData.length - 1) {
          setNextProject(mapProject(allProjectsData[currentIndex + 1]));
        } else {
          setNextProject(null);
        }

      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectSlug, serviceSlug, language]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-electric-cyan rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-electric-cyan rounded-full animate-bounce delay-75"></div>
          <div className="w-3 h-3 bg-electric-cyan rounded-full animate-bounce delay-150"></div>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-[#020617] text-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.serviceDetailPage.serviceNotFound}</h1>
          <Link href="/services" className="text-electric-cyan hover:underline">Return to Services</Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#020617] text-white selection:bg-electric-cyan selection:text-[#020617] overflow-x-hidden">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#020617]">
        {/* Parallax Background */}
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 z-0 select-none pointer-events-none">
          {project.image && (
            <Image
              src={project.image}
              alt={project.name}
              fill
              style={{ objectFit: "cover" }}
              className="blur-[5px] scale-105 saturate-0 opacity-50 contrast-125"
              unoptimized
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]"></div>
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <Link href={`/services/${serviceSlug}`} className="inline-flex items-center gap-2 text-white/50 hover:text-electric-cyan transition-colors mb-12 group uppercase tracking-[0.2em] text-xs font-mono backdrop-blur-md px-4 py-2 rounded-full border border-white/5 hover:bg-white/5">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            {t.serviceDetailPage.backToServices}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-sans text-white leading-tight tracking-tight mb-8 drop-shadow-2xl">
              {project.name}
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl font-light leading-relaxed mb-12 border-l-2 border-electric-cyan pl-6 opacity-80">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4">
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white font-bold text-sm uppercase tracking-widest hover:bg-electric-cyan hover:text-black hover:border-electric-cyan transition-all duration-300 flex items-center gap-3 rounded-full group"
                >
                  <Globe size={18} className="text-electric-cyan group-hover:text-black transition-colors" />
                  Live Preview
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-transparent border border-white/10 text-white/70 font-bold text-sm uppercase tracking-widest hover:text-white hover:border-white/30 transition-all duration-300 flex items-center gap-3 rounded-full"
                >
                  <Github size={18} />
                  Codebase
                </a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 left-8 md:left-12 flex items-center gap-4 text-white/30"
        >
          <div className="h-[1px] w-12 bg-white/30"></div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-mono">Scroll</span>
        </motion.div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="relative z-20 py-24 md:py-32 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* BENTO GRID LAYOUT */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">

            {/* 1. Long Description - Spans columns */}
            <TiltCard className="md:col-span-2 row-span-2">
              <div className="h-full p-8 md:p-12 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-sm flex flex-col justify-between hover:bg-white/[0.04] transition-colors duration-500">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-electric-cyan/10 flex items-center justify-center mb-6 text-electric-cyan">
                    <Layers size={24} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">The Challenge & Solution</h2>
                  <div className="text-slate-300 text-lg leading-relaxed space-y-4 font-light text-justify">
                    {project.longDescription.split('\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* 2. Key Stats / Info */}


            {/* 3. Tech Stack */}
            <div className="row-span-2 flex flex-col gap-6">
              <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl h-full backdrop-blur-sm hover:bg-white/[0.04] transition-colors duration-500">
                <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                  <Zap className="text-electric-cyan" size={20} />
                  <h3 className="text-xl font-bold font-mono uppercase tracking-widest text-slate-200">Tech Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1.5 bg-white/5 text-slate-300 rounded-md text-sm border border-white/5 hover:border-electric-cyan/30 hover:text-white transition-colors cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Video Feature - Wide */}
            {project.video && (
              <div className="md:col-span-3 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group h-[400px] md:h-[600px]">
                <iframe
                  width="100%"
                  height="100%"
                  src={project.video}
                  title="Project Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full object-cover"
                ></iframe>
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl"></div>
              </div>
            )}
          </div>

          {/* MASONRY GALLERY */}
          {project.images && project.images.length > 0 && (
            <div className="mt-32">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Visual Exploration</h2>
                <span className="text-slate-400 text-sm font-mono hidden md:inline-block">SCROLL TO EXPLORE</span>
              </div>

              <div className="columns-1 md:columns-2 gap-8 space-y-8">
                {project.images.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: idx * 0.05, duration: 0.8 }}
                    className="break-inside-avoid relative rounded-2xl overflow-hidden group cursor-zoom-in border border-white/5 bg-[#0B1221]"
                    onClick={() => {
                      setMainImage(img);
                      setActiveImageIndex(idx);
                      setIsLightboxOpen(true);
                    }}
                  >
                    <Image
                      src={img}
                      alt={`Gallery ${idx}`}
                      width={800}
                      height={600}
                      style={{ width: '100%', height: 'auto' }}
                      className="group-hover:scale-105 transition-transform duration-700 h-auto w-full"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <ExternalLink className="text-white w-5 h-5" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* --- NEXT PROJECT CTA (Cinematic) --- */}
      {nextProject && (
        <section className="relative h-[60vh] md:h-[80vh] overflow-hidden group flex items-center justify-center cursor-pointer">
          <Link href={`/services/${serviceSlug}/projects/${nextProject.slug}`} className="absolute inset-0 z-50"></Link>

          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={nextProject.image}
              alt="Next Project"
              fill
              className="object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-[#020617]/80 group-hover:via-[#020617]/30 transition-all duration-700"></div>
          </div>

          <div className="relative z-20 text-center px-4">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-electric-cyan font-mono tracking-[0.3em] uppercase mb-6 block text-sm"
            >
              Next Case Study
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter"
            >
              {nextProject.name}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-4 px-8 py-4 border border-white/20 rounded-full bg-white/5 backdrop-blur-md group-hover:bg-electric-cyan group-hover:text-black group-hover:border-electric-cyan transition-all duration-300"
            >
              <span className="font-bold tracking-wide">View Project</span>
              <ArrowLeft className="rotate-180 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </motion.div>
          </div>
        </section>
      )}

      {/* --- LIGHTBOX (Simplified) --- */}
      <AnimatePresence>
        {isLightboxOpen && project.images && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div className="relative max-w-7xl w-full max-h-[90vh] aspect-video">
              <Image
                src={project.images[activeImageIndex]}
                alt="Fullscreen"
                fill
                style={{ objectFit: "contain" }}
                unoptimized
                className="rounded-lg"
              />
            </div>
            <button className="absolute top-8 right-8 text-white hover:text-electric-cyan p-2">
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-[#020617]">
        <ContactCTA />
      </div>
      <Footer />
    </main>
  );

  function setMainImage(img: string) {
    // Helper to satisfy the linter if needed or purely for clarity in the onClick above
    // In this new design, we rely on activeImageIndex mostly, but kept the logic simple.
  }
}
