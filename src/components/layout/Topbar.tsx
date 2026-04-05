"use client";

import { Bell, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { supabaseClient } from "@/lib/persistence/supabaseClient";

interface TopbarProps {
  email?: string | null;
}

export default function Topbar({ email }: TopbarProps) {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = supabaseClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="glass sticky top-0 z-30 rounded-[28px] border border-white/10 px-4 py-4 md:px-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">Welcome back</p>
          <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
            NIRA Dashboard
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 md:flex">
            <Search size={16} className="text-slate-400" />
            <span className="max-w-[180px] truncate">
              {email ?? "User"}
            </span>
          </div>

          <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white">
            <Bell size={18} />
          </button>

          <Button variant="secondary" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}