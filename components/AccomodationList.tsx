"use client";
import { convertRowToNamedObject } from "@/utilities/client/sheets";
import { S3_PROD_IMAGES_URL, createS3ImageUrl } from "@/utilities/client/aws";
import { useData } from "./context/sheetsCtx";
import { useNavigate } from "react-router";

export const AccomodationList = () => {
  const navigate = useNavigate();
  const { namedSheet } = useData();
  const [, ...restNamed] = Array.isArray(namedSheet) ? namedSheet : [];

  return (
    <>
      <span>
        <h2 className="text-4xl font-bold">Available Accomodation</h2>
      </span>
      <div className="flex flex-col gap-3">
        {restNamed
          .filter(
            ({ numberAvailableCurrent }) => Number(numberAvailableCurrent) > 0
          )
          .map((row, index) => {
            const {
              s3FolderName,
              description,
              rentalPricePerNightAndPerAccommodation,
              maximumCapacity,
              iD,
              numberAvailableCurrent,
            } = row;
            const headerImage = createS3ImageUrl(
              S3_PROD_IMAGES_URL || "",
              s3FolderName as string,
              "0.jpg"
            );

            return (
              <button
                key={index}
                onClick={() => navigate(`/accomodation/${iD}`)}
                className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 "
              >
                <img
                  className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                  src={headerImage}
                  alt=""
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                    {s3FolderName}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 ">
                    {description.slice(0, 100)}...
                  </p>
                </div>
                <div className="flex flex-row md:flex-col items-center justify-between mx-1 w-[300px] ">
                  <span className="text-3xl font-bold text-gray-900 ">
                    £{rentalPricePerNightAndPerAccommodation}
                    <span className="text-sm">p/n</span>
                  </span>
                  <span className="text-gray-900 font-small rounded-lg text-sm no-wrap">
                    Max People: {maximumCapacity}
                  </span>
                  <span className="text-gray-900 font-small rounded-lg text-sm no-wrap">
                    Available: {numberAvailableCurrent}
                  </span>
                </div>
              </button>
            );
          })}
      </div>
    </>
  );
};
