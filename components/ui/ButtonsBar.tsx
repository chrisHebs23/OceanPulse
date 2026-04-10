"use client";

interface ButtonsBarProps {
  oceanCall: () => void;
  reset: () => void;
}

export function ButtonsBar({ oceanCall, reset }: ButtonsBarProps) {
  const buttons = [
    { text: "Fetch Conditions", function: oceanCall },
    { text: "Reset", function: reset },
  ];

  return (
    <div className="border-t-2 border-white/30 flex justify-center items-center w-full p-5 gap-2.5">
      {buttons.map((button, index) => (
        <button
          key={index}
          className="text-lg text-(--color-text-primary) border-(--color-border-secondary) rounded-sm cursor-pointer transition-[background] duration-[0.15s,transform] delay-100 px-4 py-2 border-[0.5px] border-solid hover:bg-white/40 hover:text-white"
          onClick={() => button.function()}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
}
