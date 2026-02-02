
"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@nexura/database";
import { ArrowLeft, Save, X, HelpCircle, Laptop, Settings, ChevronRight, Info, Eye, Loader2 } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";
import { updateServiceAction } from "@/app/actions/database";

// Helper to check if a string is a valid Lucide icon name
const isValidLucideIconName = (name: string): name is keyof typeof LucideIcons => {
    return name in LucideIcons;
};

type Language = 'en' | 'fr';

interface EditServicePageProps {
    params: Promise<{ id: string }>;
}

export default function EditServicePage({ params }: EditServicePageProps) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
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

    useEffect(() => {
        async function fetchService() {
            try {
                setFetching(true);
                const { data, error } = await supabase
                    .from('services')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                if (data) {
                    setFormData({
                        slug: data.slug || "",
                        title_en: data.title_en || "",
                        title_fr: data.title_fr || "",
                        description_en: data.description_en || "",
                        description_fr: data.description_fr || "",
                        icon_name: data.icon_name || "Layers",
                        system_load: data.system_load || 0,
                        tags: data.tags || []
                    });
                }
            } catch (error) {
                console.error('Error fetching service:', error);
                alert('Service not found');
                router.push('/services');
            } finally {
                setFetching(false);
            }
        }
        fetchService();
    }, [id, router]);

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
            console.log('Synchronizing service changes with core...');
            const result = await updateServiceAction(id, formData);

            if (!result) {
                throw new Error("Target service logs were not updated.");
            }

            console.log('Synchronization complete.');
            router.refresh();
            setTimeout(() => {
                router.push('/services');
            }, 150);
        } catch (error: any) {
            console.error('Critical Error - Core Sync Failed:', error);
            alert(`MODIFICATION FAILED: ${error.message || 'Unknown network error'}`);
        } finally {
            setLoading(false);
        }
    };

    const SelectedIconComponent = isValidLucideIconName(formData.icon_name)
        ? (LucideIcons[formData.icon_name] as React.ElementType)
        : HelpCircle;

    if (fetching) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="animate-spin text-cyan-400 mb-4" size={48} />
                <p className="text-slate-400 font-mono text-sm tracking-widest uppercase">Fetching Service Logs...</p>
            </div>
        );
    }

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
                        Modify Service
                        <span className="text-xs bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-2 py-0.5 rounded uppercase tracking-widest font-mono">Edit Mode</span>
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
                                            className="block w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-purple-500 outline-none transition-all"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            name="title_fr"
                                            value={formData.title_fr}
                                            onChange={handleChange}
                                            required
                                            className="block w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-purple-500 outline-none transition-all"
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
                                            className="block w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-purple-500 outline-none transition-all resize-none"
                                        />
                                    ) : (
                                        <textarea
                                            name="description_fr"
                                            value={formData.description_fr}
                                            onChange={handleChange}
                                            required
                                            rows={4}
                                            className="block w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-purple-500 outline-none transition-all resize-none"
                                        />
                                    )}
                                </label>
                            </div>

                            <div className="pt-6 border-t border-white/5">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4 ml-1">Capabilities & Tags</span>
                                <div className="flex flex-wrap gap-2 mb-4 min-h-[40px] p-3 bg-black/20 rounded-xl border border-dashed border-white/10">
                                    {formData.tags.map(tag => (
                                        <span key={tag} className="flex items-center gap-1.5 bg-cyan-500/10 text-cyan-400 px-3 py-1.5 rounded-lg text-xs border border-cyan-500/20 group hover:bg-cyan-500/20 transition-all cursor-default">
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
                                        placeholder="Add technology..."
                                        className="flex-1 bg-black/40 border border-white/10 rounded-xl px-5 py-3 text-sm text-white focus:border-cyan-500 outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddTag}
                                        className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all border border-white/10"
                                    >
                                        Update Tags
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 disabled:bg-slate-700 text-black font-black px-12 py-4 rounded-2xl transition-all shadow-[0_0_30px_-5px_rgba(234,179,8,0.4)]"
                        >
                            <Save size={20} />
                            {loading ? 'SYNCHRONIZING...' : 'COMMIT CHANGES'}
                        </button>
                    </div>
                </form>

                {/* Preview Side */}
                <div className="lg:col-span-4 lg:sticky lg:top-8 h-fit">
                    <div className="flex items-center gap-2 mb-4 text-slate-500 ml-2">
                        <Eye size={16} />
                        <h2 className="text-xs font-bold uppercase tracking-widest">Live Update Preview</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-[#0F172A] border border-white/20 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                                <SelectedIconComponent size={180} />
                            </div>

                            <div className="flex items-start justify-between mb-8">
                                <div className="p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
                                    <SelectedIconComponent className="text-cyan-400" size={32} />
                                </div>
                            </div>

                            <h3 className="text-2xl font-black text-white mb-4 line-clamp-1">
                                {activeTab === 'en' ? formData.title_en : formData.title_fr}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-8 min-h-[60px]">
                                {activeTab === 'en' ? formData.description_en : formData.description_fr}
                            </p>

                            <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className={clsx(
                                        "w-2.5 h-2.5 rounded-full animate-pulse",
                                        formData.system_load > 80 ? "bg-red-400" :
                                            formData.system_load > 50 ? "bg-yellow-400" : "bg-green-400"
                                    )} />
                                    <span className="text-xs font-mono font-bold text-slate-500">LOAD: {formData.system_load}%</span>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] font-mono bg-cyan-500/10 text-cyan-500/80 px-2 py-0.5 rounded border border-cyan-500/10">
                                    {formData.slug}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
