// src/components/dashboard/RecentActivity.tsx

"use client";

import { useEffect, useState } from "react";
import { getSessionId } from "@/lib/experience/SessionManager";
import { formatActivityTime } from "@/lib/activity/ActivityFormatter";

type ActivityEntry = {
  id: string;
  type: "message_sent" | "mode_switch" | "session_started";
  mode: "study" | "career";
  text: string;
  timestamp: number;
};

export default function RecentActivity() {
  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const sessionId = getSessionId() || "temp";

  useEffect(() => {
    let ignore = false;

    async function loadActivity() {
      try {
        const res = await fetch(
          `/api/activity?sessionId=${encodeURIComponent(sessionId)}`,
          { cache: "no-store" }
        );
        const data = await res.json();

        if (!ignore) {
          setActivities(data?.activities || []);
        }
      } catch {
        if (!ignore) {
          setActivities([]);
        }
      }
    }

    loadActivity();
    const interval = setInterval(loadActivity, 3000);

    return () => {
      ignore = true;
      clearInterval(interval);
    };
  }, [sessionId]);

  return (
    <div className="nira-panel p-6">
      <p className="text-sm text-slate-400">Recent Activity</p>

      <div className="mt-4 space-y-3">
        {activities.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-400">
            No recent activity yet. Start chatting to see live updates here.
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-white">{activity.text}</p>
                <span className="text-xs text-slate-500">
                  {formatActivityTime(activity.timestamp)}
                </span>
              </div>

              <div className="mt-2 text-xs text-slate-500 capitalize">
                {activity.mode} mode
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
