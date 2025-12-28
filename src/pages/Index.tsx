import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import PressSection from "@/components/PressSection";
import ServicesSection from "@/components/ServicesSection";
import PackagesSection from "@/components/PackagesSection";
import FAQSection from "@/components/FAQSection";
import EnhancedClientsSection from "@/components/EnhancedClientsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

import StickyCTABar from "@/components/StickyCTABar";
import SocialProofBanner from "@/components/SocialProofBanner";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import FloatingQuoteButton from "@/components/FloatingQuoteButton";
import HorizontalMenuGallery from "@/components/HorizontalMenuGallery";
import StatisticsSection from "@/components/StatisticsSection";
import FoodTruckShowcase from "@/components/FoodTruckShowcase";
import SEOHead from "@/components/SEOHead";
import SEOSchema from "@/components/SEOSchema";
import InstagramFeed from "@/components/InstagramFeed";

const Index = () => {
  return (
    <>
      <SEOHead
        title="Food Truck Catering NJ, PA & NYC | Wedding & Corporate Events | Grilly Cheese"
        description="Award-winning food truck catering for weddings, corporate events & parties in NJ, PA, NYC, MD, DE & DC. 4.9★ rated. Gourmet grilled cheese made fresh on-site. 2,500+ events catered. Same-day quotes available!"
        canonical="https://grillycheese.net"
        keywords="food truck catering NJ, food truck catering Philadelphia, wedding food truck New Jersey, corporate catering NYC, food truck catering Pennsylvania, grilled cheese catering, mobile catering, event catering NJ, food truck hire, catering food truck near me"
      />
      <SEOSchema type="homepage" />

      <div className="min-h-screen">
        <Navigation />
        <StickyCTABar />
        <Hero />
        <SocialProofBanner />
        <StatisticsSection />
        <PressSection />
        <ServicesSection />
        <HorizontalMenuGallery />
        <FoodTruckShowcase />
        <PackagesSection />
        <EnhancedClientsSection />
        <InstagramFeed />
        <FAQSection />
        <ContactSection />
        <Footer />
        
        <MobileStickyCTA />
        <FloatingQuoteButton />
        <ExitIntentPopup />
      </div>
    </>
  );
};

export default Index;
