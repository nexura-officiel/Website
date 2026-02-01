
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@nexura/database";
import { ArrowLeft, Save, X, Eye, Link as LinkIcon, Github, Globe, Compass, ScrollText, Image as ImageIcon, Plus } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/ImageUpload";
import { clsx } from "clsx";
import Image from "next/image";

type Language = 'en' | 'fr';

export default function NewProjectPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<Language>('en');
    const [services, setServices] = useState<{ id: string, title_en: string }[]>([]);

    const [formData, setFormData] = useState({
        slug: "",
        name_en: "",
        name_fr: "",
        description_en: "",
        description_fr: "",
        long_description_en: "",
        long_description_fr: "",
        image: "",
        demo_link: "",
        github_link: "",
        service_id: "",
        tags: [] as string[]
    });

    const [currentTag, setCurrentTag] = useState("");

    useEffect(() => {
        async function fetchServices() {
            const { data } = await supabase.from('services').select('id, title_en').order('title_en');
            if (data) setServices(data);
        }
        fetchServices();
    }, []);

    // Auto-generate slug from English name
    useEffect(() => {
        if (formData.name_en && !formData.slug) {
            const generatedSlug = formData.name_en
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]/g, '');
            setFormData(prev => ({ ...prev, slug: generatedSlug }));
        }
    }, [formData.name_en]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddTag = () => {
        if (currentTag && !formData.tags.includes(currentTag)) {
            setFormData(prev => ({ ...prev, tags: [...prev.tags, currentTag] }));
            setCurrentTag("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tagToRemove) }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('projects')
                .insert([formData]);

            if (error) throw error;

            router.push('/projects');
            router.refresh();
        } catch (error) {
            console.error('Error creating project:', error);
            alert('Failed to create project. Check console for details.');
        } finally {
            setLoading(false);
        }
    };

    const selectedService = services.find(s => s.id === formData.service_id)?.title_en || "General Solution";

    return (
        <div className="max-w-7xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <Link href="/projects" className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-400 mb-4 transition-colors group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Portfolio
                    </Link>
                    <h1 className="text-4xl font-bold text-white tracking-tight flex items-center gap-3">
                        Register Project
                        <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded uppercase tracking-widest font-mono">Portfolio</span>
                    </h1>
                </div>

                <div className="flex items-center gap-3 bg-white/5 p-1 rounded-xl border border-white/5">
                    <button
                        onClick={() => setActiveTab('en')}
                        className={clsx(
                            "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                            activeTab === 'en' ? "bg-white/10 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                        )}
                    >
                        English
                    </button>
                    <button
                        onClick={() => setActiveTab('fr')}
                        className={clsx(
                            "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                            activeTab === 'fr' ? "bg-white/10 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                        )}
                    >
                        Français
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Form Side */}
                <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-8">

                    {/* Core Identity Section */}
                    <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                            <Compass size={120} />
                        </div>

                        <div className="flex items-center gap-2 mb-8 text-cyan-400">
                            <Compass size={18} />
                            <h2 className="text-sm font-bold uppercase tracking-[0.2em]">Core Identity</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <label className="block">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 ml-1">Project Identifier (Slug)</span>
                                <input
                                    type="text"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    required
                                    placeholder="nexura-core-v2"
                                    className="block w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-cyan-500 outline-none transition-all font-mono text-sm"
                                />
                            </label>

                            <label className="block">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 ml-1">Parent Service</span>
                                <div className="relative">
                                    <select
                                        name="service_id"
                                        value={formData.service_id}
                                        onChange={handleChange}
                                        required
                                        className="block w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-cyan-500 outline-none appearance-none cursor-pointer"
                                    >
                                        <option value="">Select Category</option>
                                        {services.map(s => (
                                            <option key={s.id} value={s.id}>{s.title_en}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                        <ArrowLeft size={14} className="-rotate-90" />
                                    </div>
                                </div>
                            </label>

                            <div className="md:col-span-2">
                                <label className="block">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 ml-1">Public Display Name ({activeTab.toUpperCase()})</span>
                                    {activeTab === 'en' ? (
                                        <input
                                            type="text"
                                            name="name_en"
                                            value={formData.name_en}
                                            onChange={handleChange}
                                            required
                                            placeholder="Autonomous Cloud Infrastructure"
                                            className="block w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-purple-500 outline-none transition-all text-lg font-bold"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            name="name_fr"
                                            value={formData.name_fr}
                                            onChange={handleChange}
                                            required
                                            placeholder="Infrastructure Cloud Autonome"
                                            className="block w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-purple-500 outline-none transition-all text-lg font-bold"
                                        />
                                    )}
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Media & Connectivity Section */}
                    <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-8">
                        <div className="flex items-center gap-2 mb-8 text-cyan-400">
                            <Globe size={18} />
                            <h2 className="text-sm font-bold uppercase tracking-[0.2em]">Media & Connectivity</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-6">
                                <label className="block">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3 ml-1">Project Visualization</span>
                                    <ImageUpload
                                        value={formData.image}
                                        onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                                        bucket="projects"
                                    />
                                </label>
                            </div>

                            <div className="space-y-6">
                                <label className="block">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 ml-1 flex items-center gap-2">
                                        <Globe size={12} className="text-slate-500" />
                                        Deployment URL
                                    </span>
                                    <input
                                        type="url"
                                        name="demo_link"
                                        value={formData.demo_link}
                                        onChange={handleChange}
                                        placeholder="https://app.nexura.com"
                                        className="block w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all text-sm font-mono"
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 ml-1 flex items-center gap-2">
                                        <Github size={12} className="text-slate-500" />
                                        Repository Link
                                    </span>
                                    <input
                                        type="url"
                                        name="github_link"
                                        value={formData.github_link}
                                        onChange={handleChange}
                                        placeholder="https://github.com/nexura/..."
                                        className="block w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all text-sm font-mono"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Briefing Section */}
                    <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-8">
                        <div className="flex items-center gap-2 mb-8 text-purple-400">
                            <ScrollText size={18} />
                            <h2 className="text-sm font-bold uppercase tracking-[0.2em]">Product Briefing ({activeTab.toUpperCase()})</h2>
                        </div>

                        <div className="space-y-6">
                            <label className="block">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 ml-1">Elevator Pitch (Short)</span>
                                {activeTab === 'en' ? (
                                    <textarea
                                        name="description_en"
                                        value={formData.description_en}
                                        onChange={handleChange}
                                        required
                                        rows={2}
                                        placeholder="One-sentence impact statement..."
                                        className="block w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-purple-500 outline-none transition-all resize-none"
                                    />
                                ) : (
                                    <textarea
                                        name="description_fr"
                                        value={formData.description_fr}
                                        onChange={handleChange}
                                        required
                                        rows={2}
                                        placeholder="Énoncé d'impact en une phrase..."
                                        className="block w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-purple-500 outline-none transition-all resize-none"
                                    />
                                )}
                            </label>

                            <label className="block">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 ml-1">Technical Deep-Dive (Long)</span>
                                {activeTab === 'en' ? (
                                    <textarea
                                        name="long_description_en"
                                        value={formData.long_description_en}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        placeholder="Detailed project architecture, challenges, and results..."
                                        className="block w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-purple-500 outline-none transition-all resize-none"
                                    />
                                ) : (
                                    <textarea
                                        name="long_description_fr"
                                        value={formData.long_description_fr}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        placeholder="Architecture détaillée du projet, défis et résultats..."
                                        className="block w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-purple-500 outline-none transition-all resize-none"
                                    />
                                )}
                            </label>

                            <div className="pt-6 border-t border-white/5">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4 ml-1 text-cyan-400">Technology Stack</span>
                                <div className="flex flex-wrap gap-2 mb-4 p-4 bg-black/20 rounded-xl border border-dashed border-white/10 min-h-[60px]">
                                    {formData.tags.map(tag => (
                                        <span key={tag} className="flex items-center gap-1.5 bg-cyan-500/10 text-cyan-400 px-3 py-1.5 rounded-lg text-xs border border-cyan-500/20 shadow-sm animate-in zoom-in-50">
                                            {tag}
                                            <button type="button" onClick={() => removeTag(tag)} className="hover:text-white transition-colors">
                                                <X size={12} />
                                            </button>
                                        </span>
                                    ))}
                                    {formData.tags.length === 0 && <span className="text-xs text-slate-600 italic self-center">No technologies defined.</span>}
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={currentTag}
                                        onChange={(e) => setCurrentTag(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                        placeholder="Add technology (e.g. Next.js, Rust, Docker...)"
                                        className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddTag}
                                        className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all border border-white/10"
                                    >
                                        Add Tag
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-3 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 disabled:bg-slate-700 text-midnight-navy font-black px-12 py-4 rounded-2xl transition-all shadow-xl hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.5)] hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <Save size={20} />
                            {loading ? 'ARCHIVING...' : 'REGISTER PROJECT'}
                        </button>
                    </div>
                </form>

                {/* Preview Side */}
                <div className="lg:col-span-4 lg:sticky lg:top-8 h-fit space-y-8">
                    <div className="flex items-center gap-2 mb-2 text-slate-500 ml-2">
                        <Eye size={16} />
                        <h2 className="text-xs font-bold uppercase tracking-widest">Master Display Preview</h2>
                    </div>

                    <div className="space-y-6">
                        {/* Simulation of a premium project card */}
                        <div className="bg-[#0F172A] border border-white/10 rounded-[2.5rem] p-4 relative overflow-hidden shadow-2xl group transition-all duration-500 hover:border-cyan-500/30">
                            {/* Card Image Area */}
                            <div className="relative aspect-[1.4/1] w-full rounded-[1.8rem] overflow-hidden bg-black/50 border border-white/5 shadow-inner">
                                {formData.image ? (
                                    <Image
                                        src={formData.image}
                                        alt=""
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-700">
                                        <ImageIcon size={48} className="mb-4 opacity-10" />
                                        <span className="text-[10px] uppercase tracking-widest font-bold">Awaiting Media Asset</span>
                                    </div>
                                )}

                                {/* Overlay Badges */}
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="bg-black/60 backdrop-blur-md text-[10px] text-white px-3 py-1.5 rounded-full border border-white/10 font-bold uppercase tracking-tighter">
                                        {formData.slug || "NO_ID"}
                                    </span>
                                </div>

                                <div className="absolute bottom-4 left-4">
                                    <span className="bg-cyan-500 text-black text-[9px] font-black px-3 py-1 rounded-md uppercase tracking-wider shadow-lg">
                                        {selectedService}
                                    </span>
                                </div>
                            </div>

                            {/* Card Content Area */}
                            <div className="p-6">
                                <h3 className="text-xl font-black text-white mb-2 tracking-tight line-clamp-1 group-hover:text-cyan-400 transition-colors">
                                    {activeTab === 'en'
                                        ? (formData.name_en || "Project Designation")
                                        : (formData.name_fr || "Dénomination du Projet")}
                                </h3>
                                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 min-h-[32px] mb-6 font-medium">
                                    {activeTab === 'en'
                                        ? (formData.description_en || "Short impact statement will be visible here...")
                                        : (formData.description_fr || "L'énoncé d'impact court sera visible ici...")}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <div className="flex gap-2">
                                        <div className={clsx(
                                            "w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-500",
                                            formData.demo_link ? "border-cyan-500/50 text-cyan-400 bg-cyan-400/5" : "opacity-20"
                                        )}>
                                            <LinkIcon size={12} />
                                        </div>
                                        <div className={clsx(
                                            "w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-500",
                                            formData.github_link ? "border-white/30 text-white bg-white/5" : "opacity-20"
                                        )}>
                                            <Github size={12} />
                                        </div>
                                    </div>

                                    <div className="flex -space-x-1.5 overflow-hidden">
                                        {formData.tags.slice(0, 3).map((tag, i) => (
                                            <div key={tag} className="w-6 h-6 rounded-full bg-slate-800 border-2 border-[#0F172A] flex items-center justify-center">
                                                <span className="text-[7px] font-black text-slate-500">{tag.substring(0, 2).toUpperCase()}</span>
                                            </div>
                                        ))}
                                        {formData.tags.length > 3 && (
                                            <div className="w-6 h-6 rounded-full bg-cyan-500/20 border-2 border-[#0F172A] flex items-center justify-center">
                                                <span className="text-[7px] font-black text-cyan-400">+{formData.tags.length - 3}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Deployment Status Card */}
                        <div className="bg-black/40 border border-dashed border-white/10 rounded-3xl p-6">
                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-cyan-500" />
                                Validation Metrics
                            </h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-400">Metadata Completeness</span>
                                    <span className="text-xs font-mono text-cyan-400">85%</span>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="w-[85%] h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                                </div>
                                <p className="text-[10px] text-slate-600 mt-2">Ready for production indexed registry.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
