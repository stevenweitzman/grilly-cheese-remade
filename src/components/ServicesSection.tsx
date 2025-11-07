import { Truck, Home, PartyPopper, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ServicesSection = () => {
  const services = [
    {
      icon: Truck,
      title: "Food Truck Catering",
      description: "Book our food truck for weddings, corporate events, festivals, and private parties. We bring the cheese to you!",
      link: "/services/wedding-catering"
    },
    {
      icon: Home,
      title: "Corporate Events",
      description: "Professional catering for office meetings, team events, and company celebrations. Trusted by Fortune 500 companies.",
      link: "/services/corporate-catering"
    },
    {
      icon: ShoppingBag,
      title: "Wedding Catering",
      description: "Make your wedding unforgettable with unique, Instagram-worthy food truck catering that guests will love.",
      link: "/services/wedding-catering"
    },
    {
      icon: PartyPopper,
      title: "All Events",
      description: "Baby showers, retirement parties, film set catering, festivals, birthday parties, graduations, bar/bat mitzvahs, bridal showers, and more!",
      link: "/#packages"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
      }
    }
  };

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From <Link to="/services/wedding-catering" className="text-accent hover:underline">wedding catering</Link> to <Link to="/services/corporate-catering" className="text-accent hover:underline">corporate events</Link>, baby showers to film set catering, we serve <Link to="/locations/new-jersey" className="text-accent hover:underline">NJ</Link>, <Link to="/locations/pennsylvania" className="text-accent hover:underline">PA</Link>, <Link to="/locations/new-york-city" className="text-accent hover:underline">NYC</Link>, MD, DE, DC & Long Island - including Philadelphia, Baltimore, Princeton, Queens & Brooklyn
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link to={service.link}>
                <Card 
                  className="border-2 border-border transition-all duration-300 cursor-pointer group h-full overflow-hidden"
                >
                  <motion.div
                    whileHover={{ 
                      scale: 1.03,
                      borderColor: "hsl(var(--primary))",
                      boxShadow: "var(--shadow-warm)"
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <CardHeader>
                      <motion.div 
                        className="w-16 h-16 bg-gradient-hero rounded-lg flex items-center justify-center mb-4"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <service.icon className="h-8 w-8 text-primary-foreground" />
                      </motion.div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{service.description}</CardDescription>
                    </CardContent>
                  </motion.div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <a href="#contact">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="text-lg px-8 py-6">
                Book Your Event Now
              </Button>
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
