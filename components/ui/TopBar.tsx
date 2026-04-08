"use client";

type Props = {
  progress: string;
};

export function TopBar({ progress }: Props) {
  return (
    <div className="flex justify-between items-center w-full border-b border-white/[0.07] px-10">
      <div
        className="flex items-center gap-2 py-4
border-b border-white/[0.07]"
      >
        <div
          className="rounded-lg bg-blue-400/10 border border-blue-300/20
flex items-center justify-center text-2xl"
        >
          🌊
        </div>
        <p className="text-xl font-medium text-white/90 tracking-tight">
          OceanPulse
        </p>
      </div>
      <div>
        <div className="text-md text-white/30 border border-white/10 px-3 py-1 rounded-full flex justify-between items-center gap-1">
          <div
            className={`w-2 h-2 rounded-full ${progress === "running" ? "bg-green-500" : "bg-white/45"} `}
          ></div>
          <p
            className={`capitalize ${progress === "running" ? "text-white" : "text-white/45"}`}
          >
            {progress}
          </p>
        </div>
      </div>
    </div>
  );
}
