import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Mail, Phone, Building } from "lucide-react";

export default function AdminClientDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [client, setClient] = useState<any>(null);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    loadClientData();
  }, [id]);

  const loadClientData = async () => {
    // Load client profile
    const { data: clientData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    setClient(clientData);

    // Load client's quotes
    const { data: quotesData } = await supabase
      .from("quote_requests")
      .select("*")
      .eq("client_id", id)
      .order("created_at", { ascending: false });

    setQuotes(quotesData || []);

    // Load client's invoices
    const { data: invoicesData } = await supabase
      .from("invoices")
      .select("*, quote_requests!inner(client_id)")
      .eq("quote_requests.client_id", id);

    setInvoices(invoicesData || []);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: client.full_name,
          phone: client.phone,
          company_name: client.company_name,
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Client Updated",
        description: "Client information has been saved.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const calculateTotals = () => {
    const totalQuoted = quotes.reduce((sum, q) => sum + (Number(q.quoted_amount) || 0), 0);
    const totalBilled = invoices.reduce((sum, inv) => sum + Number(inv.amount), 0);
    const totalPaid = invoices.reduce((sum, inv) => sum + Number(inv.amount_paid), 0);
    
    return { totalQuoted, totalBilled, totalPaid, balance: totalBilled - totalPaid };
  };

  if (loading || !client) {
    return (
      <div className="p-8">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  const totals = calculateTotals();

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link to="/admin/clients" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Clients
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{client.full_name}</h1>
        <p className="text-muted-foreground">{client.company_name || "Individual Client"}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Client Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    value={client.full_name || ""}
                    onChange={(e) => setClient({ ...client, full_name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      value={client.phone || ""}
                      onChange={(e) => setClient({ ...client, phone: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company_name">Company Name</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="company_name"
                      value={client.company_name || ""}
                      onChange={(e) => setClient({ ...client, company_name: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button type="submit" disabled={saving} className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t space-y-2 text-sm">
                <div className="text-muted-foreground">
                  Client since {new Date(client.created_at).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Quoted</span>
                <span className="font-medium">${totals.totalQuoted.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Billed</span>
                <span className="font-medium">${totals.totalBilled.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Paid</span>
                <span className="font-medium text-green-600">${totals.totalPaid.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t">
                <span className="font-semibold">Balance Due</span>
                <span className="font-semibold text-orange-600">${totals.balance.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quotes and Activity */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quote History ({quotes.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {quotes.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No quotes yet</p>
              ) : (
                <div className="space-y-3">
                  {quotes.map((quote) => (
                    <Link
                      key={quote.id}
                      to={`/admin/quotes/${quote.id}`}
                      className="block p-4 border rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{quote.event_type}</h3>
                            <Badge>{quote.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(quote.event_date).toLocaleDateString()} • {quote.guests} guests
                          </p>
                        </div>
                        {quote.quoted_amount && (
                          <div className="text-right">
                            <div className="font-bold">${Number(quote.quoted_amount).toFixed(2)}</div>
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Invoice History ({invoices.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {invoices.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No invoices yet</p>
              ) : (
                <div className="space-y-3">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">Invoice #{invoice.invoice_number}</h3>
                            <Badge>{invoice.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(invoice.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${Number(invoice.amount).toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground">
                            Paid: ${Number(invoice.amount_paid).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}