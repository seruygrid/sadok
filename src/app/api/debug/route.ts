import { NextResponse } from "next/server";

// TEMPORARY — remove before production
export async function GET() {
  return NextResponse.json({
    MONO_TOKEN: process.env.MONO_TOKEN ? "✅ set" : "❌ missing",
    GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID ? "✅ set" : "❌ missing",
    GOOGLE_SHEETS_CREDENTIALS: process.env.GOOGLE_SHEETS_CREDENTIALS ? "✅ set" : "❌ missing",
  });
}
