import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface StatusChangeRequest {
  quoteId: string;
  newStatus: string;
  clientEmail: string;
  clientName: string;
  eventType: string;
  quotedAmount?: number;
}

// HTML escape function to prevent XSS
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
    const { quoteId, newStatus, clientEmail, clientName, eventType, quotedAmount } = await req.json() as StatusChangeRequest;
    
    console.log("Sending status change notification:", { quoteId, newStatus, clientEmail });

    const siteUrl = Deno.env.get('SITE_URL') || 'https://grillycheese.net';
    const portalLink = `${siteUrl}/portal/quotes/${escapeHtml(quoteId)}`;

    // Escape user-provided values before using in email
    const safeClientName = escapeHtml(clientName);
    const safeEventType = escapeHtml(eventType);

    const emailHtml = generateStatusChangeEmail(safeClientName, safeEventType, newStatus, quotedAmount, portalLink);

    const emailResponse = await resend.emails.send({
      from: "Grilly Cheese <grillycheese@grillycheese.net>",
      to: [clientEmail],
      subject: `Quote Update: ${safeEventType} - ${formatStatus(newStatus)}`,
      html: emailHtml,
    });

    console.log("Status change email sent:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, emailId: emailResponse.data?.id }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending status change notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

function formatStatus(status: string): string {
  const statusMap: Record<string, string> = {
    'pending': 'Pending Review',
    'quoted': 'Quote Ready',
    'approved': 'Approved',
    'completed': 'Completed',
    'cancelled': 'Cancelled'
  };
  return statusMap[status] || status;
}

function generateStatusChangeEmail(clientName: string, eventType: string, status: string, quotedAmount?: number, portalLink?: string): string {
  const statusMessages: Record<string, { title: string; message: string; color: string }> = {
    'quoted': {
      title: '📊 Your Quote is Ready!',
      message: `We've prepared a quote for your ${eventType}. ${quotedAmount ? `The quoted amount is $${quotedAmount.toFixed(2)}.` : ''} Review the details in your portal.`,
      color: '#0066cc'
    },
    'approved': {
      title: '✅ Quote Approved!',
      message: `Great news! Your ${eventType} quote has been approved. We're excited to cater your event!`,
      color: '#00cc66'
    },
    'completed': {
      title: '🎉 Event Completed!',
      message: `Thank you for choosing Grilly Cheese for your ${eventType}! We hope your event was a success.`,
      color: '#ff6b00'
    },
    'cancelled': {
      title: '❌ Quote Cancelled',
      message: `Your quote for ${eventType} has been cancelled. If this was a mistake, please contact us.`,
      color: '#cc0000'
    }
  };

  const statusInfo = statusMessages[status] || {
    title: `Quote Status Update`,
    message: `Your ${eventType} quote status has been updated to: ${formatStatus(status)}`,
    color: '#666666'
  };

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #f5f5f5; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .header { background: ${statusInfo.color}; color: white; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { padding: 30px; }
          .message { background: #f9f9f9; padding: 20px; border-radius: 6px; margin: 20px 0; }
          .button { display: inline-block; background: #ff6b00; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
          .button:hover { background: #e55f00; }
          .footer { background: #f9f9f9; padding: 20px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${statusInfo.title}</h1>
          </div>
          <div class="content">
            <p>Hi ${clientName},</p>
            <div class="message">
              ${statusInfo.message}
            </div>
            ${portalLink ? `
              <div style="text-align: center;">
                <a href="${portalLink}" class="button">View in Portal</a>
              </div>
            ` : ''}
            <p>If you have any questions, feel free to reach out to us at <a href="mailto:grillycheese@grillycheese.net">grillycheese@grillycheese.net</a> or call us at <a href="tel:8444745591">844-474-5591</a>.</p>
            <p>Best regards,<br><strong>The Grilly Cheese Team</strong></p>
          </div>
          <div class="footer">
            <p>Grilly Cheese - Award-Winning Food Truck Catering</p>
            <p>844-474-5591 | grillycheese@grillycheese.net</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

serve(handler);