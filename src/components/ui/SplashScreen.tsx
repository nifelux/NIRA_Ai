"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const i = setInterval(() => {
      setPulse((p) => !p);
    }, 800);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-[#020617]">
      <div className="text-center">
        <h1
          className={`text-4xl font-semibold tracking-wide transition-all duration-500 ${
            pulse ? "opacity-100 scale-100" : "opacity-70 scale-95"
          }`}
        >
          NIRA AI
        </h1>

        <p className="text-sm text-gray-400 mt-2 tracking-wide">
          Learn. Build. Earn.
        </p>

        <div className="mt-6 flex justify-center">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
}