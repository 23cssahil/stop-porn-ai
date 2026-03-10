import { NextRequest, NextResponse } from 'next/server';
import { initSheet } from '@/lib/googleSheets';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Lock Request Body:", body);
    const { userId, email, duration, partnerEmail } = body;
    
    const sheet = await initSheet();
    
    const lockUntil = new Date();
    lockUntil.setDate(lockUntil.getDate() + parseInt(duration.toString()));

    console.log("Fetching rows...");
    const rows = await sheet.getRows();
    console.log(`Found ${rows.length} rows`);
    
    let row = rows.find(r => r.get('userID')?.toString() === userId?.toString());
    
    const startDate = new Date().toISOString();

    if (row) {
      console.log("Updating existing row for user:", userId);
      row.set('lockUntil', lockUntil.toISOString());
      row.set('partnerEmail', partnerEmail);
      if (!row.get('startDate')) {
        row.set('startDate', startDate);
      }
      await row.save();
    } else {
      console.log("Adding new row for user:", userId);
      await sheet.addRow({
        userID: userId.toString(),
        email: email || 'no-email',
        lockUntil: lockUntil.toISOString(),
        startDate: startDate,
        streak: '0',
        partnerEmail: partnerEmail || ''
      });
    }

    console.log("Lock successful. LockUntil:", lockUntil.toISOString());
    return NextResponse.json({ success: true, lockUntil });
  } catch (error: any) {
    console.error("Lock API Error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
