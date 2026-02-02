
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@nexura/database";
import { ArrowLeft, Save, X, HelpCircle, Laptop, Settings, ChevronRight, Info, Eye } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";
import { createServiceAction } from "@/app/actions/database";

// Helper to check if a string is a valid Lucide icon name
const isValidLucideIconName = (name: string): name is keyof typeof LucideIcons => {
    return name in LucideIcons;
};

type Language = 'en' | 'fr';

export default function NewServicePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<Language>('en');

    const [formData, setFormData] = useState({
        slug: "",
        title_en: "",
        title_fr: "",
        description_en: "",
        description_fr: "",
        icon_name: "Layers",
        system_load: 0,
        tags: [] as string[]
    });

    const [currentTag, setCurrentTag] = useState("");

    // Auto-generate slug from English title
    useEffect(() => {
        if (formData.title_en && !formData.slug) {
            const generatedSlug = formData.title_en
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]/g, '');
            setFormData(prev => ({ ...prev, slug: generatedSlug }));
        }
    }, [formData.title_en]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'system_load' ? parseInt(value) || 0 : value
        }));
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
            console.log('Deploying new service to core...');
            const result = await createServiceAction(formData);

            if (!result) {
                throw new Error("Core reject: Service was not deployed.");
            }

            console.log('Service deployed successfully.');
            router.refresh();
            setTimeout(() => {
                router.push('/services');
            }, 150);
        } catch (error: any) {
            console.error('Critical Error - Deployment Failed:', error);
            alert(`LAUNCH FAILED: ${error.message || 'Unknown network error'}`);
        } finally {
            setLoading(false);
        }
    };

    const SelectedIconComponent = isValidLucideIconName(formData.icon_name)
        ? (LucideIcons[formData.icon_name] as React.ElementType)
        : HelpCircle;

    return (
        <div className="max-w-6xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <Link href="/services" className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-400 mb-4 transition-colors group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to List
                    </Link>
                    <h1 className="text-4xl font-bold text-white tracking-tight flex items-center gap-3">
                        Deploy New Service
                        <span className="text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded uppercase tracking-widest font-mono">v1.0</span>
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

                    {/* Basic Logic Group */}
                    <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                            <Settings size={120} />
                        </div>

                        <div className="flex items-center gap-2 mb-6 text-cyan-400">
                            <Laptop size={18} />
                            <h2 className="text-sm font-bold uppercase tracking-[0.2em]">Core Configuration</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <label className="block">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5 ml-1">Unique Identifier (Slug)</span>
                                    <input
                                        type="text"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleChange}
                                        required
                                        placeholder="cloud-compute-v1"
                                        className="block w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all font-mono text-sm"
                                    />
                                    <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1 ml-1">
                                        <Info size={10} />
                                        Automatically generated from English title if left empty.
                                    </p>
                                </label>

                                <div className="space-y-3">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block ml-1">System Integrity Load</span>
                                    <div className="p-4 bg-black/30 border border-white/5 rounded-xl">
                                        <input
                                            type="range"
                                            name="system_load"
                                            min="0"
                                            max="100"
                                            value={formData.system_load}
                                            onChange={handleChange}
                                            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                                        />
                                        <div className="flex justify-between mt-3">
                                            <span className="text-[10px] font-mono text-slate-600 tracking-tighter">MIN_CAP</span>
                                            <span className={clsx(
                                                "text-xs font-bold font-mono",
                                                formData.system_load > 80 ? "text-red-400" :
                                                    formData.system_load > 50 ? "text-yellow-400" : "text-cyan-400"
                                            )}>
                                                {formData.system_load}% NOMINAL
                                            </span>
                                            <span className="text-[10px] font-mono text-slate-600 tracking-tighter">MAX_CAP</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="block">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5 ml-1">
                                        Active Icon: <span className="text-cyan-400">{formData.icon_name}</span>
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 flex-shrink-0 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400 shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)]">
                                            <SelectedIconComponent size={24} />
                                        </div>
                                        <input
                                            type="text"
                                            name="icon_name"
                                            value={formData.icon_name}
                                            readOnly
                                            className="block w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white/50 cursor-not-allowed font-mono text-sm"
                                        />
                                    </div>
                                </label>

                                <div className="grid grid-cols-6 gap-2 p-3 bg-black/40 border border-white/5 rounded-xl max-h-[160px] overflow-y-auto scrollbar-hide">
                                    {[
                                        "Layers", "Monitor", "Zap", "Shield", "Cloud", "Database",
                                        "Cpu", "Code", "Globe", "Smartphone", "BarChart", "MessageSquare",
                                        "Box", "Terminal", "Search", "Rocket", "Server", "Wifi"
                                    ].map((iconName) => {
                                        const PickerIcon = (LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType) || HelpCircle;
                                        const isSelected = formData.icon_name === iconName;
                                        return (
                                            <button
                                                key={iconName}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, icon_name: iconName }))}
                                                className={clsx(
                                                    "aspect-square flex items-center justify-center rounded-lg transition-all border",
                                                    isSelected
                                                        ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                                                        : "bg-white/5 border-transparent text-slate-600 hover:text-slate-400 hover:bg-white/10"
                                                )}
                                                title={iconName}
                                            >
                                                <PickerIcon size={18} />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Group */}
                    <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-8">
                        <div className="flex items-center gap-2 mb-8 text-purple-400">
                            <Info size={18} />
                            <h2 className="text-sm font-bold uppercase tracking-[0.2em]">Service Content ({activeTab.toUpperCase()})</h2>
                        </div>

                        <div className="space-y-6">
                            {/* Multilingual Switcher logic in fields */}
                            <div className="grid grid-cols-1 gap-6">
                                <label className="block">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 ml-1">Display Title</span>
                                    {activeTab === 'en' ? (
                                        <input
                                            type="text"
                                            name="title_en"
                                            value={formData.title_en}
                                            onChange={handleChange}
                                            required
                                            placeholder="System Architecture Design"
                                            className="block w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-700 focus:border-purple-500 outline-none transition-all"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            name="title_fr"
                                            value={formData.title_fr}
                                            onChange={handleChange}
                                            required
                                            placeholder="Design d'Architecture Système"
                                            className="block w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-700 focus:border-purple-500 outline-none transition-all"
                                        />
                                    )}
                                </label>

                                <label className="block">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 ml-1">Public Description</span>
                                    {activeTab === 'en' ? (
                                        <textarea
                                            name="description_en"
                                            value={formData.description_en}
                                            onChange={handleChange}
                                            required
                                            rows={4}
                                            placeholder="Engineered for scalability and high-performance throughput..."
                                            className="block w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-700 focus:border-purple-500 outline-none transition-all resize-none"
                                        />
                                    ) : (
                                        <textarea
                                            name="description_fr"
                                            value={formData.description_fr}
                                            onChange={handleChange}
                                            required
                                            rows={4}
                                            placeholder="Conçu pour l'évolutivité et le débit haute performance..."
                                            className="block w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-700 focus:border-purple-500 outline-none transition-all resize-none"
                                        />
                                    )}
                                </label>
                            </div>

                            {/* Tags Section */}
                            <div className="pt-6 border-t border-white/5">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4 ml-1">Capabilities & Tags</span>
                                <div className="flex flex-wrap gap-2 mb-4 min-h-[40px] p-3 bg-black/20 rounded-xl border border-dashed border-white/10">
                                    {formData.tags.length === 0 && <span className="text-xs text-slate-700 italic px-1">No tags added yet. Enter a capability below.</span>}
                                    {formData.tags.map(tag => (
                                        <span key={tag} className="flex items-center gap-1.5 bg-cyan-500/10 text-cyan-400 px-3 py-1.5 rounded-lg text-xs border border-cyan-500/20 group hover:bg-cyan-500/20 transition-all cursor-default animate-in zoom-in-75">
                                            {tag}
                                            <button type="button" onClick={() => removeTag(tag)} className="hover:text-white transition-colors">
                                                <X size={12} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={currentTag}
                                        onChange={(e) => setCurrentTag(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                        placeholder="Add technology (e.g. AWS, Edge Computing...)"
                                        className="flex-1 bg-black/40 border border-white/10 rounded-xl px-5 py-3 text-sm text-white focus:border-cyan-500 outline-none shadow-inner"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddTag}
                                        className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all border border-white/10 flex items-center gap-2"
                                    >
                                        Deploy Tag
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center gap-4 text-slate-500">
                            <div className="flex items-center gap-1">
                                <div className={clsx("w-1.5 h-1.5 rounded-full bg-green-500", !formData.slug && "bg-yellow-500 animate-pulse")} />
                                <span className="text-[10px] uppercase font-bold tracking-widest">{formData.slug ? "Ready" : "Incomplete"}</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 text-midnight-navy font-black px-12 py-4 rounded-2xl transition-all shadow-[0_0_30px_-5px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_-5px_rgba(6,182,212,0.6)] hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0 disabled:shadow-none"
                        >
                            <Save size={20} />
                            {loading ? 'INITIALIZING...' : 'LAUNCH SERVICE'}
                        </button>
                    </div>
                </form>

                {/* Preview Side */}
                <div className="lg:col-span-4 lg:sticky lg:top-8 h-fit">
                    <div className="flex items-center gap-2 mb-4 text-slate-500 ml-2">
                        <Eye size={16} />
                        <h2 className="text-xs font-bold uppercase tracking-widest">Live Terminal Preview</h2>
                    </div>

                    <div className="space-y-6">
                        {/* The Preview Card (Simulated matching actual UI) */}
                        <div className="bg-[#0F172A] border border-white/20 rounded-3xl p-8 relative overflow-hidden shadow-2xl scale-100 transition-transform hover:scale-[1.02]">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                                <SelectedIconComponent size={180} />
                            </div>

                            <div className="flex items-start justify-between mb-8">
                                <div className="p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 shadow-[0_0_15px_-5px_rgba(6,182,212,0.2)]">
                                    <SelectedIconComponent className="text-cyan-400" size={32} />
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10" />
                                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10" />
                                </div>
                            </div>

                            <h3 className="text-2xl font-black text-white mb-4 line-clamp-1">
                                {activeTab === 'en'
                                    ? (formData.title_en || "System Title")
                                    : (formData.title_fr || "Titre du Système")}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-8 min-h-[60px]">
                                {activeTab === 'en'
                                    ? (formData.description_en || "Brief system summary will be rendered here for user overview...")
                                    : (formData.description_fr || "Le résumé du système sera affiché ici pour l'aperçu utilisateur...")}
                            </p>

                            <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className={clsx(
                                        "w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_8px_rgba(0,0,0,0.5)]",
                                        formData.system_load > 80 ? "bg-red-400 shadow-red-500/50" :
                                            formData.system_load > 50 ? "bg-yellow-400 shadow-yellow-500/50" : "bg-green-400 shadow-green-500/50"
                                    )} />
                                    <span className="text-xs font-mono font-bold text-slate-500">LOAD: {formData.system_load}%</span>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] font-mono bg-cyan-500/10 text-cyan-500/80 px-2 py-0.5 rounded border border-cyan-500/10">
                                    <ChevronRight size={10} />
                                    {formData.slug || "TEMP_ID"}
                                </div>
                            </div>
                        </div>

                        {/* Quick Help Card */}
                        <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-white/5 rounded-3xl p-8 relative overflow-hidden group shadow-xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl" />
                            <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                <HelpCircle size={14} /> Production Tips
                            </h4>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <div className="bg-white/5 w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</div>
                                    <p className="text-xs text-slate-400 leading-relaxed font-medium">Use <span className="text-white">Keywords</span> in descriptions for better SEO visibility on the main site.</p>
                                </li>
                                <li className="flex gap-3">
                                    <div className="bg-white/5 w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</div>
                                    <p className="text-xs text-slate-400 leading-relaxed font-medium">Keep slugs <span className="text-white">lowercase</span> and use hyphens for system consistency.</p>
                                </li>
                                <li className="flex gap-3">
                                    <div className="bg-white/5 w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</div>
                                    <p className="text-xs text-slate-400 leading-relaxed font-medium">Target a <span className="text-white">low system load</span> for services currently under development or maintenance.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
