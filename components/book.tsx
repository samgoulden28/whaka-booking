"use client";

import { useSearchParams } from "next/navigation";
import { ReactNode, RefObject, useRef, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useData } from "./context/sheetsCtx";

export const Book = ({
  sum,
  accomodationId,
}: {
  sum: string;
  accomodationId: number;
}) => {
  const noNights = 2;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const deposit = Math.floor(Number(sum) * 0.2);
  const remainder = Number(sum) - deposit + Number(sum) * (noNights - 1);
  const { setRefresh } = useData();

  const book = async (info: any) => {
    await fetch("/api/book", {
      method: "POST",
      body: JSON.stringify(info),
    });

    setLoading(false);

    toast.success("✅ Booking Successful!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    setRefresh((prev) => prev + 1);

    navigate(`/`);
  };

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
          <div className="bg-white rounded-lg p-8 relative">
            <button
              className="absolute top-2 right-2"
              onClick={() => setOpen(false)}
            >
              X
            </button>
            <form
              onSubmit={(e) => {
                // call book with the form values as an object?
                e.preventDefault();
                setLoading(true);
                const data = new FormData(e.target as HTMLFormElement);
                book({
                  accomodationId: data.get("accomodationId"),
                  name: data.get("name"),
                  numPeople: data.get("numPeople"),
                  peopleNames: data.get("peopleNames"),
                });
              }}
              className="flex flex-col gap-2 px-4 py-2"
            >
              <div className="hidden">
                <input
                  className="border-solid border-2"
                  type="text"
                  name="accomodationId"
                  value={accomodationId}
                />
              </div>
              <div>
                <label>Name:</label>
                <br />
                <input
                  className="border-solid border-2"
                  type="text"
                  name="name"
                />
              </div>
              <div>
                <label>Number of people staying:</label>
                <br />
                <input
                  className="border-solid border-2"
                  type="number"
                  name="numPeople"
                />
              </div>
              <div>
                <label>Names of additional people staying:</label>
                <br />
                <input
                  className="border-solid border-2"
                  type="text"
                  name="peopleNames"
                />
              </div>
              <div>
                <h4>Payment Link</h4>
                <a
                  href={`https://monzo.me/samuelgoulden7?amount=${deposit}`}
                  className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                >
                  Monzo Sam Goulden £{deposit}
                </a>
              </div>
              <div>
                <label className="flex space-x-4 flex-col">
                  I have paid Sam the deposit of £{deposit} (20% of the first
                  night) and agree to pay the remainder of £{remainder} by July
                  1st, 2024
                  <input
                    className="border-solid border-2"
                    type="checkbox"
                    name="agree"
                    value={String(agreed)}
                    onChange={() => setAgreed(!agreed)}
                  />
                </label>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:bg-blue-300 disabled:cursor-not-allowed flex justify-center items-center"
                disabled={!agreed}
              >
                {loading ? (
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="24"
                    visible={true}
                  />
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
