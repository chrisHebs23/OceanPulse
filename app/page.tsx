"use client";
import { useEffect, useState } from "react";
import { OceanApiResponse } from "./constants/interfaces";
import { TopBar } from "@/components/ui/TopBar";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [oceanData, setOceanData] = useState<OceanApiResponse>();
  const [progressState, setProgressState] = useState<string>("idle");

  useEffect(() => {
    const fetchOceanData = async () => {
      try {
        const res = await fetch("/api/ocean-api", {
          method: "GET",
        });

        if (!res.ok) throw new Error("Failed to fetch ocean data");

        const data = await res.json();
        console.log(data);
        setOceanData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOceanData();
    return () => {};
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-[#06100e]">
      <TopBar progress={progressState} />
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        {oceanData && (
          <div className="flex flex-col gap-4 text-black dark:text-zinc-50">
            <h2 className="text-xl font-semibold">Current Conditions</h2>
            <p>Wave Height: {oceanData.wave_height}</p>
            <p>Wave Direction: {oceanData.wave_direction}°</p>
            <p>
              Wave Period: {oceanData.wave_period} {oceanData.wave_period}
            </p>
            <p>Sea Surface Temp: {oceanData.sea_surface_temperature}°C</p>
          </div>
        )}
      </main>
    </div>
  );
}
