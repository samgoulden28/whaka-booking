import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import Image from "next/image";
import filterIcon from "@/public/filter.png";
import resetIcon from "@/public/reset.png";
import cx from "classnames";
type Filters = {
  minPeople: number;
  maxPeople: number;
  tentsCaravans: boolean;
  minBedrooms: number;
  maxBedrooms: number;
};

type FilterComponentProps = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

const FilterComponent = ({ filters, setFilters }: FilterComponentProps) => {
  const [active, setActive] = React.useState(false);
  const [height, setHeight] = useState(0);
  const handleFilterChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const val = type === "checkbox" ? checked : value;
    setFilters({ ...filters, [name]: val });
  };

  const ref = useRef(null);

  useEffect(() => {
    // If active, set height to the scrollHeight of the content (full height)
    if (active && ref.current) {
      setHeight((ref.current as HTMLDivElement).scrollHeight);
    } else {
      setHeight(0); // If not active, collapse the content
    }
  }, [active]);

  // update these classes so the component animates in and out.
  const filtersClassName = cx(
    "flex w-full flex-wrap mt-4 overflow-hidden transition-max-height duration-300 ease-in-out height-0",
    { "height-auto": !active }
  );

  const resetFilters = () => {
    setFilters({
      minPeople: 0,
      maxPeople: Infinity,
      minBedrooms: 0,
      maxBedrooms: Infinity,
      tentsCaravans: false,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-2xl  mb-4">
      <div
        onClick={() => setActive(!active)}
        className="flex items-center justify-between cursor-pointer hover:bg-slate-200 rounded"
      >
        <h3 className="text-2xl font-bold">Filters</h3>
        <span className="ml-2">
          <Image width={48} height={48} src={filterIcon} alt="filter icon" />
        </span>
      </div>
      <div
        ref={ref}
        style={{ maxHeight: `${height}px` }}
        className={filtersClassName}
      >
        <label className="w-1/2 p-2">
          Min People
          <input
            type="number"
            name="minPeople"
            value={filters.minPeople}
            onChange={handleFilterChange}
            className="p-2 w-full rounded border"
          />
        </label>
        <label className="w-1/2 p-2">
          Max People
          <input
            type="number"
            name="maxPeople"
            value={filters.maxPeople}
            onChange={handleFilterChange}
            className="p-2 w-full rounded border"
          />
        </label>
        <label className="w-1/2 p-2 block">
          Min Bedrooms
          <input
            type="number"
            name="minBedrooms"
            value={filters.minBedrooms}
            onChange={handleFilterChange}
            className="mt-1 p-2 w-full rounded border"
          />
        </label>
        <label className="w-1/2 p-2 block">
          Max Bedrooms
          <input
            type="number"
            name="maxBedrooms"
            value={filters.maxBedrooms}
            onChange={handleFilterChange}
            className="mt-1 p-2 w-full rounded border"
          />
        </label>
        <label className="w-1/2 p-2 inline-flex items-center mt-3">
          <input
            type="checkbox"
            name="tentsCaravans"
            checked={filters.tentsCaravans}
            onChange={handleFilterChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">Only show tents</span>
        </label>
        <label className="w-1/2 p-2 flex justify-center align-center items-center mt-3">
          <div
            onClick={resetFilters}
            className="rounded-full hover:bg-gray-200 active:bg-gray-400 press cursor-pointer"
          >
            <Image width={32} height={32} src={resetIcon} alt="filter icon" />
          </div>
        </label>
      </div>
    </div>
  );
};

export default FilterComponent;
