import { NextResponse } from 'next/server';
import { initSheet } from '@/lib/googleSheets';

export async function GET() {
  const diagnostics: any = {
    timestamp: new Date().toISOString(),
    env: {
      hasSheetId: !!process.env.GOOGLE_SHEET_ID,
      hasEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      hasKey: !!process.env.GOOGLE_PRIVATE_KEY,
    }
  };

  try {
    const sheet = await initSheet();
    diagnostics.sheetTitle = "Connected: " + (sheet.title || "Unknown");
    diagnostics.status = "SUCCESS";
  } catch (e: any) {
    diagnostics.status = "FAILED";
    diagnostics.error = e.message;
  }

  return NextResponse.json(diagnostics);
}
