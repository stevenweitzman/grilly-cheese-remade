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

// HTML escaping to prevent XSS in email templates
const escapeHtml = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Input validation schemas (manual validation for Deno edge functions)
const validateQuickQuoteData = (data: unknown): { valid: boolean; errors: string[]; data?: QuickQuoteRequest } => {
  const errors: string[] = [];
  
  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Invalid form data'] };
  }
  
  const d = data as Record<string, unknown>;
  
  // Validate name
  if (typeof d.name !== 'string' || d.name.trim().length === 0) {
    errors.push('Name is required');
  } else if (d.name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof d.email !== 'string' || !emailRegex.test(d.email.trim())) {
    errors.push('Valid email is required');
  } else if (d.email.length > 255) {
    errors.push('Email must be less than 255 characters');
  }
  
  // Validate phone (optional but max length)
  if (d.phone && typeof d.phone === 'string' && d.phone.length > 30) {
    errors.push('Phone must be less than 30 characters');
  }
  
  // Validate eventDate
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (typeof d.eventDate !== 'string' || !dateRegex.test(d.eventDate)) {
    errors.push('Valid event date is required (YYYY-MM-DD format)');
  }
  
  // Validate guestCount/guests
  const guestCount = d.guestCount || d.guests;
  if (guestCount !== undefined && guestCount !== '') {
    const parsed = parseInt(String(guestCount), 10);
    if (isNaN(parsed) || parsed < 0 || parsed > 10000) {
      errors.push('Guest count must be a valid number between 0 and 10000');
    }
  }
  
  // Validate eventType
  if (d.eventType && typeof d.eventType === 'string' && d.eventType.length > 200) {
    errors.push('Event type must be less than 200 characters');
  }
  
  if (errors.length > 0) {
    return { valid: false, errors };
  }
  
  return {
    valid: true,
    errors: [],
    data: {
      name: String(d.name).trim(),
      email: String(d.email).trim().toLowerCase(),
      phone: d.phone ? String(d.phone).trim() : '',
      eventDate: String(d.eventDate).trim(),
      guestCount: String(guestCount || '0'),
      eventType: d.eventType ? String(d.eventType).trim() : 'Quick Quote',
    }
  };
};

