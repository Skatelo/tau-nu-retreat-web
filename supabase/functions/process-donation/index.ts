import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface DonationRequest {
  amount: number;
  donor_name: string;
  donor_email: string;
  donor_phone?: string;
  nonce: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const { amount, donor_name, donor_email, donor_phone, nonce }: DonationRequest = await req.json();

    console.log(`Processing donation for ${donor_name}: $${amount}`);

    // First, create the donation record in the database
    const { data: donation, error: dbError } = await supabaseClient
      .from('donations')
      .insert({
        donor_name,
        donor_email,
        donor_phone,
        amount,
        status: 'processing'
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to create donation record');
    }

    // Process payment with Square
    const squareResponse = await fetch('https://connect.squareup.com/v2/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get("SQUARE_ACCESS_TOKEN")}`,
        'Content-Type': 'application/json',
        'Square-Version': '2023-10-18'
      },
      body: JSON.stringify({
        source_id: nonce,
        amount_money: {
          amount: Math.round(amount * 100), // Convert to cents
          currency: 'USD'
        },
        location_id: 'LWV90YJ6MHHK7',
        idempotency_key: donation.id,
        note: `Donation from ${donor_name}`,
        buyer_email_address: donor_email
      })
    });

    const paymentResult = await squareResponse.json();

    if (!squareResponse.ok) {
      console.error('Square payment error:', paymentResult);
      
      // Update donation status to failed
      await supabaseClient
        .from('donations')
        .update({ status: 'failed' })
        .eq('id', donation.id);

      throw new Error(paymentResult.errors?.[0]?.detail || 'Payment processing failed');
    }

    console.log('Payment successful:', paymentResult.payment.id);

    // Update donation record with payment info
    const { error: updateError } = await supabaseClient
      .from('donations')
      .update({
        payment_id: paymentResult.payment.id,
        status: 'completed'
      })
      .eq('id', donation.id);

    if (updateError) {
      console.error('Failed to update donation record:', updateError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        donation_id: donation.id,
        payment_id: paymentResult.payment.id,
        amount: amount
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error("Error in process-donation function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'An unexpected error occurred' 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);