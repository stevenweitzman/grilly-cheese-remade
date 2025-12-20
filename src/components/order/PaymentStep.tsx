import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle, AlertCircle, Loader2, Clock } from "lucide-react";
import { DropoffOrderFormData } from "@/types/cateringOrder";
import { calculateDropoffPricing, formatCurrency } from "@/lib/dropoff-pricing";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface PaymentStepProps {
  formData: DropoffOrderFormData;
  onSuccess: (orderId: string) => void;
  onBack: () => void;
  userId?: string;
}

export const PaymentStep = ({ formData, onSuccess, onBack, userId }: PaymentStepProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const pricing = calculateDropoffPricing(formData.cart, formData.distanceMiles, formData.wantsIndividualPackaging, formData.wantsChafingDishes, formData.glutenFreeCount);

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
        <h2 className="text-2xl font-bold text-foreground mb-2">Submit Your Order</h2>
        <p className="text-muted-foreground">Review complete — ready to submit</p>
      </div>

      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Order Total
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-4xl font-bold text-primary">{formatCurrency(pricing.finalTotal)}</p>
            <p className="text-sm text-muted-foreground mt-2">Payment link will be sent via email</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-200 bg-amber-50/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Clock className="w-8 h-8 text-amber-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-amber-900">What happens next?</h3>
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
                disabled={isProcessing}
                className="w-full h-14 text-lg"
                size="lg"
              >
                {isProcessing ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Confirming...</>
                ) : (
                  <>Confirm Order</>
                )}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                By submitting, you agree to our terms. No payment is required now.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {status === 'idle' && (
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>Back</Button>
        </div>
      )}
    </div>
  );
};
