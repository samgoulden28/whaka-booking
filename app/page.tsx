"use client";
import Image from "next/image";
import { AccomodationRouter } from "@/components/AccomodationRouter";
import { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";

export default function Home() {
  const [sheet, setSheet] = useState<string[][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const get = async () => {
      const response = await fetch("/api/sheets");
      const sheet = await response.json();
      setSheet(sheet);
      setLoading(false);
    };

    get();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {loading ? (
        <FallingLines color="#4fa94d" width="100" visible={true} />
      ) : (
        <AccomodationRouter sheet={sheet} />
      )}
    </main>
  );
}
