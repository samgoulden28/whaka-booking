import { addRowToGoogleSheet } from "./sheets";
import { DateTime } from "luxon";

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
