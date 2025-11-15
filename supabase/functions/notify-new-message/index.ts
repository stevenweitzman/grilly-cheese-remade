import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface MessageNotificationRequest {
  recipientEmail: string;
  recipientName: string;
  senderName: string;
  subject: string;
  messagePreview: string;
  quoteId: string;
  isAdminRecipient: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      recipientEmail, 
      recipientName, 
      senderName, 
      subject, 
      messagePreview,
      quoteId,
      isAdminRecipient 
    } = await req.json() as MessageNotificationRequest;
    
    console.log("Sending new message notification:", { recipientEmail, isAdminRecipient });

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const portalLink = isAdminRecipient 
      ? `https://${supabaseUrl.split('//')[1]?.split('.')[0]}.lovable.app/admin/quotes/${quoteId}`
      : `https://${supabaseUrl.split('//')[1]?.split('.')[0]}.lovable.app/portal/messages`;

    const emailHtml = generateMessageNotificationEmail(
      recipientName, 
      senderName, 
      subject, 
      messagePreview, 
      portalLink
    );

    const emailResponse = await resend.emails.send({
      from: "Grilly Cheese <grillycheese@grillycheese.net>",
      to: [recipientEmail],
      subject: `New Message: ${subject}`,
      html: emailHtml,
    });

    console.log("Message notification email sent:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, emailId: emailResponse.data?.id }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending message notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

function generateMessageNotificationEmail(
  recipientName: string, 
  senderName: string, 
  subject: string, 
  messagePreview: string,
  portalLink: string
): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #f5f5f5; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .header { background: #ff6b00; color: white; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { padding: 30px; }
          .message-box { background: #f9f9f9; padding: 20px; border-left: 4px solid #ff6b00; margin: 20px 0; border-radius: 4px; }
          .message-subject { font-size: 18px; font-weight: bold; margin-bottom: 10px; color: #333; }
          .message-preview { color: #666; font-style: italic; }
          .button { display: inline-block; background: #ff6b00; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
          .button:hover { background: #e55f00; }
          .footer { background: #f9f9f9; padding: 20px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💬 New Message</h1>
          </div>
          <div class="content">
            <p>Hi ${recipientName},</p>
            <p>You have a new message from <strong>${senderName}</strong>:</p>
            <div class="message-box">
              <div class="message-subject">${subject}</div>
              <div class="message-preview">${messagePreview.substring(0, 150)}${messagePreview.length > 150 ? '...' : ''}</div>
            </div>
            <div style="text-align: center;">
              <a href="${portalLink}" class="button">View Message</a>
            </div>
            <p style="margin-top: 20px; color: #666; font-size: 14px;">To reply, please log in to your portal and respond there.</p>
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
