import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { UtensilsCrossed, Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/pricing";
import ProtectedRoute from "@/components/ProtectedRoute";
import PortalHeader from "@/components/PortalHeader";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface CateringOrder {
  id: string;
  event_name: string;
  event_date: string;
  event_time: string;
  guest_count: number;
  package_type: string;
  status: string;
  total_amount: number;
  city: string;
  state: string;
  created_at: string;
}

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

const CateringOrdersContent = () => {
  const [orders, setOrders] = useState<CateringOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('catering_orders')
        .select('id, event_name, event_date, event_time, guest_count, package_type, status, total_amount, city, state, created_at')
        .order('event_date', { ascending: false });

      if (!error && data) {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PortalHeader />
      <main className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Catering Orders</h1>
            <p className="text-muted-foreground">View and manage your drop-off catering orders</p>
          </div>
          <Button asChild>
            <Link to="/order/drop-off">
              <UtensilsCrossed className="w-4 h-4 mr-2" />
              New Order
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <UtensilsCrossed className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Orders Yet</h3>
              <p className="text-muted-foreground mb-6">Place your first drop-off catering order</p>
              <Button asChild>
                <Link to="/order/drop-off">Order Catering</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">{order.event_name}</h3>
                        <Badge className={statusColors[order.status] || "bg-gray-100"}>
                          {statusLabels[order.status] || order.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(order.event_date), "MMM d, yyyy")} at {order.event_time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {order.city}, {order.state}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {order.guest_count} guests
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="font-semibold text-lg">{formatCurrency(Number(order.total_amount))}</p>
                      </div>
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/portal/catering-orders/${order.id}`}>
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

const CateringOrders = () => (
  <ProtectedRoute>
    <CateringOrdersContent />
  </ProtectedRoute>
);

export default CateringOrders;
