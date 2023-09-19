import { getGoogleSheetsData } from "@/utilities/server/sheets";

export const fetchCache = "force-no-store";

const range = `${process.env.NEXT_PUBLIC_SHEET_NAME}!${process.env.NEXT_PUBLIC_SHEET_RANGE}`;

export async function GET(req: Request) {
  const sheet = await getGoogleSheetsData(range);
  return new Response(JSON.stringify(sheet), { status: 200 });
}
