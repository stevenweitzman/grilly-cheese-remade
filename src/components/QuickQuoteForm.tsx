import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Users, PartyPopper } from "lucide-react";
import { toast } from "sonner";

const QuickQuoteForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    guestCount: "",
    eventType: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    // Track step completion
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        'event': 'quick_quote_step',
        'step_number': step,
        'step_completed': true
      });
    }
    setStep(step + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track form submission
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        'event': 'quick_quote_submit',
        'event_type': formData.eventType,
        'guest_count': formData.guestCount
      });
    }

    toast.success("Quote request received! We'll contact you within 2 hours during business hours.");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      eventDate: "",
      guestCount: "",
      eventType: "",
    });
    setStep(1);
  };

  const totalSteps = 3;
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="bg-background/95 backdrop-blur-md border-2 border-accent/30 rounded-xl p-6 shadow-warm">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-foreground mb-1">Get Your Free Quote</h3>
        <p className="text-sm text-muted-foreground">30 seconds • Response in 2 hours</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`h-2 w-full mx-1 rounded-full transition-all ${
                num <= step ? 'bg-accent' : 'bg-muted'
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center">Step {step} of {totalSteps}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <Label htmlFor="quick-name">Name *</Label>
              <Input
                id="quick-name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                placeholder="Your name"
              />
            </div>
            <div>
              <Label htmlFor="quick-email">Email *</Label>
              <Input
                id="quick-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                placeholder="your@email.com"
              />
            </div>
            <div>
              <Label htmlFor="quick-phone">Phone *</Label>
              <Input
                id="quick-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
                placeholder="(555) 555-5555"
              />
            </div>
            <Button
              type="button"
              onClick={handleNext}
              className="w-full"
              disabled={!formData.name || !formData.email || !formData.phone}
            >
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <Label htmlFor="quick-date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Event Date *
              </Label>
              <Input
                id="quick-date"
                type="date"
                value={formData.eventDate}
                onChange={(e) => handleInputChange("eventDate", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="quick-guests" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Number of Guests *
              </Label>
              <Input
                id="quick-guests"
                type="number"
                value={formData.guestCount}
                onChange={(e) => handleInputChange("guestCount", e.target.value)}
                required
                placeholder="e.g., 50"
                min="1"
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
                className="w-full"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={handleNext}
                className="w-full"
                disabled={!formData.eventDate || !formData.guestCount}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <Label htmlFor="quick-type" className="flex items-center gap-2">
                <PartyPopper className="h-4 w-4" />
                Event Type *
              </Label>
              <select
                id="quick-type"
                value={formData.eventType}
                onChange={(e) => handleInputChange("eventType", e.target.value)}
                required
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
              >
                <option value="">Select event type</option>
                <option value="wedding">Wedding</option>
                <option value="corporate">Corporate Event</option>
                <option value="birthday">Birthday Party</option>
                <option value="baby-shower">Baby Shower</option>
                <option value="retirement">Retirement Party</option>
                <option value="film-set">Film/TV Set Catering</option>
                <option value="festival">Festival</option>
                <option value="graduation">Graduation</option>
                <option value="bar-mitzvah">Bar/Bat Mitzvah</option>
                <option value="bridal-shower">Bridal Shower</option>
                <option value="holiday">Holiday Party</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <p className="text-sm text-foreground font-semibold mb-1">✓ Almost done!</p>
              <p className="text-xs text-muted-foreground">
                Our team will contact you within 2 hours during business hours with your personalized quote.
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(2)}
                className="w-full"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-background"
                disabled={!formData.eventType}
              >
                Get My Free Quote
              </Button>
            </div>
          </div>
        )}
      </form>

      <p className="text-xs text-muted-foreground text-center mt-4">
        🔒 Your information is secure and will never be shared
      </p>
    </div>
  );
};

export default QuickQuoteForm;
