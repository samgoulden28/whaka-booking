"use server";
import { revalidatePath } from "next/cache";
import { addRowToGoogleSheet } from "./sheets";
// import luxon and format todays date
import { DateTime } from "luxon";
import { redirect } from "next/navigation";

export async function addBooking(data: FormData) {
  "use server";
  const today = DateTime.now().toFormat("dd/MM/yyyy");
  const values = [
    (data.get("accomodationId") as string) || "",
    (data.get("name") as string) || "",
    (data.get("numPeople") as string) || "",
    today,
    "false",
  ];
  await addRowToGoogleSheet(values);
  revalidatePath("/");
  redirect(`/accomodation/${data.get("accomodationId")}?booked=true`);
}

export async function addBookingApi({
  accomodationId,
  name,
  peopleNames,
  numPeople,
}: any) {
  const today = DateTime.now().toFormat("dd/MM/yyyy");
  const values = [accomodationId, name, numPeople, peopleNames, today, "false"];
  await addRowToGoogleSheet(values);
}
