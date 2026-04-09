"use client";
import { useEffect, useState } from "react";
import { OceanApiResponse } from "./constants/interfaces";
import { TopBar } from "@/components/ui/TopBar";
import { LoadingCard } from "@/components/ui/LoadingCard";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [oceanData, setOceanData] = useState<OceanApiResponse>();
  const [progressState, setProgressState] = useState<string>("idle");
  const [loading, setLoading] = useState<boolean>(false);

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
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16">
        {loading && <LoadingCard />}
      </main>
    </div>
  );
}
