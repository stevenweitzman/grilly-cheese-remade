import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SEOSchema from "@/components/SEOSchema";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import QuickAnswerBox from "@/components/blog/QuickAnswerBox";
import ComparisonTable from "@/components/blog/ComparisonTable";

const FoodTruckVsTraditionalCatering = () => {
  const comparisonRows = [
    { feature: "Interactive guest experience", foodTruck: true, traditional: false },
    { feature: "Fresh, made-to-order food", foodTruck: true, traditional: "partial" },
    { feature: "Lower cost per person", foodTruck: true, traditional: false },
    { feature: "Unique & memorable", foodTruck: true, traditional: false },
    { feature: "Dietary accommodations", foodTruck: true, traditional: true },
    { feature: "Formal plated service", foodTruck: false, traditional: true },
    { feature: "Indoor-only venues", foodTruck: false, traditional: true },
    { feature: "Minimal cleanup for host", foodTruck: true, traditional: true },
    { feature: "Entertainment value", foodTruck: true, traditional: false },
    { feature: "Flexible serving times", foodTruck: true, traditional: false },
  ];

  const pricingComparison = [
    { feature: "50 guests", foodTruck: "$750–$1,500", traditional: "$2,000–$4,000" },
    { feature: "100 guests", foodTruck: "$1,500–$3,000", traditional: "$4,000–$8,000" },
    { feature: "150 guests", foodTruck: "$2,250–$4,500", traditional: "$6,000–$12,000" },
    { feature: "200 guests", foodTruck: "$3,000–$6,000", traditional: "$8,000–$16,000" },
  ];

  return (
    <>
      <SEOHead
        title="Food Truck vs Traditional Catering: Which Is Better? [2025 Comparison]"
        description="Compare food truck catering to traditional catering. See side-by-side differences in cost, experience, and flexibility to choose the best option for your event."
        canonical="https://grillycheese.net/blog/food-truck-vs-traditional-catering"
        keywords="food truck vs catering, food truck or caterer, food truck catering comparison, traditional catering vs food truck"
      />
      <SEOSchema type="blog" title="Food Truck vs Traditional Catering" description="Complete comparison of food trucks and traditional catering" url="https://grillycheese.net/blog/food-truck-vs-traditional-catering" />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is food truck catering cheaper than traditional catering?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, food truck catering typically costs 30-50% less than traditional catering. Food trucks average $15-30 per person, while traditional caterers often charge $40-80 per person for comparable events."
                }
              },
              {
                "@type": "Question",
                "name": "Can food trucks accommodate dietary restrictions?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, most food trucks offer gluten-free, vegan, and vegetarian options. Reputable food truck caterers can accommodate allergies and dietary needs with advance notice."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Navigation />
        
        <article className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Link to="/blog" className="inline-flex items-center text-accent hover:text-accent/80 mb-8 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>

              <header className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Food Truck vs Traditional Catering: Which Is Right for Your Event?
                </h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    December 27, 2025
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    7 min read
                  </span>
                </div>
              </header>

              <QuickAnswerBox 
                answer="Food trucks are better for casual, interactive events and cost 30-50% less than traditional catering. Traditional caterers are better for formal, indoor-only events requiring plated service. Most weddings, corporate events, and parties benefit from food truck catering's unique experience and lower cost."
              />

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-muted-foreground mb-8">
                  Deciding between a food truck and traditional catering? This comprehensive comparison breaks down the key differences to help you make the right choice for your event.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  Food Truck vs Catering: Feature Comparison
                </h2>

                <ComparisonTable rows={comparisonRows} className="my-8" />

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
                  Is Food Truck Catering Cheaper Than Traditional Catering?
                </h2>
                <p className="text-muted-foreground mb-6">
                  <strong className="text-foreground">Yes, food truck catering typically costs 30-50% less than traditional catering.</strong> Food trucks average $15-30 per person, while traditional caterers often charge $40-80 per person for comparable service levels.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8 mb-4">
                  Cost Comparison by Guest Count
                </h3>

                <ComparisonTable 
                  rows={pricingComparison} 
                  headers={{ left: "Food Truck", right: "Traditional" }}
                  className="my-8" 
                />

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
                  When Should You Choose a Food Truck?
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-8">
                  <li><strong className="text-foreground">Outdoor venues:</strong> Backyards, farms, parks, or any outdoor space</li>
                  <li><strong className="text-foreground">Casual atmosphere:</strong> When you want guests mingling and having fun</li>
                  <li><strong className="text-foreground">Budget-conscious events:</strong> Get quality food at lower prices</li>
                  <li><strong className="text-foreground">Unique experiences:</strong> When you want something memorable and different</li>
                  <li><strong className="text-foreground">Late-night events:</strong> Perfect for after-parties and send-offs</li>
                </ul>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
                  When Should You Choose Traditional Catering?
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-8">
                  <li><strong className="text-foreground">Formal events:</strong> Black-tie galas, upscale corporate dinners</li>
                  <li><strong className="text-foreground">Indoor-only venues:</strong> Venues that don't accommodate food trucks</li>
                  <li><strong className="text-foreground">Plated service:</strong> When you need multi-course, seated meals</li>
                  <li><strong className="text-foreground">Very large events:</strong> 500+ guests may need multiple caterers</li>
                </ul>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
                  Can Food Trucks Handle Dietary Restrictions?
                </h2>
                <p className="text-muted-foreground mb-6">
                  <strong className="text-foreground">Yes, most professional food trucks accommodate dietary needs.</strong> At Grilly Cheese, we offer gluten-free bread, vegan cheese, and can prepare allergen-free options with advance notice. Always ask your food truck about specific accommodations.
                </p>
              </div>

              {/* CTA Section */}
              <div className="mt-16 p-8 bg-accent/10 rounded-xl border-2 border-accent/20 text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to Book a Food Truck?</h2>
                <p className="text-muted-foreground mb-6">
                  Experience the food truck difference at your next event
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                    <a href="/#contact">Get Your Free Quote</a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="tel:8444745591" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Call 844-474-5591
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>

        <Footer />
      </div>
    </>
  );
};

export default FoodTruckVsTraditionalCatering;
