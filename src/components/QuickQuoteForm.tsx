import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Users, PartyPopper } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventStartTime: string;
  guests: string;
  eventType: string;
  propertyType: string;
  comments: string;
}

const QuickQuoteForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventStartTime: "",
    guests: "",
    eventType: "",
    propertyType: "",
    comments: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getStepName = (stepNumber: number): string => {
    const stepNames: { [key: number]: string } = {
      1: "Event Details",
      2: "Event Type",
      3: "Personal Information",
    };
    return stepNames[stepNumber] || `Step ${stepNumber}`;
  };

  const handleNext = () => {
    setStep(step + 1);
    
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        'event': 'form_step_completed',
        'form_type': 'quick_quote',
        'step': step,
        'step_name': getStepName(step)
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        'event': 'form_submit',
        'form_type': 'quick_quote'
      });
    }

    try {
      const { error } = await supabase.functions.invoke("send-quote-email", {
        body: {
          formType: "quick",
          formData: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            eventDate: formData.eventDate,
            eventStartTime: formData.eventStartTime,
            guests: formData.guests,
            eventType: formData.eventType,
            propertyType: formData.propertyType,
            comments: formData.comments,
          },
        },
      });

      if (error) throw error;

      toast.success("Quote Request Sent! We'll get back to you within 24 hours.");

      setFormData({
        name: "",
        email: "",
        phone: "",
        eventDate: "",
        eventStartTime: "",
        guests: "",
        eventType: "",
        propertyType: "",
        comments: "",
      });
      setStep(1);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send quote request. Please try again.");
    }
  };

  return (
    <div className="bg-background/95 backdrop-blur-md border-2 border-accent/30 rounded-xl p-6 shadow-warm">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-foreground mb-1">Get Your Free Quote</h3>
        <p className="text-sm text-muted-foreground">30 seconds • Response in 2 hours</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Step {step} of 3</span>
            <span className="text-sm text-muted-foreground">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-hero transition-all duration-300 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Event Details */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in-0 slide-in-from-right-1">
            <div>
              <Label htmlFor="eventDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Event Date *
              </Label>
              <Input
                id="eventDate"
                name="eventDate"
                type="date"
                value={formData.eventDate}
                onChange={handleInputChange}
                required
                className="bg-background/50"
              />
            </div>
            <div>
              <Label htmlFor="eventStartTime">
                Event Start Time *
              </Label>
              <Input
                id="eventStartTime"
                name="eventStartTime"
                type="time"
                value={formData.eventStartTime}
                onChange={handleInputChange}
                required
                className="bg-background/50"
              />
            </div>
            <div>
              <Label htmlFor="guests" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Number of Guests *
              </Label>
              <Input
                id="guests"
                name="guests"
                type="number"
                placeholder="50"
                value={formData.guests}
                onChange={handleInputChange}
                required
                className="bg-background/50"
              />
            </div>
            <Button
              type="button"
              onClick={handleNext}
              disabled={!formData.eventDate || !formData.eventStartTime || !formData.guests}
              className="w-full"
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: Event Type & Property */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in-0 slide-in-from-right-1">
            <div>
              <Label htmlFor="eventType" className="flex items-center gap-2">
                <PartyPopper className="h-4 w-4" />
                Event Type *
              </Label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-background/50 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select event type</option>
                <option value="Wedding">Wedding</option>
                <option value="Corporate Event">Corporate Event</option>
                <option value="Birthday Party">Birthday Party</option>
                <option value="Baby Shower">Baby Shower</option>
                <option value="Retirement Party">Retirement Party</option>
                <option value="Film Set Catering">Film Set Catering</option>
                <option value="Festival/Pop-Up">Festival/Pop-Up Event</option>
                <option value="Fundraiser">Fundraiser</option>
                <option value="School Event">School Event</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <Label htmlFor="propertyType">
                Property Type *
              </Label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-background/50 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select property type</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
                <option value="Not Sure">Not Sure</option>
              </select>
            </div>
            <div>
              <Label htmlFor="comments">
                Additional Comments
              </Label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                placeholder="Any special requests or additional information..."
                rows={4}
                className="w-full px-3 py-2 bg-background/50 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
                className="w-1/3"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={handleNext}
                disabled={!formData.eventType || !formData.propertyType}
                className="w-2/3"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Personal Information */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in-0 slide-in-from-right-1">
            <div>
              <Label htmlFor="name">
                Name *
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="bg-background/50"
              />
            </div>
            <div>
              <Label htmlFor="email">
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="bg-background/50"
              />
            </div>
            <div>
              <Label htmlFor="phone">
                Phone *
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(555) 555-5555"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="bg-background/50"
              />
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
                className="w-1/3"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={!formData.name || !formData.email || !formData.phone}
                className="w-2/3"
              >
                Get My Free Quote
              </Button>
            </div>
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center">
          🔒 Your information is secure and will never be shared
        </p>
      </form>
    </div>
  );
};

export default QuickQuoteForm;