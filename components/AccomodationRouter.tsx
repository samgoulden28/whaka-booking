"use client";
import { convertRowToNamedObject } from "@/utilities/client/sheets";
import { S3_PROD_IMAGES_URL, createS3ImageUrl } from "@/utilities/client/aws";
import { DataProvider } from "./context/sheetsCtx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Accomodation } from "./Accomodation";
import { AccomodationList } from "./AccomodationList";

export const AccomodationRouter = ({ sheet }: { sheet: string[][] }) => {
  return (
    <DataProvider value={sheet}>
      <BrowserRouter>
        <Routes>
          <Route path="/accomodation/:id" element={<Accomodation />} />
          <Route path="/" element={<AccomodationList />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
};
