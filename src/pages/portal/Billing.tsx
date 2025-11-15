import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, FileText } from "lucide-react";
import PortalHeader from "@/components/PortalHeader";

export default function Billing() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalBilled: 0,
    totalPaid: 0,
    balanceDue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBillingData();
  }, []);

  const loadBillingData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Load invoices with quote details
    const { data: invoicesData } = await supabase
      .from("invoices")
      .select("*, quote_requests!inner(event_type, event_date, client_id), payments(*)")
      .eq("quote_requests.client_id", user.id)
      .order("created_at", { ascending: false });

    setInvoices(invoicesData || []);

    // Calculate stats
    const totalBilled = invoicesData?.reduce((sum, inv) => sum + Number(inv.amount), 0) || 0;
    const totalPaid = invoicesData?.reduce((sum, inv) => sum + Number(inv.amount_paid), 0) || 0;
    const balanceDue = totalBilled - totalPaid;

    setStats({ totalBilled, totalPaid, balanceDue });
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-500";
      case "sent": return "bg-blue-500";
      case "overdue": return "bg-red-500";
      case "draft": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Billing & Payments</h1>
          <p className="text-muted-foreground">View invoices and payment history</p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Billed</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalBilled.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${stats.totalPaid.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Balance Due</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">${stats.balanceDue.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Invoices List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Invoices
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : invoices.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No invoices yet</p>
            ) : (
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">Invoice #{invoice.invoice_number}</h3>
                          <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {invoice.quote_requests?.event_type} • {new Date(invoice.quote_requests?.event_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">${Number(invoice.amount).toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">
                          Paid: ${Number(invoice.amount_paid).toFixed(2)}
                        </div>
                      </div>
                    </div>

                    {invoice.due_date && (
                      <p className="text-xs text-muted-foreground mb-2">
                        Due: {new Date(invoice.due_date).toLocaleDateString()}
                      </p>
                    )}

                    {invoice.payments && invoice.payments.length > 0 && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-sm font-medium mb-2">Payment History</p>
                        <div className="space-y-2">
                          {invoice.payments.map((payment: any) => (
                            <div key={payment.id} className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                {new Date(payment.payment_date).toLocaleDateString()} • {payment.payment_method}
                              </span>
                              <span className="font-medium text-green-600">
                                ${Number(payment.amount).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {invoice.notes && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-sm text-muted-foreground">{invoice.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}