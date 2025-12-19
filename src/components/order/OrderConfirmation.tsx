import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { CateringOrderFormData } from "@/types/cateringOrder";
import { calculateFullPricing, formatCurrency } from "@/lib/pricing";
import { format } from "date-fns";

interface OrderConfirmationProps {
  formData: CateringOrderFormData;
  orderId: string;
  isLoggedIn: boolean;
}

export const OrderConfirmation = ({ formData, orderId, isLoggedIn }: OrderConfirmationProps) => {
  const pricing = calculateFullPricing(
    formData.packageType,
    formData.guestCount,
    formData.distanceMiles,
    formData.includeDesserts
  );

  return (
    <div className="max-w-2xl mx-auto space-y-8 text-center">
      <div className="py-8">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground">Thank you for your order. We'll be in touch soon!</p>
        <p className="text-sm text-muted-foreground mt-2">Order ID: {orderId.slice(0, 8).toUpperCase()}</p>
      </div>

      <Card>
        <CardContent className="pt-6 text-left space-y-4">
          <h3 className="font-semibold text-lg">Order Summary</h3>
          <div className="grid gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{formData.eventName} - {formData.eventDate ? format(formData.eventDate, "PPP") : ''} at {formData.eventTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{formData.deliveryAddress.street}, {formData.deliveryAddress.city}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              <span>{formData.contactPhone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <span>{formData.contactEmail}</span>
            </div>
          </div>
          <div className="pt-4 border-t flex justify-between font-semibold">
            <span>Total Paid</span>
            <span className="text-primary">{formatCurrency(pricing.total)}</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {isLoggedIn ? (
          <Button asChild size="lg">
            <Link to="/portal/catering-orders">View My Orders</Link>
          </Button>
        ) : (
          <Button asChild size="lg">
            <Link to="/auth">Create Account to Track Order</Link>
          </Button>
        )}
        <Button variant="outline" asChild size="lg">
          <Link to="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
};
