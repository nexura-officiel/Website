import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Vision from "@/components/Vision";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-midnight-navy text-white selection:bg-electric-cyan selection:text-midnight-navy">
      <Navbar />
      <Hero />
      <Services />
      <Vision />
      <Footer />
    </main>
  );
}