"use client";

import { useParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { supabase } from "@nexura/database";
import { useEffect, useState } from "react";
import { Project } from "@nexura/types";

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
  const [mainImage, setMainImage] = useState<string | null>(null);

  // Additional state for navigation and lightbox
  const [prevProject, setPrevProject] = useState<Project | null>(null);
  const [nextProject, setNextProject] = useState<Project | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

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
        if (mappedProject.images && mappedProject.images.length > 0) {
          setMainImage(mappedProject.images[0]);
        } else {
          setMainImage(mappedProject.image);
        }

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
        <div className="font-mono text-electric-cyan animate-pulse">LOADING_DATA...</div>
      </main>
    );
  }

  if (!project) {
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

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <main className="relative min-h-screen bg-[#020617] text-white selection:bg-electric-cyan selection:text-[#020617] overflow-x-hidden">
      <Navbar />

      {/* --- NOISE TEXTURE --- */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Immersive Background */}
        {mainImage && (
          <div className="absolute inset-0 z-0 opacity-30 transform scale-110 blur-[100px] transition-opacity duration-1000">
            <Image
              src={mainImage}
              alt="Background Blur"
              fill
              style={{ objectFit: "cover" }}
              className="animate-pulse-slow"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-[#020617]/40"></div>
          </div>
        )}
        <div className="absolute inset-0 z-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>

        <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Link href={`/services/${serviceSlug}`} className="inline-flex items-center gap-2 text-slate-400 hover:text-electric-cyan transition-colors mb-10 group backdrop-blur-md bg-white/5 px-5 py-2 rounded-full border border-white/10 hover:border-electric-cyan/50 hover:bg-white/10">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                {t.serviceDetailPage.backToServices}
              </Link>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl font-bold font-sans text-white mb-8 tracking-tight leading-tight"
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-500 drop-shadow-2xl">
                {project.name}
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12">
              {project.description}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6">
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-electric-cyan text-midnight-navy font-bold text-lg rounded-full hover:shadow-[0_0_40px_-10px_#00E5FF] hover:-translate-y-1 transition-all duration-300"
                >
                  <ExternalLink size={22} className="group-hover:rotate-45 transition-transform" />
                  Live Demo
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold text-lg rounded-full hover:bg-white/10 hover:border-electric-cyan/50 hover:-translate-y-1 transition-all duration-300"
                >
                  <Github size={22} className="group-hover:scale-110 transition-transform" />
                  {t.serviceDetailPage.githubRepo}
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 10 }}
          transition={{ delay: 1, duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-slate-500 to-transparent"></div>
        </motion.div>

      </section>

      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* IMAGE GALLERY */}
          <div className="lg:col-span-8 space-y-12">
            {project.video && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/50 ring-1 ring-white/5"
              >
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={project.video}
                    title="Project Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </motion.div>
            )}

            {project.images && project.images.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div
                  className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl group cursor-zoom-in ring-1 ring-white/5"
                  onClick={() => setIsLightboxOpen(true)}
                >
                  {mainImage && (
                    <Image
                      src={mainImage}
                      alt="Main Preview"
                      fill
                      style={{ objectFit: "cover" }}
                      className="group-hover:scale-105 transition-transform duration-700"
                      unoptimized
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                    <span className="text-white text-sm font-mono px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all">Click to expand</span>
                  </div>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {project.images.map((imgSrc, index) => (
                    <button
                      key={index}
                      onClick={() => setMainImage(imgSrc)}
                      className={`relative flex-shrink-0 w-32 h-20 rounded-xl overflow-hidden border transition-all duration-300 ${mainImage === imgSrc ? 'border-electric-cyan scale-105 shadow-[0_0_15px_-5px_#00E5FF]' : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'}`}
                    >
                      <Image src={imgSrc} alt={`Thumb ${index}`} fill style={{ objectFit: "cover" }} unoptimized />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* DETAILS SIDEBAR */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:sticky lg:top-32 p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-xl ring-1 ring-white/5"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-4">
                <span className="w-1.5 h-8 bg-gradient-to-b from-electric-cyan to-purple-500 rounded-full shadow-[0_0_15px_#00E5FF]"></span>
                {t.serviceDetailPage.projectDetails}
              </h3>
              <p className="text-slate-300 leading-relaxed mb-10 text-lg border-b border-white/5 pb-8">
                {project.longDescription}
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
                    <span className="w-2 h-2 rounded-full bg-electric-cyan/50"></span>
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <div key={tag} className="group relative px-4 py-2 bg-black/40 border border-white/10 rounded-lg overflow-hidden hover:border-electric-cyan/40 transition-all hover:shadow-[0_0_20px_-5px_rgba(0,229,255,0.3)]">
                        <div className="absolute inset-0 bg-electric-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="relative text-sky-200 group-hover:text-electric-cyan text-sm font-medium font-mono transition-colors">
                          {tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- NEXT / PREV NAVIGATION --- */}
      {(nextProject || prevProject) && (
        <section className="py-24 border-t border-white/5 bg-gradient-to-b from-[#020617] to-[#03091e]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between gap-8">
              {prevProject ? (
                <Link href={`/services/${serviceSlug}/projects/${prevProject.slug}`} className="group relative flex-1 p-8 rounded-3xl border border-white/5 hover:border-electric-cyan/30 bg-white/[0.02] hover:bg-white/[0.05] transition-all overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-electric-cyan/5 rounded-full blur-[50px] group-hover:bg-electric-cyan/10 transition-colors"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-3 group-hover:text-electric-cyan transition-colors">
                      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                      Previous Project
                    </div>
                    <div className="text-2xl font-bold text-white max-w-xs truncate">{prevProject.name}</div>
                  </div>
                </Link>
              ) : <div className="flex-1"></div>}

              {nextProject ? (
                <Link href={`/services/${serviceSlug}/projects/${nextProject.slug}`} className="group relative flex-1 p-8 rounded-3xl border border-white/5 hover:border-electric-cyan/30 bg-white/[0.02] hover:bg-white/[0.05] transition-all text-right overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[50px] group-hover:bg-purple-500/10 transition-colors"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-end gap-2 text-xs font-mono text-slate-500 mb-3 group-hover:text-electric-cyan transition-colors">
                      Next Project
                      <ArrowLeft size={14} className="rotate-180 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="text-2xl font-bold text-white max-w-xs truncate ml-auto">{nextProject.name}</div>
                  </div>
                </Link>
              ) : <div className="flex-1"></div>}
            </div>
          </div>
        </section>
      )}

      {/* --- LIGHTBOX --- */}
      <AnimatePresence>
        {isLightboxOpen && mainImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div className="relative w-full max-w-7xl h-full max-h-[90vh] flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full h-full"
              >
                <Image
                  src={mainImage}
                  alt="Full Screen Preview"
                  fill
                  style={{ objectFit: "contain" }}
                  unoptimized
                  className="drop-shadow-2xl"
                />
              </motion.div>
              <button className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-4 backdrop-blur-md">
                <div className="w-6 h-6 flex items-center justify-center text-2xl font-light leading-none">&times;</div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactCTA />
      <Footer />
    </main>
  );
}