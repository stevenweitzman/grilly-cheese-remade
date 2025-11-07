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
import SocialProofBanner from "@/components/SocialProofBanner";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import FloatingQuoteButton from "@/components/FloatingQuoteButton";
import MenuGallery from "@/components/MenuGallery";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <StickyCTABar />
      <Hero />
      <SocialProofBanner />
      <PressSection />
      <ServicesSection />
      <MenuGallery />
      <PackagesSection />
      <ClientsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <ChatAssistant />
      <MobileStickyCTA />
      <FloatingQuoteButton />
      <ExitIntentPopup />
    </div>
  );
};

export default Index;
