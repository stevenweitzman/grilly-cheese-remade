import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

// Create Supabase client with service role to bypass RLS
const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TranscriptRequest {
  conversationId: string;
  visitorName: string;
  visitorEmail: string;
  visitorPhone?: string;
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
    const { conversationId, visitorName, visitorEmail, visitorPhone }: TranscriptRequest = await req.json();

    // Validate conversation ID is provided
    if (!conversationId || typeof conversationId !== 'string') {
      console.error('Invalid conversation ID');
      return new Response(
        JSON.stringify({ error: 'Invalid conversation ID' }),
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

    // Check if conversation exists and hasn't already sent transcript
    const { data: existingConversation, error: fetchError } = await supabaseAdmin
      .from('conversations')
      .select('id, transcript_sent, ended_at')
      .eq('id', conversationId)
      .single();

    if (fetchError || !existingConversation) {
      console.error('Conversation not found:', fetchError);
      return new Response(
        JSON.stringify({ error: 'Conversation not found' }),
        {
          status: 404,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Prevent duplicate transcript sends (spam protection)
    if (existingConversation.transcript_sent) {
      console.warn('Transcript already sent for conversation:', conversationId);
      return new Response(
        JSON.stringify({ error: 'Transcript already sent for this conversation' }),
        {
          status: 409,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Mark conversation as ended using service role
    const { error: updateError } = await supabaseAdmin
      .from('conversations')
      .update({ 
        ended_at: new Date().toISOString(),
        transcript_sent: true 
      })
      .eq('id', conversationId)
      .eq('transcript_sent', false); // Double-check to prevent race conditions

    if (updateError) {
      console.error('Error updating conversation:', updateError);
      throw new Error('Failed to update conversation');
    }

    // Get all messages using service role
    const { data: messages, error: messagesError } = await supabaseAdmin
      .from('chat_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (messagesError) {
      console.error('Error fetching messages:', messagesError);
      throw new Error('Failed to fetch messages');
    }

    if (!messages || messages.length === 0) {
      throw new Error('No messages found for conversation');
    }

    // Format the transcript with HTML escaping to prevent XSS
    const transcriptHtml = `
      <div style="background: #f9fafb; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="background: white; max-width: 600px; margin: 0 auto; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #ea384c; margin: 0 0 20px 0; font-size: 24px;">New Chat Transcript</h1>
          
          <!-- Visitor Contact Info Box -->
          <div style="background: #fef2f2; border-left: 4px solid #ea384c; padding: 15px; margin-bottom: 25px; border-radius: 4px;">
            <h3 style="margin: 0 0 12px 0; font-size: 16px; color: #333;">Visitor Information</h3>
            <p style="margin: 5px 0; color: #555;"><strong>Name:</strong> ${escapeHtml(visitorName)}</p>
            <p style="margin: 5px 0; color: #555;"><strong>Email:</strong> <a href="mailto:${escapeHtml(visitorEmail)}" style="color: #ea384c;">${escapeHtml(visitorEmail)}</a></p>
            <p style="margin: 5px 0; color: #555;"><strong>Phone:</strong> ${visitorPhone ? `<a href="tel:${escapeHtml(visitorPhone)}" style="color: #ea384c;">${escapeHtml(visitorPhone)}</a>` : 'Not provided'}</p>
            <p style="margin: 5px 0; color: #555;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            <p style="margin: 5px 0; color: #999; font-size: 12px;"><strong>Conversation ID:</strong> ${escapeHtml(conversationId)}</p>
          </div>
          
          <!-- Chat Transcript -->
          <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #333;">Conversation Transcript</h3>
          <div style="border-top: 1px solid #e5e7eb; padding-top: 15px;">
            ${messages.map(msg => `
              <div style="margin: 15px 0; padding: 12px; background: ${msg.role === 'user' ? '#f3f4f6' : '#e0f2fe'}; border-radius: 6px; border-left: 3px solid ${msg.role === 'user' ? '#6b7280' : '#0ea5e9'};">
                <strong style="color: ${msg.role === 'user' ? '#374151' : '#0369a1'}; font-size: 14px;">${msg.role === 'user' ? '👤 Visitor' : '🤖 Assistant'}:</strong>
                <p style="margin: 8px 0 4px 0; color: #1f2937; white-space: pre-wrap;">${escapeHtml(msg.content)}</p>
                <small style="color: #6b7280; font-size: 11px;">${new Date(msg.created_at).toLocaleString()}</small>
              </div>
            `).join('')}
          </div>
          
          <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
            <p style="margin: 0;">This chat transcript was automatically sent from your Grilly Cheese website.</p>
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
        subject: `New Chat Lead: ${escapeHtml(visitorName)}`,
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