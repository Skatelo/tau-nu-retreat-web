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
  donor_phone?: string;
}

// Organization identity
const ORG_NAME = "The Tau Nu Chapter of Alpha Phi Alpha Fraternity Inc.";

const generateSecureInvoiceNumber = (donation_id: string): string => {
  // Use full UUID to prevent collisions, format for readability
  const timestamp = Date.now().toString(36).toUpperCase();
  const idPart = donation_id.split('-')[0].toUpperCase();
  return `INV-${timestamp}-${idPart}`;
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const emailData: EmailRequest = await req.json();
    
    // Validate required fields
    if (!emailData.donor_name || !emailData.donor_email) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields: donor_name and donor_email are required" 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailData.donor_email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    let emailResponse;
    let emailContent;

    if (emailData.type === 'confirmation') {
      emailContent = {
        from: "Donations <onboarding@resend.dev>",
        to: [emailData.donor_email],
        subject: `Thank you for supporting ${ORG_NAME}`,
        html: `
          <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333; line-height: 1.6;">
            <div style="background: linear-gradient(135deg, #000000 0%, #c9975b 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 300;">Thank You for Your Interest!</h1>
            </div>
            
            <div style="padding: 40px 20px; background: #ffffff;">
              <p style="font-size: 18px; margin-bottom: 24px;">Dear ${emailData.donor_name},</p>
              
              <p style="font-size: 16px; line-height: 1.8; color: #555;">
                We're delighted that you're considering supporting <strong>${ORG_NAME}</strong>. Your generosity helps us continue our mission of service and brotherhood.
              </p>
              
              <div style="background: #f8faf8; border-left: 4px solid #c9975b; padding: 20px; margin: 30px 0;">
                <p style="margin: 0; font-style: italic; color: #666;">
                  "First of All, Servants of All, We Shall Transcend All"
                </p>
              </div>
              
              <p style="font-size: 16px; line-height: 1.8; color: #555;">
                Once you complete your donation, you'll receive a detailed receipt for your records.
              </p>
              
              <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #eee; text-align: center;">
                <p style="color: #999; font-size: 14px; margin: 10px 0;">
                  With gratitude,<br>
                  <strong>${ORG_NAME}</strong>
                </p>
              </div>
            </div>
          </div>
        `,
      };
    } else if (emailData.type === 'receipt') {
      if (!emailData.amount || !emailData.donation_id) {
        return new Response(
          JSON.stringify({ 
            error: "Receipt emails require amount and donation_id" 
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }

      const invoiceNumber = generateSecureInvoiceNumber(emailData.donation_id);
      const currentDate = new Date();
      const invoiceDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const formattedAmount = formatCurrency(emailData.amount);
      
      emailContent = {
        from: "Donations <onboarding@resend.dev>",
        to: [emailData.donor_email],
        subject: `Donation Receipt - ${invoiceNumber}`,
        html: `
          <div style="max-width: 700px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333;">
            <!-- Header -->
            <div style="background: #000000; color: #c9975b; padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 400; letter-spacing: 1px;">DONATION RECEIPT</h1>
              <p style="margin: 8px 0 0 0; font-size: 16px; opacity: 0.9;">${invoiceNumber}</p>
            </div>
            
            <!-- Organization Info -->
            <div style="background: #f8f9fa; padding: 25px 30px; border-bottom: 1px solid #e9ecef;">
              <div style="float: right; text-align: right;">
                <p style="margin: 0; font-size: 14px; color: #666;">Date: ${invoiceDate}</p>
                <p style="margin: 4px 0; font-size: 14px; color: #666;">Status: <span style="color: #28a745; font-weight: 600;">✓ Paid</span></p>
              </div>
              <h2 style="margin: 0; font-size: 20px; color: #000000;">${ORG_NAME}</h2>
              <div style="clear: both;"></div>
            </div>
            
            <!-- Donor Info -->
            <div style="padding: 30px;">
              <h3 style="margin: 0 0 15px 0; font-size: 16px; color: #666; font-weight: 400;">DONOR INFORMATION</h3>
              <div style="background: #ffffff; border: 1px solid #e9ecef; padding: 20px; border-radius: 6px;">
                <p style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">${emailData.donor_name}</p>
                <p style="margin: 0 0 4px 0; font-size: 14px; color: #666;">${emailData.donor_email}</p>
                ${emailData.donor_phone ? `<p style="margin: 0; font-size: 14px; color: #666;">${emailData.donor_phone}</p>` : ''}
              </div>
              
              <!-- Donation Details -->
              <h3 style="margin: 30px 0 15px 0; font-size: 16px; color: #666; font-weight: 400;">DONATION DETAILS</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="border-bottom: 2px solid #c9975b;">
                    <th style="padding: 12px 0; text-align: left; font-weight: 600;">Description</th>
                    <th style="padding: 12px 0; text-align: right; font-weight: 600;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom: 1px solid #e9ecef;">
                    <td style="padding: 20px 0; font-size: 16px;">Charitable Contribution</td>
                    <td style="padding: 20px 0; text-align: right; font-size: 20px; font-weight: 600; color: #000000;">${formattedAmount}</td>
                  </tr>
                </tbody>
              </table>
              
              <!-- Transaction Info -->
              <div style="background: #f8f9fa; padding: 20px; margin: 30px 0; border-radius: 6px;">
                <h4 style="margin: 0 0 10px 0; font-size: 16px; color: #000000;">Transaction Information</h4>
                <p style="margin: 0; font-size: 13px; color: #666;">
                  Transaction ID: ${emailData.donation_id}<br>
                  Payment Method: Credit Card (processed via Square)<br>
                  Date Processed: ${invoiceDate}
                </p>
              </div>
              
              <!-- Thank You Message -->
              <div style="text-align: center; margin: 40px 0; padding: 30px; background: #fafbfc; border-radius: 6px;">
                <h2 style="margin: 0 0 15px 0; font-size: 24px; color: #000000; font-weight: 400;">Thank You!</h2>
                <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #555;">
                  Your support strengthens our brotherhood and<br>
                  empowers us to serve our community.
                </p>
                <p style="margin: 15px 0 0 0; font-style: italic; color: #c9975b;">
                  "Onward and Upward!"
                </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;">
                Please retain this receipt for your records.
              </p>
              <p style="margin: 0; font-size: 13px; color: #999;">
                ${ORG_NAME}
              </p>
            </div>
          </div>
        `,
      };
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid email type. Must be 'confirmation' or 'receipt'" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send email with retry logic
    let attempts = 0;
    const maxAttempts = 3;
    let lastError;

    while (attempts < maxAttempts) {
      try {
        emailResponse = await resend.emails.send(emailContent);
        console.log(`Email sent successfully (type: ${emailData.type}):`, {
          id: emailResponse.id,
          to: emailData.donor_email,
          attempt: attempts + 1
        });
        break;
      } catch (error) {
        attempts++;
        lastError = error;
        console.error(`Email send attempt ${attempts} failed:`, error);
        
        if (attempts < maxAttempts) {
          // Exponential backoff: 1s, 2s, 4s
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempts - 1) * 1000));
        }
      }
    }

    if (!emailResponse && lastError) {
      throw lastError;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        emailId: emailResponse.id,
        recipient: emailData.donor_email,
        type: emailData.type
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
    console.error("Error in send-donation-emails function:", error);
    
    // Determine appropriate error response
    const isResendError = error.message?.toLowerCase().includes('resend') || 
                         error.message?.toLowerCase().includes('api key');
    
    return new Response(
      JSON.stringify({ 
        error: isResendError 
          ? "Email service temporarily unavailable" 
          : "Failed to send email",
        details: Deno.env.get("DENO_ENV") === "development" ? error.message : undefined
      }),
      {
        status: isResendError ? 503 : 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);