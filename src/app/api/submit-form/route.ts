import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { corsHeaders } from '@/utils/cors';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Handle preflight OPTIONS request
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  return corsHeaders(response);
}

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    // Format email content
    const formattedData = Object.entries(formData)
      .filter(([key]) => key !== 'terms')
      .map(([key, value]) => {
        // Try to find a better field name by capitalizing and adding spaces
        const formattedKey = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (str) => str.toUpperCase());

        return `<tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">${formattedKey}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${value}</td>
        </tr>`;
      })
      .join('');

    // Determine the form type based on the fields
    let formType = 'Form Submission';
    if (formData.subjects && formData.experience) {
      formType = 'Teacher Application';
    } else if (formData.ageRange && formData.genderRatio) {
      formType = 'School Registration';
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Form Submission <onboarding@resend.dev>',
      to: process.env.EMAIL_TO || 'recipient@gmail.com',
      subject: `New ${formType}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            h1 { color: #31848C; }
            table { width: 100%; border-collapse: collapse; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>New ${formType}</h1>
            <p>A new submission has been received from your website form.</p>
            <table>
              <tbody>
                ${formattedData}
              </tbody>
            </table>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      const errorResponse = NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
      return corsHeaders(errorResponse);
    }

    const successResponse = NextResponse.json({ success: true, messageId: data?.id });
    return corsHeaders(successResponse);
  } catch (error) {
    console.error('Error sending email:', error);
    const errorResponse = NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      },
      { status: 500 }
    );
    return corsHeaders(errorResponse);
  }
}
