
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@nexura/database";
import Link from "next/link";
import { Plus, Edit, Trash, ExternalLink, Loader2 } from "lucide-react";
import Image from "next/image";
import { Project } from "@nexura/types";

export default function ProjectsIndex() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    async function fetchProjects() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('projects')
                .select('*, services(title_en)')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProjects(data || []);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete "${name}"?`)) {
            return;
        }

        try {
            const { error } = await supabase.from('projects').delete().eq('id', id);
            if (error) throw error;
            setProjects(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Failed to delete project');
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Projects</h1>
                    <p className="text-slate-400 mt-1">Manage your portfolio and showcase your latest work.</p>
                </div>
                <Link href="/projects/new" className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors font-medium">
                    <Plus size={18} />
                    Add Project
                </Link>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="animate-spin text-cyan-400" size={40} />
                </div>
            ) : (
                <div className="bg-[#0F172A] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-400">
                            <thead className="bg-white/5 uppercase font-semibold text-slate-300">
                                <tr>
                                    <th className="px-6 py-4">Image</th>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Service</th>
                                    <th className="px-6 py-4">Tags</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {projects.map((project) => (
                                    <tr key={project.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10 group-hover:border-cyan-500/50 transition-colors">
                                                <Image
                                                    src={project.image}
                                                    alt={project.name_en}
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-white">
                                            {project.name_en}
                                            <span className="block text-xs text-slate-500 mt-0.5 font-mono">{project.slug}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-block px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase border border-cyan-500/20">
                                                {project.services?.title_en || "No Service"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 max-w-xs">
                                            <div className="flex flex-wrap gap-1">
                                                {project.tags?.slice(0, 3).map((tag: string) => (
                                                    <span key={tag} className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded border border-white/5 text-slate-500">
                                                        {tag}
                                                    </span>
                                                ))}
                                                {project.tags?.length > 3 && (
                                                    <span className="text-[10px] text-slate-600">+{project.tags.length - 3}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {project.demo_link && (
                                                    <a href={project.demo_link} target="_blank" className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-colors" title="View Live">
                                                        <ExternalLink size={16} />
                                                    </a>
                                                )}
                                                <Link href={`/projects/${project.id}/edit`} className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors" title="Edit">
                                                    <Edit size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(project.id, project.name_en)}
                                                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {projects.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500 italic">
                                            No projects found. Create your first one to get started!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
