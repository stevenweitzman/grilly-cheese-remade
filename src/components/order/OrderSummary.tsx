import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CalendarIcon, MapPin, Utensils, DollarSign, Truck, Percent, AlertTriangle, Tag, Package, UtensilsCrossed, Flame, Wheat } from "lucide-react";
import { format } from "date-fns";
import { DropoffOrderFormData } from "@/types/cateringOrder";
import { calculateDropoffPricing, formatCurrency } from "@/lib/dropoff-pricing";

interface OrderSummaryProps {
  formData: DropoffOrderFormData;
  onNext: () => void;
  onBack: () => void;
}

export const OrderSummary = ({ formData, onBack, onNext }: OrderSummaryProps) => {
  const pricing = calculateDropoffPricing(formData.cart, formData.distanceMiles, formData.wantsIndividualPackaging, formData.wantsChafingDishes, formData.glutenFreeCount);

  // Group cart items by category
  const entreeItems = formData.cart.filter(item => item.isEntree);
  const extraItems = formData.cart.filter(item => !item.isEntree);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Review Your Order</h2>
        <p className="text-muted-foreground">Review all details and pricing before proceeding to payment</p>
      </div>

      {/* Minimum Order Warning */}
      {pricing.isBelowMinimum && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Minimum order is {formatCurrency(pricing.minimumRequired)} before fees. 
            Please add more items to continue. Current food subtotal: {formatCurrency(pricing.foodSubtotal)}
          </AlertDescription>
        </Alert>
      )}

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

      {/* Menu Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-primary" />
            Order Items
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Entrées */}
          {entreeItems.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2 text-muted-foreground">Entrées ({pricing.entreeCount} items)</p>
              <div className="space-y-2">
                {entreeItems.map(item => (
                  <div key={item.itemId} className="flex justify-between text-sm">
                    <span>{item.quantity}× {item.name} @ {formatCurrency(item.unitPrice)}</span>
                    <span>{formatCurrency(item.lineTotal)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Extras */}
          {extraItems.length > 0 && (
            <div className="pt-3 border-t">
              <p className="text-sm font-medium mb-2 text-muted-foreground">Sides, Desserts & Beverages</p>
              <div className="space-y-2">
                {extraItems.map(item => (
                  <div key={item.itemId} className="flex justify-between text-sm">
                    <span>{item.quantity}× {item.name} @ {formatCurrency(item.unitPrice)}</span>
                    <span>{formatCurrency(item.lineTotal)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Individual Packaging */}
          {formData.wantsIndividualPackaging && (
            <div className="pt-3 border-t">
              <p className="text-sm font-medium mb-1 text-muted-foreground flex items-center gap-1">
                <Package className="w-4 h-4" /> Individual Packaging
              </p>
              <p className="text-sm text-green-700 dark:text-green-400">Items will be individually wrapped</p>
            </div>
          )}

          {/* Paper Goods */}
          {formData.wantsPaperGoods && (
            <div className="pt-3 border-t">
              <p className="text-sm font-medium mb-1 text-muted-foreground flex items-center gap-1">
                <UtensilsCrossed className="w-4 h-4" /> Paper Plates, Utensils & Napkins
              </p>
              <p className="text-sm text-green-700 dark:text-green-400">Included free with your order</p>
            </div>
          )}

          {/* Chafing Dishes */}
          {formData.wantsChafingDishes && (
            <div className="pt-3 border-t">
              <p className="text-sm font-medium mb-1 text-muted-foreground flex items-center gap-1">
                <Flame className="w-4 h-4" /> Chafing Dishes
              </p>
              <p className="text-sm text-green-700 dark:text-green-400">Keep your food warm</p>
            </div>
          )}

          {/* Gluten-Free Substitutions */}
          {formData.glutenFreeCount > 0 && (
            <div className="pt-3 border-t">
              <p className="text-sm font-medium mb-1 text-muted-foreground flex items-center gap-1">
                <Wheat className="w-4 h-4" /> Gluten-Free Bread
              </p>
              <p className="text-sm text-green-700 dark:text-green-400">{formData.glutenFreeCount} sandwich{formData.glutenFreeCount > 1 ? 'es' : ''} with GF bread</p>
            </div>
          )}

          {/* Special Notes */}
          {formData.specialNotes && (
            <div className="pt-3 border-t">
              <p className="text-sm font-medium mb-1 text-muted-foreground">Special Requests</p>
              <p className="text-sm">{formData.specialNotes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pricing Breakdown - THIS IS WHERE ALL PRICING IS REVEALED */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            Pricing Breakdown
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Your final catering price based on {pricing.entreeCount} entrées
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Entrée Subtotal at Base Price */}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Entrées at base price ({pricing.entreeCount} items)</span>
            <span>{formatCurrency(pricing.entreeSubtotal)}</span>
          </div>

          {/* Bulk Discount - Highlighted */}
          {pricing.bulkDiscountPercent > 0 ? (
            <div className="flex justify-between items-center bg-green-50 dark:bg-green-900/20 rounded-md px-3 py-2 -mx-1">
              <span className="flex items-center gap-2 text-green-700 dark:text-green-400 font-medium">
                <Tag className="w-4 h-4" />
                Bulk Discount ({pricing.entreeCount} entrées @ {pricing.bulkDiscountPercent}% off)
              </span>
              <span className="text-green-700 dark:text-green-400 font-semibold">-{formatCurrency(pricing.bulkDiscountAmount)}</span>
            </div>
          ) : (
            <div className="flex justify-between items-center bg-muted/50 rounded-md px-3 py-2 -mx-1">
              <span className="text-muted-foreground text-sm">
                No bulk discount (add {25 - pricing.entreeCount} more entrées to unlock 5% off)
              </span>
              <span className="text-muted-foreground">—</span>
            </div>
          )}

          {/* Adjusted Entrée Subtotal */}
          {pricing.bulkDiscountPercent > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Discounted Entrée Subtotal</span>
              <span>{formatCurrency(pricing.discountedEntreeSubtotal)}</span>
            </div>
          )}

          {/* Extras Subtotal */}
          {pricing.extrasSubtotal > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sides, Desserts & Beverages</span>
              <span>{formatCurrency(pricing.extrasSubtotal)}</span>
            </div>
          )}

          <Separator />

          {/* Food Subtotal */}
          <div className="flex justify-between font-medium">
            <span>Food Subtotal</span>
            <span>{formatCurrency(pricing.foodSubtotal)}</span>
          </div>

          {/* Packaging Fee */}
          {pricing.packagingFee > 0 && (
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Package className="w-4 h-4" /> Individual Packaging
              </span>
              <span>{formatCurrency(pricing.packagingFee)}</span>
            </div>
          )}

          {/* Chafing Dish Fee */}
          {pricing.chafingDishFee > 0 && (
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Flame className="w-4 h-4" /> Chafing Dishes
              </span>
              <span>{formatCurrency(pricing.chafingDishFee)}</span>
            </div>
          )}

          {/* Gluten-Free Fee */}
          {pricing.glutenFreeFee > 0 && (
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Wheat className="w-4 h-4" /> Gluten-Free Bread ({formData.glutenFreeCount} sandwiches)
              </span>
              <span>{formatCurrency(pricing.glutenFreeFee)}</span>
            </div>
          )}

          {/* Gratuity */}
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Percent className="w-4 h-4" /> Gratuity (10%)
            </span>
            <span>{formatCurrency(pricing.gratuity)}</span>
          </div>

          {/* Delivery Fee */}
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Truck className="w-4 h-4" /> 
              Delivery
              {pricing.deliveryMilesOver10 > 0 && (
                <span className="text-xs">
                  ({pricing.deliveryMilesOver10.toFixed(0)} mi beyond free zone)
                </span>
              )}
            </span>
            <span>{pricing.deliveryFee > 0 ? formatCurrency(pricing.deliveryFee) : 'FREE'}</span>
          </div>

          <Separator />

          {/* Final Total */}
          <div className="flex justify-between text-xl font-bold pt-1">
            <span>Total Due</span>
            <span className="text-primary">{formatCurrency(pricing.finalTotal)}</span>
          </div>

          {/* Savings Summary */}
          {pricing.bulkDiscountAmount > 0 && (
            <div className="text-center pt-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                You saved {formatCurrency(pricing.bulkDiscountAmount)} with bulk pricing!
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Policies */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6 space-y-3">
          <div className="flex gap-2 text-sm">
            <AlertTriangle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <p className="text-muted-foreground">
              Orders are prepared fresh. Changes must be requested at least 48 hours before your event.
            </p>
          </div>
          <div className="flex gap-2 text-sm">
            <AlertTriangle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <p className="text-muted-foreground">
              Cancellations are fully refundable up to 7 days before your event date.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button 
          onClick={onNext} 
          size="lg" 
          disabled={pricing.isBelowMinimum}
        >
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};
