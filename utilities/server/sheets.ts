import { google } from "googleapis";
import { v4 } from "uuid";
// should be GSHEETS_PRIVATE_KEY if it exists or GSHEETS_PRIVATE_KEY_BASE64 decoded if it exists
const private_key = process.env.GSHEETS_PRIVATE_KEY || process.env.GSHEETS_PRIVATE_KEY_BASE64 ? Buffer.from(process.env.GSHEETS_PRIVATE_KEY_BASE64 || "", "base64").toString("ascii") : "";
const options = {
  projectId: "quick-line-389216",
  credentials: {
    type: "service_account",
    token_url: `https://oauth2.googleapis.com/token?salt=${v4()}`, // cache buster
    universe_domain: "googleapis.com",
    private_key,
    client_email: process.env.GSHEETS_CLIENT_EMAIL || "",
    client_id: process.env.GSHEETS_CLIENT_ID || "",
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
};
const auth = google.auth.getClient(options);

export async function getGoogleSheetsData(range: string) {
  const sheets = google.sheets({ version: "v4", auth: await auth });

  const data = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GSHEETS_SPREADSHEET_ID || "",
    range: range,
  });

  return data.data.values;
}

export async function addRowToGoogleSheet(values: string[]) {
  const sheets = google.sheets({ version: "v4", auth: await auth });

  const success = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GSHEETS_SPREADSHEET_ID || "",
    range: `${process.env.NEXT_PUBLIC_BOOKING_SHEET_NAME}`,
    requestBody: {
      values: [values],
    },
    valueInputOption: "RAW",
  });
  return success;
}
