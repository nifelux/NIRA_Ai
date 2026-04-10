// src/app/(protected)/dashboard/page.tsx

import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import UsageOverview from "@/components/dashboard/UsageOverview";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default function DashboardPage() {
  return (
    <main className="nira-page-shell text-white">
      <div className="nira-container py-8 md:py-10 space-y-8">

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="nira-title">Dashboard</h1>
            <p className="nira-subtitle">
              Track your progress, usage, and continue your learning journey.
            </p>
          </div>

          <div className="nira-chip">
            <Sparkles size={14} className="text-blue-400" />
            NIRA AI Active
          </div>
        </div>

        <UsageOverview />

        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/chat?mode=study">
            <div className="nira-panel p-6 nira-hover-lift cursor-pointer">
              <p className="text-sm text-slate-400">Study Mode</p>
              <h3 className="mt-2 text-xl font-semibold">Structured Learning</h3>
              <p className="mt-2 text-sm text-slate-400">
                Learn topics step by step with guided explanations.
              </p>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm text-blue-300">Open study chat</span>
                <ArrowRight size={18} className="text-blue-400" />
              </div>
            </div>
          </Link>

          <Link href="/chat?mode=career">
            <div className="nira-panel p-6 nira-hover-lift cursor-pointer">
              <p className="text-sm text-slate-400">Career Mode</p>
              <h3 className="mt-2 text-xl font-semibold">Skill Growth</h3>
              <p className="mt-2 text-sm text-slate-400">
                Build real-world skills and explore career paths.
              </p>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm text-blue-300">Open career chat</span>
                <ArrowRight size={18} className="text-blue-400" />
              </div>
            </div>
          </Link>

          <Link href="/chat">
            <div className="nira-panel p-6 nira-hover-lift cursor-pointer">
              <p className="text-sm text-slate-400">Quick Chat</p>
              <h3 className="mt-2 text-xl font-semibold">Ask NIRA</h3>
              <p className="mt-2 text-sm text-slate-400">
                Start chatting immediately with the default study mode.
              </p>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm text-blue-300">Open chat</span>
                <ArrowRight size={18} className="text-blue-400" />
              </div>
            </div>
          </Link>
        </div>

        <RecentActivity />

      </div>
    </main>
  );
}
