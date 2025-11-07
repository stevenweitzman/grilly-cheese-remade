import { Phone, Mail, MapPin } from "lucide-react";
import EventRequestForm from "./EventRequestForm";
import { motion } from "framer-motion";

const ContactSection = () => {

  return (
    <section id="contact" className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Book Your Event Today
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to make your event unforgettable? Fill out the form below and we'll get back to you with a custom quote!
          </p>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <EventRequestForm />
        </motion.div>

        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-card p-8 rounded-lg shadow-warm border-2 border-border">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              Contact Information
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                className="flex flex-col items-center text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-16 h-16 bg-gradient-hero rounded-lg flex items-center justify-center mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Phone className="h-8 w-8 text-primary-foreground" />
                </motion.div>
                <p className="font-semibold text-foreground mb-2">Phone</p>
                <a 
                  href="tel:8444745591" 
                  className="text-xl font-bold text-primary hover:underline mb-1"
                >
                  844-474-5591
                </a>
                <p className="text-sm text-muted-foreground">Call or text us anytime</p>
              </motion.div>

              <motion.div 
                className="flex flex-col items-center text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-16 h-16 bg-gradient-hero rounded-lg flex items-center justify-center mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <MapPin className="h-8 w-8 text-primary-foreground" />
                </motion.div>
                <p className="font-semibold text-foreground mb-2">Service Areas</p>
                <p className="text-muted-foreground">New Jersey • Pennsylvania • New York City • Maryland • Delaware • DC • Long Island</p>
                <p className="text-sm text-muted-foreground mt-1">Major metros: Philadelphia, Baltimore, Princeton, Trenton, Queens, Brooklyn, Manhattan, Wilmington & more</p>
              </motion.div>

              <motion.div 
                className="flex flex-col items-center text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-16 h-16 bg-gradient-hero rounded-lg flex items-center justify-center mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Mail className="h-8 w-8 text-primary-foreground" />
                </motion.div>
                <p className="font-semibold text-foreground mb-2">Online Ordering</p>
                <a 
                  href="https://grillycheese.dine.online/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-semibold"
                >
                  Order Now
                </a>
              </motion.div>
            </div>

            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Licensed & Insured:</strong> COI's available
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
