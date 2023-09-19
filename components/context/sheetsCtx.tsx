"use client";
import { SheetData, convertRowToNamedObject } from "@/utilities/client/sheets";
import React, { createContext, useContext } from "react";

const DataContext = createContext<{
  rawSheet: SheetData;
  namedSheet: { [index: string]: string }[];
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
}>({
  rawSheet: [],
  namedSheet: [],
  setRefresh: () => {},
});

export const useData = () => {
  return useContext(DataContext);
};

type DataProviderProps = {
  children: React.ReactNode;
  value: SheetData;
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
};

export const DataProvider = ({
  children,
  value,
  setRefresh,
}: DataProviderProps) => {
  const [headers] = Array.isArray(value) ? value : [];
  return (
    <DataContext.Provider
      value={{
        rawSheet: value,
        namedSheet: value.map((row) => convertRowToNamedObject(headers, row)),
        setRefresh,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
