import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UtensilsCrossed, Calendar, Users, Eye, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/pricing";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";

type CateringOrderStatus = Database['public']['Enums']['catering_order_status'];

interface CateringOrder {
  id: string;
  event_name: string;
  event_date: string;
  event_time: string;
  guest_count: number;
  package_type: string;
  status: CateringOrderStatus;
  total_amount: number;
  contact_name: string;
  contact_email: string;
  city: string;
  state: string;
  created_at: string;
  payment_status: string | null;
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

const allStatuses: CateringOrderStatus[] = [
  'pending_payment',
  'pending_review',
  'confirmed',
  'in_prep',
  'ready_for_delivery',
  'delivered',
  'completed',
  'cancelled',
];

const AdminCateringOrders = () => {
  const [orders, setOrders] = useState<CateringOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const { toast } = useToast();

  const fetchOrders = async () => {
    setLoading(true);
    let query = supabase
      .from('catering_orders')
      .select('id, event_name, event_date, event_time, guest_count, package_type, status, total_amount, contact_name, contact_email, city, state, created_at, payment_status')
      .order('event_date', { ascending: true });

    if (filterStatus !== 'all') {
      query = query.eq('status', filterStatus as CateringOrderStatus);
    }

    const { data, error } = await query;

    if (!error && data) {
      setOrders(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [filterStatus]);

  const updateStatus = async (orderId: string, newStatus: CateringOrderStatus) => {
    const { error } = await supabase
      .from('catering_orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      toast({ title: "Error updating status", variant: "destructive" });
    } else {
      toast({ title: "Status updated" });
      fetchOrders();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Catering Orders</h1>
          <p className="text-muted-foreground">Manage drop-off catering orders</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {allStatuses.map(status => (
                <SelectItem key={status} value={status}>{statusLabels[status]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={fetchOrders}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 space-y-4">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 w-full" />)}
            </div>
          ) : orders.length === 0 ? (
            <div className="p-12 text-center">
              <UtensilsCrossed className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No catering orders found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.event_name}</p>
                        <p className="text-xs text-muted-foreground">{order.city}, {order.state}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(order.event_date), "MMM d, yyyy")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{order.contact_name}</p>
                        <p className="text-xs text-muted-foreground">{order.contact_email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {order.guest_count}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(Number(order.total_amount))}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={order.status}
                        onValueChange={(value) => updateStatus(order.id, value as CateringOrderStatus)}
                      >
                        <SelectTrigger className={`w-40 ${statusColors[order.status]}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {allStatuses.map(status => (
                            <SelectItem key={status} value={status}>{statusLabels[status]}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/admin/catering-orders/${order.id}`}>
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCateringOrders;
