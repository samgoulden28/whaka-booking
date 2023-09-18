import { getGoogleSheetsData } from "@/utilities/server/sheets";
import Image from "next/image";
import { DataProvider } from "@/components/context/sheetsCtx";
import { AccomodationRouter } from "@/components/AccomodationRouter";

export default async function Home() {
  const range = `${process.env.NEXT_PUBLIC_SHEET_NAME}!${process.env.NEXT_PUBLIC_SHEET_RANGE}`;
  const sheet = await getGoogleSheetsData(range);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {sheet ? <AccomodationRouter sheet={sheet} /> : null}
    </main>
  );
}
