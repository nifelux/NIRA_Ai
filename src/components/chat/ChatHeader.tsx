// src/components/chat/ChatHeader.tsx

"use client";

import { useEffect, useState } from "react";
import { getSessionId } from "@/lib/experience/SessionManager";
import { getStudySessionState } from "@/lib/study/StudySessionStore";

type ChatMode = "study" | "career" | "chat";

export default function ChatHeader({
  mode,
  onModeChange,
}: {
  mode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
}) {
  const [topic, setTopic] = useState<string | null>(null);

  useEffect(() => {
    const id = getSessionId();
    if (!id) return;

    const state = getStudySessionState(id);
    setTopic(state.currentTopic || null);
  }, [mode]);

  return (
    <div className="p-4 border-b border-white/10">

      <div className="flex gap-2">
        <button onClick={() => onModeChange("study")}>Study</button>
        <button onClick={() => onModeChange("career")}>Career</button>
        <button onClick={() => onModeChange("chat")}>Chat</button>
      </div>

      <p className="text-xs text-slate-400 mt-2">
        Mode: {mode.toUpperCase()}
      </p>

      {mode === "study" && topic && (
        <p className="text-blue-300 text-xs mt-1">
          Current Topic: {topic}
        </p>
      )}

    </div>
  );
}
