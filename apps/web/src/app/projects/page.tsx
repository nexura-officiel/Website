"use client";

import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, ExternalLink, Github, Search, Filter, SortAsc, SortDesc, Calendar, Tag, Layers } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { supabase } from "@nexura/database";
import { useEffect, useState, useMemo } from "react";
import { Project } from "@nexura/types";

// Interface for the raw database response including service info
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
    services: {
        slug: string;
        title_en: string;
        title_fr: string;
    };
    created_at: string;
}

interface ExpandedProject extends Project {
    serviceSlug: string;
    serviceTitle: string;
    createdAt: string;
}

export default function AllProjectsPage() {
    const { t, language } = useLanguage();
    const [projects, setProjects] = useState<ExpandedProject[]>([]);
    const [loading, setLoading] = useState(true);

    // Filter State
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<"newest" | "oldest" | "alpha">("newest");
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);

                // Fetch all projects and join with services to get the slug and title
                const { data: rawData, error } = await supabase
                    .from('projects')
                    .select(`
            *,
            services (
              slug,
              title_en,
              title_fr
            )
          `)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                if (!rawData) return;

                // Map and cast data
                const mappedProjects: ExpandedProject[] = rawData.map((p: any) => ({
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
                    tags: p.tags || [],
                    serviceSlug: p.services?.slug,
                    serviceTitle: language === 'fr' ? p.services?.title_fr : p.services?.title_en,
                    createdAt: p.created_at
                }));

                setProjects(mappedProjects);

            } catch (err) {
                console.error("Error fetching projects:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [language]);

    // Derived State for Categories
    const categories = useMemo(() => {
        const cats = new Set(projects.map(p => p.serviceTitle).filter(Boolean));
        return ["All", ...Array.from(cats)];
    }, [projects]);

    // Derived State for All Tags
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        projects.forEach(p => p.tags.forEach(t => tags.add(t)));
        return Array.from(tags).sort();
    }, [projects]);

    // Derived State for Filtered & Sorted Projects
    const filteredProjects = useMemo(() => {
        let result = projects.filter(project => {
            // Search Match
            const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            // Category Match
            const matchesCategory = selectedCategory === "All" || project.serviceTitle === selectedCategory;

            // Tag Match (Intersection: Show project if it has AT LEAST ONE of the selected tags, or if no tags selected)
            const matchesTags = selectedTags.length === 0 || project.tags.some(tag => selectedTags.includes(tag));

            return matchesSearch && matchesCategory && matchesTags;
        });

        // Sorting
        return result.sort((a, b) => {
            if (sortBy === "newest") {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            } else if (sortBy === "oldest") {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            } else {
                return a.name.localeCompare(b.name);
            }
        });
    }, [projects, searchQuery, selectedCategory, selectedTags, sortBy]);

    // Toggle Tag Selection
    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

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
            <section className="relative pt-32 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 z-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-electric-cyan/10 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold font-sans text-white mb-6">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-purple-500">
                                {t.serviceDetailPage.ourPortfolio}
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
                            {t.services.subtitle}
                        </p>

                        {/* --- SEARCH & CONTROL BAR --- */}
                        <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto mb-8">
                            <div className="flex flex-col md:flex-row gap-4 w-full">
                                {/* Search Input */}
                                <div className="relative flex-1 group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan/20 to-purple-500/20 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                    <div className="relative flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-3 backdrop-blur-md focus-within:border-electric-cyan/50 focus-within:bg-white/10 transition-all">
                                        <Search className="text-slate-400 mr-3" size={20} />
                                        <input
                                            type="text"
                                            placeholder={language === 'fr' ? "Rechercher par nom, tag..." : "Search by name, tag..."}
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="bg-transparent border-none outline-none text-white placeholder-slate-500 w-full font-mono text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Toggle Advanced/Sort */}
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full border transition-all ${showFilters
                                        ? "bg-electric-cyan text-midnight-navy border-electric-cyan font-bold"
                                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                                        }`}
                                >
                                    <Filter size={18} />
                                    <span>{language === 'fr' ? "Filtres & Tri" : "Filter & Sort"}</span>
                                </button>
                            </div>

                            {/* Service Categories (Always Visible) */}
                            <div className="flex flex-wrap justify-center gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 border ${selectedCategory === category
                                            ? "bg-electric-cyan/10 border-electric-cyan text-electric-cyan shadow-[0_0_15px_-5px_#00E5FF]"
                                            : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
                                            }`}
                                    >
                                        {category === "All" && language === 'fr' ? "Tous" : category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* --- ADVANCED FILTERS PANEL --- */}
                        <AnimatePresence>
                            {showFilters && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                    animate={{ opacity: 1, height: "auto", marginBottom: 32 }}
                                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                    className="w-full overflow-hidden"
                                >
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl max-w-4xl mx-auto text-left">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Sort Options */}
                                            <div>
                                                <h4 className="flex items-center gap-2 text-sm font-bold text-white mb-4">
                                                    <SortAsc size={16} className="text-electric-cyan" />
                                                    {language === 'fr' ? "Trier par" : "Sort By"}
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {[
                                                        { value: "newest", label: language === 'fr' ? "Plus récents" : "Newest" },
                                                        { value: "oldest", label: language === 'fr' ? "Plus anciens" : "Oldest" },
                                                        { value: "alpha", label: "A - Z" }
                                                    ].map((opt) => (
                                                        <button
                                                            key={opt.value}
                                                            onClick={() => setSortBy(opt.value as any)}
                                                            className={`px-3 py-1.5 rounded-md text-sm border transition-all ${sortBy === opt.value
                                                                ? "bg-white/10 border-electric-cyan text-white"
                                                                : "bg-transparent border-white/10 text-slate-400 hover:border-white/30"
                                                                }`}
                                                        >
                                                            {opt.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Tag Filter */}
                                            <div>
                                                <h4 className="flex items-center gap-2 text-sm font-bold text-white mb-4">
                                                    <Tag size={16} className="text-electric-cyan" />
                                                    {language === 'fr' ? "Technologies" : "Tech Stack"}
                                                </h4>
                                                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                                                    {allTags.map((tag) => (
                                                        <button
                                                            key={tag}
                                                            onClick={() => toggleTag(tag)}
                                                            className={`px-2 py-1 rounded text-xs border transition-all ${selectedTags.includes(tag)
                                                                ? "bg-electric-cyan/20 border-electric-cyan text-electric-cyan"
                                                                : "bg-black/20 border-white/10 text-slate-400 hover:border-white/30"
                                                                }`}
                                                        >
                                                            {tag}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </motion.div>
                </div>
            </section>

            {/* --- PROJECTS GRID --- */}
            <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 min-h-[50vh]">
                {loading ? (
                    // SKELETON LOADER
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] h-[400px] animate-pulse">
                                <div className="h-48 bg-white/5" />
                                <div className="p-6 space-y-4">
                                    <div className="h-6 bg-white/10 rounded w-3/4" />
                                    <div className="space-y-2">
                                        <div className="h-4 bg-white/5 rounded w-full" />
                                        <div className="h-4 bg-white/5 rounded w-5/6" />
                                        <div className="h-4 bg-white/5 rounded w-4/6" />
                                    </div>
                                    <div className="h-4 bg-white/5 rounded w-1/4 mt-4" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map((project) => (
                                    <motion.div
                                        key={project.id}
                                        variants={itemVariants}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:border-electric-cyan/50 hover:bg-white/10 transition-all duration-300 flex flex-col h-full"
                                    >
                                        <Link href={`/services/${project.serviceSlug}/projects/${project.slug}`} className="flex flex-col h-full">
                                            {/* Image Wrapper */}
                                            <div className="relative aspect-video overflow-hidden">
                                                <Image
                                                    src={project.image}
                                                    alt={project.name}
                                                    fill
                                                    style={{ objectFit: "cover" }}
                                                    className="group-hover:scale-110 transition-transform duration-700"
                                                    unoptimized
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent opacity-80"></div>

                                                <div className="absolute top-4 right-4 group-hover:opacity-100 transition-opacity">
                                                    <span className="flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded bg-black/60 border border-white/20 backdrop-blur-md text-slate-300 uppercase tracking-wider">
                                                        <Layers size={10} className="text-electric-cyan" />
                                                        {project.serviceTitle}
                                                    </span>
                                                </div>

                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-electric-cyan transition-colors">
                                                        {project.name}
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2 mb-2">
                                                        {project.tags.slice(0, 3).map(tag => (
                                                            <span key={tag} className="text-xs font-mono text-electric-cyan bg-electric-cyan/10 px-2 py-1 rounded">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                        {project.tags.length > 3 && (
                                                            <span className="text-xs font-mono text-slate-500 bg-white/5 px-2 py-1 rounded">
                                                                +{project.tags.length - 3}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-6 flex-1 flex flex-col justify-between">
                                                <p className="text-slate-400 line-clamp-3 mb-6 text-sm leading-relaxed">
                                                    {project.description}
                                                </p>

                                                <div className="flex items-center justify-between mt-auto">
                                                    <span className="text-xs text-slate-600 flex items-center gap-1">
                                                        <Calendar size={12} />
                                                        {new Date(project.createdAt).getFullYear()}
                                                    </span>
                                                    <span className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:translate-x-2 transition-transform">
                                                        {language === 'fr' ? "Voir le projet" : "View Project"} <ArrowLeft className="rotate-180" size={16} />
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="col-span-full flex flex-col items-center justify-center py-20 text-center"
                                >
                                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                        <Search className="text-slate-500" size={32} />
                                    </div>
                                    <p className="text-xl text-slate-300 font-medium">
                                        {language === 'fr' ? "Aucun projet trouvé" : "No projects found"}
                                    </p>
                                    <p className="text-slate-500 mt-2">
                                        {language === 'fr' ? "Essayez d'ajuster votre recherche ou vos filtres." : "Try adjusting your search or filters."}
                                    </p>
                                    <button
                                        onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setSelectedTags([]); }}
                                        className="mt-6 text-electric-cyan hover:underline"
                                    >
                                        {language === 'fr' ? "Effacer les filtres" : "Clear filters"}
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </section>

            <Footer />
        </main>
    );
}
