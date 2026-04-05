import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "NIRA AI",
  description: "Learn. Build. Earn.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}