// Premium Dashboard UI

import StudyProgressCard from "@/components/intelligence/StudyProgressCard";
import ProfileStatusCard from "@/components/intelligence/ProfileStatusCard";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0a0f2c] to-black text-white">

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">
            NIRA Dashboard
          </h1>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-4">

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 shadow-lg">
            <StudyProgressCard />
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 shadow-lg">
            <ProfileStatusCard />
          </div>

        </div>

        {/* Mode Cards */}
        <div className="grid md:grid-cols-3 gap-4">

          <Link href="/chat?mode=study">
            <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/20 border border-blue-500/20 rounded-xl p-6 cursor-pointer hover:scale-105 transition">
              <h2 className="text-lg font-semibold">Study Mode</h2>
              <p className="text-sm text-gray-400 mt-1">
                Structured teaching & exams
              </p>
            </div>
          </Link>

          <Link href="/chat?mode=career">
            <div className="bg-gradient-to-br from-purple-600/20 to-purple-900/20 border border-purple-500/20 rounded-xl p-6 cursor-pointer hover:scale-105 transition">
              <h2 className="text-lg font-semibold">Career Mode</h2>
              <p className="text-sm text-gray-400 mt-1">
                Mentorship & guidance
              </p>
            </div>
          </Link>

          <Link href="/chat?mode=chat">
            <div className="bg-gradient-to-br from-green-600/20 to-green-900/20 border border-green-500/20 rounded-xl p-6 cursor-pointer hover:scale-105 transition">
              <h2 className="text-lg font-semibold">Chat Mode</h2>
              <p className="text-sm text-gray-400 mt-1">
                General assistant
              </p>
            </div>
          </Link>

        </div>

      </div>
    </main>
  );
}
