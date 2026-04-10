// src/components/dashboard/UsageOverview.tsx

"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Flame, TrendingUp, Sparkles } from "lucide-react";

type UsageData = {
  authenticated: boolean;
  tier: string;
  limit: number;
  used: number;
  bonus: number;
  remaining: number;
  can_send: boolean;
};

export default function UsageOverview() {
  const [usage, setUsage] = useState<UsageData | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadUsage() {
      try {
        const res = await fetch("/api/usage", { cache: "no-store" });
        const data = await res.json();
        if (!ignore) setUsage(data);
      } catch {
        if (!ignore) {
          setUsage({
            authenticated: false,
            tier: "free",
            limit: 10,
            used: 0,
            bonus: 0,
            remaining: 10,
            can_send: true,
          });
        }
      }
    }

    loadUsage();
    return () => {
      ignore = true;
    };
  }, []);

  const tier = usage?.tier ?? "free";
  const used = usage?.used ?? 0;
  const remaining = usage?.remaining ?? 10;
  const limit = usage?.limit ?? 10;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="nira-card p-5 nira-hover-lift">
        <p className="nira-label">Messages Left</p>
        <div className="mt-3 flex items-center justify-between">
          <h3 className="text-2xl font-bold">{remaining}</h3>
          <MessageSquare className="text-blue-400" />
        </div>
      </div>

      <div className="nira-card p-5 nira-hover-lift">
        <p className="nira-label">Messages Used</p>
        <div className="mt-3 flex items-center justify-between">
          <h3 className="text-2xl font-bold">{used}</h3>
          <Flame className="text-orange-400" />
        </div>
      </div>

      <div className="nira-card p-5 nira-hover-lift">
        <p className="nira-label">Daily Limit</p>
        <div className="mt-3 flex items-center justify-between">
          <h3 className="text-2xl font-bold">{limit}</h3>
          <TrendingUp className="text-emerald-400" />
        </div>
      </div>

      <div className="nira-card p-5 nira-hover-lift">
        <p className="nira-label">Tier</p>
        <div className="mt-3 flex items-center justify-between">
          <h3 className="text-2xl font-bold capitalize">{tier}</h3>
          <Sparkles className="text-purple-400" />
        </div>
      </div>
    </div>
  );
}
