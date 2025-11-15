import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, FileText, MessageSquare } from "lucide-react";
import PortalHeader from "@/components/PortalHeader";

export default function QuoteDetail() {
  const { id } = useParams();
  const [quote, setQuote] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuoteDetails = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Load quote
      const { data: quoteData } = await supabase
        .from("quote_requests")
        .select("*")
        .eq("id", id)
        .eq("client_id", user.id)
        .single();

      setQuote(quoteData);

      // Load documents for this quote
      const { data: docsData } = await supabase
        .from("documents")
        .select("*")
        .eq("quote_request_id", id)
        .order("created_at", { ascending: false });

      setDocuments(docsData || []);
      setLoading(false);
    };

    loadQuoteDetails();
  }, [id]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <PortalHeader />
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="min-h-screen bg-background">
        <PortalHeader />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Quote not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/portal/quotes" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to Quotes
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Quote Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{quote.event_type}</CardTitle>
                    <Badge className={getStatusColor(quote.status)}>{quote.status}</Badge>
                  </div>
                  {quote.quoted_amount && (
                    <div className="text-right">
                      <div className="text-3xl font-bold">${Number(quote.quoted_amount).toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">Quoted Amount</div>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Event Date</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(quote.event_date).toLocaleDateString()}
                        {quote.event_time && ` at ${quote.event_time}`}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Guest Count</div>
                      <div className="text-sm text-muted-foreground">{quote.guests} guests</div>
                    </div>
                  </div>

                  {quote.address && (
                    <div className="flex items-start gap-2 sm:col-span-2">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="font-medium">Location</div>
                        <div className="text-sm text-muted-foreground">
                          {quote.address}<br />
                          {quote.city}, {quote.state} {quote.zip}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {quote.dietary_restrictions && (
                  <div>
                    <div className="font-medium mb-1">Dietary Restrictions</div>
                    <p className="text-sm text-muted-foreground">{quote.dietary_restrictions}</p>
                  </div>
                )}

                {quote.notes && (
                  <div>
                    <div className="font-medium mb-1">Notes</div>
                    <p className="text-sm text-muted-foreground">{quote.notes}</p>
                  </div>
                )}

                <div className="text-xs text-muted-foreground">
                  Requested on {new Date(quote.created_at).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Documents</CardTitle>
                  <Button asChild size="sm">
                    <Link to="/portal/documents">
                      <FileText className="h-4 w-4 mr-2" />
                      View All
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {documents.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No documents yet</p>
                ) : (
                  <div className="space-y-2">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium text-sm">{doc.file_name}</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(doc.created_at).toLocaleDateString()}
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

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/portal/messages">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/portal/documents">
                    <FileText className="h-4 w-4 mr-2" />
                    Upload Document
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {quote.final_amount && (
              <Card>
                <CardHeader>
                  <CardTitle>Final Amount</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    ${Number(quote.final_amount).toFixed(2)}
                  </div>
                  <Button asChild className="w-full mt-4">
                    <Link to="/portal/billing">View Billing</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}