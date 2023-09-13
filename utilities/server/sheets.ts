import { google } from "googleapis";

const auth = google.auth.getClient({
  projectId: "quick-line-389216",
  credentials: {
    type: "service_account",
    token_url: "https://oauth2.googleapis.com/token",
    universe_domain: "googleapis.com",
    private_key: process.env.GSHEETS_PRIVATE_KEY || "",
    client_email: process.env.GSHEETS_CLIENT_EMAIL || "",
    client_id: process.env.GSHEETS_CLIENT_ID || "",
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

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
