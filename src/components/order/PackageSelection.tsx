import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Users, Utensils, AlertCircle } from "lucide-react";
import { CateringOrderFormData } from "@/types/cateringOrder";
import { 
  packageConfigs, 
  calculateFullPricing, 
  formatCurrency, 
  isBelowMinimum,
  getMinimumGuestCount,
  PackageType 
} from "@/lib/pricing";
import { cn } from "@/lib/utils";

interface PackageSelectionProps {
  formData: CateringOrderFormData;
  onUpdate: (data: Partial<CateringOrderFormData>) => void;
  onNext: () => void;
}

export const PackageSelection = ({ formData, onUpdate, onNext }: PackageSelectionProps) => {
  const [localGuestCount, setLocalGuestCount] = useState(formData.guestCount.toString());
  
  const guestCount = parseInt(localGuestCount) || 0;
  const selectedPackage = formData.packageType;
  
  // Calculate real-time pricing
  const pricing = calculateFullPricing(
    selectedPackage,
    guestCount,
    30, // Default distance for estimate
    false
  );
  
  const belowMinimum = isBelowMinimum(selectedPackage, guestCount);
  const minimumGuests = getMinimumGuestCount(selectedPackage);

  useEffect(() => {
    onUpdate({ guestCount });
  }, [guestCount]);

  const handlePackageSelect = (packageType: PackageType) => {
    onUpdate({ packageType });
  };

  const handleNext = () => {
    if (guestCount >= 1) {
      onNext();
    }
  };

  return (
    <div className="space-y-8">
      {/* Package Selection */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Choose Your Package</h2>
        <p className="text-muted-foreground mb-6">
          Select the perfect catering package for your event
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {(Object.entries(packageConfigs) as [PackageType, typeof packageConfigs.simple][]).map(([type, config]) => (
            <Card 
              key={type}
              className={cn(
                "cursor-pointer transition-all hover:shadow-lg",
                selectedPackage === type && "ring-2 ring-primary shadow-lg"
              )}
              onClick={() => handlePackageSelect(type)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{config.name}</CardTitle>
                  {selectedPackage === type && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <CardDescription>{config.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-foreground">Pricing Tiers:</div>
                  {config.tiers.map((tier, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {tier.minGuests}+ guests
                      </span>
                      <Badge variant="secondary">
                        {formatCurrency(tier.pricePerPerson)}/person
                      </Badge>
                    </div>
                  ))}
                  {config.minimumCharge && (
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">
                        Minimum charge: {formatCurrency(config.minimumCharge)} for events under {minimumGuests} guests
                      </p>
                    </div>
                  )}
                  {config.maxSandwichSelections && (
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">
                        Choose up to {config.maxSandwichSelections} sandwiches from our full menu
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Guest Count */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Guest Count
          </CardTitle>
          <CardDescription>
            How many guests are you expecting?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1 max-w-xs">
              <Label htmlFor="guestCount">Number of Guests</Label>
              <Input
                id="guestCount"
                type="number"
                min="1"
                value={localGuestCount}
                onChange={(e) => setLocalGuestCount(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          
          {belowMinimum && (
            <div className="mt-4 flex items-start gap-2 p-4 bg-accent/10 rounded-lg">
              <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Below Minimum Guest Count</p>
                <p className="text-sm text-muted-foreground">
                  The {packageConfigs[selectedPackage].name} requires a minimum of {minimumGuests} guests. 
                  {packageConfigs[selectedPackage].minimumCharge && (
                    <> A minimum charge of {formatCurrency(packageConfigs[selectedPackage].minimumCharge!)} will apply.</>
                  )}
                  {selectedPackage === 'full' && ' Contact us for custom pricing for smaller events.'}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Price Estimate */}
      {guestCount > 0 && (
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-primary" />
              Estimated Price
            </CardTitle>
            <CardDescription>
              Based on your selections (final price includes travel fee)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {guestCount} guests × {pricing.pricePerPerson ? formatCurrency(pricing.pricePerPerson) : 'Custom'}/person
                </span>
                <span className="font-medium">{formatCurrency(pricing.cateringSubtotal)}</span>
              </div>
              {pricing.minimumApplied && (
                <div className="text-xs text-accent">
                  * Minimum charge applied
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">10% Gratuity</span>
                <span>{formatCurrency(pricing.gratuity)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Travel Fee (estimated)</span>
                <span>{formatCurrency(pricing.travelFee)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Estimated Total</span>
                  <span className="text-primary">{formatCurrency(pricing.total)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleNext}
          disabled={guestCount < 1}
          size="lg"
          className="min-w-[200px]"
        >
          Continue to Event Details
        </Button>
      </div>
    </div>
  );
};
