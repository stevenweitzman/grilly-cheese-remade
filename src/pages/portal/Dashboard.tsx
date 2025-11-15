import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, MessageSquare, Upload, DollarSign, Calendar } from "lucide-react";
import PortalHeader from "@/components/PortalHeader";

export default function Dashboard() {
  const [stats, setStats] = useState({
    activeQuotes: 0,
    totalQuoted: 0,
    amountPaid: 0,
    balanceDue: 0,
    unreadMessages: 0,
  });
  const [recentQuotes, setRecentQuotes] = useState<any[]>([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Load quotes
      const { data: quotes } = await supabase
        .from("quote_requests")
        .select("*")
        .eq("client_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      setRecentQuotes(quotes || []);

      // Calculate stats
      const activeQuotes = quotes?.filter(q => q.status !== "completed" && q.status !== "cancelled").length || 0;
      const totalQuoted = quotes?.reduce((sum, q) => sum + (Number(q.quoted_amount) || 0), 0) || 0;

      // Load invoices
      const { data: invoices } = await supabase
        .from("invoices")
        .select("*, quote_requests!inner(client_id)")
        .eq("quote_requests.client_id", user.id);

      const amountPaid = invoices?.reduce((sum, inv) => sum + Number(inv.amount_paid), 0) || 0;
      const totalDue = invoices?.reduce((sum, inv) => sum + Number(inv.amount), 0) || 0;
      const balanceDue = totalDue - amountPaid;

      // Load unread messages
      const { data: messages } = await supabase
        .from("communications")
        .select("*")
        .eq("recipient_id", user.id)
        .is("read_at", null);

      setStats({
        activeQuotes,
        totalQuoted,
        amountPaid,
        balanceDue,
        unreadMessages: messages?.length || 0,
      });
    };

    loadDashboardData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "quoted": return "bg-blue-500";
      case "approved": return "bg-green-500";
      case "completed": return "bg-gray-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your account.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Quotes</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeQuotes}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Quoted</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalQuoted.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Amount Paid</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${stats.amountPaid.toFixed(2)}</div>
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

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Button asChild variant="outline" className="h-auto flex-col gap-2 py-4">
            <Link to="/portal/quotes">
              <FileText className="h-8 w-8" />
              <span>View Quotes</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto flex-col gap-2 py-4">
            <Link to="/portal/messages">
              <MessageSquare className="h-8 w-8" />
              <span>Messages {stats.unreadMessages > 0 && `(${stats.unreadMessages})`}</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto flex-col gap-2 py-4">
            <Link to="/portal/documents">
              <Upload className="h-8 w-8" />
              <span>Documents</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto flex-col gap-2 py-4">
            <Link to="/portal/billing">
              <DollarSign className="h-8 w-8" />
              <span>Billing</span>
            </Link>
          </Button>
        </div>

        {/* Recent Quotes */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Quote Requests</CardTitle>
            <CardDescription>Your latest event quotes</CardDescription>
          </CardHeader>
          <CardContent>
            {recentQuotes.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No quotes yet</p>
            ) : (
              <div className="space-y-4">
                {recentQuotes.map((quote) => (
                  <Link
                    key={quote.id}
                    to={`/portal/quotes/${quote.id}`}
                    className="block p-4 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{quote.event_type}</h3>
                          <Badge className={getStatusColor(quote.status)}>{quote.status}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(quote.event_date).toLocaleDateString()}
                          </span>
                          <span>{quote.guests} guests</span>
                        </div>
                      </div>
                      {quote.quoted_amount && (
                        <div className="text-right">
                          <div className="font-bold text-lg">${Number(quote.quoted_amount).toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground">Quoted Amount</div>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}