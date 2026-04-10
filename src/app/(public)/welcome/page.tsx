// src/app/(public)/welcome/page.tsx

import Link from "next/link";
import { ArrowRight, PlayCircle, Sparkles, ShieldCheck, GraduationCap, Briefcase } from "lucide-react";
import Button from "@/components/ui/Button";

export default function WelcomePage() {
  return (
    <main className="nira-page-shell text-white">
      <section className="relative z-10">
        <div className="nira-container flex min-h-screen items-center py-10 md:py-14">
          <div className="grid w-full items-center gap-10 xl:grid-cols-[1.06fr_0.94fr]">
            <div className="space-y-8">
              <div className="nira-chip w-fit">
                <Sparkles size={14} className="text-blue-400" />
                Gemma-powered learning and growth platform
              </div>

              <div className="space-y-5">
                <h1 className="nira-display max-w-4xl">
                  Learn, grow, and move forward with{" "}
                  <span className="nira-gradient-text">NIRA AI</span>
                </h1>

                <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                  NIRA helps users study better, build real skills, explore career
                  direction, and grow consistently with structured AI guidance,
                  knowledge systems, and progress-aware learning.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/register">
                  <Button className="px-7 py-3.5 text-base">
                    Get Started
                    <ArrowRight size={18} />
                  </Button>
                </Link>

                <Link href="/login">
                  <Button
                    variant="secondary"
                    className="px-7 py-3.5 text-base"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>

              <div className="grid max-w-3xl gap-4 pt-2 sm:grid-cols-3">
                <div className="nira-card nira-hover-lift p-5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-300">
                    <GraduationCap size={20} />
                  </div>
                  <p className="text-sm text-slate-400">Study Mode</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    Guided learning
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Explanations, coaching, revision flow, and smarter learning support.
                  </p>
                </div>

                <div className="nira-card nira-hover-lift p-5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500/15 text-red-300">
                    <Briefcase size={20} />
                  </div>
                  <p className="text-sm text-slate-400">Career Mode</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    Practical growth
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Skills, guidance, coding help, and structured career pathways.
                  </p>
                </div>

                <div className="nira-card nira-hover-lift p-5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">
                    <ShieldCheck size={20} />
                  </div>
                  <p className="text-sm text-slate-400">Progress System</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    Real momentum
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Track improvement, usage, readiness, and achievement over time.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-8 top-10 h-44 w-44 rounded-full bg-blue-500/20 blur-3xl" />
              <div className="absolute -bottom-8 right-0 h-44 w-44 rounded-full bg-red-500/10 blur-3xl" />

              <div className="nira-panel relative overflow-hidden p-6 md:p-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <p className="text-sm text-slate-400">NIRA Workspace</p>
                    <h2 className="mt-1 text-2xl font-bold tracking-tight text-white md:text-3xl">
                      Premium AI learning surface
                    </h2>
                  </div>

                  <div className="nira-chip border-blue-500/20 bg-blue-500/10 text-blue-200">
                    Live
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-[26px] border border-blue-500/20 bg-blue-500/10 p-5 nira-primary-glow">
                    <p className="text-sm text-blue-200">Gemma foundation</p>
                    <p className="mt-2 text-base font-medium leading-7 text-white">
                      NIRA uses Gemma as its base intelligence layer, giving every
                      user access to guided teaching and structured support.
                    </p>
                  </div>

                  <div className="rounded-[26px] border border-white/10 bg-white/5 p-5">
                    <p className="text-sm text-slate-400">Tier expansion</p>
                    <p className="mt-2 text-base font-medium leading-7 text-white">
                      Higher tiers unlock stronger model support, more messages,
                      richer guidance, and deeper access across the platform.
                    </p>
                  </div>

                  <div className="rounded-[26px] border border-red-500/20 bg-red-500/10 p-5 nira-danger-glow">
                    <p className="text-sm text-red-200">Built for progress</p>
                    <p className="mt-2 text-base font-medium leading-7 text-white">
                      The product is designed to help users improve knowledge,
                      consistency, confidence, and long-term outcomes.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <p className="nira-label">Base Model</p>
                    <p className="mt-2 text-sm font-semibold text-white">Gemma</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <p className="nira-label">Core Focus</p>
                    <p className="mt-2 text-sm font-semibold text-white">Study + Career</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <p className="nira-label">Growth</p>
                    <p className="mt-2 text-sm font-semibold text-white">Structured progress</p>
                  </div>
                </div>

                <div className="mt-7 flex items-center justify-between rounded-[24px] border border-white/10 bg-white/5 px-5 py-4">
                  <div>
                    <p className="text-sm text-slate-400">Quick start</p>
                    <p className="mt-1 text-sm font-medium text-white">
                      Start with study, career, or direct AI chat
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/8 text-slate-200">
                    <PlayCircle size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
