import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
}

// All blog posts for matching
const allPosts: BlogPost[] = [
  {
    title: "How Much Does Food Truck Catering Cost? [2025 Guide]",
    slug: "food-truck-catering-cost",
    excerpt: "Food truck catering costs $15-35 per person on average. See complete pricing by event type, guest count, and cuisine with real examples.",
    date: "December 27, 2025",
    category: "Event Planning",
    readTime: "10 min read"
  },
  {
    title: "How to Book a Food Truck for Your Event: 7-Step Guide",
    slug: "how-to-book-a-food-truck",
    excerpt: "Learn how to book a food truck in 7 simple steps. From finding the right vendor to finalizing your booking, this guide covers everything.",
    date: "December 27, 2025",
    category: "Food Truck Booking",
    readTime: "8 min read"
  },
  {
    title: "Food Truck vs Traditional Catering: Which Is Better?",
    slug: "food-truck-vs-traditional-catering",
    excerpt: "Compare food truck catering to traditional catering. See side-by-side differences in cost, experience, and flexibility for your event.",
    date: "December 27, 2025",
    category: "Event Planning",
    readTime: "7 min read"
  },
  {
    title: "10 Best Late Night Wedding Food Ideas",
    slug: "late-night-wedding-food-ideas",
    excerpt: "Discover the best late night wedding food ideas that guests love. From gourmet grilled cheese to tacos, find the perfect snack for your reception.",
    date: "December 27, 2025",
    category: "Weddings",
    readTime: "6 min read"
  },
  {
    title: "Food Truck Catering for Post-Reception Events",
    slug: "food-truck-catering-for-post-reception-events",
    excerpt: "Discover why food truck catering is the ideal solution for post-reception send-off food at weddings, bar mitzvahs, and celebrations.",
    date: "December 24, 2025",
    category: "Event Planning",
    readTime: "8 min read"
  },
  {
    title: "Wedding Food Truck Catering in Bucks County, PA",
    slug: "wedding-food-truck-catering-bucks-county-pa",
    excerpt: "Wedding food truck catering in Bucks County has become an increasingly popular option for couples planning barn and estate weddings.",
    date: "December 23, 2025",
    category: "Weddings",
    readTime: "5 min read"
  },
  {
    title: "Wedding Food Truck Catering in Philadelphia",
    slug: "wedding-food-truck-catering-philadelphia",
    excerpt: "Wedding food truck catering in Philadelphia has become one of the most popular alternatives to traditional wedding catering.",
    date: "December 23, 2025",
    category: "Weddings",
    readTime: "8 min read"
  },
  {
    title: "How to Book a Grilled Cheese Food Truck for Any Event",
    slug: "how-to-book-a-grilled-cheese-food-truck-for-any-event",
    excerpt: "Complete guide to booking a grilled cheese food truck for weddings, corporate events, and parties.",
    date: "December 20, 2025",
    category: "Event Planning",
    readTime: "10 min read"
  },
  {
    title: "How Much Does It Cost To Book A Food Truck? (2025 Guide)",
    slug: "how-much-does-it-cost-to-book-a-food-truck",
    excerpt: "Get clear per-person pricing, average food truck rental costs, and real examples by cuisine type for catered events.",
    date: "January 15, 2025",
    category: "Event Planning",
    readTime: "12 min read"
  },
  {
    title: "The Ultimate Guide to Booking Food Trucks in New Jersey",
    slug: "booking-food-trucks-in-new-jersey",
    excerpt: "Everything you need to know about booking food trucks for your NJ event: permits, regulations, logistics, and how to choose the perfect vendor.",
    date: "September 13, 2023",
    category: "Food Truck Booking",
    readTime: "10 min read"
  },
  {
    title: "Ultimate Guide to Food Truck Catering in New Jersey [2025]",
    slug: "food-truck-catering-nj-guide",
    excerpt: "Everything you need to know about booking a food truck for your NJ event: costs, logistics, best practices, and insider tips.",
    date: "January 15, 2025",
    category: "Event Planning",
    readTime: "12 min read"
  },
  {
    title: "Elevating Corporate Events: The Advantages of Hiring a Food Truck",
    slug: "corporate-event-advantages",
    excerpt: "Discover how food trucks can transform your corporate events with unique benefits, branding opportunities, and memorable experiences.",
    date: "June 28, 2023",
    category: "Corporate",
    readTime: "8 min read"
  },
  {
    title: "What Are the Costs for Booking A Food Truck?",
    slug: "food-truck-costs",
    excerpt: "Understand all the costs involved in booking a food truck: base costs, travel fees, service charges, and more for transparent event budgeting.",
    date: "March 27, 2023",
    category: "Event Planning",
    readTime: "6 min read"
  },
  {
    title: "Food Trucks vs. Full-service Catering",
    slug: "food-trucks-vs-catering",
    excerpt: "Compare food trucks to traditional catering and discover why food trucks are becoming the preferred choice for events.",
    date: "March 27, 2023",
    category: "Event Planning",
    readTime: "7 min read"
  },
  {
    title: "Questions to Ask When Booking A Food Truck",
    slug: "questions-to-ask",
    excerpt: "Essential questions to ask before booking a food truck for your event. Make sure you cover all bases and choose the perfect vendor.",
    date: "March 27, 2023",
    category: "Food Truck Booking",
    readTime: "5 min read"
  }
];

interface RelatedArticlesProps {
  currentSlug: string;
  category: string;
  maxArticles?: number;
}

const RelatedArticles = ({ currentSlug, category, maxArticles = 3 }: RelatedArticlesProps) => {
  // Get related articles: prioritize same category, then fill with other posts
  const getRelatedArticles = (): BlogPost[] => {
    const otherPosts = allPosts.filter(post => post.slug !== currentSlug);
    
    // First get posts from same category
    const sameCategoryPosts = otherPosts.filter(post => post.category === category);
    
    // Then get posts from other categories
    const otherCategoryPosts = otherPosts.filter(post => post.category !== category);
    
    // Combine: prioritize same category, fill with others
    const combined = [...sameCategoryPosts, ...otherCategoryPosts];
    
    return combined.slice(0, maxArticles);
  };

  const relatedPosts = getRelatedArticles();

  if (relatedPosts.length === 0) return null;

  return (
    <section className="py-12 bg-muted/20 mt-12 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-16 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
          Related Articles
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {relatedPosts.map((post, i) => (
            <article 
              key={i} 
              className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 group"
            >
              <div className="h-32 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                <span className="text-4xl">🧀</span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <span className="bg-accent/10 px-2 py-0.5 rounded-full text-accent font-semibold">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                </div>
                
                <Link to={`/blog/${post.slug}`}>
                  <h3 className="font-bold text-sm mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                
                <Link 
                  to={`/blog/${post.slug}`}
                  className="text-accent text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Read More
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;
