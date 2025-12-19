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

      // Save order to database
      const { data: order, error } = await supabase
        .from('catering_orders')
        .insert({
          client_id: userId || null,
          package_type: formData.packageType,
          guest_count: formData.guestCount,
          event_name: formData.eventName,
          event_date: formData.eventDate?.toISOString().split('T')[0],
          event_time: formData.eventTime,
          contact_name: formData.contactName,
          contact_email: formData.contactEmail,
          contact_phone: formData.contactPhone,
          delivery_street: formData.deliveryAddress.street,
          delivery_city: formData.deliveryAddress.city,
          delivery_state: formData.deliveryAddress.state,
          delivery_zip: formData.deliveryAddress.zip,
          distance_miles: formData.distanceMiles,
          menu_selections: {
            sandwiches: formData.selectedSandwiches,
            hotDogs: formData.selectedHotDogs,
            dietary: formData.dietaryOptions,
          },
          include_desserts: formData.includeDesserts,
          catering_subtotal: pricing.cateringSubtotal,
          dessert_cost: pricing.dessertCost,
          gratuity_amount: pricing.gratuity,
          travel_fee: pricing.travelFee,
          total_amount: pricing.total,
          deposit_amount: amountDue,
          amount_paid: amountDue,
          payment_status: 'paid',
          paypal_transaction_id: mockTransactionId,
          order_status: 'pending_review',
          special_notes: formData.dietaryOptions.specialNotes || null,
        })
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
