"use client";
import { SheetData, convertRowToNamedObject } from "@/utilities/client/sheets";
import React, { createContext, useContext } from "react";

const DataContext = createContext<{
  rawSheet: SheetData;
  namedSheet: { [index: string]: string }[];
}>({
  rawSheet: [],
  namedSheet: [],
});

export const useData = () => {
  return useContext(DataContext);
};

type DataProviderProps = {
  children: React.ReactNode;
  value: SheetData;
};

export const DataProvider = ({ children, value }: DataProviderProps) => {
  const [headers] = Array.isArray(value) ? value : [];
  return (
    <DataContext.Provider
      value={{
        rawSheet: value,
        namedSheet: value.map((row) => convertRowToNamedObject(headers, row)),
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
