import { ArrowUpRight, BookOpen, Briefcase, Sparkles } from "lucide-react";

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="glass rounded-[30px] p-6 shadow-[0_25px_80px_-30px_rgba(0,0,0,0.8)]">
          <p className="text-sm text-slate-400">Current Tier</p>
          <h3 className="mt-4 text-3xl font-bold tracking-tight text-white">
            Free
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Upgrade later to unlock deeper AI guidance and advanced intelligence
            layers.
          </p>
        </div>

        <div className="glass rounded-[30px] p-6 shadow-[0_25px_80px_-30px_rgba(0,0,0,0.8)]">
          <p className="text-sm text-slate-400">Learning Score</p>
          <h3 className="mt-4 text-3xl font-bold tracking-tight text-white">
            0%
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Your progress will begin tracking as soon as you start using NIRA.
          </p>
        </div>

        <div className="glass rounded-[30px] p-6 shadow-[0_25px_80px_-30px_rgba(0,0,0,0.8)]">
          <p className="text-sm text-slate-400">Messages Today</p>
          <h3 className="mt-4 text-3xl font-bold tracking-tight text-white">
            0 / 10
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Daily message access resets automatically based on your tier.
          </p>
        </div>
      </div>

      <div className="glass rounded-[34px] p-6 shadow-[0_35px_100px_-35px_rgba(0,0,0,0.85)] md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-200">
              <Sparkles size={16} />
              Your workspace
            </div>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Welcome to NIRA AI
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
              You now have access to your intelligent learning and growth
              workspace. From here, you’ll be able to study, explore career
              direction, track progress, and unlock deeper AI support as the
              platform expands.
            </p>
          </div>

          <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500">
            Start Chat
            <ArrowUpRight size={18} />
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-[28px] border border-blue-500/20 bg-blue-500/10 p-5 shadow-[0_20px_60px_-35px_rgba(37,99,235,0.8)]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-200">
                <BookOpen size={20} />
              </div>
              <div>
                <p className="text-sm text-blue-200">Study Mode</p>
                <h3 className="text-lg font-semibold text-white">
                  Guided explanations
                </h3>
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-white/90">
              Learn topics with guided explanations, solver support, and answer
              checking.
            </p>
          </div>

          <div className="rounded-[28px] border border-red-500/20 bg-red-500/10 p-5 shadow-[0_20px_60px_-35px_rgba(239,68,68,0.45)]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500/20 text-red-200">
                <Briefcase size={20} />
              </div>
              <div>
                <p className="text-sm text-red-200">Career Mode</p>
                <h3 className="text-lg font-semibold text-white">
                  Practical growth
                </h3>
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-white/90">
              Explore growth paths, coding help, freelancing support, and career
              learning.
            </p>
          </div>
        </div>
      </div>

      <div className="glass rounded-[34px] p-6 shadow-[0_35px_100px_-35px_rgba(0,0,0,0.85)]">
        <p className="text-sm text-slate-400">Next Steps</p>

        <div className="mt-5 space-y-4">
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <h3 className="text-base font-semibold text-white">
              Complete your profile
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              Add more personal settings and learning preferences later as the
              product grows.
            </p>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <h3 className="text-base font-semibold text-white">
              Start your first chat
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              Begin using NIRA and your progress systems will start updating.
            </p>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <h3 className="text-base font-semibold text-white">
              Upgrade when ready
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              Premium tiers unlock deeper teaching, stronger coding help, and
              advanced intelligence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}