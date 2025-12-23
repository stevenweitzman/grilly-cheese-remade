import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SEOSchema from "@/components/SEOSchema";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const WeddingFoodTruckPhiladelphia = () => {
  return (
    <>
      <SEOHead
        title="Wedding Food Truck Catering in Philadelphia | Grilly Cheese"
        description="Wedding food truck catering in Philadelphia. Grilled cheese food truck service for Philadelphia weddings, late-night receptions, and venues across the city."
        canonical="https://grillycheese.net/blog/wedding-food-truck-catering-philadelphia"
        keywords="wedding food truck catering Philadelphia, food truck wedding Philadelphia, Philadelphia wedding food truck, late night wedding food truck Philadelphia, food truck catering for weddings Philadelphia"
        ogType="article"
        articlePublishedTime="2025-12-23T10:00:00Z"
        articleModifiedTime="2025-12-23T10:00:00Z"
      />
      
      <SEOSchema
        type="blog"
        title="Wedding Food Truck Catering in Philadelphia"
        description="Wedding food truck catering in Philadelphia. Grilled cheese food truck service for Philadelphia weddings, late-night receptions, and venues across the city."
        url="https://grillycheese.net/blog/wedding-food-truck-catering-philadelphia"
      />

      {/* BlogPosting Schema */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Wedding Food Truck Catering in Philadelphia",
            "author": {
              "@type": "Organization",
              "name": "Grilly Cheese"
            },
            "datePublished": "2025-12-23",
            "image": "https://www.grillycheese.net/images/wedding-food-truck-philadelphia.jpg",
            "publisher": {
              "@type": "Organization",
              "name": "Grilly Cheese",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.grillycheese.net/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.grillycheese.net/blog/wedding-food-truck-catering-philadelphia"
            }
          })}
        </script>
      </Helmet>

      {/* FAQPage Schema */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is food truck catering allowed at wedding venues in Philadelphia?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Many wedding venues in Philadelphia allow food truck catering, especially outdoor venues, warehouses, loft spaces, waterfront locations, and private event properties. Some venues require vendor approval or proof of insurance."
                }
              },
              {
                "@type": "Question",
                "name": "How many guests can a grilled cheese food truck serve at a Philadelphia wedding?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most grilled cheese food trucks can comfortably serve between 50 and 200 guests during a standard service window. Larger weddings can be accommodated with extended service time or additional staffing."
                }
              },
              {
                "@type": "Question",
                "name": "Is a grilled cheese food truck a good option for late-night wedding food in Philadelphia?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Grilled cheese food trucks are one of the most popular late-night wedding food options in Philadelphia because they serve hot, comforting food quickly after dancing and drinks."
                }
              },
              {
                "@type": "Question",
                "name": "How far in advance should we book a wedding food truck in Philadelphia?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For peak wedding season dates, couples should book a wedding food truck in Philadelphia 3 to 6 months in advance. Popular Saturdays often book earlier."
                }
              },
              {
                "@type": "Question",
                "name": "Can a grilled cheese food truck accommodate vegetarian or vegan wedding guests?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Grilled cheese food truck menus typically include vegetarian options and can accommodate vegan, dairy-free, and gluten-friendly requests with advance notice."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all mb-8 group"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="font-semibold">Back to Blog</span>
              </Link>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Wedding Food Truck Catering in Philadelphia
              </h1>

              <div className="flex flex-wrap gap-4 text-muted-foreground mb-8">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  5 min read
                </span>
                <span>•</span>
                <span>December 23, 2025</span>
                <span>•</span>
                <span className="bg-accent/10 px-3 py-1 rounded-full text-accent font-semibold">
                  Philadelphia Weddings
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              
              {/* Intro */}
              <section className="mb-12">
                <p className="text-lg text-foreground mb-6">
                  Wedding food truck catering in Philadelphia has become one of the most popular alternatives to traditional wedding catering. Couples planning weddings in the city are looking for catering that feels memorable, flexible, and guest-approved without the formality or cost of banquet-style service.
                </p>

                <p className="text-lg text-foreground mb-6">
                  A grilled cheese food truck fits Philadelphia weddings especially well. It provides hot, comforting food that can be served efficiently in urban venues, outdoor spaces, and non-traditional locations throughout the city.
                </p>
              </section>

              {/* Section 1 */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Is Food Truck Catering Allowed at Wedding Venues in Philadelphia?
                </h2>
                
                <p className="text-foreground mb-6">
                  Yes. Many wedding venues in Philadelphia allow food truck catering, particularly outdoor venues, warehouses, industrial spaces, museums, waterfront locations, and private event properties.
                </p>

                <p className="text-foreground">
                  Some venues require vendor approval, proof of insurance, or coordination with city access rules. Professional food truck caterers are accustomed to working within Philadelphia venue requirements and provide all necessary documentation during the booking process.
                </p>
              </section>

              {/* Section 2 */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  How Many Guests Can a Grilled Cheese Food Truck Serve at a Philadelphia Wedding?
                </h2>
                
                <p className="text-foreground mb-6">
                  Most grilled cheese food trucks can comfortably serve between 50 and 200 wedding guests during a standard service window. Menus are intentionally designed for high-volume service to keep lines moving and guests served quickly.
                </p>

                <p className="text-foreground">
                  For larger Philadelphia weddings, service can be adjusted through extended service time, additional staffing, or simplified menu options to ensure smooth execution without long wait times.
                </p>
              </section>

              {/* Section 3 */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Is a Grilled Cheese Food Truck a Good Option for Late-Night Wedding Food in Philadelphia?
                </h2>
                
                <p className="text-foreground mb-6">
                  Yes. Grilled cheese food trucks are one of the most popular late-night wedding food options in Philadelphia. After dancing and drinks, guests appreciate hot, comforting food that can be served quickly and enjoyed without formal seating.
                </p>

                <p className="text-foreground">
                  Late-night food truck service typically takes place after the main reception and has become a staple at Philadelphia weddings held in urban venues, loft spaces, and waterfront locations.
                </p>
              </section>

              {/* Section 4 */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  How Far in Advance Should You Book a Wedding Food Truck in Philadelphia?
                </h2>
                
                <p className="text-foreground mb-6">
                  For peak wedding season dates, couples should <Link to="/" className="text-accent hover:underline">book a wedding food truck</Link> in Philadelphia 3 to 6 months in advance. Popular spring, summer, and fall Saturdays often book earlier, especially for late-night service.
                </p>

                <p className="text-foreground">
                  Booking early allows time for venue approval, city logistics coordination, menu selection, and final service planning.
                </p>
              </section>

              {/* Section 5 */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Can a Grilled Cheese Food Truck Accommodate Vegetarian or Vegan Wedding Guests?
                </h2>
                
                <p className="text-foreground mb-6">
                  Yes. Most grilled cheese food truck menus include vegetarian options and can accommodate vegan, dairy-free, and gluten-friendly requests with advance notice.
                </p>

                <p className="text-foreground">
                  Because the menu is streamlined, dietary accommodations are handled efficiently without slowing service or complicating logistics, making this catering style ideal for weddings with diverse guest lists.
                </p>
              </section>

              {/* Section 6 */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Why Philadelphia Wedding Guests Remember Food Truck Catering
                </h2>
                
                <p className="text-foreground mb-6">
                  Philadelphia wedding guests remember experiences, not just meals. A grilled cheese food truck provides made-to-order food, visible cooking, and a natural gathering point during the reception.
                </p>

                <p className="text-foreground">
                  For city weddings, the food truck becomes part of the atmosphere. Guests interact, socialize, and enjoy a relaxed dining experience that feels intentional rather than generic.
                </p>

                <p className="text-foreground mt-6">
                  Learn more about <Link to="/blog/wedding-food-truck-catering-nj-philadelphia-bucks-county" className="text-accent hover:underline">wedding food truck catering</Link> options for your special day.
                </p>
              </section>

              {/* CTA Section */}
              <section className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl p-8 my-12 border-2 border-accent/20">
                <h2 className="text-2xl font-bold text-foreground mb-4 text-center">
                  Ready to Book a Wedding Food Truck in Philadelphia?
                </h2>
                <p className="text-foreground text-center mb-6">
                  Get a personalized quote for your Philadelphia wedding. Our team handles venue coordination, menu planning, and day-of service.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/">
                    <Button size="lg" className="bg-accent hover:bg-accent/90 text-background font-bold">
                      Get a Free Quote
                    </Button>
                  </Link>
                  <a href="tel:844-474-5591">
                    <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10">
                      <Phone className="h-4 w-4 mr-2" />
                      Call 844-474-5591
                    </Button>
                  </a>
                </div>
              </section>

            </div>
          </div>
        </article>

        <Footer />
      </div>
    </>
  );
};

export default WeddingFoodTruckPhiladelphia;
