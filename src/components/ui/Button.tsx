import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-950/30",
  secondary:
    "bg-white/5 hover:bg-white/10 text-white border border-white/10",
  danger:
    "bg-red-500 hover:bg-red-400 text-white shadow-lg shadow-red-950/30",
};

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/60 disabled:cursor-not-allowed disabled:opacity-60",
        fullWidth ? "w-full" : "",
        variantClasses[variant],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}