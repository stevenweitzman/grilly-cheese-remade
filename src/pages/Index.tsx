import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import PressSection from "@/components/PressSection";
import ServicesSection from "@/components/ServicesSection";
import PackagesSection from "@/components/PackagesSection";
import FAQSection from "@/components/FAQSection";
import EnhancedClientsSection from "@/components/EnhancedClientsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { ChatAssistant } from "@/components/ChatAssistant";
import StickyCTABar from "@/components/StickyCTABar";
import SocialProofBanner from "@/components/SocialProofBanner";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import FloatingQuoteButton from "@/components/FloatingQuoteButton";
import HorizontalMenuGallery from "@/components/HorizontalMenuGallery";
import StatisticsSection from "@/components/StatisticsSection";
import CustomCursor from "@/components/CustomCursor";
import SEOHead from "@/components/SEOHead";
import SEOSchema from "@/components/SEOSchema";

const Index = () => {
  return (
    <>
      <SEOHead
        title="Food Truck Catering NJ, PA & NYC | Grilly Cheese | Top 6 in Nation"
        description="Award-winning food truck catering for weddings, corporate events & parties in NJ, PA & NYC. 4.9★ rated. Gourmet grilled cheese made fresh on-site. 10,000+ events catered. Get your quote in 2 hours!"
        canonical="https://grillycheese.net"
        keywords="food truck catering, grilled cheese catering, wedding food truck NJ, corporate catering, event catering New Jersey, mobile catering NYC"
      />
      <SEOSchema type="homepage" />
      
      <div className="min-h-screen">
        <CustomCursor />
        <Navigation />
        <StickyCTABar />
        <Hero />
        <SocialProofBanner />
        <StatisticsSection />
        <PressSection />
        <ServicesSection />
        <HorizontalMenuGallery />
        <PackagesSection />
        <EnhancedClientsSection />
        <FAQSection />
        <ContactSection />
        <Footer />
        <ChatAssistant />
        <MobileStickyCTA />
        <FloatingQuoteButton />
        <ExitIntentPopup />
      </div>
    </>
  );
};

export default Index;
