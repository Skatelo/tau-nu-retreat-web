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
      // Generate invoice number based on donation ID
      const invoiceNumber = `INV-${donation_id?.substring(0, 8).toUpperCase()}`;
      const currentDate = new Date();
      const invoiceDate = currentDate.toLocaleDateString();
      const dueDate = currentDate.toLocaleDateString(); // Immediate for donations
      
      // Send donation invoice/receipt
      emailResponse = await resend.emails.send({
        from: "Donations <onboarding@resend.dev>",
        to: [donor_email],
        subject: `Invoice ${invoiceNumber} - Donation Receipt`,
        html: `
          <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; color: #333;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2c5530; margin: 0;">DONATION INVOICE</h1>
              <p style="margin: 5px 0; font-size: 18px; font-weight: bold;">Invoice #${invoiceNumber}</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                <div>
                  <h3 style="margin: 0 0 10px 0; color: #2c5530;">Bill To:</h3>
                  <p style="margin: 2px 0;"><strong>${donor_name}</strong></p>
                  <p style="margin: 2px 0;">${donor_email}</p>
                </div>
                <div style="text-align: right;">
                  <p style="margin: 2px 0;"><strong>Invoice Date:</strong> ${invoiceDate}</p>
                  <p style="margin: 2px 0;"><strong>Due Date:</strong> ${dueDate}</p>
                  <p style="margin: 2px 0;"><strong>Payment Status:</strong> <span style="color: #28a745; font-weight: bold;">PAID</span></p>
                </div>
              </div>
              
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <thead>
                  <tr style="background: #e9ecef;">
                    <th style="padding: 12px; text-align: left; border: 1px solid #dee2e6;">Description</th>
                    <th style="padding: 12px; text-align: right; border: 1px solid #dee2e6;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="padding: 12px; border: 1px solid #dee2e6;">Charitable Donation</td>
                    <td style="padding: 12px; text-align: right; border: 1px solid #dee2e6; font-weight: bold;">$${amount}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr style="background: #f8f9fa;">
                    <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Total Amount</td>
                    <td style="padding: 12px; text-align: right; border: 1px solid #dee2e6; font-weight: bold; font-size: 18px; color: #2c5530;">$${amount}</td>
                  </tr>
                </tfoot>
              </table>
              
              <div style="margin-top: 20px; padding: 15px; background: #e8f5e8; border-radius: 5px;">
                <p style="margin: 0; font-size: 14px;"><strong>Payment Information:</strong></p>
                <p style="margin: 5px 0; font-size: 14px;">Transaction ID: ${donation_id}</p>
                <p style="margin: 5px 0; font-size: 14px;">Payment Method: Credit Card (Square)</p>
                <p style="margin: 5px 0; font-size: 14px;">Processed: ${invoiceDate}</p>
              </div>
            </div>
            
            <div style="text-align: center; margin: 30px 0; padding: 20px; background: #f0f8f0; border-radius: 8px;">
              <h2 style="color: #2c5530; margin: 0 0 10px 0;">Thank you for your generous donation!</h2>
              <p style="margin: 10px 0;">Your contribution makes a difference and is greatly appreciated.</p>
              <p style="margin: 10px 0; font-size: 14px; color: #666;">This invoice serves as your official receipt for tax purposes.</p>
              <p style="margin: 10px 0; font-weight: bold;">Please retain this invoice for your records.</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
              <p style="margin: 5px 0; font-size: 14px; color: #666;">Questions about this invoice? Contact us at support@example.com</p>
              <p style="margin: 5px 0; font-size: 12px; color: #999;">Invoice generated automatically by our donation system</p>
            </div>
          </div>
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