const validateEventRequestData = (data: unknown): { valid: boolean; errors: string[]; data?: EventRequest } => {
  const errors: string[] = [];
  
  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Invalid form data'] };
  }
  
  const d = data as Record<string, unknown>;
  
  // Validate name
  if (typeof d.name !== 'string' || d.name.trim().length === 0) {
    errors.push('Name is required');
  } else if (d.name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof d.email !== 'string' || !emailRegex.test(d.email.trim())) {
    errors.push('Valid email is required');
  } else if (d.email.length > 255) {
    errors.push('Email must be less than 255 characters');
  }
  
  // Validate phone
  if (d.phone && typeof d.phone === 'string' && d.phone.length > 30) {
    errors.push('Phone must be less than 30 characters');
  }
  
  // Validate eventDate
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (typeof d.eventDate !== 'string' || !dateRegex.test(d.eventDate)) {
    errors.push('Valid event date is required (YYYY-MM-DD format)');
  }
  
  // Validate guests
  if (d.guests !== undefined && d.guests !== '') {
    const parsed = parseInt(String(d.guests), 10);
    if (isNaN(parsed) || parsed < 0 || parsed > 10000) {
      errors.push('Guest count must be a valid number between 0 and 10000');
    }
  }
  
  // Validate text fields max length
  const textFields = ['eventType', 'dietaryRestrictions', 'drinks', 'eventTime', 'propertyType', 'address', 'city', 'state', 'zip'];
  for (const field of textFields) {
    if (d[field] && typeof d[field] === 'string' && (d[field] as string).length > 500) {
      errors.push(`${field} must be less than 500 characters`);
    }
  }
  
  // Validate additionalInfo (can be longer)
  if (d.additionalInfo && typeof d.additionalInfo === 'string' && d.additionalInfo.length > 5000) {
    errors.push('Additional info must be less than 5000 characters');
  }
  
  if (errors.length > 0) {
    return { valid: false, errors };
  }
  
  return {
    valid: true,
    errors: [],
    data: {
      name: String(d.name).trim(),
      email: String(d.email).trim().toLowerCase(),
      phone: d.phone ? String(d.phone).trim() : '',
      eventType: d.eventType ? String(d.eventType).trim() : '',
      guests: d.guests ? String(d.guests).trim() : '0',
      dietaryRestrictions: d.dietaryRestrictions ? String(d.dietaryRestrictions).trim() : '',
      drinks: d.drinks ? String(d.drinks).trim() : '',
      eventDate: String(d.eventDate).trim(),
      eventTime: d.eventTime ? String(d.eventTime).trim() : '',
      propertyType: d.propertyType ? String(d.propertyType).trim() : '',
      address: d.address ? String(d.address).trim() : '',
      city: d.city ? String(d.city).trim() : '',
      state: d.state ? String(d.state).trim() : '',
      zip: d.zip ? String(d.zip).trim() : '',
      additionalInfo: d.additionalInfo ? String(d.additionalInfo).trim() : '',
    }
  };
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
    const body = await req.json();
    const { formType, formData } = body;
    
    // Validate form type
    if (!formType || !['quick', 'event'].includes(formType)) {
      return new Response(
        JSON.stringify({ error: 'Invalid form type' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    // Validate input data based on form type
    let validatedData: QuickQuoteRequest | EventRequest;
    
    if (formType === 'quick') {
      const validation = validateQuickQuoteData(formData);
      if (!validation.valid || !validation.data) {
        console.log("Quick quote validation failed:", validation.errors);
        return new Response(
          JSON.stringify({ error: 'Validation failed', details: validation.errors }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      validatedData = validation.data;
    } else {
      const validation = validateEventRequestData(formData);
      if (!validation.valid || !validation.data) {
        console.log("Event request validation failed:", validation.errors);
        return new Response(
          JSON.stringify({ error: 'Validation failed', details: validation.errors }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      validatedData = validation.data;
    }
    
    console.log("Processing quote request:", { formType, email: validatedData.email });

    // Check if user exists with this email, or create guest submission
    let clientId: string | null = null;
    let guestSubmissionId: string | null = null;
    
    // First check if auth user exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existingUser = existingUsers?.users.find(u => u.email === validatedData.email);
    
    if (existingUser) {
      clientId = existingUser.id;
    } else {
      // Create a guest submission using SECURITY DEFINER function (proper RLS pattern)
      const { data: guestId, error: guestError } = await supabase
        .rpc('create_guest_quote_submission', {
          p_full_name: validatedData.name,
          p_email: validatedData.email,
          p_phone: validatedData.phone || null,
        });
      
      if (!guestError && guestId) {
        guestSubmissionId = guestId;
        console.log("Guest submission created:", guestSubmissionId);
      } else {
        console.error("Error creating guest submission:", guestError);
      }
    }

    // Create quote request in database if we have a client ID or guest submission
    let quoteId: string | null = null;
    if (clientId || guestSubmissionId) {
      const baseQuoteData = formType === "quick" ? {
        event_type: (validatedData as QuickQuoteRequest).eventType || "Quick Quote",
        event_date: validatedData.eventDate,
        event_time: (formData.eventStartTime as string) || null,
        guests: parseInt((validatedData as QuickQuoteRequest).guestCount) || 0,
        property_type: (formData.propertyType as string) || null,
        notes: (formData.comments as string) || null,
        status: 'pending' as const,
      } : {
        event_type: (validatedData as EventRequest).eventType,
        event_date: validatedData.eventDate,
        event_time: (validatedData as EventRequest).eventTime,
        guests: parseInt((validatedData as EventRequest).guests) || 0,
        dietary_restrictions: (validatedData as EventRequest).dietaryRestrictions,
        property_type: (validatedData as EventRequest).propertyType,
        address: (validatedData as EventRequest).address,
        city: (validatedData as EventRequest).city,
        state: (validatedData as EventRequest).state,
        zip: (validatedData as EventRequest).zip,
        notes: (validatedData as EventRequest).additionalInfo || null,
        status: 'pending' as const,
      };

      // Add either client_id or guest_submission_id based on user type
      const quoteData = clientId 
        ? { ...baseQuoteData, client_id: clientId }
        : { ...baseQuoteData, guest_submission_id: guestSubmissionId };

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
      ? generateQuickQuoteNotification(validatedData as QuickQuoteRequest, quoteId)
      : generateEventRequestNotification(validatedData as EventRequest, quoteId);

    const notificationResponse = await resend.emails.send({
      from: "Grilly Cheese Quotes <grillycheese@grillycheese.net>",
      to: ["grillycheese@grillycheese.net"],
      subject: `New ${formType === "quick" ? "Quick Quote" : "Event"} Request from ${escapeHtml(validatedData.name)}`,
      html: notificationHtml,
    });

    console.log("Notification email sent:", notificationResponse);

    // Send confirmation email to customer
    const confirmationResponse = await resend.emails.send({
      from: "Grilly Cheese <grillycheese@grillycheese.net>",
      to: [validatedData.email],
      subject: "We received your quote request!",
      html: generateConfirmationEmail(validatedData.name, quoteId),
    });

    console.log("Confirmation email sent:", confirmationResponse);

    return new Response(
      JSON.stringify({ success: true, quoteId }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error("Error processing quote request:", errorMessage);
    return new Response(
      JSON.stringify({ error: 'An error occurred processing your request' }),
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
              <div>${escapeHtml(data.name)}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
            </div>
            <div class="field">
              <div class="label">Phone:</div>
              <div><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></div>
            </div>
            <div class="field">
              <div class="label">Event Date:</div>
              <div>${escapeHtml(data.eventDate)}</div>
            </div>
            <div class="field">
              <div class="label">Guest Count:</div>
              <div>${escapeHtml(data.guestCount)}</div>
            </div>
            <div class="field">
              <div class="label">Event Type:</div>
              <div>${escapeHtml(data.eventType)}</div>
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
                <div>${escapeHtml(data.name)}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
              </div>
              <div class="field">
                <div class="label">Phone:</div>
                <div><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Event Details</div>
              <div class="field">
                <div class="label">Event Type:</div>
                <div>${escapeHtml(data.eventType)}</div>
              </div>
              <div class="field">
                <div class="label">Guest Count:</div>
                <div>${escapeHtml(data.guests)}</div>
              </div>
              <div class="field">
                <div class="label">Dietary Restrictions:</div>
                <div>${escapeHtml(data.dietaryRestrictions)}</div>
              </div>
              <div class="field">
                <div class="label">Drinks Needed:</div>
                <div>${escapeHtml(data.drinks)}</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Date & Location</div>
              <div class="field">
                <div class="label">Event Date:</div>
                <div>${escapeHtml(data.eventDate)}</div>
              </div>
              <div class="field">
                <div class="label">Event Start Time:</div>
                <div>${escapeHtml(data.eventTime)}</div>
              </div>
              <div class="field">
                <div class="label">Property Type:</div>
                <div>${escapeHtml(data.propertyType)}</div>
              </div>
              <div class="field">
                <div class="label">Address:</div>
                <div>${escapeHtml(data.address)}<br>${escapeHtml(data.city)}, ${escapeHtml(data.state)} ${escapeHtml(data.zip)}</div>
              </div>
            </div>

            ${data.additionalInfo ? `
            <div class="section">
              <div class="section-title">Additional Information</div>
              <div class="field">
                <div>${escapeHtml(data.additionalInfo)}</div>
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
            <h1>🧀 Thank You, ${escapeHtml(name)}!</h1>
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