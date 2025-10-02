import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Users, MapPin } from "lucide-react";

const EventRequestForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
    mathAnswer: "",
    agreeToTerms: false,
  });

  const states = [
    "Delaware", "West Virginia", "Maryland", "Massachusetts", 
    "New Hampshire", "New Jersey", "New York", "North Carolina", 
    "Pennsylvania", "Rhode Island", "Vermont", "Virginia", "Washington DC"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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

    toast({
      title: "Event Request Submitted!",
      description: "We'll contact you shortly to discuss your event details.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
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
      mathAnswer: "",
      agreeToTerms: false,
    });
  };

  return (
    <div className="bg-card p-8 rounded-lg shadow-warm border-2 border-border">
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-foreground mb-2">
          Tell Us About Your Event
        </h3>
        <p className="text-muted-foreground">
          Fields marked with <span className="text-destructive">*</span> are required
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Information */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Your Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-lg">Event Details</h4>
          </div>

          {/* Event Details */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="guests">How many guests expected? *</Label>
              <Input
                id="guests"
                type="number"
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                required
                className="mt-1"
                placeholder="Number of guests"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dietary">Any dietary requirements/restrictions? *</Label>
                <Select
                  value={formData.dietaryRestrictions}
                  onValueChange={(value) => setFormData({ ...formData, dietaryRestrictions: value })}
                  required
                >
                  <SelectTrigger className="mt-1">
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
                <Label htmlFor="drinks">Need drinks (non-alcoholic)? *</Label>
                <Select
                  value={formData.drinks}
                  onValueChange={(value) => setFormData({ ...formData, drinks: value })}
                  required
                >
                  <SelectTrigger className="mt-1">
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
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-lg">When & Where</h4>
          </div>

          {/* Date & Time */}
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="eventDate">Date of Event *</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="eventTime">What time is your event?</Label>
                <Input
                  id="eventTime"
                  type="time"
                  value={formData.eventTime}
                  onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="propertyType">Private or Public Property? *</Label>
              <Select
                value={formData.propertyType}
                onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                required
              >
                <SelectTrigger className="mt-1">
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
        </div>

        <div className="border-t border-border pt-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-lg">Event Location</h4>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="address">Event Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                className="mt-1"
                placeholder="Street address"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="state">State *</Label>
                <Select
                  value={formData.state}
                  onValueChange={(value) => setFormData({ ...formData, state: value })}
                  required
                >
                  <SelectTrigger className="mt-1">
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
                <Label htmlFor="zip">Zip *</Label>
                <Input
                  id="zip"
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  required
                  className="mt-1"
                  placeholder="Zip code"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div>
          <Label htmlFor="additionalInfo">
            Any add'l info, thoughts, suggestions, tips, etc. about your event:
          </Label>
          <Textarea
            id="additionalInfo"
            value={formData.additionalInfo}
            onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
            className="mt-1 min-h-[100px]"
            placeholder="Tell us more about your event..."
          />
        </div>

        {/* Math Check */}
        <div>
          <Label htmlFor="mathAnswer">What's 1+1? *</Label>
          <Input
            id="mathAnswer"
            type="number"
            value={formData.mathAnswer}
            onChange={(e) => setFormData({ ...formData, mathAnswer: e.target.value })}
            required
            className="mt-1"
            placeholder="Answer"
          />
        </div>

        {/* Terms */}
        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) => 
              setFormData({ ...formData, agreeToTerms: checked as boolean })
            }
            required
          />
          <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
            By submitting this event quote form you agree to our Terms and Conditions. *
          </Label>
        </div>

        <Button type="submit" size="lg" className="w-full text-lg">
          Submit Event Request
        </Button>
      </form>
    </div>
  );
};

export default EventRequestForm;
