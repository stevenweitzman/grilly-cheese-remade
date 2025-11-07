import { Truck, Home, PartyPopper, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
      description: "Festivals, birthday parties, graduations, and any celebration. All events, all sizes, all delicious!",
      link: "/#packages"
    },
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From <Link to="/services/wedding-catering" className="text-accent hover:underline">wedding catering</Link> to <Link to="/services/corporate-catering" className="text-accent hover:underline">corporate events</Link>, we serve all of <Link to="/locations/new-jersey" className="text-accent hover:underline">NJ</Link>, <Link to="/locations/pennsylvania" className="text-accent hover:underline">PA</Link>, and <Link to="/locations/new-york-city" className="text-accent hover:underline">NYC</Link>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Link key={index} to={service.link}>
              <Card 
                className="border-2 hover:border-primary hover:shadow-warm transition-all duration-300 animate-scale-in hover:scale-105 cursor-pointer group h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-hero rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="#contact">
            <Button size="lg" className="text-lg px-8 py-6">
              Book Your Event Now
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
