import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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

    // Send notification email to Grilly Cheese
    const notificationHtml = formType === "quick" 
      ? generateQuickQuoteNotification(formData as QuickQuoteRequest)
      : generateEventRequestNotification(formData as EventRequest);

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
      html: generateConfirmationEmail(formData.name),
    });

    console.log("Confirmation email sent:", confirmationResponse);

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending emails:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

function generateQuickQuoteNotification(data: QuickQuoteRequest): string {
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
          </div>
        </div>
      </body>
    </html>
  `;
}

function generateEventRequestNotification(data: EventRequest): string {
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
          </div>
        </div>
      </body>
    </html>
  `;
}

function generateConfirmationEmail(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #ff6b00; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; padding: 12px 30px; background: #ff6b00; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🧀 Thank You, ${name}!</h1>
          </div>
          <div class="content">
            <p>We've received your quote request and our team is excited to help make your event amazing!</p>
            
            <p><strong>What happens next?</strong></p>
            <ul>
              <li>Our team will review your request within 2 hours during business hours</li>
              <li>We'll reach out via phone or email to discuss your event details</li>
              <li>You'll receive a personalized quote based on your needs</li>
            </ul>

            <p>In the meantime, feel free to call us at <a href="tel:+12676879090">(267) 687-9090</a> if you have any immediate questions.</p>

            <div style="text-align: center;">
              <a href="https://grillycheese.net" class="button">Visit Our Website</a>
            </div>

            <div class="footer">
              <p>Grilly Cheese - Philadelphia's Premier Food Truck Catering</p>
              <p>📞 (267) 687-9090 | 📧 grillycheese@grillycheese.net</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

serve(handler);
