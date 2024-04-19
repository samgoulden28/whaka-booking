"use client";
import { useState } from "react";
import { S3_PROD_IMAGES_URL, createS3ImageUrl } from "@/utilities/client/aws";
import { useData } from "./context/sheetsCtx";
import { useNavigate } from "react-router";
import FilterComponent, { Filters } from "./Filters";

export const filtersInitial: Filters = {
  minPeople: 0,
  maxPeople: 7,
  minBedrooms: 0,
  maxBedrooms: 3,
  tentsCaravans: false,
};
export const AccomodationList = () => {
  const navigate = useNavigate();
  const { namedSheet } = useData();
  const [filters, setFilters] = useState(filtersInitial);
  const [, ...restNamed] = Array.isArray(namedSheet) ? namedSheet : [];

  return (
    <>
      <span>
        <h2 className="text-4xl font-bold">Available Accommodation</h2>
      </span>
      <FilterComponent filters={filters} setFilters={setFilters} />
      <div className="flex flex-col gap-3">
        {restNamed
          .filter(
            ({
              numberAvailableCurrent,
              maximumCapacity,
              numberOfRooms,
              s3FolderName,
            }) => {
              return (
                Number(maximumCapacity) >= filters.minPeople &&
                Number(maximumCapacity) <= (filters.maxPeople || 8) &&
                (filters.tentsCaravans
                  ? s3FolderName.includes("Tente nomade")
                  : true) &&
                Number(numberOfRooms) >= filters.minBedrooms &&
                Number(numberOfRooms) <= filters.maxBedrooms
              );
            }
          )
          .map((row, index) => {
            const {
              s3FolderName,
              description,
              rentalPricePerNightAndPerAccommodation,
              maximumCapacity,
              iD,
              numberAvailableCurrent,
              numberOfRooms,
              numberOfBathrooms,
              headlineImage,
            } = row;

            const newName = headlineImage.replace(
              /(\d+)\.jpg$/,
              "$1_compressed.jpg"
            );

            const headerImage = createS3ImageUrl(
              S3_PROD_IMAGES_URL || "",
              s3FolderName as string,
              newName
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
                  loading="lazy"
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                    {s3FolderName}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 ">
                    {description.slice(0, 100)}...
                  </p>
                </div>
                <div className="flex flex-wrap md:flex-nowrap flex-row md:flex-col items-center justify-between mx-1 w-[300px] ">
                  <span className="text-3xl font-bold text-gray-900 basis-full md:basis-auto">
                    £{rentalPricePerNightAndPerAccommodation}
                    <span className="text-sm">p/n</span>
                  </span>
                  <span className="text-gray-900 font-small rounded-lg text-sm no-wrap font-semibold">
                    Max People:{" "}
                    <span className="font-normal"> {maximumCapacity}</span>
                  </span>
                  <span className="text-gray-900 font-small rounded-lg text-sm no-wrap font-semibold">
                    Bedrooms:{" "}
                    <span className="font-normal"> {numberOfRooms}</span>
                  </span>
                  <span className="text-gray-900 font-small rounded-lg text-sm no-wrap font-semibold">
                    Bathrooms:{" "}
                    <span className="font-normal"> {numberOfBathrooms}</span>
                  </span>
                  <span className="text-gray-900 font-small rounded-lg text-sm no-wrap font-semibold">
                    Suites Available:{" "}
                    <span className="font-normal">
                      {" "}
                      {numberAvailableCurrent}
                    </span>
                  </span>
                </div>
              </button>
            );
          })}
      </div>
    </>
  );
};
