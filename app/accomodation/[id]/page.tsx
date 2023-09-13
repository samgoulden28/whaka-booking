import { convertRowToNamedObject } from "@/utilities/client/sheets";
import { getGoogleSheetsData } from "@/utilities/server/sheets";
import { Carousel } from "@/components/carousel";
import { Book } from "@/components/book";

export default async function Post({ params }: { params: { id: number } }) {
  const rowNumber = Number(params.id) + 1; //Accomodate for header row.
  const range = `${process.env.NEXT_PUBLIC_SHEET_NAME}!A${rowNumber}:Z${rowNumber}`;
  const sheet = await getGoogleSheetsData(range);
  const headersRange = `${process.env.NEXT_PUBLIC_SHEET_NAME}!A1:Z1`;
  const headersSheet = await getGoogleSheetsData(headersRange);
  const [row] = Array.isArray(sheet) ? sheet : [];
  const [headers] = Array.isArray(headersSheet) ? headersSheet : [];
  const {
    description,
    typeOfAccommodation,
    numberOfRooms,
    maximumCapacity,
    rentalPricePerNightAndPerAccommodation,
    numberAvailableCurrent,
    images,
  } = convertRowToNamedObject(headers, row);

  //assign a variable true or false based on booking in the URL query params (if it exists)
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen py-2 gap-2">
      <div className="flex flex-col items-center w-[60vw] max-w-2xl sm:w-[80vw] gap-1">
        {/* a toast in the top right that appears for 5 seconds and then disappears if the
        url /accomodation/${data.get("accomodationId")}&booked=true has true in the url */}
        
        <div className="text-lg font-bold">{typeOfAccommodation}</div>
        <div>{description}</div>
        <table className="table-auto">
          <tbody>
            <tr>
              <td className="border px-4 py-2">Number of Rooms:</td>
              <td className="border px-4 py-2">{numberOfRooms}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Maximum Capacity:</td>
              <td className="border px-4 py-2">{maximumCapacity}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Rental Price Per Night</td>
              <td className="border px-4 py-2">
                €{rentalPricePerNightAndPerAccommodation}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Number Available Current:</td>
              <td className="border px-4 py-2">{numberAvailableCurrent}</td>
            </tr>
          </tbody>
        </table>
        <Book sum={rentalPricePerNightAndPerAccommodation} accomodationId={params.id}/>
      </div>
      <div className="max-w-2xl">
        <Carousel images={JSON.parse(images)} name={typeOfAccommodation} />
      </div>
    </div>
  );
}
