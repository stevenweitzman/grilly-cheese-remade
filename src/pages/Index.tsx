import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import PressSection from "@/components/PressSection";
import ServicesSection from "@/components/ServicesSection";
import PackagesSection from "@/components/PackagesSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { ChatAssistant } from "@/components/ChatAssistant";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <PressSection />
      <ServicesSection />
      <PackagesSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default Index;
