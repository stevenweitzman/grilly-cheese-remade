import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import StickyCTABar from "@/components/StickyCTABar";

const BlogIndex = () => {
  const posts = [
    {
      title: "Ultimate Guide to Food Truck Catering in New Jersey [2025]",
      slug: "food-truck-catering-nj-guide",
      excerpt: "Everything you need to know about booking a food truck for your NJ event: costs, logistics, best practices, and insider tips.",
      date: "January 15, 2025",
      category: "Event Planning",
      readTime: "12 min read"
    },
    {
      title: "10 Reasons Food Trucks Are Perfect for Weddings (+ Real Examples)",
      slug: "food-trucks-perfect-for-weddings",
      excerpt: "Discover why couples are choosing food trucks over traditional catering, with real wedding examples and photos.",
      date: "January 10, 2025",
      category: "Weddings",
      readTime: "8 min read"
    },
    {
      title: "How Much Does Food Truck Catering Cost? [Complete Price Guide 2025]",
      slug: "food-truck-catering-cost-guide",
      excerpt: "Transparent pricing breakdown for food truck catering: what affects costs, average prices, and how to budget for your event.",
      date: "January 5, 2025",
      category: "Event Planning",
      readTime: "10 min read"
    }
  ];

  return (
    <>
      <SEOHead
        title="Grilly Cheese Blog | Food Truck Catering Tips & Event Planning Guides"
        description="Expert advice on food truck catering, event planning, menu guides, and behind-the-scenes stories. Learn from NJ's top-rated food truck catering service."
        canonical="https://grillycheese.net/blog"
        keywords="food truck catering blog, event planning tips, wedding catering advice, corporate event planning"
      />
      
      <div className="min-h-screen">
        <Navigation />
        <StickyCTABar />

        {/* Hero Section */}
        <section className="pt-32 pb-12 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Food Truck Catering Blog
              </h1>
              
              <p className="text-xl text-muted-foreground">
                Expert tips, event planning guides, and insider stories from New Jersey&apos;s top-rated food truck catering service
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, i) => (
                  <article key={i} className="bg-card border-2 border-border rounded-xl overflow-hidden hover:shadow-warm transition-all hover:-translate-y-1 group">
                    <div className="h-48 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                      <span className="text-6xl">🧀</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="bg-accent/10 px-3 py-1 rounded-full text-accent font-semibold">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {post.date}
                        </span>
                      </div>
                      
                      <h2 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{post.readTime}</span>
                        <Link 
                          to={`/blog/${post.slug}`}
                          className="text-accent font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                        >
                          Read More
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">Browse by Category</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Event Planning", "Weddings", "Corporate", "Menu Guides"].map((category, i) => (
                  <Button 
                    key={i}
                    variant="outline" 
                    className="h-auto py-4 text-center"
                    asChild
                  >
                    <Link to={`/blog?category=${category.toLowerCase()}`}>
                      {category}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-accent/10 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Book Your Event?
            </h2>
            <p className="text-muted-foreground mb-8">
              Let&apos;s discuss your catering needs
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
              <a href="/#contact">Get Your Quote</a>
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default BlogIndex;
