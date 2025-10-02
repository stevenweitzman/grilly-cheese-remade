import { Truck, Home, PartyPopper, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ServicesSection = () => {
  const services = [
    {
      icon: Truck,
      title: "Food Truck Catering",
      description: "Book our food truck for weddings, corporate events, festivals, and private parties. We bring the cheese to you!",
    },
    {
      icon: Home,
      title: "Delivery Service",
      description: "Craving grilled cheese? We deliver to your door! Enjoy our delicious menu from the comfort of home.",
    },
    {
      icon: ShoppingBag,
      title: "Take-Out",
      description: "Stop by for quick take-out service. Perfect for lunch breaks or grabbing dinner on the go.",
    },
    {
      icon: PartyPopper,
      title: "Special Events",
      description: "Make your event unforgettable with our gourmet grilled cheese, soups, and hot dogs. All events, all sizes!",
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
            From food truck catering to delivery, we've got all your grilled cheese needs covered
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="border-2 hover:border-primary hover:shadow-warm transition-all duration-300 animate-scale-in hover:scale-105 cursor-pointer group"
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
