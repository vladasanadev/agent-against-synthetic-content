import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, timestamp } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Send email notification to your address
    try {
      await resend.emails.send({
        from: 'Mirage Waitlist <noreply@mirage.com>', // Replace with your verified domain
        to: ['hello.vladasana@gmail.com'],
        subject: '🎉 New Mirage Waitlist Signup!',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1F2937 0%, #374151 100%); border-radius: 16px; padding: 32px; color: white; border: 1px solid #F1CA3A;">
              <div style="text-align: center; margin-bottom: 24px;">
                <h1 style="color: #F1CA3A; margin: 0; font-size: 28px; font-weight: bold;">Mirage Waitlist</h1>
                <div style="width: 64px; height: 4px; background: linear-gradient(90deg, #F1CA3A, #F5D76E); margin: 16px auto; border-radius: 2px;"></div>
              </div>
              
              <h2 style="color: white; margin: 0 0 20px 0; font-size: 20px;">New Signup Alert! 🚀</h2>
              
              <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 12px; margin: 20px 0;">
                <p style="margin: 0 0 12px 0; color: #D1D5DB;"><strong style="color: #F1CA3A;">Email:</strong> ${email}</p>
                <p style="margin: 0 0 12px 0; color: #D1D5DB;"><strong style="color: #F1CA3A;">Timestamp:</strong> ${new Date(timestamp).toLocaleString()}</p>
                <p style="margin: 0; color: #D1D5DB;"><strong style="color: #F1CA3A;">Source:</strong> Mirage Landing Page</p>
              </div>
              
              <div style="text-align: center; margin-top: 24px;">
                <p style="color: #9CA3AF; font-size: 14px; margin: 0;">Another user is excited about the future of verification! 🛡️</p>
              </div>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't fail the request if email sending fails
    }

    // Log the submission for backup
    console.log('New waitlist submission:', {
      email,
      timestamp,
      targetEmail: 'hello.vladasana@gmail.com'
    });

    return NextResponse.json(
      { 
        message: 'Successfully added to waitlist',
        email: email,
        timestamp: timestamp
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing waitlist submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 