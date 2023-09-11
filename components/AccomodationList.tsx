import { convertRowToNamedObject } from "@/utilities/client/sheets";
import { S3_PROD_IMAGES_URL, createS3ImageUrl } from "@/utilities/client/aws";

export const AccomodationList = ({ sheet }: { sheet: string[][] }) => {
  const [headers, ...rest] = Array.isArray(sheet) ? sheet : [];
  return (
    <>
      <span>
        <h2 className="text-4xl font-bold">Available Accomodation</h2>
      </span>
      <div className="flex flex-col gap-3">
        {rest.map((row, index) => {
          const {
            s3FolderName,
            description,
            rentalPricePerNightAndPerAccommodation,
            maximumCapacity,
            iD,
          } = convertRowToNamedObject(headers, row);
          const headerImage = createS3ImageUrl(
            S3_PROD_IMAGES_URL || '',
            s3FolderName,
            "0.jpg"
          );
          return (
            <a
              key={index}
              href={`/accomodation/${iD}`}
              className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                src={headerImage}
                alt=""
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {s3FolderName}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {description.slice(0, 100)}
                </p>
              </div>
              <div className="flex flex-row md:flex-col items-center justify-between mx-1 w-[300px] ">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  €{rentalPricePerNightAndPerAccommodation}
                  <span className="text-sm">p/n</span>
                </span>
                <span className="text-gray-900 font-small rounded-lg text-sm no-wrap">
                  Max People: {maximumCapacity}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
};
