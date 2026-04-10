"use client";
import { useEffect, useState } from "react";
import {
  GeminiResponse,
  LonLat,
  messageSchema,
  OceanApiResponse,
} from "./constants/interfaces";
import { TopBar } from "@/components/ui/TopBar";
import { LoadingCard } from "@/components/ui/LoadingCard";
import { LOCATIONS } from "./constants/constants";
import { json } from "zod";
import { ButtonsBar } from "@/components/ui/ButtonsBar";
import { ReadyToFetch } from "@/components/ui/ReadyToFetch";
import { ResultsCard } from "@/components/ui/ResultsCard";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [oceanData, setOceanData] = useState<OceanApiResponse | null>(null);
  const [aiData, setAiData] = useState<GeminiResponse | null>(null);
  const [progressState, setProgressState] = useState<string>("idle");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedLonLat, setSelectedLonLat] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const lon = LOCATIONS[selectedLonLat].value.lon;
  const lat = LOCATIONS[selectedLonLat].value.lat;

  async function oceanCall() {
    setProgressState("running");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/ocean-api?lon=${lon}&lat=${lat}`, {
        method: "GET",
      });

      if (!res.ok) throw new Error("Failed to fetch Ocean data");

      const data = await res.json();
      setOceanData(data);

      const promptMessage = { role: "user", text: JSON.stringify(data) };

      const modelRes = await fetch("/api/chat-api", {
        method: "POST",
        body: JSON.stringify({ message: promptMessage }),
        headers: { "Content-Type": "application/json" },
      });

      if (!modelRes.ok) throw new Error("Failed to fetch AI response");

      const modelData = await modelRes.json();

      setAiData(modelData);
    } catch (error) {
      setError(
        `Error: ${error instanceof Error ? error.message : "Something went wrong"}`,
      );
    } finally {
      setLoading(false);
      setProgressState("complete");
    }
  }

  function handleChange(index: number) {
    setSelectedLonLat(index);
  }

  function reset() {
    setAiData(null);
    setOceanData(null);
    setError(null);
    setProgressState("idle");
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-[#06100e]">
      <TopBar progress={progressState} />
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16">
        {loading && <LoadingCard />}

        {error && (
          <div className="flex flex-col items-center gap-3 border border-red-400/30 bg-red-400/10 rounded-xl p-6 w-full">
            <p className="text-red-400 text-lg font-medium">Something went wrong</p>
            <p className="text-red-300/70 text-sm text-center">{error}</p>
            <button
              onClick={reset}
              className="text-sm text-white/70 border border-white/20 rounded-lg px-4 py-2 hover:bg-white/10 cursor-pointer"
            >
              Try again
            </button>
          </div>
        )}

        {!error && !loading && !oceanData && !aiData && (
          <ReadyToFetch
            locations={LOCATIONS}
            handleChange={handleChange}
            selectedLonLat={selectedLonLat}
          />
        )}
        {!error && !loading && oceanData && aiData && (
          <ResultsCard
            oceanData={oceanData}
            aiData={aiData}
            location={LOCATIONS[selectedLonLat].label}
          />
        )}
      </main>

      <ButtonsBar oceanCall={oceanCall} reset={reset} />
    </div>
  );
}
