import Link from "next/link";
import Button from "@/components/ui/Button";

export default function WelcomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#020617_0%,#040b1a_45%,#020617_100%)] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.22),transparent_32%)]" />
      <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />

      <section className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-12 md:px-8">
        <div className="grid w-full items-center gap-14 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500 shadow-[0_0_18px_rgba(59,130,246,0.9)]" />
              Smart learning and growth platform
            </div>

            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.02] tracking-tight md:text-6xl xl:text-7xl">
                Build your future with{" "}
                <span className="bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
                  NIRA AI
                </span>
              </h1>

              <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                Learn. Build. Earn. Study smarter, grow your career, and move
                forward with a guided AI experience designed for real progress.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/register">
                <Button className="px-7 py-3.5 text-base">Get Started</Button>
              </Link>

              <Link href="/login">
                <Button
                  variant="secondary"
                  className="px-7 py-3.5 text-base backdrop-blur-md"
                >
                  Sign In
                </Button>
              </Link>
            </div>

            <div className="grid max-w-3xl gap-4 pt-3 sm:grid-cols-3">
              <div className="glass rounded-[28px] p-5 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.6)] transition duration-300 hover:-translate-y-1 hover:border-blue-500/20">
                <p className="text-sm text-slate-400">Study</p>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  Guided explanations
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Learn with clarity, structure, and support.
                </p>
              </div>

              <div className="glass rounded-[28px] p-5 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.6)] transition duration-300 hover:-translate-y-1 hover:border-blue-500/20">
                <p className="text-sm text-slate-400">Career</p>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  Practical growth
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Explore skills, paths, and real opportunities.
                </p>
              </div>

              <div className="glass rounded-[28px] p-5 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.6)] transition duration-300 hover:-translate-y-1 hover:border-blue-500/20">
                <p className="text-sm text-slate-400">Progress</p>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  Real momentum
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Track your growth and keep moving forward.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-6 h-44 w-44 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute -bottom-8 right-2 h-44 w-44 rounded-full bg-red-500/10 blur-3xl" />

            <div className="glass relative overflow-hidden rounded-[34px] border border-white/10 p-6 shadow-[0_40px_100px_-35px_rgba(0,0,0,0.8)] md:p-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-sm text-slate-400">NIRA Dashboard</p>
                  <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                    Your intelligent workspace
                  </h2>
                </div>

                <div className="rounded-2xl border border-blue-400/20 bg-blue-500/15 px-4 py-2 text-sm font-semibold text-blue-100 shadow-[0_0_24px_rgba(37,99,235,0.15)]">
                  Live
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-[26px] border border-blue-500/20 bg-blue-500/10 p-5 shadow-[0_20px_50px_-35px_rgba(37,99,235,0.8)]">
                  <p className="text-sm text-blue-200">Study assistance</p>
                  <p className="mt-2 text-base font-medium leading-7 text-white">
                    Ask questions, break down topics, and learn with structured
                    guidance.
                  </p>
                </div>

                <div className="rounded-[26px] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-slate-400">Career support</p>
                  <p className="mt-2 text-base font-medium leading-7 text-white">
                    Get help with skills, direction, coding growth, and real
                    learning pathways.
                  </p>
                </div>

                <div className="rounded-[26px] border border-red-500/20 bg-red-500/10 p-5 shadow-[0_20px_50px_-35px_rgba(239,68,68,0.45)]">
                  <p className="text-sm text-red-200">Built for momentum</p>
                  <p className="mt-2 text-base font-medium leading-7 text-white">
                    Designed to help users build knowledge, confidence, and
                    measurable progress.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Mode
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">Study</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Support
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    Guided AI
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Focus
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    Real growth
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}