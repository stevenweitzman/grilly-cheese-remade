import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SEOSchema from "@/components/SEOSchema";
import BlogArticleSchema from "@/components/blog/BlogArticleSchema";
import { Button } from "@/components/ui/button";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import QuickAnswerBox from "@/components/blog/QuickAnswerBox";

const QuestionsToAsk = () => {
  return (
    <>
      <SEOHead
        title="Questions to Ask When Booking A Food Truck | Grilly Cheese"
        description="Essential questions to ask before booking a food truck for your event. Make sure you cover all bases and choose the perfect vendor."
        canonical="https://grillycheese.net/blog/questions-to-ask"
        keywords="food truck questions, booking checklist, event planning, food truck vendor questions"
        ogType="article"
        articlePublishedTime="2023-07-20T10:00:00Z"
        articleModifiedTime="2025-12-28T10:00:00Z"
      />
      <SEOSchema 
        type="blog" 
        title="Questions to Ask When Booking A Food Truck"
        url="https://grillycheese.net/blog/questions-to-ask"
      />
      <BlogArticleSchema
        headline="Questions to Ask When Booking A Food Truck"
        description="Essential questions to ask before booking a food truck for your event. Make sure you cover all bases and choose the perfect vendor."
        datePublished="2023-07-20"
        dateModified="2025-12-28"
        url="https://grillycheese.net/blog/questions-to-ask"
      />
      
      <div className="min-h-screen">
        <Navigation />

        <article className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <Link to="/blog" className="inline-flex items-center text-accent hover:underline mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>

            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <span className="text-sm text-muted-foreground">March 27, 2023</span>
                <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                  What Should I Ask When Booking a Food Truck for My Event?
                </h1>
                <p className="text-xl text-muted-foreground">
                  Your comprehensive checklist for vetting food truck vendors
                </p>
              </div>

              <div className="prose prose-lg max-w-none">
                <QuickAnswerBox 
                  answer="Ask about: menu options and pricing, minimum/maximum guest counts, availability for your date, deposit and cancellation policies, equipment requirements, dietary accommodations, and references from previous events."
                />

                <p className="text-lg">
                  When <strong>booking a food truck</strong>, here are some important <strong>questions you should ask</strong>:
                </p>

                <div className="grid gap-4 my-8">
                  {[
                    "What is the menu of the food truck?",
                    "What is the price range of the food truck's menu?",
                    "What is the minimum and maximum number of guests the food truck can serve?",
                    "What type of cuisine does the food truck specialize in?",
                    "Is the food truck available on the date and time of your event?",
                    "What is the cost of booking the food truck?",
                    "Does the food truck require a deposit, and if so, how much?",
                    "Will the food truck be able to provide service at your event location?",
                    "Does the food truck provide tables, chairs, or any other equipment for the event?",
                    "What is the cancellation policy for the food truck?"
                  ].map((question, index) => (
                    <div key={index} className="bg-card border border-border rounded-lg p-6 flex items-start gap-4">
                      <HelpCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-lg mb-0">
                          {String(index + 1).padStart(2, '0')}. {question}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-lg">
                  These questions will help you understand the food truck's availability, services, and pricing, ensuring that you have all the information you need to make an informed decision for your event. For more details, see our guide on <Link to="/blog/how-to-book-a-grilled-cheese-food-truck-for-any-event" className="text-accent hover:underline">how to book a food truck for events</Link>.
                </p>

                <img 
                  src="https://www.grillycheese.net/wp-content/uploads/2018/07/clyde-scaled.jpg"
                  alt="Grilly Cheese food truck at an event"
                  className="w-full rounded-lg my-8"
                />

                <div className="bg-accent/10 border-l-4 border-accent p-6 my-8">
                  <h3 className="text-xl font-bold mb-3">Pro Tip</h3>
                  <p className="mb-0">
                    Don't hesitate to ask for references or photos from previous events. A reputable food truck vendor will be happy to share their portfolio and customer testimonials. Planning a wedding? Check out <Link to="/blog/wedding-food-truck-catering-philadelphia" className="text-accent hover:underline">wedding food truck catering Philadelphia</Link> or explore <Link to="/blog/food-truck-catering-nj-guide" className="text-accent hover:underline">food truck catering in New Jersey</Link>.
                  </p>
                </div>
              </div>

              {/* CTA Section */}
              <div className="mt-16 p-8 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg text-center">
                <h3 className="text-2xl font-bold mb-4">Have Questions About Our Service?</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  We're here to answer all your questions and help plan your perfect event
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                    <Link to="/#contact">Book a Wedding Food Truck</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="tel:8444745591">Call: 844-474-5591</a>
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

export default QuestionsToAsk;
