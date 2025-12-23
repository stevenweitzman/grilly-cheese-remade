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
      question: "Do you cater at public events?",
      answer: "Yes, we do! However, we don't offer vending services at this time. We focus on providing the best catering experience for your event."
    },
    {
      question: "Is there a minimum guest count required for catering?",
      answer: "There is no minimum guest count, but there is a minimum catering charge for events with smaller guest counts. Contact us for specific details about your event."
    },
    {
      question: "How long does the truck stay on-site?",
      answer: "The truck can stay on-site for 3.5 hours during peak season (March-November) and longer depending on the type of service. Additional time beyond 3.5 hours is available. This does not include time taken for setup or breakdown of the truck or trailer."
    },
    {
      question: "Do you honor rain dates?",
      answer: "Yes and no. We will hold your rain date as tentative, however, if another event is booked on that same date and our other trucks are booked elsewhere, we cannot honor the rain date. Holding a rain date prevents us from booking elsewhere, which can be challenging during rainy seasons."
    },
    {
      question: "How does billing work for catered events?",
      answer: "We charge on a per-person basis, not hourly. If you book for a specific number of guests, you're responsible for that count even if fewer guests attend. This is because our food is truly prepared fresh on a daily basis - we hand-cut fries, make homemade tomato soup, and cannot cross-utilize fresh ingredients."
    },
    {
      question: "Are deposits refundable?",
      answer: "Yes! Deposits are fully refundable up to 30 days out from your event."
    },
    {
      question: "Do you offer different types of catering?",
      answer: "Yes! We have 2 food trucks and one full-service commercial food trailer. We also offer popup catering where we cook on-site without a truck, as well as drop-off catering where we cook the food at our kitchen and drop it off at your location."
    },
    {
      question: "Do you offer gluten-free and vegan products?",
      answer: "Absolutely! We offer both gluten-free breads and sides, as well as vegan 'cheese' and vegan sides. We always offer gluten-free options for up to 10 people and can accommodate more upon request."
    },
    {
      question: "Is gratuity included in staff pay?",
      answer: "No, gratuity is not included in staff pay. A 10% gratuity is added to parties of all sizes."
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
