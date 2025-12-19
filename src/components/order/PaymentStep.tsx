import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Lock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { CateringOrderFormData } from "@/types/cateringOrder";
import { calculateFullPricing, formatCurrency, DEPOSIT_PERCENTAGE } from "@/lib/pricing";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PaymentStepProps {
  formData: CateringOrderFormData;
  onSuccess: (orderId: string) => void;
  onBack: () => void;
  userId?: string;
}

export const PaymentStep = ({ formData, onSuccess, onBack, userId }: PaymentStepProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const pricing = calculateFullPricing(
    formData.packageType,
    formData.guestCount,
    formData.distanceMiles,
    formData.includeDesserts
  );

  const amountDue = pricing.total * DEPOSIT_PERCENTAGE;

  const handlePayPalPayment = async () => {
    setIsProcessing(true);
    setPaymentStatus('processing');

    try {
      // Simulate PayPal payment (placeholder)
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockTransactionId = `PAYPAL-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      const orderData = {
        client_id: userId || null,
        package_type: formData.packageType as 'simple' | 'full',
        guest_count: formData.guestCount,
        price_per_person: pricing.pricePerPerson || 0,
        event_name: formData.eventName,
        event_date: formData.eventDate?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
        event_time: formData.eventTime || '12:00',
        contact_name: formData.contactName,
        contact_email: formData.contactEmail,
        contact_phone: formData.contactPhone,
        address: formData.deliveryAddress.street,
        city: formData.deliveryAddress.city,
        state: formData.deliveryAddress.state,
        zip: formData.deliveryAddress.zip,
        travel_distance_miles: formData.distanceMiles,
        travel_fee: pricing.travelFee,
        selected_sandwiches: JSON.parse(JSON.stringify(formData.selectedSandwiches)),
        selected_hotdogs: JSON.parse(JSON.stringify(formData.selectedHotDogs)),
        gluten_free_count: formData.dietaryOptions.glutenFreeCount,
        vegan_count: formData.dietaryOptions.veganCount,
        include_desserts: formData.includeDesserts,
        base_subtotal: pricing.cateringSubtotal,
        addons_total: pricing.dessertCost,
        gratuity: pricing.gratuity,
        total_amount: pricing.total,
        amount_charged: amountDue,
        payment_status: 'paid',
        paypal_transaction_id: mockTransactionId,
        status: 'pending_review' as const,
        special_notes: formData.dietaryOptions.specialNotes || null,
        minimum_charge_applied: pricing.minimumApplied,
        paid_at: new Date().toISOString(),
      };

      const { data: order, error } = await supabase
        .from('catering_orders')
        .insert([orderData])
        .select()
        .single();

      if (error) throw error;

      setPaymentStatus('success');
      toast({ title: "Payment successful!", description: "Your order has been placed." });
      onSuccess(order.id);
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
      toast({ title: "Payment failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Complete Payment</h2>
        <p className="text-muted-foreground">Secure payment powered by PayPal</p>
      </div>

      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Amount Due
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-4xl font-bold text-primary">{formatCurrency(amountDue)}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {DEPOSIT_PERCENTAGE === 1 ? 'Full payment' : `${DEPOSIT_PERCENTAGE * 100}% deposit`}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          {paymentStatus === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-xl font-semibold text-green-700">Payment Successful!</p>
            </div>
          ) : paymentStatus === 'error' ? (
            <div className="text-center py-8">
              <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <p className="text-xl font-semibold text-destructive">Payment Failed</p>
              <Button onClick={handlePayPalPayment} className="mt-4">Try Again</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Button
                onClick={handlePayPalPayment}
                disabled={isProcessing}
                className="w-full h-14 text-lg bg-[#0070ba] hover:bg-[#005ea6]"
              >
                {isProcessing ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</>
                ) : (
                  <>Pay with PayPal</>
                )}
              </Button>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-4 h-4" />
                <span>Secure payment - Your data is protected</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {paymentStatus === 'idle' && (
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>Back</Button>
        </div>
      )}
    </div>
  );
};
