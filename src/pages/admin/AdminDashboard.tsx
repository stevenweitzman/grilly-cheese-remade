import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, DollarSign, MessageSquare } from "lucide-react";
import ProtectedSEO from "@/components/ProtectedSEO";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalClients: 0,
    activeQuotes: 0,
    revenueThisMonth: 0,
    pendingQuotes: 0,
    unreadMessages: 0,
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    // Load clients count
    const { count: clientsCount } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    // Load quotes stats
    const { data: quotes } = await supabase
      .from("quote_requests")
      .select("*");

    const activeQuotes = quotes?.filter(q => q.status !== "completed" && q.status !== "cancelled").length || 0;
    const pendingQuotes = quotes?.filter(q => q.status === "pending").length || 0;

    // Calculate revenue this month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const { data: invoices } = await supabase
      .from("invoices")
      .select("amount_paid, created_at")
      .eq("status", "paid");

    const monthlyRevenue = invoices?.filter(inv => {
      const date = new Date(inv.created_at);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    }).reduce((sum, inv) => sum + Number(inv.amount_paid), 0) || 0;

    // Load unread messages
    const { count: unreadCount } = await supabase
      .from("communications")
      .select("*", { count: "exact", head: true })
      .is("read_at", null);

    setStats({
      totalClients: clientsCount || 0,
      activeQuotes,
      revenueThisMonth: monthlyRevenue,
      pendingQuotes,
      unreadMessages: unreadCount || 0,
    });

    // Load recent activity (recent quotes)
    const { data: recentQuotes } = await supabase
      .from("quote_requests")
      .select("*, profiles(full_name)")
      .order("created_at", { ascending: false })
      .limit(5);

    setRecentActivity(recentQuotes || []);
  };

  return (
    <>
      <ProtectedSEO title="Admin Dashboard" />
      <div className="p-8">
        <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of your business</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClients}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Quotes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeQuotes}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.pendingQuotes} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue (This Month)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.revenueThisMonth.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.unreadMessages}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Quote Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {recentActivity.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No recent activity</p>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((quote) => (
                <Link
                  key={quote.id}
                  to={`/admin/quotes/${quote.id}`}
                  className="block p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{quote.profiles?.full_name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {quote.event_type} • {quote.guests} guests
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(quote.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      {quote.status}
                    </div>
                  </div>
                </Link>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
</div>
</>
  );
}