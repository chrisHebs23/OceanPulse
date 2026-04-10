"use client";

import { LonLat, LonLatList } from "@/app/constants/interfaces";

interface ReadyToFetchProps {
  locations: LonLatList[];
  handleChange: (index: number) => void;
  selectedLonLat: number;
}

export function ReadyToFetch({
  locations,
  handleChange,
  selectedLonLat,
}: ReadyToFetchProps) {
  return (
    <div className="flex w-1/2 flex-col justify-center items-center gap-3">
      <span className="text-5xl">🛰️</span>
      <h3 className="text-2xl">Ready to fetch</h3>
      <p className="text-center">
        Ready to fetch Pulls live ocean conditions from NOAA, analyzes with
        Gemini, and surfaces key insights.
      </p>
      <div className="border-2 border-blue-400/40 bg-none rounded-2xl p-2">
        📍
        <select
          id="Select location"
          value={selectedLonLat}
          onChange={(e) => handleChange(Number(e.target.value))}
        >
          {locations.map((location, index: number) => (
            <option
              className="text-white bg-[#06100e] border-0"
              key={index}
              value={index}
            >
              {location.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
