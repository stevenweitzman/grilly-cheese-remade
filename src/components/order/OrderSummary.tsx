import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CalendarIcon, MapPin, Utensils, DollarSign, Truck, Percent, AlertTriangle, Tag, Package, UtensilsCrossed, Flame, Wheat, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { DropoffOrderFormData } from "@/types/cateringOrder";
import { calculateDropoffPricing, formatCurrency } from "@/lib/dropoff-pricing";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface OrderSummaryProps {
  formData: DropoffOrderFormData;
  onSuccess: (orderId: string) => void;
  onBack: () => void;
  userId?: string;
}

export const OrderSummary = ({ formData, onBack, onSuccess, userId }: OrderSummaryProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const { toast } = useToast();
  
  const pricing = calculateDropoffPricing(formData.cart, formData.distanceMiles, formData.wantsIndividualPackaging, formData.wantsChafingDishes, formData.glutenFreeCount);

  // Group cart items by category
  const entreeItems = formData.cart.filter(item => item.isEntree);
  const extraItems = formData.cart.filter(item => !item.isEntree);

  const handleSubmitOrder = async () => {
    // Check honeypot - if filled, it's likely a bot
    if (formData.website && formData.website.trim() !== '') {
      console.log('Bot detected via honeypot');
      // Silently fail for bots - show success but don't actually submit
      setStatus('success');
      toast({ 
        title: "Order submitted!", 
        description: "You'll receive a confirmation email with payment details shortly." 
      });
      return;
    }

    setIsProcessing(true);
    setStatus('processing');

    try {
      // Build order data
      const orderData = {
        client_id: userId || null,
        event_name: formData.eventName || 'Untitled Event',
        event_date: formData.eventDate?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
        event_time: formData.eventTime || '12:00 PM',
        contact_name: formData.contactName || 'Not provided',
        contact_email: formData.contactEmail || 'Not provided',
        contact_phone: formData.contactPhone || 'Not provided',
        address: formData.deliveryAddress.street || 'Not provided',
        city: formData.deliveryAddress.city || 'Not provided',
        state: formData.deliveryAddress.state,
        zip: formData.deliveryAddress.zip || '00000',
        
        // Item-based fields
        cart_items: JSON.parse(JSON.stringify(formData.cart)),
        entree_subtotal: pricing.entreeSubtotal,
        bulk_discount_percent: pricing.bulkDiscountPercent,
        bulk_discount_amount: pricing.bulkDiscountAmount,
        extras_subtotal: pricing.extrasSubtotal,
        food_subtotal: pricing.foodSubtotal,
        delivery_fee: pricing.deliveryFee,
        delivery_miles_over_free: pricing.deliveryMilesOver10,
        
        // Legacy fields
        package_type: 'simple' as const,
        guest_count: pricing.entreeCount,
        price_per_person: 0,
        selected_sandwiches: JSON.parse(JSON.stringify(formData.cart.filter(i => i.category === 'sandwich'))),
        selected_hotdogs: JSON.parse(JSON.stringify(formData.cart.filter(i => i.category === 'hotdog'))),
        
        // Common fields
        travel_distance_miles: formData.distanceMiles,
        travel_fee: pricing.deliveryFee,
        base_subtotal: pricing.foodSubtotal,
        gratuity: pricing.gratuity,
        total_amount: pricing.finalTotal,
        amount_charged: 0,
        payment_status: 'pending',
        status: 'pending_payment' as const,
        special_notes: formData.specialNotes || null,
      };

      // Insert order
      const { data: order, error } = await supabase
        .from('catering_orders')
        .insert([orderData])
        .select()
        .single();

      if (error) throw error;

      // Send notification email
      const { error: emailError } = await supabase.functions.invoke('send-order-notification', {
        body: {
          orderId: order.id,
          eventName: formData.eventName || 'Untitled Event',
          eventDate: formData.eventDate ? format(formData.eventDate, 'MMMM d, yyyy') : 'TBD',
          eventTime: formData.eventTime || 'TBD',
          contactName: formData.contactName || 'Not provided',
          contactEmail: formData.contactEmail || 'Not provided',
          contactPhone: formData.contactPhone || 'Not provided',
          address: formData.deliveryAddress.street || 'Not provided',
          city: formData.deliveryAddress.city || 'Not provided',
          state: formData.deliveryAddress.state,
          zip: formData.deliveryAddress.zip || '',
          cartItems: formData.cart,
          entreeSubtotal: pricing.entreeSubtotal,
          bulkDiscountPercent: pricing.bulkDiscountPercent,
          bulkDiscountAmount: pricing.bulkDiscountAmount,
          extrasSubtotal: pricing.extrasSubtotal,
          foodSubtotal: pricing.foodSubtotal,
          gratuity: pricing.gratuity,
          deliveryFee: pricing.deliveryFee,
          finalTotal: pricing.finalTotal,
          specialNotes: formData.specialNotes,
        },
      });

      if (emailError) {
        console.error('Email notification error:', emailError);
        // Don't fail the order, just log the error
      }

      setStatus('success');
      toast({ 
        title: "Order submitted!", 
        description: "You'll receive a confirmation email with payment details shortly." 
      });
      onSuccess(order.id);
    } catch (error) {
      console.error('Order submission error:', error);
      setStatus('error');
      toast({ 
        title: "Submission failed", 
        description: "Please try again or contact us directly.", 
        variant: "destructive" 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Review & Submit Your Order</h2>
        <p className="text-muted-foreground">Review all details before submitting</p>
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

      {/* Pricing Breakdown */}
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

      {/* What Happens Next */}
      <Card className="border-amber-200 bg-amber-50/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Clock className="w-8 h-8 text-amber-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-amber-900">What happens after you submit?</h3>
              <ul className="mt-2 space-y-1 text-sm text-amber-800">
                <li>• We'll review your order and confirm availability</li>
                <li>• You'll receive a confirmation email within 24 hours</li>
                <li>• The email will include a secure payment link</li>
                <li>• Your order is confirmed once payment is received</li>
              </ul>
            </div>
          </div>
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

      {/* Submission Status / Actions */}
      <Card>
        <CardContent className="pt-6">
          {status === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-xl font-semibold text-green-700">Order Submitted!</p>
              <p className="text-muted-foreground mt-2">Check your email for confirmation and payment details.</p>
            </div>
          ) : status === 'error' ? (
            <div className="text-center py-8">
              <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <p className="text-xl font-semibold text-destructive">Submission Failed</p>
              <p className="text-muted-foreground mt-2">
                Please try again or call us at{" "}
                <a href="tel:8444745591" className="text-primary hover:underline font-medium">844-474-5591</a>
              </p>
              <Button onClick={handleSubmitOrder} className="mt-4">Try Again</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Button
                onClick={handleSubmitOrder}
                disabled={isProcessing || pricing.isBelowMinimum}
                className="w-full h-14 text-lg"
                size="lg"
              >
                {isProcessing ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...</>
                ) : (
                  <>Submit Order</>
                )}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                No payment required now — you'll receive a payment link via email.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Back Button */}
      {status === 'idle' && (
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>Back</Button>
        </div>
      )}
    </div>
  );
};