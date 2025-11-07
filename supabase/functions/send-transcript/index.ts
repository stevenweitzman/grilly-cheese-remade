import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TranscriptRequest {
  conversationId: string;
  visitorName: string;
  visitorEmail: string;
  visitorPhone: string;
  messages: Array<{ role: string; content: string; created_at: string }>;
}

// HTML escape function to prevent XSS attacks
const escapeHtml = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { conversationId, visitorName, visitorEmail, visitorPhone, messages }: TranscriptRequest = await req.json();

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    // Format the transcript with HTML escaping to prevent XSS
    const transcriptHtml = `
      <h2>Chat Transcript</h2>
      <p><strong>Visitor:</strong> ${escapeHtml(visitorName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(visitorEmail)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(visitorPhone) || 'Not provided'}</p>
      <p><strong>Conversation ID:</strong> ${escapeHtml(conversationId)}</p>
      <hr>
      ${messages.map(msg => `
        <div style="margin: 15px 0; padding: 10px; background: ${msg.role === 'user' ? '#f0f0f0' : '#e3f2fd'}; border-radius: 5px;">
          <strong>${msg.role === 'user' ? 'Visitor' : 'Assistant'}:</strong>
          <p>${escapeHtml(msg.content)}</p>
          <small style="color: #666;">${new Date(msg.created_at).toLocaleString()}</small>
        </div>
      `).join('')}
    `;

    // Send email using Resend API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Grilly Cheese Chat <onboarding@resend.dev>",
        to: ["grillycheese@grillycheese.net"],
        subject: `New Lead: ${escapeHtml(visitorName)} - Chat Transcript`,
        html: transcriptHtml,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${errorData}`);
    }

    const emailData = await emailResponse.json();
    console.log("Transcript email sent successfully:", emailData);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending transcript:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);