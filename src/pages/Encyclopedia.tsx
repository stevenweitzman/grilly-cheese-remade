import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SEOSchema from "@/components/SEOSchema";
import TableOfContents from "@/components/encyclopedia/TableOfContents";
import SearchBar from "@/components/encyclopedia/SearchBar";
import BackToTop from "@/components/encyclopedia/BackToTop";
import CalloutBox from "@/components/encyclopedia/CalloutBox";
import SandwichCard from "@/components/encyclopedia/SandwichCard";
import CheeseGuideTable from "@/components/encyclopedia/CheeseGuideTable";
import BreadGuideTable from "@/components/encyclopedia/BreadGuideTable";
import CookingMethodCard from "@/components/encyclopedia/CookingMethodCard";
import BuildYourOwn from "@/components/encyclopedia/BuildYourOwn";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChefHat, BookOpen } from "lucide-react";
import {
  historyTimeline,
  regionalSandwiches,
  internationalSandwiches,
  cookingMethods,
  proTips,
  didYouKnow,
  troubleshooting,
} from "@/data/encyclopediaData";

const Encyclopedia = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SEOHead
        title="Grilled Cheese Encyclopedia | Complete Guide to Melted Cheese Sandwiches"
        description="The ultimate guide to grilled cheese sandwiches. Learn about history, regional variations, cheese selection, cooking techniques, and build your own custom creation."
        canonical="https://grillycheese.net/encyclopedia"
        keywords="grilled cheese guide, cheese sandwich types, melted cheese sandwiches, grilled cheese history, cheese selection guide, bread for grilled cheese"
      />
      <SEOSchema type="service" serviceName="Grilled Cheese Encyclopedia" />

      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="text-sm">
              <BookOpen className="h-3 w-3 mr-1" />
              Complete Reference Guide
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              The Grilled Cheese Encyclopedia
            </h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about grilled cheese and melted cheese sandwiches from around the world.
            </p>
            <SearchBar onResultClick={scrollToSection} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-8">
          <TableOfContents activeSection={activeSection} onSectionClick={scrollToSection} />

          <main className="flex-1 min-w-0 space-y-16">
            {/* Introduction */}
            <section id="introduction" className="scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The grilled cheese sandwich represents one of the world's most beloved and versatile comfort foods. What began as a simple combination of bread and melted cheese has evolved into an international phenomenon with countless regional variations and gourmet interpretations.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This encyclopedia covers the history, regional variations, cooking techniques, and creative possibilities of grilled cheese and other melted cheese sandwiches from around the globe.
              </p>
              <CalloutBox type="didYouKnow">
                {didYouKnow[Math.floor(Math.random() * didYouKnow.length)]}
              </CalloutBox>
            </section>

            {/* History */}
            <section id="history" className="scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6">History & Origins</h2>
              <div className="space-y-4">
                {historyTimeline.map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <Badge variant="outline" className="shrink-0 mt-1">{item.year}</Badge>
                    <p className="text-muted-foreground">{item.event}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* American Classic */}
            <section id="american-classic" className="scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6">The American Classic</h2>
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Traditional Recipe</h3>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• 2 slices white or wheat bread</li>
                    <li>• 1-2 slices processed American cheese</li>
                    <li>• 1-2 tablespoons butter</li>
                    <li>• Salt and pepper to taste</li>
                  </ul>
                </CardContent>
              </Card>
              <CalloutBox type="tip" title="Why American Cheese?">
                Processed American cheese was revolutionary because it melts uniformly, remains creamy when heated, and is affordable — creating the quintessential gooey texture we love.
              </CalloutBox>
            </section>

            {/* Regional Sandwiches */}
            <section id="regional" className="scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6">Regional Sandwiches</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {regionalSandwiches.map((sandwich) => (
                  <SandwichCard key={sandwich.name} sandwich={sandwich} />
                ))}
              </div>
            </section>

            {/* Gourmet */}
            <section id="gourmet" className="scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6">Gourmet Variations</h2>
              <p className="text-muted-foreground mb-4">
                Modern gourmet grilled cheese elevates the classic by using artisanal breads, premium cheeses, and complementary ingredients like caramelized onions, truffle butter, and fig jam.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {proTips.map((tip, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <h4 className="font-semibold text-sm mb-1">{tip.title}</h4>
                      <p className="text-sm text-muted-foreground">{tip.tip}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Cheese Guide */}
            <section id="cheese-guide" className="scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6">Cheese Selection Guide</h2>
              <CheeseGuideTable />
            </section>

            {/* Bread Guide */}
            <section id="bread-guide" className="scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6">Bread Selection Guide</h2>
              <BreadGuideTable />
            </section>

            {/* Cooking Methods */}
            <section id="cooking-methods" className="scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6">Cooking Methods</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {cookingMethods.map((method) => (
                  <CookingMethodCard key={method.name} method={method} />
                ))}
              </div>
            </section>

            {/* Ingredient Matrix */}
            <section id="ingredient-matrix" className="scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6">Ingredient Matrix</h2>
              <p className="text-muted-foreground mb-6">
                Create your perfect combination by selecting ingredients from each category. Head to the Build Your Own section to try the interactive tool!
              </p>
              <CalloutBox type="warning" title="Troubleshooting">
                <ul className="space-y-2 mt-2">
                  {troubleshooting.slice(0, 3).map((item, i) => (
                    <li key={i}><strong>{item.problem}:</strong> {item.solutions[0]}</li>
                  ))}
                </ul>
              </CalloutBox>
            </section>

            {/* International */}
            <section id="international" className="scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6">International Sandwiches</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {internationalSandwiches.map((sandwich) => (
                  <SandwichCard key={sandwich.name} sandwich={sandwich} />
                ))}
              </div>
            </section>

            {/* Build Your Own */}
            <section id="build-your-own" className="scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6">Build Your Own Grilled Cheese</h2>
              <p className="text-muted-foreground mb-6">
                Use the interactive tool below to create your perfect grilled cheese combination. Select ingredients, see your sandwich stack, and get custom cooking instructions!
              </p>
              <BuildYourOwn />
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 text-center">
              <ChefHat className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-2">Ready for the Real Thing?</h3>
              <p className="text-muted-foreground mb-6">
                Let Grilly Cheese bring award-winning grilled cheese to your next event!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link to="/#contact">
                    <Calendar className="h-4 w-4 mr-2" />
                    Get a Free Quote
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/order/drop-off">Order Catering</Link>
                </Button>
              </div>
            </section>
          </main>
        </div>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
};

export default Encyclopedia;
