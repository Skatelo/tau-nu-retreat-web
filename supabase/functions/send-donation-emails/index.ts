import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  type: 'confirmation' | 'receipt';
  donor_name: string;
  donor_email: string;
  amount?: number;
  donation_id?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, donor_name, donor_email, amount, donation_id }: EmailRequest = await req.json();

    let emailResponse;

    if (type === 'confirmation') {
      // Send form submission confirmation
      emailResponse = await resend.emails.send({
        from: "Donations <onboarding@resend.dev>",
        to: [donor_email],
        subject: "Thank you for starting your donation!",
        html: `
          <h1>Hello ${donor_name}!</h1>
          <p>Thank you for visiting our donation form. We appreciate your interest in supporting our cause.</p>
          <p>If you complete your donation, you'll receive a receipt shortly.</p>
          <p>Best regards,<br>The Team</p>
        `,
      });
    } else if (type === 'receipt') {
      // Send donation receipt
      emailResponse = await resend.emails.send({
        from: "Donations <onboarding@resend.dev>",
        to: [donor_email],
        subject: `Donation Receipt - $${amount}`,
        html: `
          <h1>Thank you for your generous donation, ${donor_name}!</h1>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2>Donation Details</h2>
            <p><strong>Amount:</strong> $${amount}</p>
            <p><strong>Donation ID:</strong> ${donation_id}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          <p>Your donation has been processed successfully. This email serves as your receipt for tax purposes.</p>
          <p>Thank you for your support!</p>
          <p>Best regards,<br>The Team</p>
        `,
      });
    }

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-donation-emails function:", error);
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