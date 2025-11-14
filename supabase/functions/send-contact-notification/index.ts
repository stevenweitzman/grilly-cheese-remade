import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactNotificationRequest {
  visitorName: string;
  visitorEmail: string;
  visitorPhone?: string;
  conversationId: string;
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
    const { visitorName, visitorEmail, visitorPhone, conversationId }: ContactNotificationRequest = await req.json();

    // Validate required fields
    if (!visitorName || !visitorEmail || !conversationId) {
      console.error('Missing required fields');
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    // Create notification email HTML
    const notificationHtml = `
      <div style="background: #f9fafb; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="background: white; max-width: 600px; margin: 0 auto; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #ea384c; margin: 0 0 20px 0; font-size: 24px;">🔔 New Chat Started!</h1>
          
          <p style="color: #374151; font-size: 16px; margin-bottom: 25px;">
            A visitor has just started a chat on your website. Here are their contact details:
          </p>
          
          <!-- Visitor Contact Info Box -->
          <div style="background: #fef2f2; border-left: 4px solid #ea384c; padding: 20px; margin-bottom: 25px; border-radius: 4px;">
            <h3 style="margin: 0 0 15px 0; font-size: 16px; color: #333;">Visitor Information</h3>
            <p style="margin: 8px 0; color: #555; font-size: 15px;"><strong>Name:</strong> ${escapeHtml(visitorName)}</p>
            <p style="margin: 8px 0; color: #555; font-size: 15px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(visitorEmail)}" style="color: #ea384c; text-decoration: none;">${escapeHtml(visitorEmail)}</a></p>
            <p style="margin: 8px 0; color: #555; font-size: 15px;"><strong>Phone:</strong> ${visitorPhone ? `<a href="tel:${escapeHtml(visitorPhone)}" style="color: #ea384c; text-decoration: none;">${escapeHtml(visitorPhone)}</a>` : '<span style="color: #9ca3af;">Not provided</span>'}</p>
            <p style="margin: 8px 0; color: #999; font-size: 13px;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background: #f3f4f6; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              💡 <strong>Tip:</strong> You'll receive a full chat transcript once the conversation ends or after 5 minutes of inactivity.
            </p>
          </div>
          
          <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
            <p style="margin: 0;">Conversation ID: ${escapeHtml(conversationId)}</p>
            <p style="margin: 5px 0 0 0;">This notification was automatically sent from your Grilly Cheese website chat.</p>
          </div>
        </div>
      </div>
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
        subject: `🔔 New Chat Started: ${escapeHtml(visitorName)}`,
        html: notificationHtml,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${errorData}`);
    }

    const emailData = await emailResponse.json();
    console.log("Contact notification email sent successfully:", emailData);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending contact notification:", error);
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
