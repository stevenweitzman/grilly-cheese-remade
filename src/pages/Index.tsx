import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import PressSection from "@/components/PressSection";
import ServicesSection from "@/components/ServicesSection";
import PackagesSection from "@/components/PackagesSection";
import FAQSection from "@/components/FAQSection";
import ClientsSection from "@/components/ClientsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { ChatAssistant } from "@/components/ChatAssistant";
import StickyCTABar from "@/components/StickyCTABar";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <StickyCTABar />
      <Hero />
      <PressSection />
      <ServicesSection />
      <PackagesSection />
      <ClientsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default Index;
