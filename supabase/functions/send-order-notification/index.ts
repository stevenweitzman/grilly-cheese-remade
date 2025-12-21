import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  category: string;
}

interface OrderNotificationRequest {
  confirmationNumber: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  cartItems: CartItem[];
  entreeSubtotal: number;
  bulkDiscountPercent: number;
  bulkDiscountAmount: number;
  extrasSubtotal: number;
  foodSubtotal: number;
  gratuity: number;
  deliveryFee: number;
  finalTotal: number;
  specialNotes?: string;
}

const escapeHtml = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: OrderNotificationRequest = await req.json();

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    // Group cart items by category
    const entrees = data.cartItems.filter(item => ['sandwich', 'hotdog'].includes(item.category));
    const extras = data.cartItems.filter(item => !['sandwich', 'hotdog'].includes(item.category));

    // Build cart items HTML
    const buildItemsHtml = (items: CartItem[]) => items.map(item => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(item.name)}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">${formatCurrency(item.unitPrice * item.quantity)}</td>
      </tr>
    `).join('');

    const emailHtml = `
      <div style="background: #f9fafb; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="background: white; max-width: 650px; margin: 0 auto; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #ea384c; margin: 0 0 5px 0; font-size: 28px;">🧀 New Catering Order!</h1>
          <p style="color: #6b7280; margin: 0 0 25px 0; font-size: 14px;">Confirmation #: ${escapeHtml(data.confirmationNumber)}</p>
          
          <!-- Event Details -->
          <div style="background: #fef2f2; border-left: 4px solid #ea384c; padding: 20px; margin-bottom: 25px; border-radius: 4px;">
            <h2 style="margin: 0 0 15px 0; font-size: 18px; color: #333;">📅 Event Details</h2>
            <p style="margin: 8px 0; color: #555;"><strong>Event:</strong> ${escapeHtml(data.eventName)}</p>
            <p style="margin: 8px 0; color: #555;"><strong>Date:</strong> ${escapeHtml(data.eventDate)}</p>
            <p style="margin: 8px 0; color: #555;"><strong>Time:</strong> ${escapeHtml(data.eventTime)}</p>
          </div>
          
          <!-- Contact Info -->
          <div style="background: #f3f4f6; padding: 20px; margin-bottom: 25px; border-radius: 4px;">
            <h2 style="margin: 0 0 15px 0; font-size: 18px; color: #333;">👤 Contact Information</h2>
            <p style="margin: 8px 0; color: #555;"><strong>Name:</strong> ${escapeHtml(data.contactName)}</p>
            <p style="margin: 8px 0; color: #555;"><strong>Email:</strong> <a href="mailto:${escapeHtml(data.contactEmail)}" style="color: #ea384c;">${escapeHtml(data.contactEmail)}</a></p>
            <p style="margin: 8px 0; color: #555;"><strong>Phone:</strong> <a href="tel:${escapeHtml(data.contactPhone)}" style="color: #ea384c;">${escapeHtml(data.contactPhone)}</a></p>
          </div>
          
          <!-- Delivery Address -->
          <div style="background: #f3f4f6; padding: 20px; margin-bottom: 25px; border-radius: 4px;">
            <h2 style="margin: 0 0 15px 0; font-size: 18px; color: #333;">📍 Delivery Address</h2>
            <p style="margin: 8px 0; color: #555;">${escapeHtml(data.address)}</p>
            <p style="margin: 8px 0; color: #555;">${escapeHtml(data.city)}, ${escapeHtml(data.state)} ${escapeHtml(data.zip)}</p>
          </div>
          
          <!-- Order Items -->
          <h2 style="margin: 25px 0 15px 0; font-size: 18px; color: #333;">🍔 Order Items</h2>
          
          ${entrees.length > 0 ? `
          <h3 style="margin: 15px 0 10px 0; font-size: 14px; color: #6b7280; text-transform: uppercase;">Entrées</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
            <thead>
              <tr style="background: #f9fafb;">
                <th style="padding: 8px; text-align: left; font-weight: 600;">Item</th>
                <th style="padding: 8px; text-align: center; font-weight: 600;">Qty</th>
                <th style="padding: 8px; text-align: right; font-weight: 600;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${buildItemsHtml(entrees)}
            </tbody>
          </table>
          ` : ''}
          
          ${extras.length > 0 ? `
          <h3 style="margin: 15px 0 10px 0; font-size: 14px; color: #6b7280; text-transform: uppercase;">Extras & Sides</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
            <thead>
              <tr style="background: #f9fafb;">
                <th style="padding: 8px; text-align: left; font-weight: 600;">Item</th>
                <th style="padding: 8px; text-align: center; font-weight: 600;">Qty</th>
                <th style="padding: 8px; text-align: right; font-weight: 600;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${buildItemsHtml(extras)}
            </tbody>
          </table>
          ` : ''}
          
          <!-- Pricing Breakdown -->
          <div style="background: #fef2f2; padding: 20px; margin-top: 25px; border-radius: 4px;">
            <h2 style="margin: 0 0 15px 0; font-size: 18px; color: #333;">💰 Pricing Summary</h2>
            <table style="width: 100%;">
              <tr>
                <td style="padding: 5px 0; color: #555;">Entrée Subtotal</td>
                <td style="padding: 5px 0; text-align: right; color: #555;">${formatCurrency(data.entreeSubtotal)}</td>
              </tr>
              ${data.bulkDiscountAmount > 0 ? `
              <tr>
                <td style="padding: 5px 0; color: #16a34a;">Bulk Discount (${data.bulkDiscountPercent}%)</td>
                <td style="padding: 5px 0; text-align: right; color: #16a34a;">-${formatCurrency(data.bulkDiscountAmount)}</td>
              </tr>
              ` : ''}
              ${data.extrasSubtotal > 0 ? `
              <tr>
                <td style="padding: 5px 0; color: #555;">Extras Subtotal</td>
                <td style="padding: 5px 0; text-align: right; color: #555;">${formatCurrency(data.extrasSubtotal)}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 5px 0; color: #555;">Food Subtotal</td>
                <td style="padding: 5px 0; text-align: right; color: #555;">${formatCurrency(data.foodSubtotal)}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; color: #555;">Gratuity (20%)</td>
                <td style="padding: 5px 0; text-align: right; color: #555;">${formatCurrency(data.gratuity)}</td>
              </tr>
              ${data.deliveryFee > 0 ? `
              <tr>
                <td style="padding: 5px 0; color: #555;">Delivery Fee</td>
                <td style="padding: 5px 0; text-align: right; color: #555;">${formatCurrency(data.deliveryFee)}</td>
              </tr>
              ` : ''}
              <tr style="border-top: 2px solid #ea384c;">
                <td style="padding: 10px 0 5px 0; font-size: 18px; font-weight: bold; color: #ea384c;">TOTAL</td>
                <td style="padding: 10px 0 5px 0; text-align: right; font-size: 18px; font-weight: bold; color: #ea384c;">${formatCurrency(data.finalTotal)}</td>
              </tr>
            </table>
          </div>
          
          ${data.specialNotes ? `
          <div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 15px; margin-top: 25px; border-radius: 4px;">
            <h3 style="margin: 0 0 10px 0; font-size: 14px; color: #92400e;">📝 Special Notes</h3>
            <p style="margin: 0; color: #78350f;">${escapeHtml(data.specialNotes)}</p>
          </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="color: #ea384c; font-weight: bold; font-size: 16px;">⚠️ ACTION REQUIRED: Send payment link to customer</p>
            <p style="color: #6b7280; font-size: 12px; margin-top: 10px;">This order was submitted via the Grilly Cheese website.</p>
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
        from: "Grilly Cheese Orders <onboarding@resend.dev>",
        to: ["grillycheese@grillycheese.net"],
        subject: `🧀 New Catering Order: ${escapeHtml(data.eventName)} - ${formatCurrency(data.finalTotal)}`,
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${errorData}`);
    }

    const emailData = await emailResponse.json();
    console.log("Order notification email sent successfully:", emailData);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending order notification:", error);
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
