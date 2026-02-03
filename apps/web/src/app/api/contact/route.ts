import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with the API key
// Note: Requires RESEND_API_KEY environment variable to be set
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { name, email, type, message } = await request.json();

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Send the email
        // IMPORTANT: 'from' address must be a verified domain in Resend
        // For testing without a verified domain, use 'onboarding@resend.dev'
        // For production, change this to your verified domain e.g. 'noreply@nexura.ma'
        const fromEmail = process.env.NODE_ENV === 'development'
            ? 'onboarding@resend.dev'
            : 'noreply@nexura.ma';

        const data = await resend.emails.send({
            from: `Nexura Contact Form <${fromEmail}>`,
            to: ['contact@nexura.ma'], // Your receiving email
            replyTo: email,
            subject: `New Contact Form Submission: ${type || 'General'}`,
            html: `
        <div>
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Type:</strong> ${type || 'Not specified'}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
      `,
        });

        if (data.error) {
            console.error("Resend API Error:", data.error);
            return NextResponse.json({ error: data.error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('SERVER_ERROR:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
