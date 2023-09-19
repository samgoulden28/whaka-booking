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
    <div className="flex flex-col md:flex-row items-center justify-between min-h-screen py-2 gap-3">
      <div className="flex flex-col items-center max-w-2xl gap-1 md:w-1/2 ">
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
      <div className="md:max-w-2xl md:w-1/2 max-w-xs flex flex-col">
        <span className="text-center">
          Tap the left and right arrows or swipe to see more pictures.
        </span>
        <Carousel images={JSON.parse(images)} name={typeOfAccommodation} />
      </div>
    </div>
  );
}
