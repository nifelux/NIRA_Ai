import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-200">{label}</label>
      <input
        className={[
          "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500/60 focus:bg-white/10 focus:ring-2 focus:ring-blue-500/20",
          className,
        ].join(" ")}
        {...props}
      />
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
    </div>
  );
}