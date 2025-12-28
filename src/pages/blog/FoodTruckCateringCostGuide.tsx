import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SEOSchema from "@/components/SEOSchema";
import BlogArticleSchema from "@/components/blog/BlogArticleSchema";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import QuickAnswerBox from "@/components/blog/QuickAnswerBox";
import PricingTable from "@/components/blog/PricingTable";

const FoodTruckCateringCostGuide = () => {
  const eventTypePricing = [
    { category: "Small Party (25-50 guests)", range: "$500–$1,500", perPerson: "$15–$30", notes: "May have minimum charge" },
    { category: "Medium Event (50-100 guests)", range: "$1,000–$3,000", perPerson: "$15–$30", notes: "Sweet spot for value" },
    { category: "Wedding (100-200 guests)", range: "$2,000–$6,000", perPerson: "$18–$35", notes: "Often includes extras" },
    { category: "Corporate Event (50-150)", range: "$1,500–$4,500", perPerson: "$20–$35", notes: "May include branding" },
    { category: "Large Festival (200+)", range: "$4,000–$10,000+", perPerson: "$15–$25", notes: "Volume discounts apply" },
  ];

  const cuisinePricing = [
    { category: "Grilled Cheese / Comfort", range: "$15–$25", perPerson: "per person" },
    { category: "Tacos / Mexican", range: "$12–$22", perPerson: "per person" },
    { category: "BBQ", range: "$18–$30", perPerson: "per person" },
    { category: "Pizza", range: "$10–$20", perPerson: "per person" },
    { category: "Gourmet Burgers", range: "$15–$28", perPerson: "per person" },
    { category: "Asian Fusion", range: "$18–$32", perPerson: "per person" },
  ];

  return (
    <>
      <SEOHead
        title="How Much Does Food Truck Catering Cost? [2025 Pricing Guide]"
        description="Food truck catering costs $15-35 per person on average. See complete pricing by event type, guest count, and cuisine with real examples and cost-saving tips."
        canonical="https://grillycheese.net/blog/food-truck-catering-cost"
        keywords="food truck catering cost, how much does food truck cost, food truck pricing, food truck rental cost"
        ogType="article"
        articlePublishedTime="2025-12-26T10:00:00Z"
        articleModifiedTime="2025-12-28T10:00:00Z"
      />
      <SEOSchema type="blog" title="Food Truck Catering Cost Guide" description="Complete pricing guide for food truck catering" url="https://grillycheese.net/blog/food-truck-catering-cost" />

      <BlogArticleSchema
        headline="How Much Does Food Truck Catering Cost? [2025 Pricing Guide]"
        description="Food truck catering costs $15-35 per person on average. See complete pricing by event type, guest count, and cuisine with real examples and cost-saving tips."
        datePublished="2025-12-26"
        dateModified="2025-12-28"
        url="https://grillycheese.net/blog/food-truck-catering-cost"
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How much does food truck catering cost per person?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Food truck catering typically costs $15-35 per person, depending on the cuisine type, menu complexity, and event requirements. Most food trucks charge between $18-25 per person for standard menus."
                }
              },
              {
                "@type": "Question",
                "name": "How much does it cost to hire a food truck for a wedding?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Food truck catering for a wedding typically costs $2,000-$6,000 for 100-200 guests, which works out to $18-35 per person. This is often 30-50% less than traditional wedding catering."
                }
              },
              {
                "@type": "Question",
                "name": "Do food trucks have minimum charges?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, most food trucks have minimum charges ranging from $500-$1,500 depending on the market and cuisine type. This covers their base operating costs regardless of guest count."
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
                  How Much Does Food Truck Catering Cost? Complete 2025 Pricing Guide
                </h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    December 27, 2025
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    10 min read
                  </span>
                </div>
              </header>

              <QuickAnswerBox 
                answer="Food truck catering costs $15-35 per person on average, with total event costs ranging from $500 for small parties to $6,000+ for large weddings. Factors affecting price include guest count, cuisine type, travel distance, and event duration. Most food trucks also charge a minimum fee of $500-$1,500."
              />

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-muted-foreground mb-8">
                  Planning an event and wondering about food truck costs? This comprehensive guide breaks down exactly what you'll pay, with real pricing examples and tips to maximize your budget.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  How Much Does Food Truck Catering Cost Per Person?
                </h2>
                <p className="text-muted-foreground mb-6">
                  <strong className="text-foreground">Food truck catering typically costs $15-35 per person</strong>, with most falling in the $18-25 range. The exact price depends on cuisine type, menu complexity, and what's included (drinks, sides, desserts).
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  Food Truck Pricing by Event Type
                </h2>

                <PricingTable 
                  rows={eventTypePricing}
                  className="my-8"
                />

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  Food Truck Pricing by Cuisine Type
                </h2>

                <PricingTable 
                  rows={cuisinePricing}
                  className="my-8"
                />

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
                  What Affects Food Truck Catering Prices?
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-8">
                  <li><strong className="text-foreground">Guest count:</strong> More guests = lower per-person cost due to economies of scale</li>
                  <li><strong className="text-foreground">Menu complexity:</strong> Gourmet options cost more than basic fare</li>
                  <li><strong className="text-foreground">Travel distance:</strong> Expect $1-3 per mile beyond the free radius (usually 25-50 miles)</li>
                  <li><strong className="text-foreground">Event duration:</strong> Standard is 2-3 hours; longer events cost more</li>
                  <li><strong className="text-foreground">Day of week:</strong> Weekends and peak season (May-October) may cost 10-20% more</li>
                  <li><strong className="text-foreground">Add-ons:</strong> Drinks, desserts, and premium toppings add to the total</li>
                </ul>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
                  Do Food Trucks Have Minimum Charges?
                </h2>
                <p className="text-muted-foreground mb-6">
                  <strong className="text-foreground">Yes, most food trucks have minimum charges ranging from $500-$1,500.</strong> This covers base operating costs including fuel, labor, and food prep time. For example, if the minimum is $800 and you have 30 guests at $20/person ($600), you'd pay the $800 minimum.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
                  How to Save Money on Food Truck Catering
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-8">
                  <li>Book for weekday events when possible</li>
                  <li>Choose food trucks located closer to your venue</li>
                  <li>Opt for simpler menus with fewer premium add-ons</li>
                  <li>Book during off-peak season (November-March)</li>
                  <li>Ask about package deals for larger events</li>
                  <li>Combine late-night service with main catering for discounts</li>
                </ul>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
                  Food Truck vs Traditional Catering Cost
                </h2>
                <p className="text-muted-foreground mb-6">
                  <strong className="text-foreground">Food trucks are typically 30-50% cheaper than traditional catering.</strong> A traditional caterer charging $50-80 per person for a wedding would cost $5,000-$8,000 for 100 guests. A food truck serving the same 100 guests costs $1,800-$3,000.
                </p>
              </div>

              {/* CTA Section */}
              <div className="mt-16 p-8 bg-accent/10 rounded-xl border-2 border-accent/20 text-center">
                <h2 className="text-2xl font-bold mb-4">Get an Instant Quote for Your Event</h2>
                <p className="text-muted-foreground mb-6">
                  Tell us about your event and get personalized pricing in minutes
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

        <RelatedArticles currentSlug="food-truck-catering-cost" category="Event Planning" />

        <Footer />
      </div>
    </>
  );
};

export default FoodTruckCateringCostGuide;
