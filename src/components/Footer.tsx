import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-midnight-navy border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image 
                src="/logo.png" 
                alt="Nexura Logo" 
                width={28} 
                height={28} 
                className="w-auto h-7"
              />
              <span className="font-sans font-bold text-xl tracking-wider text-white">
                NEXURA
              </span>
            </Link>
            <p className="text-slate-400 max-w-sm mb-6">
              Engineering the future of digital business. We build the systems that power your growth.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-electric-cyan transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-slate-400 hover:text-electric-cyan transition-colors">
                <Github size={24} />
              </a>
              <a href="mailto:contact@nexura.com" className="text-slate-400 hover:text-electric-cyan transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-3 text-slate-400">
              <li><Link href="#" className="hover:text-electric-cyan transition-colors">Web Development</Link></li>
              <li><Link href="#" className="hover:text-electric-cyan transition-colors">Mobile Apps</Link></li>
              <li><Link href="#" className="hover:text-electric-cyan transition-colors">AI Solutions</Link></li>
              <li><Link href="#" className="hover:text-electric-cyan transition-colors">Cloud Architecture</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-3 text-slate-400">
              <li><Link href="#" className="hover:text-electric-cyan transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-electric-cyan transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Nexura. All rights reserved.</p>
          <p className="mt-2 md:mt-0 font-mono">Designed & Built by Nexura Engineering</p>
        </div>
      </div>
    </footer>
  );
}
