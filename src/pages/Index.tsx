import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/shared/ScrollToTop";

const Index = () => {
  // Smooth scroll behavior for better UX
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section id="hero" className="relative">
          <Hero />
        </section>
        
        {/* Products Section with smooth transition */}
        <section id="products" className="relative">
          <ProductShowcase />
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default Index;
