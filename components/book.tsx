"use client";

import { useState } from "react";

export const Book = ({ sum }: { sum: string }) => {
  const [open, setOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setOpen(true)}
      >
        Book Now
      </button>
      {open && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10 ">
          <div className="bg-white rounded-lg p-8">
            <button
              className="absolute top-2 right-2"
              onClick={() => setOpen(false)}
            >
              X
            </button>
            <form className="flex flex-col gap-2 px-4 py-2">
              <div>
                <label>Name:</label>
                <input
                  className="border-solid border-2"
                  type="text"
                  name="name"
                />
              </div>
              <div>
                <label>Number of people staying:</label>
                <input
                  className="border-solid border-2"
                  type="number"
                  name="numPeople"
                />
              </div>
              <div>
                <label>Names of people staying:</label>
                <input
                  className="border-solid border-2"
                  type="text"
                  name="peopleNames"
                />
              </div>
              <div>
                <label className="flex space-x-4">
                  I agree to pay Sam and Zoe the sum of €{sum}
                  <input
                    className="border-solid border-2"
                    type="checkbox"
                    name="agree"
                    value={agreed}
                    onChange={() => setAgreed(!agreed)}
                  />
                </label>
              </div>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-dark-green:700"
                disabled={!agreed}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
