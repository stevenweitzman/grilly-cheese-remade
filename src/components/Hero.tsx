import { Button } from "@/components/ui/button";
import { Phone, Calendar, ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-grilled-cheese.jpg";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
  const { scrollY } = useScroll();
  
  // Simplified parallax effects
  const imageY = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: imageY }}
      >
        <div className="absolute inset-0 scale-110">
          <img
            src={heroImage}
            alt="Golden, buttery grilled cheese sandwich with melted American cheese on thick-cut white bread - award-winning food truck catering in New Jersey"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10" />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 pb-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-7xl">
          <div className="max-w-4xl">
            <motion.div 
              className="inline-block bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-accent/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-accent font-semibold text-sm">🏆 Top 6 Grilled Cheese in the Nation - GrubHub</p>
            </motion.div>
          
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Gourmet Grilled Cheese
              </motion.span>
              <motion.span 
                className="block text-accent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                On Wheels
              </motion.span>
            </motion.h1>
          
            <motion.p 
              className="text-xl md:text-2xl lg:text-3xl text-primary-foreground/90 mb-4 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Serving NJ, PA, NYC, MD, DE, DC & Long Island
            </motion.p>
          
            <motion.p 
              className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              From baby showers to retirement parties, corporate events to film set catering, weddings to festivals - we bring award-winning grilled cheese to Baltimore, Philly, Queens, Brooklyn, Princeton & beyond.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="text-lg px-10 py-7 shadow-warm hover:shadow-xl transition-all relative overflow-hidden group"
                  asChild
                >
                  <a 
                    href="#contact" 
                    className="flex items-center gap-2"
                    onClick={() => {
                      if (typeof window !== 'undefined' && (window as any).dataLayer) {
                        (window as any).dataLayer.push({
                          'event': 'cta_click',
                          'cta_location': 'Hero',
                          'cta_text': 'Get Your Quote'
                        });
                      }
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-accent/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <Calendar className="h-6 w-6 relative z-10" />
                    <span className="relative z-10">Get Your Quote</span>
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="bg-background/10 backdrop-blur-md p-4 md:p-6 rounded-xl border border-primary-foreground/20 inline-block w-full sm:w-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              whileHover={{ scale: 1.02, borderColor: "hsl(var(--accent))" }}
            >
              <div className="flex items-center gap-3 md:gap-4">
                <motion.div 
                  className="bg-accent rounded-full p-2 md:p-3"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Phone className="h-5 w-5 md:h-7 md:w-7 text-background" />
                </motion.div>
                <div>
                  <p className="text-xs md:text-sm font-medium text-primary-foreground/80">Ready to Book? Call Now:</p>
                  <a 
                    href="tel:8444745591" 
                    className="text-2xl md:text-3xl font-bold text-accent hover:text-accent/80 transition-colors block"
                    onClick={() => {
                      if (typeof window !== 'undefined' && (window as any).dataLayer) {
                        (window as any).dataLayer.push({
                          'event': 'phone_click',
                          'phone_location': 'Hero',
                          'phone_number': '844-474-5591'
                        });
                      }
                    }}
                  >
                    844-474-5591
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Quote Form - Always visible on all devices */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <QuickQuoteForm />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 hidden md:block"
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: 1, 
          y: 0,
        }}
        transition={{ 
          duration: 0.8, 
          delay: 2,
        }}
        style={{ opacity }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex flex-col items-center gap-2 text-primary-foreground/60 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
