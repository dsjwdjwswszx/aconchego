
import { useEffect } from "react";
import Hero from "@/components/Hero";
import AboutSection from "@/components/home/AboutSection";
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/common/Footer";

const Index = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <AboutSection />
      <FeaturedProductsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
