import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Calendar, MapPin, Users, Phone, Mail, UtensilsCrossed, DollarSign, Truck, CreditCard, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/pricing";
import { useToast } from "@/hooks/use-toast";
import { Tables, Database } from "@/integrations/supabase/types";

type CateringOrder = Tables<'catering_orders'>;
type CateringOrderStatus = Database['public']['Enums']['catering_order_status'];

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
  'pending_payment', 'pending_review', 'confirmed', 'in_prep',
  'ready_for_delivery', 'delivered', 'completed', 'cancelled',
];

const AdminCateringOrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<CateringOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminNotes, setAdminNotes] = useState('');
  const [status, setStatus] = useState<CateringOrderStatus>('pending_review');
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

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
        setAdminNotes(data.admin_notes || '');
        setStatus(data.status);
      }
      setLoading(false);
    };

    fetchOrder();
  }, [id]);

  const handleSave = async () => {
    if (!id) return;
    setSaving(true);

    const { error } = await supabase
      .from('catering_orders')
      .update({ status, admin_notes: adminNotes })
      .eq('id', id);

    if (error) {
      toast({ title: "Error saving", variant: "destructive" });
    } else {
      toast({ title: "Order updated" });
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="p-8"><Skeleton className="h-64 w-full" /></div>;
  }

  if (!order) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <Button asChild><Link to="/admin/catering-orders">Back to Orders</Link></Button>
      </div>
    );
  }

  const sandwiches = (order.selected_sandwiches as any[]) || [];
  const hotdogs = (order.selected_hotdogs as any[]) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link to="/admin/catering-orders"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{order.event_name}</h1>
            <p className="text-muted-foreground">Order #{order.id.slice(0, 8).toUpperCase()}</p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />{saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Event Details</CardTitle></CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <div><span className="text-sm text-muted-foreground">Date</span><p className="font-medium">{format(new Date(order.event_date), "MMMM d, yyyy")} at {order.event_time}</p></div>
              <div><span className="text-sm text-muted-foreground">Guests</span><p className="font-medium">{order.guest_count}</p></div>
              <div><span className="text-sm text-muted-foreground">Package</span><p className="font-medium">{order.package_type === 'simple' ? 'Simple Menu' : 'Full Menu'}</p></div>
              <div><span className="text-sm text-muted-foreground">Location</span><p className="font-medium">{order.address}, {order.city}, {order.state} {order.zip}</p></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Contact</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <p><Users className="inline w-4 h-4 mr-2" />{order.contact_name}</p>
              <p><Mail className="inline w-4 h-4 mr-2" />{order.contact_email}</p>
              <p><Phone className="inline w-4 h-4 mr-2" />{order.contact_phone}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Menu</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {sandwiches.length > 0 && <div><p className="text-sm font-medium mb-1">Sandwiches</p><div className="flex flex-wrap gap-1">{sandwiches.map((s: any, i: number) => <Badge key={i} variant="outline">{s.name || s.itemId}</Badge>)}</div></div>}
              {hotdogs.length > 0 && <div><p className="text-sm font-medium mb-1">Hot Dogs</p><div className="flex flex-wrap gap-1">{hotdogs.map((h: any, i: number) => <Badge key={i} variant="outline">{h.name || h.itemId}</Badge>)}</div></div>}
              {(order.gluten_free_count > 0 || order.vegan_count > 0) && <p className="text-sm text-muted-foreground">Dietary: {order.gluten_free_count} GF, {order.vegan_count} Vegan</p>}
              {order.include_desserts && <Badge>+ Desserts</Badge>}
              {order.special_notes && <div className="pt-2 border-t"><p className="text-sm">{order.special_notes}</p></div>}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Status</CardTitle></CardHeader>
            <CardContent>
              <Select value={status} onValueChange={(v) => setStatus(v as CateringOrderStatus)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {allStatuses.map(s => <SelectItem key={s} value={s}>{statusLabels[s]}</SelectItem>)}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Pricing</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Base Subtotal</span><span>{formatCurrency(Number(order.base_subtotal))}</span></div>
              {Number(order.addons_total) > 0 && <div className="flex justify-between"><span>Add-ons</span><span>{formatCurrency(Number(order.addons_total))}</span></div>}
              <div className="flex justify-between"><span>Gratuity</span><span>{formatCurrency(Number(order.gratuity))}</span></div>
              <div className="flex justify-between"><span>Travel</span><span>{formatCurrency(Number(order.travel_fee))}</span></div>
              <Separator />
              <div className="flex justify-between font-semibold text-base"><span>Total</span><span>{formatCurrency(Number(order.total_amount))}</span></div>
              <div className="flex justify-between text-green-600"><span>Paid</span><span>{formatCurrency(Number(order.amount_charged))}</span></div>
              {order.paypal_transaction_id && <p className="text-xs text-muted-foreground pt-2">PayPal: {order.paypal_transaction_id}</p>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Admin Notes</CardTitle></CardHeader>
            <CardContent>
              <Textarea value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} rows={4} placeholder="Internal notes..." />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminCateringOrderDetail;
