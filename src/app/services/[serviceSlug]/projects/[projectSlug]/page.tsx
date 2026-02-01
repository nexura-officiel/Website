"use client";

import { useParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { Project } from "@/types";

export default function ProjectDetailPage() {
  const { t, language } = useLanguage();
  const params = useParams();
  const { serviceSlug, projectSlug } = params;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectSlug) return;

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('slug', projectSlug)
          .single();

        if (error || !data) {
          console.error("Project not found", error);
          setProject(null);
          return;
        }

        const mappedProject: Project = {
          id: data.id,
          slug: data.slug,
          name: language === 'fr' ? data.name_fr : data.name_en,
          description: language === 'fr' ? data.description_fr : data.description_en,
          longDescription: language === 'fr' ? data.long_description_fr : data.long_description_en,
          image: data.image,
          images: data.images || [],
          video: data.video,
          demoLink: data.demo_link,
          githubLink: data.github_link,
          tags: data.tags || []
        };

        setProject(mappedProject);
        // Set initial main image
        if (mappedProject.images && mappedProject.images.length > 0) {
          setMainImage(mappedProject.images[0]);
        } else {
          setMainImage(mappedProject.image);
        }

      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectSlug, language]);

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

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-electric-cyan selection:text-[#020617] overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link href={`/services/${serviceSlug}`} className="inline-flex items-center gap-2 text-slate-400 hover:text-electric-cyan transition-colors mb-8 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {t.serviceDetailPage.backToServices}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold font-sans text-white mb-6 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-purple-500">
                {project.name}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-8">
              {project.description}
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-white/5 text-slate-300 text-sm rounded-full border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-center gap-6 mt-8">
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-electric-cyan text-midnight-navy font-semibold rounded-md hover:bg-electric-cyan/90 transition-colors"
                >
                  <ExternalLink size={20} />
                  Live Demo
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-electric-cyan text-electric-cyan font-semibold rounded-md hover:bg-electric-cyan/10 transition-colors"
                >
                  <Github size={20} />
                  {t.serviceDetailPage.githubRepo}
                </a>
              )}
            </div>
          </motion.div>

          {project.video && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-16 w-full max-w-4xl mx-auto"
            >
              <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10">
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-white mb-8 text-center">{t.serviceDetailPage.screenshots}</h2>
              <div className="relative h-[450px] mb-4 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                {mainImage && (
                  <Image src={mainImage} alt="Main project screenshot" fill style={{ objectFit: "cover" }} unoptimized className="transition-opacity duration-300" />
                )}
              </div>
              <div className="flex gap-4 justify-center flex-wrap">
                {project.images.map((imgSrc, index) => (
                  <div
                    key={index}
                    className={`relative w-24 h-16 rounded-md overflow-hidden cursor-pointer border-2 ${mainImage === imgSrc ? 'border-electric-cyan' : 'border-transparent'} hover:border-electric-cyan transition-all duration-200`}
                    onClick={() => setMainImage(imgSrc)}
                  >
                    <Image src={imgSrc} alt={`Thumbnail ${index + 1}`} fill style={{ objectFit: "cover" }} unoptimized />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-3xl mx-auto text-lg text-slate-300 leading-relaxed space-y-6"
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">{t.serviceDetailPage.projectDetails}</h2>
            <p>{project.longDescription}</p>
          </motion.div>

        </div>
      </section>
      <Footer />
    </main>
  );
}