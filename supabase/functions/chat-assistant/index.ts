import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, conversationId } = await req.json();

    // Validate required fields
    if (!conversationId) {
      return new Response(JSON.stringify({ error: "conversation_id is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "messages array is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate message content and length
    for (const msg of messages) {
      if (!msg.role || !msg.content) {
        return new Response(JSON.stringify({ error: "Each message must have role and content" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (msg.content.length > 2000) {
        return new Response(JSON.stringify({ error: "Message content too long (max 2000 chars)" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Validate conversation exists and hasn't exceeded message limit
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: conversation, error: convError } = await supabase
      .from("conversations")
      .select("id, message_count, ended_at")
      .eq("id", conversationId)
      .single();

    if (convError || !conversation) {
      console.error("Conversation validation error:", convError);
      return new Response(JSON.stringify({ error: "Invalid conversation_id" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check if conversation has ended
    if (conversation.ended_at) {
      return new Response(JSON.stringify({ error: "This conversation has ended" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check message limit (enforced at DB level but check here too)
    if (conversation.message_count >= 50) {
      return new Response(JSON.stringify({ error: "Message limit reached for this conversation" }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an enthusiastic and helpful event planning assistant for Grilly Cheese, a premium food truck catering company. Your goal is to help customers plan amazing events with delicious grilled cheese and gourmet options. Your primary objective is to collect customer information and email it to grillycheese@grillycheese.net at the end of each conversation.

IMPORTANT: Never mention specific prices or dollar amounts. Focus on value, quality, and helping customers choose the right package for their needs. If asked for contact information, provide the email grillycheese@grillycheese.net and also mention that the team can be contacted via text or by calling 844-grilly-1 (844-474-5591)

## About Grilly Cheese
- Operating since 2012
- Specializes in Productions, Weddings, Corporate Events, Festivals, Bar/Bat Mitzvahs, Film-set Catering, Concert &amp; Tour Catering
- Offers fresh, high-quality ingredients prepared daily
- Available for private catering events
- Has 2 food trucks and one full-service commercial food trailer.

## Catering Packages

### THE SIMPLE MENU
Perfect for straightforward events where guests want classic comfort food. Includes:
- Choice of gourmet grilled cheese sandwich or hot dog
- Served with a Side
- Served with a drink
- Guests can revisit for a 2nd side and drink
- Guest count considerations apply
- Customizable per request

### THE FULL MENU
Our premium offering with expanded options. Includes everything from Simple Menu plus:
- Expanded sandwich selection
- Premium sides and desserts
- More drink options
- Greater customization options

## Menu Highlights

### SANDWICHES (Customer Favorites marked with ★)
- Just the Cheese - Classic white bread with white American cheese
- Just The Mozz - White bread grilled with mozzarella
- ★ Bacon American Classic - Loaded with crispy bacon and American cheese
- Just The Cheddar - Grilled with cheddar cheese
- 3 Cheese Please - Cheddar, American & mozzarella blend
- ★ The American Dream - Double American cheese, thick-cut bacon, fresh tomatoes
- ★ The Bacon Mozz Classic - Bacon with mozzarella
- The Great Cheddwestern - Cheddar cheese grilled to perfection
- ★ Tomato &#x26; Mozz Caprese - Fresh mozzarella, tomatoes, basil
- The BBQ Pulled Pork - Slow-cooked pulled pork with BBQ sauce
- The Buffalo Chicken - Spicy buffalo chicken with ranch or blue cheese
- The Mushroom Swiss - Sautéed mushrooms with Swiss cheese

### HOT DOGS
- The Just the Dog
- The Just the Cheese Dog
- BBQ Bacon Dog

### SIDES
- Hand-cut French Fries (made fresh daily)
- Homemade Tomato Soup (cannot be reused, made fresh)
- Mac &#x26; Cheese (opon request)
- Coleslaw (opon request)
- Side Salad (opon request)

### DESSERTS
- Brownie Bites
- Cookies, Homemade
- Seasonal Fruit
- Fresh Mini Pies
- Desserts are offered upon request

### DRINKS
- Bottled Water
- Canned Sodas
- Iced Tea
- Fresh Brewed Coffee (opon request)

## Special Dietary Options
- Gluten-free bread available
- Vegan cheese available
- Vegan sides available
- We can accommodate your guests' dietary restrictions!

## Key Service Details
- Truck stays on-site for a maximum of 3.5 hours during peak season (March-November)
- Extended time available upon request
- Setup and breakdown time is not included in the 3.5 hour window
- Peak season: March through November

## Important Policies
- Deposits are fully refundable up to 30 days out
- Guest count is guaranteed (if you book for 100 guests, you're committed to that count)
- Why? Food is prepared fresh daily and cannot be repurposed
- Rain dates are held as tentative but may not be honored if another event books - the deposits will be applied towards the future available date
- Service charge and gratuity apply to all events

## Your Approach
1. Start by understanding their event type (wedding, corporate, festival, production)
2. Ask about guest count
3. Understand their vision and preferences
4. Guide them toward Simple or Full Menu based on their needs
5. Discuss dietary restrictions
6. Help them visualize their event with Grilly Cheese
7. Be enthusiastic about the fresh ingredients and quality
8. Emphasize customization options
9. Never discuss specific pricing - focus on value and fit

## Common Questions to Ask
- What type of event are you planning?
- How many guests are you expecting?
- What's the date and season of your event?
- Do you have any guests with dietary restrictions?
- Are you looking for a classic comfort food experience or something more elaborate?
- Will this be a formal or casual event?
- Do you need the truck to stay longer than the standard time?
- Offer the customer to speak directly with a teammate from Grilly Cheese when appropriate

Keep your responses concise yet friendly, helpful, and focused on creating an amazing event experience!`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat-assistant error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
