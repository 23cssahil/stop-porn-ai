import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// DO NOT initialize Resend at module level — it crashes builds when RESEND_API_KEY is missing
export async function POST(req: NextRequest) {
  try {
    const { partnerEmail, eventType } = await req.json();

    if (!partnerEmail) {
      return NextResponse.json({ error: 'No partner email found' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not set — alert email skipped');
      return NextResponse.json({ success: true, warning: 'Email not sent, RESEND_API_KEY missing' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);


    const message = eventType === 'UNINSTALL' 
      ? 'Attempted to UNINSTALL the protection extension.' 
      : 'Attempted to bypass the digital lock contract.';

    await resend.emails.send({
      from: 'PureWill Guardian <alerts@resend.dev>',
      to: partnerEmail,
      subject: '⚠️ Security Alert: Willpower Bypass Attempted',
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #dc2626;">Security Alert</h2>
          <p>Hello,</p>
          <p>This is an automated alert from <strong>PureWill AI Guardian</strong>.</p>
          <p>The user who added you as an accountability partner has: <br/> 
          <span style="font-weight: bold; color: #000;">${message}</span></p>
          <p>Please reach out to them and provide the necessary support to stay on track.</p>
          <hr/>
          <p style="font-size: 12px; color: #666;">This is an automated system message. Do not reply.</p>
        </div>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
