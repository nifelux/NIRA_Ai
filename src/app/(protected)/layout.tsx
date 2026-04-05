import type { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MobileNav from "@/components/layout/MobileNav";
import { requireAuth } from "@/lib/auth/requireAuth";
import { ensureProfile } from "@/lib/auth/ensureProfile";


export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  await requireAuth();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar (desktop only) */}
      <Sidebar />

      {/* Main content */}
      <div className="flex w-full flex-col">
        <Topbar />

        <main className="flex-1 px-4 pb-24 pt-6 md:px-6">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <MobileNav />
    </div>
  );
}