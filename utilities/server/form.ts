import { addRowToGoogleSheet } from "./sheets";
import { DateTime } from "luxon";

export async function addBookingApi({
  accomodationId,
  name,
  peopleNames,
  numPeople,
  depositAmount,
  totalAmount
}: any) {
  const today = DateTime.now().toFormat("dd/MM/yyyy");
  const depositAmountString = depositAmount ? `£${depositAmount}` : "£0";
  const remainingAmountString = `£${totalAmount - depositAmount}`;
  const values = [accomodationId, name, numPeople, peopleNames, today, "verify", depositAmountString, remainingAmountString, "FALSE"];
  await addRowToGoogleSheet(values);
}
