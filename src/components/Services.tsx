"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Monitor, Bot, Cloud, ArrowUpRight, Database, Lock, Globe, Zap, Briefcase, Stethoscope, Truck, ShoppingBag, Home, GraduationCap, Layers, LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import TiltCard from "./ui/TiltCard";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Service } from "@/types";

const iconMap: Record<string, LucideIcon> = {
  Monitor, Bot, Cloud, Database, Lock, Globe, Zap,
  Briefcase, Stethoscope, Truck, ShoppingBag, Home, GraduationCap, Layers
};

export default function Services() {
  const { t, language } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback icons if not specified in DB
  const serviceIcons = [Monitor, Bot, Cloud];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('id', { ascending: true })
          .limit(3); // Only show top 3 on home page

        if (error) {
          console.error('Error fetching services:', error);
          return;
        }

        if (data) {
          const mappedServices: Service[] = data.map((svc: any) => ({
            id: svc.id,
            slug: svc.slug,
            title: language === 'fr' ? svc.title_fr : svc.title_en,
            description: language === 'fr' ? svc.description_fr : svc.description_en,
            tags: svc.tags || [],
            system_load: svc.system_load || 85,
            icon_name: svc.icon_name,
            projects: []
          }));
          setServices(mappedServices);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [language]);

  return (
    <section id="services" className="py-24 bg-midnight-navy relative perspective-1000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-white mb-4">
            {t.services.title}
          </h2>
          <div className="h-1 w-20 bg-electric-cyan mx-auto rounded-full"></div>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            // Skeleton Loading State
            [1, 2, 3].map((_, index) => (
              <div key={index} className="h-80 bg-white/5 rounded-xl animate-pulse border border-white/5"></div>
            ))
          ) : (
            services.map((service, index) => {
              const IconComponent = (service.icon_name && iconMap[service.icon_name]) ? iconMap[service.icon_name] : (serviceIcons[index] || Monitor);

              return (
                <Link key={service.id} href={`/services/${service.slug}`} className="block h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="h-full"
                  >
                    <TiltCard className="h-full">
                      <div className="group relative bg-white/5 border border-white/10 p-8 rounded-xl hover:border-electric-cyan/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,215,215,0.1)] h-full flex flex-col">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowUpRight className="text-electric-cyan" />
                        </div>

                        <div className="w-14 h-14 bg-midnight-navy border border-electric-cyan/30 rounded-lg flex items-center justify-center mb-6 text-electric-cyan group-hover:bg-electric-cyan group-hover:text-midnight-navy transition-colors shrink-0">
                          <IconComponent size={28} />
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 shrink-0">{service.title}</h3>
                        <p className="text-slate-400 mb-6 text-sm leading-relaxed line-clamp-4 flex-grow">
                          {service.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-auto shrink-0">
                          {service.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-mono px-2 py-1 bg-white/5 text-slate-300 rounded border border-white/5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                </Link>
              );
            })
          )}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="relative px-6 py-3 bg-transparent border border-electric-cyan text-electric-cyan font-sans font-semibold rounded-sm overflow-hidden group"
          >
            <div className="absolute inset-0 w-0 bg-electric-cyan transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
            <span className="relative group-hover:text-white transition-colors">{t.services.moreServicesButton}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
