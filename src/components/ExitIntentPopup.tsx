import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Gift } from "lucide-react";
import { toast } from "sonner";

const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if already shown in this session
    const shownThisSession = sessionStorage.getItem("exitIntentShown");
    if (shownThisSession) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse leaves from top of viewport
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem("exitIntentShown", "true");
        
        // Track popup view
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            'event': 'exit_intent_popup',
            'popup_action': 'shown'
          });
        }
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track conversion
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        'event': 'exit_intent_conversion',
        'conversion_type': 'email_capture'
      });
    }

    toast.success("Success! Check your email for your 10% discount code.");
    setIsOpen(false);
    setEmail("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="bg-accent/20 p-4 rounded-full">
              <Gift className="h-12 w-12 text-accent" />
            </div>
          </div>
          <DialogTitle className="text-2xl text-center">
            Wait! Get 10% Off Your First Event
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Join 500+ happy customers who've saved on their event catering. Enter your email to receive your exclusive discount code.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="popup-email">Email Address</Label>
            <Input
              id="popup-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-background" size="lg">
            Get My 10% Discount Code
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Valid for first-time customers only. Cannot be combined with other offers.
          </p>
        </form>

        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-center text-muted-foreground">
            🎉 <strong className="text-foreground">Bonus:</strong> Get our free Event Planning Guide with menu recommendations & timeline tips
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
