import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Truck } from "lucide-react";
import { DropoffOrderFormData } from "@/types/cateringOrder";
import { calculateDeliveryFee, formatCurrency, ORIGIN_ZIP, FREE_DELIVERY_MILES, DELIVERY_PER_MILE_RATE } from "@/lib/dropoff-pricing";
import { AddressAutocomplete } from "./AddressAutocomplete";

interface DeliveryAddressStepProps {
  formData: DropoffOrderFormData;
  onUpdate: (data: Partial<DropoffOrderFormData>) => void;
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

// Simplified distance estimation based on zip codes
const estimateDistance = (zip: string): number => {
  if (!zip || zip.length < 5) return 30;
  
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

export const DeliveryAddressStep = ({ formData, onUpdate, onBack, onNext }: DeliveryAddressStepProps) => {
  const estimatedDistance = estimateDistance(formData.deliveryAddress.zip);
  const { fee: deliveryFee, milesOver10 } = calculateDeliveryFee(estimatedDistance);

  useEffect(() => {
    if (estimatedDistance !== formData.distanceMiles) {
      onUpdate({ distanceMiles: estimatedDistance });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estimatedDistance]);

  const handleAddressSelect = (street: string, city?: string, state?: string, zip?: string) => {
    const updates: Partial<DropoffOrderFormData> = {
      deliveryAddress: {
        ...formData.deliveryAddress,
        street,
      },
    };
    
    if (city) {
      updates.deliveryAddress = { ...updates.deliveryAddress!, city };
    }
    if (state && US_STATES.some(s => s.value === state)) {
      updates.deliveryAddress = { ...updates.deliveryAddress!, state };
    }
    if (zip) {
      updates.deliveryAddress = { ...updates.deliveryAddress!, zip };
    }
    
    onUpdate(updates);
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
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
          <MapPin className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Where should we deliver?</h2>
        <p className="text-muted-foreground">
          Enter your delivery address
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Delivery Address</CardTitle>
          <CardDescription>Start typing to search for an address</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="street">Street Address</Label>
            <AddressAutocomplete
              value={formData.deliveryAddress.street}
              onChange={handleAddressSelect}
              placeholder="Start typing an address..."
              className="mt-1"
            />
          </div>
          
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="City"
                value={formData.deliveryAddress.city}
                onChange={(e) => updateAddress('city', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label>State</Label>
              <Select 
                value={formData.deliveryAddress.state} 
                onValueChange={(value) => updateAddress('state', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  {US_STATES.map((state) => (
                    <SelectItem key={state.value} value={state.value}>{state.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="zip">ZIP Code</Label>
              <Input
                id="zip"
                placeholder="08089"
                value={formData.deliveryAddress.zip}
                onChange={(e) => updateAddress('zip', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {formData.deliveryAddress.zip.length >= 5 && (
        <Card className="bg-muted/50 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8 text-primary" />
              <div>
                <p className="font-medium">
                  Estimated: ~{estimatedDistance} miles from {ORIGIN_ZIP}
                </p>
                <p className="text-sm text-muted-foreground">
                  {milesOver10 > 0 
                    ? `First ${FREE_DELIVERY_MILES} miles free, then ${formatCurrency(DELIVERY_PER_MILE_RATE)}/mile`
                    : `Within our free ${FREE_DELIVERY_MILES}-mile delivery zone!`
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} size="lg">
          Continue
        </Button>
      </div>
    </div>
  );
};
