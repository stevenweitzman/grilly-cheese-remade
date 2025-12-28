import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const EnhancedClientsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Client list - using text fallback instead of external images for faster loading
  const clients = [
    { name: "The Children's Hospital of Philadelphia" },
    { name: "Target" },
    { name: "The College of New Jersey" },
    { name: "Hallmark Channel" },
    { name: "Planet Fitness" },
    { name: "Rutgers University" },
    { name: "Princeton University" },
    { name: "Johnson & Johnson" },
  ];

  const testimonials = [
    {
      quote: "Best food truck at our corporate event. Guests kept coming back for more! The team was professional and the food was exceptional.",
      author: "Sarah M.",
      company: "Target",
      rating: 5
    },
    {
      quote: "The Grilly Cheese changed my life. I'm not exaggerating. Every bite was perfection. Highly recommend for any event!",
      author: "Mike R.",
      company: "Wedding Guest",
      rating: 5
    },
    {
      quote: "Absolutely phenomenal service and the grilled cheese sandwiches were to die for. Our employees couldn't stop raving about it!",
      author: "Jennifer K.",
      company: "Johnson & Johnson",
      rating: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Clients that Love Our Food
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Here's a select few of the thousands of clients we've had the privilege of serving
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto mb-16 relative overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-2xl p-8 md:p-12 shadow-warm border-2 border-border relative overflow-hidden"
            >
              {/* Static decorative element - removed animation for performance */}
              <div
                className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -mr-16 -mt-16"
              />
              
              <Quote className="h-12 w-12 text-accent/30 mb-4" />
              
              <motion.p 
                className="text-xl md:text-2xl text-foreground mb-6 leading-relaxed relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                "{testimonials[currentTestimonial].quote}"
              </motion.p>
              
              <div className="flex items-center gap-2 mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="text-accent text-2xl"
                  >
                    ★
                  </motion.span>
                ))}
              </div>
              
              <motion.div 
                className="relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="font-bold text-foreground text-lg">
                  {testimonials[currentTestimonial].author}
                </p>
                <p className="text-muted-foreground">
                  {testimonials[currentTestimonial].company}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <motion.button
              onClick={prevTestimonial}
              className="bg-card border-2 border-border rounded-full p-3 hover:border-accent transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="h-6 w-6 text-foreground" />
            </motion.button>
            
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-3 rounded-full transition-all ${
                    index === currentTestimonial ? "w-8 bg-accent" : "w-3 bg-border"
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="bg-card border-2 border-border rounded-full p-3 hover:border-accent transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="h-6 w-6 text-foreground" />
            </motion.button>
          </div>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center p-6 bg-background rounded-lg shadow-sm hover:shadow-warm transition-shadow duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-center font-semibold text-muted-foreground text-sm">
                {client.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <a
            href="#contact"
            className="inline-block text-lg font-semibold text-primary hover:text-accent transition-colors duration-300"
            onClick={() => {
              if (window.dataLayer) {
                window.dataLayer.push({
                  event: 'clients_cta_click',
                  cta_location: 'Clients Section',
                });
              }
            }}
          >
            Join our list of happy clients →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedClientsSection;
