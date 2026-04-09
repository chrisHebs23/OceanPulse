"use client";

export function LoadingCard() {
  return (
    <div className="flex border border-teal-500/10 shadow shadow-blue-400/60 bg-blue-400/30 rounded-full h-70 w-70 overflow-hidden">
      <svg
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        className="w-full h-full text-teal-500"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {/* Back wave */}
        <path fill="currentColor" opacity="0.2">
          <animate
            attributeName="d"
            dur="3s"
            repeatCount="indefinite"
            values="
              M0 35 C30 25, 50 45, 80 35 C110 25, 140 45, 170 35 C190 28, 200 32, 200 35 L200 60 L0 60 Z;
              M0 38 C30 48, 50 28, 80 38 C110 48, 140 28, 170 38 C190 42, 200 36, 200 38 L200 60 L0 60 Z;
              M0 35 C30 25, 50 45, 80 35 C110 25, 140 45, 170 35 C190 28, 200 32, 200 35 L200 60 L0 60 Z
            "
          />
        </path>
        {/* Front wave */}
        <path fill="url(#waveGrad)">
          <animate
            attributeName="d"
            dur="2s"
            repeatCount="indefinite"
            values="
              M0 40 C20 30, 40 50, 70 40 C100 30, 130 50, 160 40 C180 33, 200 38, 200 40 L200 60 L0 60 Z;
              M0 42 C20 52, 40 32, 70 42 C100 52, 130 32, 160 42 C180 48, 200 40, 200 42 L200 60 L0 60 Z;
              M0 40 C20 30, 40 50, 70 40 C100 30, 130 50, 160 40 C180 33, 200 38, 200 40 L200 60 L0 60 Z
            "
          />
        </path>
      </svg>
    </div>
  );
}
