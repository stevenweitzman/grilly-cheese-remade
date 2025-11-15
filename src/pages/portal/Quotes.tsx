import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import PortalHeader from "@/components/PortalHeader";

export default function Quotes() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuotes = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("quote_requests")
        .select("*")
        .eq("client_id", user.id)
        .order("created_at", { ascending: false });

      setQuotes(data || []);
      setLoading(false);
    };

    loadQuotes();
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
          <h1 className="text-3xl font-bold mb-2">My Quote Requests</h1>
          <p className="text-muted-foreground">View all your event quotes and their status</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : quotes.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No quotes yet. Contact us to get started!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {quotes.map((quote) => (
              <Link
                key={quote.id}
                to={`/portal/quotes/${quote.id}`}
                className="block"
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle>{quote.event_type}</CardTitle>
                          <Badge className={getStatusColor(quote.status)}>{quote.status}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-4 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(quote.event_date).toLocaleDateString()}
                          </span>
                          <span>{quote.guests} guests</span>
                          {quote.city && <span>{quote.city}, {quote.state}</span>}
                        </div>
                      </div>
                      {quote.quoted_amount && (
                        <div className="text-right">
                          <div className="font-bold text-xl">${Number(quote.quoted_amount).toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground">Quoted</div>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  {quote.notes && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">{quote.notes}</p>
                    </CardContent>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}