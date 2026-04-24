// src/components/intelligence/StudyProgressCard.tsx

"use client";

import { useEffect, useState } from "react";
import { getProgressSummary } from "@/lib/study/ProgressionEngine";
import { getSessionId } from "@/lib/experience/SessionManager";

export default function StudyProgressCard() {
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    const id = getSessionId();
    if (!id) return;

    const data = getProgressSummary(id);
    setSummary(data);
  }, []);

  if (!summary) return null;

  return (
    <div className="nira-panel p-4">
      <h3 className="text-sm text-slate-400">Study Progress</h3>

      <p className="mt-2 text-white text-sm">
        Completed Topics: {summary.completedCount}
      </p>

      <p className="text-white text-sm">
        Weak Topics: {summary.weakCount}
      </p>

      {summary.currentTopic && (
        <p className="mt-2 text-blue-300 text-sm">
          Current Topic: {summary.currentTopic}
        </p>
      )}
    </div>
  );
}
