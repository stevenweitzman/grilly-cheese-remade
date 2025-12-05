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

interface QuickQuoteRequest {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  guestCount: string;
  eventType: string;
}

interface EventRequest {
  eventType: string;
  guests: string;
  dietaryRestrictions: string;
  drinks: string;
  eventDate: string;
  eventTime: string;
  propertyType: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  additionalInfo?: string;
  name: string;
  email: string;
  phone: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formType, formData } = await req.json();
    
    console.log("Processing quote request:", { formType, email: formData.email });

    // Check if user exists with this email, create profile if not
    let clientId: string | null = null;
    
    // First check if auth user exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existingUser = existingUsers?.users.find(u => u.email === formData.email);
    
    if (existingUser) {
      clientId = existingUser.id;
    } else {
      // Create a profile for non-authenticated submissions (they can claim it later)
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .insert({
          full_name: formData.name,
          phone: formData.phone || formData.phone,
        })
        .select()
        .single();
      
      if (!profileError && profile) {
        clientId = profile.id;
      }
    }

    // Create quote request in database if we have a client ID
    let quoteId: string | null = null;
    if (clientId) {
      const quoteData = formType === "quick" ? {
        client_id: clientId,
        event_type: formData.eventType || "Quick Quote",
        event_date: formData.eventDate,
        event_time: formData.eventStartTime || null,
        guests: parseInt(formData.guests || formData.guestCount) || 0,
        property_type: formData.propertyType || null,
        notes: formData.comments || null,
        status: 'pending',
      } : {
        client_id: clientId,
        event_type: formData.eventType,
        event_date: formData.eventDate,
        event_time: formData.eventTime,
        guests: parseInt(formData.guests) || 0,
        dietary_restrictions: formData.dietaryRestrictions,
        property_type: formData.propertyType,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        notes: formData.additionalInfo || null,
        status: 'pending',
      };

      const { data: quote, error: quoteError } = await supabase
        .from('quote_requests')
        .insert(quoteData)
        .select()
        .single();

      if (!quoteError && quote) {
        quoteId = quote.id;
        console.log("Quote request created in database:", quoteId);
      } else {
        console.error("Error creating quote request:", quoteError);
      }
    }

    // Send notification email to Grilly Cheese
    const notificationHtml = formType === "quick" 
      ? generateQuickQuoteNotification(formData as QuickQuoteRequest, quoteId)
      : generateEventRequestNotification(formData as EventRequest, quoteId);

    const notificationResponse = await resend.emails.send({
      from: "Grilly Cheese Quotes <grillycheese@grillycheese.net>",
      to: ["grillycheese@grillycheese.net"],
      subject: `New ${formType === "quick" ? "Quick Quote" : "Event"} Request from ${formData.name}`,
      html: notificationHtml,
    });

    console.log("Notification email sent:", notificationResponse);

    // Send confirmation email to customer
    const confirmationResponse = await resend.emails.send({
      from: "Grilly Cheese <grillycheese@grillycheese.net>",
      to: [formData.email],
      subject: "We received your quote request!",
      html: generateConfirmationEmail(formData.name, quoteId),
    });

    console.log("Confirmation email sent:", confirmationResponse);

    return new Response(
      JSON.stringify({ success: true, quoteId }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error processing quote request:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

function generateQuickQuoteNotification(data: QuickQuoteRequest, quoteId?: string | null): string {
  const siteUrl = Deno.env.get('SITE_URL') || 'https://grillycheese.net';
  const portalLink = quoteId ? `${siteUrl}/admin/quotes/${quoteId}` : '';
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #ff6b00; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin: 15px 0; padding: 10px; background: white; border-radius: 4px; }
          .label { font-weight: bold; color: #ff6b00; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🧀 New Quick Quote Request</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div>${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            <div class="field">
              <div class="label">Phone:</div>
              <div><a href="tel:${data.phone}">${data.phone}</a></div>
            </div>
            <div class="field">
              <div class="label">Event Date:</div>
              <div>${data.eventDate}</div>
            </div>
            <div class="field">
              <div class="label">Guest Count:</div>
              <div>${data.guestCount}</div>
            </div>
            <div class="field">
              <div class="label">Event Type:</div>
              <div>${data.eventType}</div>
            </div>
            ${portalLink ? `
              <div style="margin-top: 30px; text-align: center; padding: 20px; background: #e6f7ff; border-radius: 6px;">
                <p style="margin: 0 0 15px 0; font-weight: bold; color: #0066cc;">📊 View in Admin Portal</p>
                <a href="${portalLink}" style="display: inline-block; padding: 12px 24px; background: #0066cc; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Open Quote in Portal</a>
              </div>
            ` : ''}
          </div>
        </div>
      </body>
    </html>
  `;
}

function generateEventRequestNotification(data: EventRequest, quoteId?: string | null): string {
  const siteUrl = Deno.env.get('SITE_URL') || 'https://grillycheese.net';
  const portalLink = quoteId ? `${siteUrl}/admin/quotes/${quoteId}` : '';
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #ff6b00; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .section { margin: 20px 0; }
          .section-title { font-size: 18px; font-weight: bold; color: #ff6b00; margin-bottom: 10px; }
          .field { margin: 10px 0; padding: 10px; background: white; border-radius: 4px; }
          .label { font-weight: bold; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🧀 New Event Request</h1>
          </div>
          <div class="content">
            <div class="section">
              <div class="section-title">Contact Information</div>
              <div class="field">
                <div class="label">Name:</div>
                <div>${data.name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div><a href="mailto:${data.email}">${data.email}</a></div>
              </div>
              <div class="field">
                <div class="label">Phone:</div>
                <div><a href="tel:${data.phone}">${data.phone}</a></div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Event Details</div>
              <div class="field">
                <div class="label">Event Type:</div>
                <div>${data.eventType}</div>
              </div>
              <div class="field">
                <div class="label">Guest Count:</div>
                <div>${data.guests}</div>
              </div>
              <div class="field">
                <div class="label">Dietary Restrictions:</div>
                <div>${data.dietaryRestrictions}</div>
              </div>
              <div class="field">
                <div class="label">Drinks Needed:</div>
                <div>${data.drinks}</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Date & Location</div>
              <div class="field">
                <div class="label">Event Date:</div>
                <div>${data.eventDate}</div>
              </div>
              <div class="field">
                <div class="label">Event Start Time:</div>
                <div>${data.eventTime}</div>
              </div>
              <div class="field">
                <div class="label">Property Type:</div>
                <div>${data.propertyType}</div>
              </div>
              <div class="field">
                <div class="label">Address:</div>
                <div>${data.address}<br>${data.city}, ${data.state} ${data.zip}</div>
              </div>
            </div>

            ${data.additionalInfo ? `
            <div class="section">
              <div class="section-title">Additional Information</div>
              <div class="field">
                <div>${data.additionalInfo}</div>
              </div>
            </div>
            ` : ''}
            
            ${portalLink ? `
              <div style="margin-top: 30px; text-align: center; padding: 20px; background: #e6f7ff; border-radius: 6px;">
                <p style="margin: 0 0 15px 0; font-weight: bold; color: #0066cc;">📊 View & Manage in Admin Portal</p>
                <a href="${portalLink}" style="display: inline-block; padding: 12px 24px; background: #0066cc; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Open Quote in Portal</a>
                <p style="margin: 15px 0 0 0; font-size: 12px; color: #666;">Update status, add pricing, and manage this quote in your admin dashboard</p>
              </div>
            ` : ''}
          </div>
        </div>
      </body>
    </html>
  `;
}

function generateConfirmationEmail(name: string, quoteId?: string | null): string {
  const siteUrl = Deno.env.get('SITE_URL') || 'https://grillycheese.net';
  const portalLink = `${siteUrl}/auth`;
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #f5f5f5; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .header { background: #ff6b00; color: white; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { padding: 30px; }
          .portal-cta { background: #f0f8ff; border-left: 4px solid #0066cc; padding: 20px; margin: 20px 0; border-radius: 4px; }
          .portal-cta h3 { margin-top: 0; color: #0066cc; }
          .button { display: inline-block; padding: 14px 32px; background: #ff6b00; color: white; text-decoration: none; border-radius: 6px; margin: 10px 5px; font-weight: bold; }
          .button:hover { background: #e55f00; }
          .button-secondary { background: #0066cc; }
          .button-secondary:hover { background: #0052a3; }
          .footer { background: #f9f9f9; padding: 20px; text-align: center; color: #666; font-size: 12px; }
          ul { padding-left: 20px; }
          ul li { margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🧀 Thank You, ${name}!</h1>
          </div>
          <div class="content">
            <p>We've received your quote request and our team is excited to help make your event amazing!</p>
            
            ${quoteId ? `
              <div class="portal-cta">
                <h3>✨ Track Your Quote Online</h3>
                <p>Create a free portal account to:</p>
                <ul>
                  <li>Track your quote status in real-time</li>
                  <li>Message our team directly</li>
                  <li>Upload and manage event documents</li>
                  <li>View invoices and payments</li>
                </ul>
                <div style="text-align: center; margin-top: 15px;">
                  <a href="${portalLink}" class="button button-secondary">Create Portal Account</a>
                </div>
              </div>
            ` : `
              <div class="portal-cta">
                <h3>✨ New: Client Portal Available</h3>
                <p>Create a free account to track all your quotes and communicate with our team directly.</p>
                <div style="text-align: center; margin-top: 15px;">
                  <a href="${portalLink}" class="button button-secondary">Create Account</a>
                </div>
              </div>
            `}
            
            <p><strong>What happens next?</strong></p>
            <ul>
              <li>Our team will review your request within 2 hours during business hours</li>
              <li>We'll reach out via phone or email to discuss your event details</li>
              <li>You'll receive a personalized quote based on your needs</li>
            </ul>

            <p>In the meantime, feel free to call us at <a href="tel:8444745591">844-474-5591</a> if you have any immediate questions.</p>

            <div style="text-align: center;">
              <a href="https://grillycheese.net" class="button">Visit Our Website</a>
            </div>
          </div>
          <div class="footer">
            <p>Grilly Cheese - Award-Winning Food Truck Catering</p>
            <p>📞 844-474-5591 | 📧 grillycheese@grillycheese.net</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

serve(handler);
