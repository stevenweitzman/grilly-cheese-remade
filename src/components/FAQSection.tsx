import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FAQSection = () => {
  const faqs = [
    {
      question: "How much does food truck catering cost?",
      answer: "Food truck catering typically costs $15-35 per person, with most events falling in the $18-25 range. Total costs depend on guest count, menu selections, and travel distance."
    },
    {
      question: "How far in advance should I book a food truck?",
      answer: "Book 2-6 months ahead for weddings and large events. Popular weekend dates in spring and summer book up quickly. For smaller events, 2-4 weeks may be sufficient."
    },
    {
      question: "Is there a minimum guest count required?",
      answer: "No minimum guest count, but there is a minimum catering charge for smaller events. Contact us for specific details about your event size and pricing."
    },
    {
      question: "How long does the food truck stay on-site?",
      answer: "The truck stays on-site for 3.5 hours during peak season (March-November). Additional time is available. This does not include setup or breakdown time."
    },
    {
      question: "Do you offer gluten-free and vegan options?",
      answer: "Yes! We offer gluten-free breads and vegan cheese options. We accommodate up to 10 gluten-free guests standard, with more available upon request."
    },
    {
      question: "What types of events do you cater?",
      answer: "We cater weddings, corporate events, birthday parties, bar/bat mitzvahs, graduation parties, film sets, and private celebrations. We have 2 food trucks and a commercial trailer."
    },
    {
      question: "Are deposits refundable?",
      answer: "Yes! Deposits are fully refundable up to 30 days before your event date."
    },
    {
      question: "Do you honor rain dates for outdoor events?",
      answer: "We hold rain dates as tentative. If another event books that date and our trucks are unavailable, we cannot guarantee the rain date. We recommend booking early."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about booking Grilly Cheese
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-card border-2 border-border rounded-lg px-6 shadow-sm hover:shadow-warm transition-shadow"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          <div className="mt-12 text-center p-8 bg-accent/10 rounded-lg border-2 border-accent/20">
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Still Have Questions?
            </h3>
            <p className="text-muted-foreground mb-4">
              We're here to help! Give us a call or submit an event request.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="tel:8444745591" 
                className="text-2xl font-bold text-accent hover:text-accent/80 transition-colors"
              >
                844-474-5591
              </a>
              <Link 
                to="/#contact"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).dataLayer) {
                    (window as any).dataLayer.push({
                      'event': 'cta_click',
                      'cta_location': 'faq_section'
                    });
                  }
                }}
              >
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-background">
                  Request a Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
