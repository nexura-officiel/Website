
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@nexura/database";
import { Service } from "@nexura/types";
import { Plus, Edit, Trash, Activity, HelpCircle } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices();
    }, []);

    async function fetchServices() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .order('title_en', { ascending: true });

            if (error) throw error;

            const mappedData: Service[] = (data || []).map((s: any) => ({
                id: s.id,
                slug: s.slug,
                title: s.title_en,
                description: s.description_en,
                tags: s.tags || [],
                icon_name: s.icon_name,
                system_load: s.system_load
            }));

            setServices(mappedData);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Are you sure you want to delete "${title}"? This will also affect projects linked to this service.`)) {
            return;
        }

        try {
            const { error } = await supabase.from('services').delete().eq('id', id);
            if (error) throw error;
            setServices(prev => prev.filter(s => s.id !== id));
        } catch (error) {
            console.error('Error deleting service:', error);
            alert('Failed to delete service');
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Services</h1>
                    <p className="text-slate-400 mt-1">Manage your platform's core offerings and system capabilities.</p>
                </div>
                <Link href="/services/new" className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-midnight-navy font-bold px-4 py-2 rounded-lg transition-colors">
                    <Plus size={18} />
                    Add Service
                </Link>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-48 bg-white/5 rounded-xl animate-pulse border border-white/10" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => {
                        const IconComponent = (service.icon_name && (LucideIcons as any)[service.icon_name]) || HelpCircle;

                        return (
                            <div key={service.id} className="bg-[#0F172A] border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all group relative overflow-hidden flex flex-col">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-cyan-500/10 rounded-lg">
                                        <IconComponent className="text-cyan-400" size={24} />
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/services/${service.id}/edit`}
                                            className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-white/5 rounded-md transition-colors"
                                        >
                                            <Edit size={16} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(service.id, service.title)}
                                            className="p-2 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-md transition-colors"
                                        >
                                            <Trash size={16} />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                                <p className="text-slate-400 text-sm line-clamp-2 mb-4">{service.description}</p>

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-2">
                                        <Activity size={14} className={clsx(
                                            service.system_load > 80 ? "text-red-400" :
                                                service.system_load > 50 ? "text-yellow-400" : "text-green-400"
                                        )} />
                                        <span className="text-xs font-mono text-slate-500">Load: {service.system_load}%</span>
                                    </div>
                                    <span className="text-[10px] font-mono bg-white/5 text-slate-500 px-2 py-0.5 rounded border border-white/10">
                                        /{service.slug}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
