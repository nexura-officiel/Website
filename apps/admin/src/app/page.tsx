
import { supabase } from "@nexura/database";
import { Layers, FolderOpen, Activity, Plus, ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 0;

export default async function Dashboard() {
  // Parallel data fetching
  const [servicesRes, projectsRes, recentProjectsRes] = await Promise.all([
    supabase.from('services').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*, services(title_en)').order('created_at', { ascending: false }).limit(5)
  ]);

  const stats = [
    {
      label: "Total Services",
      value: servicesRes.count || 0,
      icon: Layers,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
      href: "/services"
    },
    {
      label: "Active Projects",
      value: projectsRes.count || 0,
      icon: FolderOpen,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      href: "/projects"
    },
    {
      label: "System Status",
      value: "Nominal",
      icon: Activity,
      color: "text-green-400",
      bg: "bg-green-400/10",
      href: "#"
    },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-bold text-white tracking-tight">Command Center</h1>
        <p className="text-slate-400 mt-2">Welcome back. Everything is running smoothly.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-[#0F172A] border border-white/5 rounded-2xl p-6 flex items-center gap-6 hover:border-white/20 transition-all group active:scale-[0.98]"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} transition-transform group-hover:scale-110 group-hover:rotate-3`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.1em]">{stat.label}</p>
              <p className="text-3xl font-mono font-bold text-white mt-1">{stat.value}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-bold text-white">Recent Projects</h2>
            <Link href="/projects" className="text-cyan-400 text-xs hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>

          <div className="bg-[#0F172A] border border-white/5 rounded-2xl divide-y divide-white/5 overflow-hidden shadow-xl">
            {recentProjectsRes.data?.map((project: any) => (
              <div key={project.id} className="p-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10 shrink-0">
                  <Image src={project.image} alt="" fill className="object-cover" unoptimized />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white truncate">{project.name_en}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-2">
                    <span className="text-cyan-500/80 font-medium">{(project.services as any)?.title_en}</span>
                    <span>•</span>
                    <span>{new Date(project.created_at).toLocaleDateString()}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {project.github_link && <Github size={14} className="text-slate-600" />}
                  <Link href={`/projects/${project.id}/edit`} className="p-2 text-slate-500 hover:text-white transition-colors">
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
            {(!recentProjectsRes.data || recentProjectsRes.data.length === 0) && (
              <div className="p-10 text-center text-slate-500 italic">
                No recent activity to show.
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white px-2">Quick Deployment</h2>
          <div className="space-y-3">
            <Link
              href="/projects/new"
              className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-midnight-navy font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/10 active:scale-[0.98]"
            >
              <span className="flex items-center gap-3">
                <Plus size={20} />
                New Project
              </span>
            </Link>
            <Link
              href="/services/new"
              className="flex items-center justify-between p-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all border border-white/5 active:scale-[0.98]"
            >
              <span className="flex items-center gap-3">
                <Plus size={20} />
                New Service
              </span>
            </Link>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-white/5 rounded-2xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl transition-transform group-hover:scale-150" />
            <h3 className="text-sm font-bold text-white mb-2 relative z-10">Database Status</h3>
            <div className="flex items-center gap-2 text-green-400 text-xs font-mono relative z-10">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Connection Stable
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
