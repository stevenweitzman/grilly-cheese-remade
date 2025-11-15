import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";

export default function AdminQuoteEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [quote, setQuote] = useState<any>(null);

  useEffect(() => {
    loadQuote();
  }, [id]);

  const loadQuote = async () => {
    const { data } = await supabase
      .from("quote_requests")
      .select("*, profiles(full_name, phone)")
      .eq("id", id)
      .single();

    setQuote(data);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from("quote_requests")
        .update({
          status: quote.status,
          quoted_amount: quote.quoted_amount,
          final_amount: quote.final_amount,
          admin_notes: quote.admin_notes,
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Quote Updated",
        description: "The quote has been saved successfully.",
      });

      navigate("/admin/quotes");
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

  if (loading || !quote) {
    return (
      <div className="p-8">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link to="/admin/quotes" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Quotes
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Edit Quote</h1>
        <p className="text-muted-foreground">
          {quote.profiles?.full_name} • {quote.event_type}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Quote Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      value={quote.status}
                      onChange={(e) => setQuote({ ...quote, status: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="quoted">Quoted</option>
                      <option value="approved">Approved</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quoted_amount">Quoted Amount ($)</Label>
                    <Input
                      id="quoted_amount"
                      type="number"
                      step="0.01"
                      value={quote.quoted_amount || ""}
                      onChange={(e) => setQuote({ ...quote, quoted_amount: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="final_amount">Final Amount ($)</Label>
                    <Input
                      id="final_amount"
                      type="number"
                      step="0.01"
                      value={quote.final_amount || ""}
                      onChange={(e) => setQuote({ ...quote, final_amount: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin_notes">Admin Notes (Internal Only)</Label>
                  <Textarea
                    id="admin_notes"
                    value={quote.admin_notes || ""}
                    onChange={(e) => setQuote({ ...quote, admin_notes: e.target.value })}
                    rows={4}
                    placeholder="Internal notes about this quote..."
                  />
                </div>

                <Button type="submit" disabled={saving}>
                  <Save className="mr-2 h-4 w-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <div className="font-medium mb-1">Event Date</div>
                <div className="text-muted-foreground">
                  {new Date(quote.event_date).toLocaleDateString()}
                </div>
              </div>
              <div>
                <div className="font-medium mb-1">Guest Count</div>
                <div className="text-muted-foreground">{quote.guests}</div>
              </div>
              {quote.address && (
                <div>
                  <div className="font-medium mb-1">Location</div>
                  <div className="text-muted-foreground">
                    {quote.address}<br />
                    {quote.city}, {quote.state} {quote.zip}
                  </div>
                </div>
              )}
              {quote.dietary_restrictions && (
                <div>
                  <div className="font-medium mb-1">Dietary Restrictions</div>
                  <div className="text-muted-foreground">{quote.dietary_restrictions}</div>
                </div>
              )}
              {quote.notes && (
                <div>
                  <div className="font-medium mb-1">Client Notes</div>
                  <div className="text-muted-foreground">{quote.notes}</div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Client Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <div className="font-medium">{quote.profiles?.full_name}</div>
                <div className="text-muted-foreground">{quote.profiles?.phone}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}