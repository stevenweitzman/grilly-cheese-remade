import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { SEOImageGallerySchema } from "@/components/SEOImageSchema";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import StickyCTABar from "@/components/StickyCTABar";
import NewsletterSignup from "@/components/NewsletterSignup";
import { Helmet } from "react-helmet";

const BlogIndex = () => {
  const posts = [
    {
      title: "Perfect Grilled Cheese Secrets: Pro Tips from Food Truck Chefs",
      slug: "grilled-cheese-recipe-secrets",
      excerpt: "Learn the secrets to making the perfect grilled cheese sandwich from award-winning food truck chefs. Pro tips on bread, cheese, and technique.",
      date: "December 28, 2025",
      category: "Recipes",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&h=400&fit=crop"
    },
    {
      title: "5 Signature Grilled Cheese Sandwiches You Need to Try",
      slug: "signature-grilled-cheese-sandwiches",
      excerpt: "Discover our award-winning signature sandwiches: The Grilly Cheese, The Cluck Norris, and more favorites from NJ's top-rated food truck.",
      date: "December 28, 2025",
      category: "Recipes",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?w=600&h=400&fit=crop"
    },
    {
      title: "How Much Does Food Truck Catering Cost? [2025 Guide]",
      slug: "food-truck-catering-cost",
      excerpt: "Food truck catering costs $10-35 per person on average. See complete pricing by event type, guest count, and cuisine with real examples.",
      date: "December 27, 2025",
      category: "Event Planning",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=600&h=400&fit=crop"
    },
    {
      title: "How to Book a Food Truck for Your Event: 7-Step Guide",
      slug: "how-to-book-a-food-truck",
      excerpt: "Learn how to book a food truck in 7 simple steps. From finding the right vendor to finalizing your booking, this guide covers everything.",
      date: "December 27, 2025",
      category: "Food Truck Booking",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1567129937968-cdad8f07e2f8?w=600&h=400&fit=crop"
    },
    {
      title: "Food Truck vs Traditional Catering: Which Is Better?",
      slug: "food-truck-vs-traditional-catering",
      excerpt: "Compare food truck catering to traditional catering. See side-by-side differences in cost, experience, and flexibility for your event.",
      date: "December 27, 2025",
      category: "Event Planning",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop"
    },
    {
      title: "10 Best Late Night Wedding Food Ideas",
      slug: "late-night-wedding-food-ideas",
      excerpt: "Discover the best late night wedding food ideas that guests love. From gourmet grilled cheese to tacos, find the perfect snack for your reception.",
      date: "December 27, 2025",
      category: "Weddings",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop"
    },
    {
      title: "Food Truck Catering for Post-Reception Events",
      slug: "food-truck-catering-for-post-reception-events",
      excerpt: "Discover why food truck catering is the ideal solution for post-reception send-off food at weddings, bar mitzvahs, corporate events, and celebrations.",
      date: "December 24, 2025",
      category: "Event Planning",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1529543544277-750e2ea84be5?w=600&h=400&fit=crop"
    },
    {
      title: "Wedding Food Truck Catering in Bucks County, PA",
      slug: "wedding-food-truck-catering-bucks-county-pa",
      excerpt: "Wedding food truck catering in Bucks County has become an increasingly popular option for couples planning barn weddings, estate weddings, and outdoor receptions throughout the area.",
      date: "December 23, 2025",
      category: "Weddings",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop"
    },
    {
      title: "Wedding Food Truck Catering in Philadelphia",
      slug: "wedding-food-truck-catering-philadelphia",
      excerpt: "Wedding food truck catering in Philadelphia has become one of the most popular alternatives to traditional wedding catering. Learn about venue requirements, guest capacity, and late-night options.",
      date: "December 23, 2025",
      category: "Weddings",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop"
    },
    {
      title: "How to Book a Grilled Cheese Food Truck for Any Event",
      slug: "how-to-book-a-grilled-cheese-food-truck-for-any-event",
      excerpt: "Complete guide to booking a grilled cheese food truck for weddings, corporate events, and parties. Learn about pricing, menus, and what to ask before you book.",
      date: "December 20, 2025",
      category: "Event Planning",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&h=400&fit=crop"
    },
    {
      title: "How Much Does It Cost To Book A Food Truck? (2025 Guide)",
      slug: "how-much-does-it-cost-to-book-a-food-truck",
      excerpt: "Get clear per-person pricing, average food truck rental costs, and real examples by cuisine type for catered events. Complete breakdown of what affects food truck pricing.",
      date: "January 15, 2025",
      category: "Event Planning",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop"
    },
    {
      title: "The Ultimate Guide to Booking Food Trucks in New Jersey",
      slug: "booking-food-trucks-in-new-jersey",
      excerpt: "Everything you need to know about booking food trucks for your NJ event: permits, regulations, logistics, and how to choose the perfect vendor.",
      date: "September 13, 2023",
      category: "Food Truck Booking",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&h=400&fit=crop"
    },
    {
      title: "Ultimate Guide to Food Truck Catering in New Jersey [2025]",
      slug: "food-truck-catering-nj-guide",
      excerpt: "Everything you need to know about booking a food truck for your NJ event: costs, logistics, best practices, and insider tips.",
      date: "January 15, 2025",
      category: "Event Planning",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=600&h=400&fit=crop"
    },
    {
      title: "Elevating Corporate Events: The Advantages of Hiring a Food Truck",
      slug: "corporate-event-advantages",
      excerpt: "Discover how food trucks can transform your corporate events with unique benefits, branding opportunities, and memorable experiences.",
      date: "June 28, 2023",
      category: "Corporate",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop"
    },
    {
      title: "What Are the Costs for Booking A Food Truck?",
      slug: "food-truck-costs",
      excerpt: "Understand all the costs involved in booking a food truck: base costs, travel fees, service charges, and more for transparent event budgeting.",
      date: "March 27, 2023",
      category: "Event Planning",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop"
    },
    {
      title: "Food Trucks vs. Full-service Catering",
      slug: "food-trucks-vs-catering",
      excerpt: "Compare food trucks to traditional catering and discover why food trucks are becoming the preferred choice for events of all types.",
      date: "March 27, 2023",
      category: "Event Planning",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop"
    },
    {
      title: "Questions to Ask When Booking A Food Truck",
      slug: "questions-to-ask",
      excerpt: "Essential questions to ask before booking a food truck for your event. Make sure you cover all bases and choose the perfect vendor.",
      date: "March 27, 2023",
      category: "Food Truck Booking",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&h=400&fit=crop"
    }
  ];

  // Image gallery for SEO
  const blogImages = posts.slice(0, 12).map(post => ({
    url: post.image.replace('w=600&h=400', 'w=1200&h=800'),
    width: 1200,
    height: 800,
    alt: post.title,
    caption: post.excerpt,
    name: post.title
  }));

  return (
    <>
      <SEOHead
        title="Grilly Cheese Blog | Food Truck Catering Tips & Event Planning Guides"
        description="Expert advice on food truck catering, event planning, menu guides, and behind-the-scenes stories. Learn from NJ's top-rated food truck catering service."
        canonical="https://grillycheese.net/blog"
        keywords="food truck catering blog, event planning tips, wedding catering advice, corporate event planning"
        ogImageWidth={1200}
        ogImageHeight={630}
      />
      <SEOImageGallerySchema 
        images={blogImages}
        name="Grilly Cheese Blog Article Gallery"
        description="Food truck catering tips and event planning guides from NJ's top-rated food truck"
      />
      
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Grilly Cheese Blog",
            "description": "Expert advice on food truck catering, event planning, and menu guides",
            "url": "https://grillycheese.net/blog",
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": posts.length,
              "itemListElement": posts.map((post, index) => ({
                "@type": "BlogPosting",
                "position": index + 1,
                "headline": post.title,
                "description": post.excerpt,
                "url": `https://grillycheese.net/blog/${post.slug}`,
                "image": {
                  "@type": "ImageObject",
                  "url": post.image.replace('w=600&h=400', 'w=1200&h=800'),
                  "width": 1200,
                  "height": 800
                },
                "datePublished": post.date,
                "author": {
                  "@type": "Organization",
                  "name": "Grilly Cheese"
                }
              }))
            }
          })}
        </script>
      </Helmet>
      
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
                    <Link to={`/blog/${post.slug}`} className="block">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={`${post.title} - ${post.category} article`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          width={600}
                          height={400}
                          loading="lazy"
                        />
                      </div>
                    </Link>
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
                      
                      <Link to={`/blog/${post.slug}`}>
                        <h2 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                          {post.title}
                        </h2>
                      </Link>
                      
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
                {["Event Planning", "Food Truck Booking", "Corporate", "Weddings"].map((category, i) => (
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

        {/* Newsletter Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <NewsletterSignup source="blog" />
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