"use client";
import Image from "next/image";
import { AccomodationRouter } from "@/components/AccomodationRouter";
import { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [sheet, setSheet] = useState<string[][]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(1);

  const [showHelp, setShowHelp] = useState(false);

  //prevents hydration mismatches
  useEffect(() => {
    const initial =
      typeof window !== "undefined" && window.localStorage
        ? window.localStorage.getItem("showHelp") !== "false"
        : true;
    setShowHelp(initial);
  }, []);

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      const response = await fetch("/api/sheets", { cache: "no-cache" });
      const sheet = await response.json();
      setSheet(sheet);
      setLoading(false);
    };

    get();
  }, [refresh]);

  const closeModal = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem("showHelp", "false");
    }
    setShowHelp(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 py-24 overflow-x-hidden">
      {showHelp && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10 overflow-x-hidden">
          <div className="bg-white rounded-lg p-8 relative">
            <button className="absolute top-2 right-2" onClick={closeModal}>
              X
            </button>
            <h1 className="text-2xl font-semibold mb-4">
              Welcome to Our Booking Page!
            </h1>

            <p className="mb-4">
              We&apos;re thrilled you&apos;re considering staying with us.
              Before you proceed, here are some important things you should
              know:
            </p>

            <ul className="list-disc list-inside">
              <li className="mb-2">
                <strong>One Booking Only, Please:</strong> Multiple bookings can
                create headaches for Sam and Zoe.
              </li>
              <li className="mb-2">
                <strong>Two-Night Stay:</strong> You&apos;ll need to book for
                both Friday and Saturday nights. E.G if one night costs
                &pound;99, your total will be &pound;198.
              </li>
              <li className="mb-2">
                <strong>Pay Sam &amp; Zoe:</strong> All payments go directly to
                Sam and Zoe via a provided Monzo link!
              </li>
              <li className="mb-2">
                <strong>First-Come, First-Served:</strong> Rooms get booked
                fast, so don&apos;t miss out!
              </li>
              <li className="mb-2">
                <strong>Deposit First:</strong> Make sure you&apos;ve paid the
                deposit before hitting the &apos;Book&apos; button.
              </li>
              <li className="mb-4">
                <strong>Final Step:</strong> Once you click &apos;Book&apos;,
                the accommodation is all yours. So, be sure you&apos;re ready!
              </li>
            </ul>

            <p className="mb-4">
              Close this modal when you&apos;re ready to make your booking. We
              look forward to hosting you!
            </p>

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={closeModal}
              type="button"
            >
              Close & Continue
            </button>
          </div>
        </div>
      )}
      {loading ? (
        <FallingLines color="#4fa94d" width="100" visible={true} />
      ) : (
        <AccomodationRouter sheet={sheet} setRefresh={setRefresh} />
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </main>
  );
}
