"use client";

import { GeminiResponse, OceanApiResponse } from "@/app/constants/interfaces";

interface ResultsCardProps {
  oceanData: OceanApiResponse;
  aiData: GeminiResponse | null;
  location: string;
}

export function ResultsCard({ oceanData, aiData, location }: ResultsCardProps) {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold text-white/90">
          📍 {location}
        </h2>
        {aiData && (
          <p className="text-lg text-blue-300/80">{aiData.overall_condition}</p>
        )}
      </div>

      {/* Safety badges */}
      {aiData && (
        <div className="flex gap-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium border ${
              aiData.safe_for_swimming
                ? "border-green-400/30 bg-green-400/10 text-green-400"
                : "border-red-400/30 bg-red-400/10 text-red-400"
            }`}
          >
            {aiData.safe_for_swimming ? "Safe to swim" : "Unsafe to swim"}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium border ${
              aiData.good_surfing_conditions
                ? "border-green-400/30 bg-green-400/10 text-green-400"
                : "border-yellow-400/30 bg-yellow-400/10 text-yellow-400"
            }`}
          >
            {aiData.good_surfing_conditions ? "Good surf" : "Poor surf"}
          </span>
        </div>
      )}

      {/* Ocean data grid */}
      <div className="grid grid-cols-2 gap-3">
        <DataTile label="Wave Height" value={`${oceanData.wave_height}m`} />
        <DataTile label="Wave Period" value={`${oceanData.wave_period}s`} />
        <DataTile
          label="Wave Direction"
          value={`${oceanData.wave_direction}°`}
        />
        <DataTile
          label="Swell Height"
          value={`${oceanData.swell_wave_height}m`}
        />
        <DataTile
          label="Swell Period"
          value={`${oceanData.swell_wave_period}s`}
        />
        <DataTile
          label="Wind Waves"
          value={`${oceanData.wind_wave_height}m`}
        />
        <DataTile
          label="Sea Surface Temp"
          value={`${oceanData.sea_surface_temperature}°C`}
          className="col-span-2"
        />
      </div>

      {/* AI Analysis */}
      {aiData && (
        <div className="flex flex-col gap-3 border border-white/10 rounded-xl p-4 bg-white/[0.03]">
          <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider">
            AI Analysis
          </h3>
          <p className="text-white/80 leading-relaxed">
            {aiData.gemini_analysis}
          </p>
          <ul className="flex flex-col gap-1.5">
            {aiData.key_highlights.map((highlight, i) => (
              <li key={i} className="text-white/60 text-sm flex gap-2">
                <span className="text-blue-400">-</span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function DataTile({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`border border-white/10 rounded-xl p-4 bg-white/[0.03] ${className}`}
    >
      <p className="text-xs text-white/40 uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-xl font-medium text-white/90">{value}</p>
    </div>
  );
}
