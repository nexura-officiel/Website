
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@nexura/database";
import { Loader2 } from "lucide-react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session && pathname !== "/login") {
                router.push("/login");
            } else if (session && pathname === "/login") {
                router.push("/");
            } else {
                setAuthenticated(!!session || pathname === "/login");
            }
            setLoading(false);
        };

        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
            if (event === "SIGNED_OUT") {
                setAuthenticated(false);
                if (window.location.pathname !== "/login") {
                    window.location.href = "/login";
                }
            } else if (event === "SIGNED_IN") {
                setAuthenticated(true);
                // Only redirect if we are specifically on the login page
                if (window.location.pathname === "/login") {
                    window.location.href = "/";
                }
            }
        });

        return () => subscription.unsubscribe();
    }, [pathname, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center">
                <Loader2 className="animate-spin text-cyan-400" size={40} />
            </div>
        );
    }

    if (!authenticated && pathname !== "/login") {
        return null; // Prevents flashing content while redirecting
    }

    return <>{children}</>;
}
