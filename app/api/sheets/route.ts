import { getGoogleSheetsData } from "@/utilities/server/sheets";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
// export const fetchCache = "force-no-store";

const range = `${process.env.NEXT_PUBLIC_SHEET_NAME}!${process.env.NEXT_PUBLIC_SHEET_RANGE}`;

export async function GET(request: NextRequest) {
  revalidatePath("/api/sheets");
  const sheet = await getGoogleSheetsData(range);
  console.log("inside GET", sheet);
  revalidatePath("/");
  return NextResponse.json({ data: sheet, revalidated: true, now: Date.now() });
}
