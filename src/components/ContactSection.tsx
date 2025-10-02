import { Phone, Mail, MapPin } from "lucide-react";
import EventRequestForm from "./EventRequestForm";

const ContactSection = () => {

  return (
    <section id="contact" className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Book Your Event Today
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to make your event unforgettable? Fill out the form below and we'll get back to you with a custom quote!
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16 animate-scale-in">
          <EventRequestForm />
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-card p-8 rounded-lg shadow-warm border-2 border-border">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              Contact Information
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-hero rounded-lg flex items-center justify-center mb-4">
                  <Phone className="h-8 w-8 text-primary-foreground" />
                </div>
                <p className="font-semibold text-foreground mb-2">Phone</p>
                <a 
                  href="tel:8444745591" 
                  className="text-xl font-bold text-primary hover:underline mb-1"
                >
                  844-474-5591
                </a>
                <p className="text-sm text-muted-foreground">Call or text us anytime</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-hero rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-primary-foreground" />
                </div>
                <p className="font-semibold text-foreground mb-2">Service Areas</p>
                <p className="text-muted-foreground">New Jersey, Pennsylvania, & New York City</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-hero rounded-lg flex items-center justify-center mb-4">
                  <Mail className="h-8 w-8 text-primary-foreground" />
                </div>
                <p className="font-semibold text-foreground mb-2">Online Ordering</p>
                <a 
                  href="https://grillycheese.dine.online/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-semibold"
                >
                  Order Now
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Insured by FLIP</strong> – Food Liability Insurance Co.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
