import type { ReactNode } from "react";

export default function AuthCard({ children }: { children: ReactNode }) {
  return (
    <div className="glass w-full rounded-[28px] p-6 shadow-2xl shadow-black/30 md:p-8">
      {children}
    </div>
  );
}