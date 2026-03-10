import { NextRequest, NextResponse } from 'next/server';
import { initSheet } from '@/lib/googleSheets';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  console.log("Status Request for User:", userId);

  if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });

  try {
    const sheet = await initSheet();
    const rows = await sheet.getRows();
    console.log(`Checking status for ${userId}. Total rows in sheet: ${rows.length}`);
    
    const row = rows.find(r => {
      const rowId = r.get('userID');
      const match = rowId?.toString() === userId;
      return match;
    });
 
    if (!row) {
      console.log("No data found for user:", userId);
      return NextResponse.json({ isLocked: false });
    }
 
    const lockUntilStr = row.get('lockUntil');
    const lockUntil = new Date(lockUntilStr);
    const isLocked = lockUntil > new Date();
 
    console.log(`User ${userId} - isLocked: ${isLocked}, lockUntil: ${lockUntilStr}`);
 
    return NextResponse.json({
      isLocked,
      lockUntil: lockUntilStr,
      startDate: row.get('startDate') || '',
      streak: row.get('streak')
    });
  } catch (error: any) {
    console.error("Status API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
