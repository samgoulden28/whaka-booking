"use client"
import { SheetData } from '@/utilities/client/sheets';
import React, { createContext, useContext } from 'react';

const DataContext = createContext<SheetData>([]);

export const useData = () => {
  return useContext(DataContext);
};

type DataProviderProps = {
  children: React.ReactNode;
  value: SheetData;
};

export const DataProvider = ({ children, value}: DataProviderProps) => {
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
