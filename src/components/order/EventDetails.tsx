import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, MapPin, User, Phone, Mail, Truck } from "lucide-react";
import { format } from "date-fns";
import { CateringOrderFormData } from "@/types/cateringOrder";
import { calculateTravelFee, formatCurrency, ORIGIN_ZIP, BASE_TRAVEL_MILES } from "@/lib/pricing";
import { cn } from "@/lib/utils";

interface EventDetailsProps {
  formData: CateringOrderFormData;
  onUpdate: (data: Partial<CateringOrderFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const US_STATES = [
  { value: 'NJ', label: 'New Jersey' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'NY', label: 'New York' },
  { value: 'DE', label: 'Delaware' },
  { value: 'MD', label: 'Maryland' },
  { value: 'DC', label: 'Washington DC' },
];

const TIME_SLOTS = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
  '8:00 PM',
];

// Simplified distance estimation based on zip codes
const estimateDistance = (zip: string): number => {
  if (!zip || zip.length < 5) return 30; // Default
  
  // Rough NJ/PA/NY/DE area estimates from 08089 (Waterford, NJ)
  const zipPrefix = zip.substring(0, 3);
  
  const distanceMap: Record<string, number> = {
    '080': 10, '081': 15, '082': 25, '083': 35, '084': 40,
    '085': 20, '086': 30, '087': 45, '088': 55, '089': 50,
    '190': 25, '191': 20, '192': 35, '193': 45, '194': 50, '195': 55,
    '100': 90, '101': 85, '102': 80, '103': 95, '104': 100,
    '110': 75, '111': 80, '112': 85, '113': 90,
    '197': 45, '198': 50, '199': 55,
    '200': 120, '201': 125, '202': 130,
  };
  
  return distanceMap[zipPrefix] || 60;
};

export const EventDetails = ({ formData, onUpdate, onBack, onNext }: EventDetailsProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const estimatedDistance = estimateDistance(formData.deliveryAddress.zip);
  const travelFee = calculateTravelFee(estimatedDistance);

  useEffect(() => {
    onUpdate({ distanceMiles: estimatedDistance });
  }, [estimatedDistance]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.eventName.trim()) newErrors.eventName = 'Event name is required';
    if (!formData.eventDate) newErrors.eventDate = 'Event date is required';
    if (!formData.eventTime) newErrors.eventTime = 'Event time is required';
    if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required';
    if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email';
    }
    if (!formData.contactPhone.trim()) newErrors.contactPhone = 'Phone is required';
    if (!formData.deliveryAddress.street.trim()) newErrors.street = 'Street address is required';
    if (!formData.deliveryAddress.city.trim()) newErrors.city = 'City is required';
    if (!formData.deliveryAddress.zip.trim()) newErrors.zip = 'ZIP code is required';
    else if (!/^\d{5}(-\d{4})?$/.test(formData.deliveryAddress.zip)) {
      newErrors.zip = 'Please enter a valid ZIP code';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const updateAddress = (field: keyof typeof formData.deliveryAddress, value: string) => {
    onUpdate({
      deliveryAddress: {
        ...formData.deliveryAddress,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Event Details</h2>
        <p className="text-muted-foreground">
          Tell us about your event so we can deliver your delicious food
        </p>
      </div>

      {/* Event Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-primary" />
            Event Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="eventName">Event Name *</Label>
            <Input
              id="eventName"
              placeholder="e.g., Company Holiday Party"
              value={formData.eventName}
              onChange={(e) => onUpdate({ eventName: e.target.value })}
              className={cn("mt-1", errors.eventName && "border-destructive")}
            />
            {errors.eventName && <p className="text-sm text-destructive mt-1">{errors.eventName}</p>}
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Event Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal mt-1",
                      !formData.eventDate && "text-muted-foreground",
                      errors.eventDate && "border-destructive"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.eventDate ? format(formData.eventDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.eventDate || undefined}
                    onSelect={(date) => onUpdate({ eventDate: date || null })}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.eventDate && <p className="text-sm text-destructive mt-1">{errors.eventDate}</p>}
            </div>
            
            <div>
              <Label>Event Time *</Label>
              <Select value={formData.eventTime} onValueChange={(value) => onUpdate({ eventTime: value })}>
                <SelectTrigger className={cn("mt-1", errors.eventTime && "border-destructive")}>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_SLOTS.map((time) => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.eventTime && <p className="text-sm text-destructive mt-1">{errors.eventTime}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="contactName">Contact Name *</Label>
            <Input
              id="contactName"
              placeholder="Your full name"
              value={formData.contactName}
              onChange={(e) => onUpdate({ contactName: e.target.value })}
              className={cn("mt-1", errors.contactName && "border-destructive")}
            />
            {errors.contactName && <p className="text-sm text-destructive mt-1">{errors.contactName}</p>}
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contactEmail">Email *</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.contactEmail}
                  onChange={(e) => onUpdate({ contactEmail: e.target.value })}
                  className={cn("pl-10", errors.contactEmail && "border-destructive")}
                />
              </div>
              {errors.contactEmail && <p className="text-sm text-destructive mt-1">{errors.contactEmail}</p>}
            </div>
            
            <div>
              <Label htmlFor="contactPhone">Phone *</Label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="contactPhone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.contactPhone}
                  onChange={(e) => onUpdate({ contactPhone: e.target.value })}
                  className={cn("pl-10", errors.contactPhone && "border-destructive")}
                />
              </div>
              {errors.contactPhone && <p className="text-sm text-destructive mt-1">{errors.contactPhone}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Delivery Address
          </CardTitle>
          <CardDescription>
            Where should we deliver your catering?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="street">Street Address *</Label>
            <Input
              id="street"
              placeholder="123 Main Street"
              value={formData.deliveryAddress.street}
              onChange={(e) => updateAddress('street', e.target.value)}
              className={cn("mt-1", errors.street && "border-destructive")}
            />
            {errors.street && <p className="text-sm text-destructive mt-1">{errors.street}</p>}
          </div>
          
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                placeholder="City"
                value={formData.deliveryAddress.city}
                onChange={(e) => updateAddress('city', e.target.value)}
                className={cn("mt-1", errors.city && "border-destructive")}
              />
              {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
            </div>
            
            <div>
              <Label>State *</Label>
              <Select 
                value={formData.deliveryAddress.state} 
                onValueChange={(value) => updateAddress('state', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {US_STATES.map((state) => (
                    <SelectItem key={state.value} value={state.value}>{state.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="zip">ZIP Code *</Label>
              <Input
                id="zip"
                placeholder="08089"
                value={formData.deliveryAddress.zip}
                onChange={(e) => updateAddress('zip', e.target.value)}
                className={cn("mt-1", errors.zip && "border-destructive")}
              />
              {errors.zip && <p className="text-sm text-destructive mt-1">{errors.zip}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Travel Fee Info */}
      {formData.deliveryAddress.zip.length >= 5 && (
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8 text-primary" />
              <div>
                <p className="font-medium">Estimated Travel Fee: {formatCurrency(travelFee)}</p>
                <p className="text-sm text-muted-foreground">
                  ~{estimatedDistance} miles from our kitchen in {ORIGIN_ZIP}
                  {estimatedDistance > BASE_TRAVEL_MILES && (
                    <> (includes ${((estimatedDistance - BASE_TRAVEL_MILES) * 2 * 1.5).toFixed(2)} for extra miles)</>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext} size="lg">
          Continue to Menu Selection
        </Button>
      </div>
    </div>
  );
};
