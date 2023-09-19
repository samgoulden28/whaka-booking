import { convertRowToNamedObject } from "@/utilities/client/sheets";
import { Carousel } from "@/components/carousel";
import { useData } from "@/components/context/sheetsCtx";
import { Book } from "@/components/book";
import { useParams, redirect } from "react-router-dom";

export function Accomodation() {
  const { id } = useParams();
  const { namedSheet } = useData();

  if (!id) {
    redirect("/");
  }
  const row = namedSheet.find((row) => row.iD === id);
  const {
    description,
    typeOfAccommodation,
    maximumCapacity,
    rentalPricePerNightAndPerAccommodation,
    numberAvailableCurrent,
    images,
  } = row || {};

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
              <td className="border px-4 py-2">Maximum Capacity:</td>
              <td className="border px-4 py-2">{maximumCapacity}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Rental Price Per Night</td>
              <td className="border px-4 py-2">
                £{rentalPricePerNightAndPerAccommodation}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Number Available Current:</td>
              <td className="border px-4 py-2">{numberAvailableCurrent}</td>
            </tr>
          </tbody>
        </table>
        <Book
          sum={rentalPricePerNightAndPerAccommodation}
          accomodationId={Number(id)}
        />
      </div>
      <div className="max-w-2xl">
        <Carousel images={JSON.parse(images)} name={typeOfAccommodation} />
      </div>
    </div>
  );
}
