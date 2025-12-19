import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, MapPin, Users, Phone, Mail, UtensilsCrossed, DollarSign, Truck, CreditCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/pricing";
import ProtectedRoute from "@/components/ProtectedRoute";
import PortalHeader from "@/components/PortalHeader";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Tables } from "@/integrations/supabase/types";

type CateringOrder = Tables<'catering_orders'>;

const statusColors: Record<string, string> = {
  pending_payment: "bg-yellow-100 text-yellow-800",
  pending_review: "bg-blue-100 text-blue-800",
  confirmed: "bg-green-100 text-green-800",
  in_prep: "bg-purple-100 text-purple-800",
  ready_for_delivery: "bg-orange-100 text-orange-800",
  delivered: "bg-teal-100 text-teal-800",
  completed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusLabels: Record<string, string> = {
  pending_payment: "Pending Payment",
  pending_review: "Pending Review",
  confirmed: "Confirmed",
  in_prep: "In Preparation",
  ready_for_delivery: "Ready for Delivery",
  delivered: "Delivered",
  completed: "Completed",
  cancelled: "Cancelled",
};

const CateringOrderDetailContent = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<CateringOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;
      
      const { data, error } = await supabase
        .from('catering_orders')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        setOrder(data);
      }
      setLoading(false);
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <PortalHeader />
        <main className="container max-w-4xl mx-auto px-4 py-8">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-64 w-full" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <PortalHeader />
        <main className="container max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <Button asChild>
            <Link to="/portal/catering-orders">Back to Orders</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const sandwiches = (order.selected_sandwiches as any[]) || [];
  const hotdogs = (order.selected_hotdogs as any[]) || [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PortalHeader />
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/portal/catering-orders">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Link>
        </Button>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{order.event_name}</h1>
            <p className="text-muted-foreground">Order #{order.id.slice(0, 8).toUpperCase()}</p>
          </div>
          <Badge className={`${statusColors[order.status]} text-sm px-3 py-1`}>
            {statusLabels[order.status] || order.status}
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Event Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Event Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{format(new Date(order.event_date), "MMMM d, yyyy")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time</span>
                <span className="font-medium">{order.event_time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Guests</span>
                <span className="font-medium">{order.guest_count}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Package</span>
                <Badge variant="secondary">{order.package_type === 'simple' ? 'Simple Menu' : 'Full Menu'}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Contact & Delivery */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Delivery Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span>{order.contact_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{order.contact_email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{order.contact_phone}</span>
              </div>
              <Separator />
              <div>
                <p>{order.address}</p>
                <p>{order.city}, {order.state} {order.zip}</p>
              </div>
            </CardContent>
          </Card>

          {/* Menu Selections */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5 text-primary" />
                Menu Selections
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sandwiches.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Sandwiches</p>
                  <div className="flex flex-wrap gap-2">
                    {sandwiches.map((s: any, i: number) => (
                      <Badge key={i} variant="outline">{s.name || s.itemId}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {hotdogs.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Hot Dogs</p>
                  <div className="flex flex-wrap gap-2">
                    {hotdogs.map((h: any, i: number) => (
                      <Badge key={i} variant="outline">{h.name || h.itemId}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {(order.gluten_free_count > 0 || order.vegan_count > 0) && (
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">
                    Dietary: {order.gluten_free_count > 0 && `${order.gluten_free_count} GF`}
                    {order.gluten_free_count > 0 && order.vegan_count > 0 && ', '}
                    {order.vegan_count > 0 && `${order.vegan_count} Vegan`}
                  </p>
                </div>
              )}
              {order.include_desserts && (
                <Badge className="bg-accent text-accent-foreground">+ Desserts</Badge>
              )}
              {order.special_notes && (
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">{order.special_notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Base Subtotal</span>
                <span>{formatCurrency(Number(order.base_subtotal))}</span>
              </div>
              {Number(order.addons_total) > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Add-ons</span>
                  <span>{formatCurrency(Number(order.addons_total))}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span>Gratuity (10%)</span>
                <span>{formatCurrency(Number(order.gratuity))}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> Travel Fee</span>
                <span>{formatCurrency(Number(order.travel_fee))}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-primary">{formatCurrency(Number(order.total_amount))}</span>
              </div>
              <div className="flex justify-between text-sm pt-2">
                <span className="flex items-center gap-1"><CreditCard className="w-3 h-3" /> Paid</span>
                <span className="text-green-600">{formatCurrency(Number(order.amount_charged))}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const CateringOrderDetail = () => (
  <ProtectedRoute>
    <CateringOrderDetailContent />
  </ProtectedRoute>
);

export default CateringOrderDetail;
