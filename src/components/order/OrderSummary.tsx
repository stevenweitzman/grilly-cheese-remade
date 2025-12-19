import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, MapPin, Users, Utensils, Truck, Percent, DollarSign, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { CateringOrderFormData } from "@/types/cateringOrder";
import { calculateFullPricing, formatCurrency, packageConfigs } from "@/lib/pricing";

interface OrderSummaryProps {
  formData: CateringOrderFormData;
  onNext: () => void;
  onBack: () => void;
}

export const OrderSummary = ({ formData, onBack, onNext }: OrderSummaryProps) => {
  const pricing = calculateFullPricing(
    formData.packageType,
    formData.guestCount,
    formData.distanceMiles,
    formData.includeDesserts
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Review Your Order</h2>
        <p className="text-muted-foreground">Please review all details before proceeding to payment</p>
      </div>

      {/* Package & Guests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Package Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Package</span>
            <Badge variant="secondary">{packageConfigs[formData.packageType].name}</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Guest Count</span>
            <span className="font-medium">{formData.guestCount} guests</span>
          </div>
        </CardContent>
      </Card>

      {/* Event Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-primary" />
            Event Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Event</span>
            <span className="font-medium">{formData.eventName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date & Time</span>
            <span className="font-medium">
              {formData.eventDate ? format(formData.eventDate, "PPP") : ''} at {formData.eventTime}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Contact</span>
            <span className="font-medium">{formData.contactName}</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-muted-foreground flex items-center gap-1">
              <MapPin className="w-4 h-4" /> Delivery
            </span>
            <span className="font-medium text-right">
              {formData.deliveryAddress.street}<br />
              {formData.deliveryAddress.city}, {formData.deliveryAddress.state} {formData.deliveryAddress.zip}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Menu Selections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-primary" />
            Menu Selections
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.selectedSandwiches.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Sandwiches ({formData.selectedSandwiches.length})</p>
              <div className="flex flex-wrap gap-2">
                {formData.selectedSandwiches.map(s => (
                  <Badge key={s.itemId} variant="outline">{s.name}</Badge>
                ))}
              </div>
            </div>
          )}
          {formData.selectedHotDogs.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Hot Dogs ({formData.selectedHotDogs.length})</p>
              <div className="flex flex-wrap gap-2">
                {formData.selectedHotDogs.map(s => (
                  <Badge key={s.itemId} variant="outline">{s.name}</Badge>
                ))}
              </div>
            </div>
          )}
          {(formData.dietaryOptions.glutenFreeCount > 0 || formData.dietaryOptions.veganCount > 0) && (
            <div className="pt-2 border-t">
              <p className="text-sm text-muted-foreground">
                Dietary: {formData.dietaryOptions.glutenFreeCount > 0 && `${formData.dietaryOptions.glutenFreeCount} GF`}
                {formData.dietaryOptions.glutenFreeCount > 0 && formData.dietaryOptions.veganCount > 0 && ', '}
                {formData.dietaryOptions.veganCount > 0 && `${formData.dietaryOptions.veganCount} Vegan`}
              </p>
            </div>
          )}
          {formData.includeDesserts && (
            <div className="pt-2 border-t">
              <Badge className="bg-accent text-accent-foreground">+ Desserts</Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pricing Breakdown */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            Pricing Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>Catering ({formData.guestCount} × {formatCurrency(pricing.pricePerPerson || 0)})</span>
            <span>{formatCurrency(pricing.cateringSubtotal)}</span>
          </div>
          {pricing.minimumApplied && (
            <p className="text-xs text-accent">* Minimum charge applied</p>
          )}
          {formData.includeDesserts && (
            <div className="flex justify-between">
              <span>Desserts</span>
              <span>{formatCurrency(pricing.dessertCost)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="flex items-center gap-1"><Percent className="w-4 h-4" /> Gratuity (10%)</span>
            <span>{formatCurrency(pricing.gratuity)}</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center gap-1"><Truck className="w-4 h-4" /> Travel Fee (~{formData.distanceMiles} mi)</span>
            <span>{formatCurrency(pricing.travelFee)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span className="text-primary">{formatCurrency(pricing.total)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Policies */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6 space-y-3">
          <div className="flex gap-2 text-sm">
            <AlertTriangle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <p className="text-muted-foreground">
              If your final guest count is lower than booked, you are still responsible for the full booked guest count due to fresh preparation and inventory.
            </p>
          </div>
          <div className="flex gap-2 text-sm">
            <AlertTriangle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <p className="text-muted-foreground">
              Deposits are fully refundable up to 30 days before your event date.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext} size="lg">Proceed to Payment</Button>
      </div>
    </div>
  );
};
