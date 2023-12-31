import { getGoogleSheetsData } from "@/utilities/server/sheets";
import { NextRequest, NextResponse } from "next/server";
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
const range = `${process.env.NEXT_PUBLIC_SHEET_NAME}!${process.env.NEXT_PUBLIC_SHEET_RANGE}`;

export async function GET(request: NextRequest) {
  const sheet = await getGoogleSheetsData(range);
  return NextResponse.json({ data: sheet, revalidated: true, now: Date.now() });
}
