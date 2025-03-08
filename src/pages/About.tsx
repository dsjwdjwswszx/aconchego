
import { useEffect } from "react";
import HeroBanner from "@/components/about/HeroBanner";
import MissionSection from "@/components/about/MissionSection";
import HowWeWorkSection from "@/components/about/HowWeWorkSection";
import DeliverySystemSection from "@/components/about/DeliverySystemSection";
import RequestEligibilitySection from "@/components/about/RequestEligibilitySection";
import DonorSection from "@/components/about/DonorSection";
import ContactSection from "@/components/about/ContactSection";
import Footer from "@/components/common/Footer";

const About = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner />
      <MissionSection />
      <HowWeWorkSection />
      <DeliverySystemSection />
      <RequestEligibilitySection />
      <DonorSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default About;
