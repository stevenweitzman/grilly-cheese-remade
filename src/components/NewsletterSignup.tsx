import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Loader2 } from "lucide-react";

interface NewsletterSignupProps {
  source?: string;
  variant?: "default" | "compact";
  className?: string;
}

const NewsletterSignup = ({ source = "website", variant = "default", className = "" }: NewsletterSignupProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: email.toLowerCase().trim(), source });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already subscribed!",
            description: "You're already on our list. We'll be in touch!",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "You're in! 🎉",
          description: "Thanks for subscribing! Check your inbox for recipes & exclusive offers.",
        });
        setEmail("");
      }
    } catch (error) {
      console.error("Newsletter signup error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-background/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 flex-1"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          size="sm"
          className="bg-accent hover:bg-accent/90 text-background"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
        </Button>
      </form>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl p-8 border border-border ${className}`}>
      <div className="text-center max-w-md mx-auto">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/20 rounded-full mb-4">
          <Mail className="h-6 w-6 text-accent" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Get Recipes & Exclusive Offers
        </h3>
        <p className="text-muted-foreground mb-6">
          Join our newsletter for secret recipes, event tips, and special discounts. No spam, unsubscribe anytime.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            className="bg-accent hover:bg-accent/90 text-background"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Mail className="h-4 w-4 mr-2" />
            )}
            Subscribe
          </Button>
        </form>
        
        <p className="text-xs text-muted-foreground mt-4">
          By subscribing, you agree to receive emails from Grilly Cheese. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
};

export default NewsletterSignup;
