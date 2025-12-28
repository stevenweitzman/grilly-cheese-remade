import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SEOSchema from "@/components/SEOSchema";
import BlogArticleSchema from "@/components/blog/BlogArticleSchema";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import QuickAnswerBox from "@/components/blog/QuickAnswerBox";
import NumberedSteps from "@/components/blog/NumberedSteps";
import HowToSchema from "@/components/blog/HowToSchema";

const HowToBookFoodTruck = () => {
  const bookingSteps = [
    {
      title: "Determine Your Guest Count and Event Date",
      description: "Calculate how many guests you expect and identify your preferred event date. Most food trucks book 2-6 months in advance for weddings and large events, so start early."
    },
    {
      title: "Research Food Trucks in Your Area",
      description: "Look for food trucks that specialize in your preferred cuisine and have experience with events similar to yours. Check reviews, social media, and ask for referrals."
    },
    {
      title: "Request Quotes from 2-3 Food Trucks",
      description: "Contact your top choices and request personalized quotes. Provide your event date, location, guest count, and any dietary requirements."
    },
    {
      title: "Review Menus and Pricing",
      description: "Compare per-person pricing, minimum charges, travel fees, and what's included. Ask about dietary accommodations like gluten-free and vegan options."
    },
    {
      title: "Ask About Logistics and Requirements",
      description: "Confirm power requirements, space needed, setup time, and any permits. Make sure your venue allows food trucks and has adequate access."
    },
    {
      title: "Book and Pay Your Deposit",
      description: "Once you've chosen your food truck, sign the contract and pay the deposit (typically 25-50%) to secure your date. Get everything in writing."
    },
    {
      title: "Finalize Details Before the Event",
      description: "Confirm final guest count, timeline, and menu selections 1-2 weeks before your event. Coordinate arrival time and contact information."
    }
  ];

  const schemaSteps = bookingSteps.map(step => ({
    name: step.title,
    text: step.description
  }));

  return (
    <>
      <SEOHead
        title="How to Book a Food Truck for Your Event [2025 Step-by-Step Guide]"
        description="Learn how to book a food truck for your wedding, corporate event, or party. Complete step-by-step guide with pricing, questions to ask, and booking tips."
        canonical="https://grillycheese.net/blog/how-to-book-a-food-truck"
        keywords="how to book a food truck, book food truck for event, food truck booking guide, hire food truck catering"
        ogType="article"
        articlePublishedTime="2025-12-26T10:00:00Z"
        articleModifiedTime="2025-12-28T10:00:00Z"
      />
      <SEOSchema type="blog" title="How to Book a Food Truck" description="Step-by-step guide to booking a food truck for your event" url="https://grillycheese.net/blog/how-to-book-a-food-truck" />

      <BlogArticleSchema
        headline="How to Book a Food Truck for Your Event [2025 Step-by-Step Guide]"
        description="Learn how to book a food truck for your wedding, corporate event, or party. Complete step-by-step guide with pricing, questions to ask, and booking tips."
        datePublished="2025-12-26"
        dateModified="2025-12-28"
        url="https://grillycheese.net/blog/how-to-book-a-food-truck"
      />
      
      <HowToSchema
        name="How to Book a Food Truck for Your Event"
        description="A complete 7-step guide to booking a food truck for weddings, corporate events, and private parties."
        steps={schemaSteps}
        totalTime="P14D"
        estimatedCost={{ currency: "USD", value: "1500-4000" }}
      />
      
      <HowToSchema
        name="How to Book a Food Truck for Your Event"
        description="A complete 7-step guide to booking a food truck for weddings, corporate events, and private parties."
        steps={schemaSteps}
        totalTime="P14D"
        estimatedCost={{ currency: "USD", value: "1500-4000" }}
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How far in advance should I book a food truck?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Book 2-6 months in advance for weddings and large events. Popular dates (weekends in spring/summer) book even earlier. For smaller events, 2-4 weeks may be sufficient."
                }
              },
              {
                "@type": "Question",
                "name": "What questions should I ask a food truck before booking?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ask about pricing structure, minimum charges, dietary accommodations, power requirements, setup time, cancellation policy, and what's included in the price."
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
                  How to Book a Food Truck for Your Event: Complete 7-Step Guide
                </h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    December 27, 2025
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    8 min read
                  </span>
                </div>
              </header>

              <div className="mb-10 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1567129937968-cdad8f07e2f8?w=1200&h=600&fit=crop" 
                  alt="People ordering from a food truck at an event"
                  className="w-full h-64 md:h-80 object-cover"
                  loading="eager"
                />
              </div>

              <QuickAnswerBox 
                answer="To book a food truck, determine your guest count and date, research vendors, request 2-3 quotes, compare pricing and menus, confirm logistics, pay a deposit, and finalize details 1-2 weeks before your event. Start 2-6 months ahead for best availability."
              />

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-muted-foreground mb-8">
                  Booking a food truck for your event doesn't have to be complicated. Whether you're planning a wedding, corporate event, or birthday party, this step-by-step guide will walk you through everything you need to know.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  How Do I Book a Food Truck? 7 Simple Steps
                </h2>

                <NumberedSteps steps={bookingSteps} className="my-8" />

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
                  How Far in Advance Should I Book a Food Truck?
                </h2>
                <p className="text-muted-foreground mb-6">
                  <strong className="text-foreground">Book 2-6 months in advance for weddings and large events.</strong> Popular dates like Saturday evenings in spring and summer book up quickly. For smaller, casual events, 2-4 weeks may be sufficient, but earlier is always better.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
                  What Questions Should I Ask Before Booking?
                </h2>
                <p className="text-muted-foreground mb-4">
                  The <a href="https://restaurant.org/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">National Restaurant Association</a> recommends asking these key questions:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-8">
                  <li>What is included in the per-person price?</li>
                  <li>Are there minimum guest counts or charges?</li>
                  <li>What dietary options do you offer (gluten-free, vegan)?</li>
                  <li>What are your power and space requirements?</li>
                  <li>How long does setup/breakdown take?</li>
                  <li>What is your cancellation and rain date policy?</li>
                  <li>Do you have liability insurance and <a href="https://www.fda.gov/food" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">FDA food safety</a> compliance?</li>
                  <li>What is the deposit amount and payment schedule?</li>
                </ul>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
                  How Much Does It Cost to Book a Food Truck?
                </h2>
                <p className="text-muted-foreground mb-6">
                  <strong className="text-foreground">Food truck catering typically costs $10-$35 per person</strong>, with total event costs ranging from $500 for small parties to $5,000+ for weddings. Factors affecting price include guest count, menu complexity, travel distance, and event duration.
                </p>
              </div>

              {/* CTA Section */}
              <div className="mt-16 p-8 bg-accent/10 rounded-xl border-2 border-accent/20 text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to Book Your Food Truck?</h2>
                <p className="text-muted-foreground mb-6">
                  Get a personalized quote for your event in minutes
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

export default HowToBookFoodTruck;
