import { getGoogleSheetsData } from "@/utilities/server/sheets";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
export const fetchCache = "force-no-store";

const range = `${process.env.NEXT_PUBLIC_SHEET_NAME}!${process.env.NEXT_PUBLIC_SHEET_RANGE}`;

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");

  if (!path) {
    return NextResponse.json(
      { message: "Missing path param" },
      { status: 400 }
    );
  }

  const sheet = await getGoogleSheetsData(range);
  revalidatePath(path);
  return new Response(JSON.stringify(sheet), { status: 200 });
}
