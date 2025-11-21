import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { FileText, Upload, Download } from "lucide-react";
import PortalHeader from "@/components/PortalHeader";
import ProtectedSEO from "@/components/ProtectedSEO";

export default function Documents() {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Load quotes
    const { data: quotesData } = await supabase
      .from("quote_requests")
      .select("id, event_type, event_date")
      .eq("client_id", user.id)
      .order("event_date", { ascending: false });

    setQuotes(quotesData || []);

    // Load documents
    const { data: docsData } = await supabase
      .from("documents")
      .select("*, quote_requests(event_type)")
      .order("created_at", { ascending: false });

    setDocuments(docsData || []);
    setLoading(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !selectedQuote) return;

    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Generate unique file path
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${user.id}/${selectedQuote}/${fileName}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from("event_documents")
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // Create document record
      const { error: dbError } = await supabase.from("documents").insert({
        quote_request_id: selectedQuote,
        uploaded_by: user.id,
        file_name: selectedFile.name,
        file_path: filePath,
        file_size: selectedFile.size,
        file_type: selectedFile.type,
        description: description,
      });

      if (dbError) throw dbError;

      toast({
        title: "Upload Successful",
        description: "Your document has been uploaded.",
      });

      setSelectedFile(null);
      setDescription("");
      setSelectedQuote("");
      loadData();
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (doc: any) => {
    try {
      const { data, error } = await supabase.storage
        .from("event_documents")
        .download(doc.file_path);

      if (error) throw error;

      // Create download link
      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = doc.file_name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error: any) {
      toast({
        title: "Download Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <ProtectedSEO title="Documents" />
      <div className="min-h-screen bg-background">
        <PortalHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Documents</h1>
          <p className="text-muted-foreground">Upload and manage event-related documents</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Upload Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Document
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpload} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="quote">Related Quote</Label>
                    <select
                      id="quote"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={selectedQuote}
                      onChange={(e) => setSelectedQuote(e.target.value)}
                      required
                    >
                      <option value="">Select a quote...</option>
                      {quotes.map((quote) => (
                        <option key={quote.id} value={quote.id}>
                          {quote.event_type} - {new Date(quote.event_date).toLocaleDateString()}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="file">File (max 10MB)</Label>
                    <Input
                      id="file"
                      type="file"
                      onChange={handleFileSelect}
                      required
                    />
                    {selectedFile && (
                      <p className="text-xs text-muted-foreground">
                        {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description (optional)</Label>
                    <Input
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="What is this document?"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={uploading}>
                    {uploading ? "Uploading..." : "Upload Document"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Documents List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Your Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : documents.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No documents yet</p>
                ) : (
                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
                        <div className="flex items-center gap-3 flex-1">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{doc.file_name}</div>
                            <div className="text-xs text-muted-foreground">
                              {doc.quote_requests?.event_type} • {new Date(doc.created_at).toLocaleDateString()}
                            </div>
                            {doc.description && (
                              <div className="text-xs text-muted-foreground mt-1">{doc.description}</div>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(doc)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
          </Card>
        </div>
      </div>
    </main>
  </div>
  </>
  );
}