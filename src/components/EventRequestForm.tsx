import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Users, MapPin, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const EventRequestForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  
  const [formData, setFormData] = useState({
    eventType: "",
    guests: "",
    dietaryRestrictions: "",
    drinks: "",
    eventDate: "",
    eventTime: "",
    propertyType: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    additionalInfo: "",
    name: "",
    email: "",
    phone: "",
    mathAnswer: "",
    agreeToTerms: false,
  });

  const states = [
    "Delaware", "West Virginia", "Maryland", "Massachusetts", 
    "New Hampshire", "New Jersey", "New York", "North Carolina", 
    "Pennsylvania", "Rhode Island", "Vermont", "Virginia", "Washington DC"
  ];

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.eventType && formData.guests && formData.dietaryRestrictions && formData.drinks;
      case 2:
        return formData.eventDate && formData.eventTime && formData.propertyType;
      case 3:
        return formData.address && formData.city && formData.state && formData.zip;
      case 4:
        return true; // Additional info is optional
      case 5:
        return formData.name && formData.email && formData.phone && formData.mathAnswer === "2" && formData.agreeToTerms;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      // Track step progression in GTM
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          'event': 'form_step_completed',
          'form_name': 'Event Request Form',
          'step_number': currentStep,
          'step_name': getStepName(currentStep)
        });
      }
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    } else {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields before continuing.",
        variant: "destructive",
      });
    }
  };

  const getStepName = (step: number) => {
    switch (step) {
      case 1: return "Event Details";
      case 2: return "When & Where";
      case 3: return "Location";
      case 4: return "Additional Info";
      case 5: return "Contact Info";
      default: return "";
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(5)) {
      if (formData.mathAnswer !== "2") {
        toast({
          title: "Math Check Failed",
          description: "Please answer the math question correctly.",
          variant: "destructive",
        });
        return;
      }
      if (!formData.agreeToTerms) {
        toast({
          title: "Terms Required",
          description: "Please agree to the terms and conditions.",
          variant: "destructive",
        });
        return;
      }
    }

    // Track form submission in GTM
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        'event': 'form_submission',
        'form_name': 'Event Request Form',
        'guest_count': formData.guests,
        'event_date': formData.eventDate
      });
    }

    try {
      const { error } = await supabase.functions.invoke('send-quote-email', {
        body: {
          formType: 'event',
          formData: {
            eventType: formData.eventType,
            guests: formData.guests,
            dietaryRestrictions: formData.dietaryRestrictions,
            drinks: formData.drinks,
            eventDate: formData.eventDate,
            eventTime: formData.eventTime,
            propertyType: formData.propertyType,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            additionalInfo: formData.additionalInfo,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Event Request Submitted!",
        description: "We'll contact you shortly to discuss your event details.",
      });
      
      // Reset form
      setFormData({
        eventType: "",
        guests: "",
        dietaryRestrictions: "",
        drinks: "",
        eventDate: "",
        eventTime: "",
        propertyType: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        additionalInfo: "",
        name: "",
        email: "",
        phone: "",
        mathAnswer: "",
        agreeToTerms: false,
      });
      setCurrentStep(1);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Error",
        description: "Something went wrong. Please call us at (267) 687-9090.",
        variant: "destructive",
      });
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        {[1, 2, 3, 4, 5].map((step) => (
          <div
            key={step}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
              step < currentStep
                ? "bg-accent text-background"
                : step === currentStep
                ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {step < currentStep ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <span className="font-semibold">{step}</span>
            )}
          </div>
        ))}
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-accent transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-8 w-8 text-primary" />
                <h3 className="text-3xl font-bold text-foreground">Tell Us About Your Event</h3>
              </div>
              <p className="text-muted-foreground">Help us understand your event needs</p>
            </div>

            <div>
              <Label htmlFor="eventType" className="text-base">What type of event? *</Label>
              <Select
                value={formData.eventType}
                onValueChange={(value) => setFormData({ ...formData, eventType: value })}
                required
              >
                <SelectTrigger className="mt-2 h-12 text-base">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="corporate">Corporate Event</SelectItem>
                  <SelectItem value="birthday">Birthday Party</SelectItem>
                  <SelectItem value="baby-shower">Baby Shower</SelectItem>
                  <SelectItem value="retirement">Retirement Party</SelectItem>
                  <SelectItem value="bar-mitzvah">Bar/Bat Mitzvah</SelectItem>
                  <SelectItem value="bridal-shower">Bridal Shower</SelectItem>
                  <SelectItem value="anniversary">Anniversary Party</SelectItem>
                  <SelectItem value="engagement">Engagement Party</SelectItem>
                  <SelectItem value="graduation">Graduation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="guests" className="text-base">How many guests expected? *</Label>
              <Input
                id="guests"
                type="number"
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                required
                className="mt-2 h-12 text-base"
                placeholder="50"
              />
            </div>

            <div>
              <Label htmlFor="dietary" className="text-base">Any dietary requirements/restrictions? *</Label>
              <Select
                value={formData.dietaryRestrictions}
                onValueChange={(value) => setFormData({ ...formData, dietaryRestrictions: value })}
                required
              >
                <SelectTrigger className="mt-2 h-12 text-base">
                  <SelectValue placeholder="Select dietary needs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan-vegetarian">Vegan & Vegetarian</SelectItem>
                  <SelectItem value="gluten-free">Gluten Free</SelectItem>
                  <SelectItem value="peanut-allergy">Peanut Allergy</SelectItem>
                  <SelectItem value="none">Nope</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="drinks" className="text-base">Need drinks (non-alcoholic)? *</Label>
              <Select
                value={formData.drinks}
                onValueChange={(value) => setFormData({ ...formData, drinks: value })}
                required
              >
                <SelectTrigger className="mt-2 h-12 text-base">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="explore">Let's explore options</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="h-8 w-8 text-primary" />
                <h3 className="text-3xl font-bold text-foreground">When & Where</h3>
              </div>
              <p className="text-muted-foreground">Pick your date and time</p>
            </div>

            <div>
              <Label htmlFor="eventDate" className="text-base">Date of Event *</Label>
              <Input
                id="eventDate"
                type="date"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                required
                className="mt-2 h-12 text-base"
              />
            </div>

            <div>
              <Label htmlFor="eventTime" className="text-base">Event Start Time *</Label>
              <Input
                id="eventTime"
                type="time"
                value={formData.eventTime}
                onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
                required
                className="mt-2 h-12 text-base"
              />
            </div>

            <div>
              <Label htmlFor="propertyType" className="text-base">Private or Public Property? *</Label>
              <Select
                value={formData.propertyType}
                onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                required
              >
                <SelectTrigger className="mt-2 h-12 text-base">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="not-sure">Not Sure</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MapPin className="h-8 w-8 text-primary" />
                <h3 className="text-3xl font-bold text-foreground">Event Location</h3>
              </div>
              <p className="text-muted-foreground">Where should we bring the cheese?</p>
            </div>

            <div>
              <Label htmlFor="address" className="text-base">Event Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                className="mt-2 h-12 text-base"
                placeholder="123 Main Street"
              />
            </div>

            <div>
              <Label htmlFor="city" className="text-base">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
                className="mt-2 h-12 text-base"
                placeholder="Philadelphia"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="state" className="text-base">State *</Label>
                <Select
                  value={formData.state}
                  onValueChange={(value) => setFormData({ ...formData, state: value })}
                  required
                >
                  <SelectTrigger className="mt-2 h-12 text-base">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="zip" className="text-base">Zip *</Label>
                <Input
                  id="zip"
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  required
                  className="mt-2 h-12 text-base"
                  placeholder="19103"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-foreground mb-2">
                Anything Else?
              </h3>
              <p className="text-muted-foreground">Share any additional details</p>
            </div>

            <div>
              <Label htmlFor="additionalInfo" className="text-base">
                Additional Comments (Optional)
              </Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                className="mt-2 min-h-[120px] text-base"
                placeholder="Tell us more about your event..."
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-foreground mb-2">
                How Can We Reach You?
              </h3>
              <p className="text-muted-foreground">Just need your contact information</p>
            </div>

            <div>
              <Label htmlFor="name" className="text-base">Your Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="mt-2 h-12 text-base"
                placeholder="John Doe"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-base">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="mt-2 h-12 text-base"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-base">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="mt-2 h-12 text-base"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <Label htmlFor="mathAnswer" className="text-base">Quick check: What's 1+1? *</Label>
              <Input
                id="mathAnswer"
                type="number"
                value={formData.mathAnswer}
                onChange={(e) => setFormData({ ...formData, mathAnswer: e.target.value })}
                required
                className="mt-2 h-12 text-base"
                placeholder="Answer"
              />
            </div>

            <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, agreeToTerms: checked as boolean })
                }
                required
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                By submitting this event quote form you agree to our Terms and Conditions. *
              </Label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card p-8 md:p-10 rounded-lg shadow-warm border-2 border-border max-w-2xl mx-auto">
      {renderStepIndicator()}
      
      <form onSubmit={handleSubmit}>
        {renderStep()}

        <div className="flex gap-4 mt-8 pt-6 border-t border-border">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleBack}
              className="flex-1 h-12 text-base"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          
          {currentStep < totalSteps ? (
            <Button
              type="button"
              size="lg"
              onClick={handleNext}
              className="flex-1 h-12 text-base"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="submit"
              size="lg"
              className="flex-1 h-12 text-base bg-accent hover:bg-accent/90 text-background"
            >
              Submit Event Request
              <CheckCircle2 className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EventRequestForm;
