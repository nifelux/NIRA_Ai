// src/components/chat/ChatHeader.tsx

import {
  Sparkles,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Cpu,
  AlertTriangle,
} from "lucide-react";

type ChatMode = "study" | "career";

export default function ChatHeader({
  mode,
  onModeChange,
  activeModel,
  fallbackUsed,
}: {
  mode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
  activeModel?: string;
  fallbackUsed?: boolean;
}) {
  function formatModelLabel(model?: string) {
    if (!model) return "Gemma";

    if (model === "gemini_pro") return "Gemini Pro";
    if (model === "gemini") return "Gemini";
    if (model === "deepseek") return "DeepSeek";
    return "Gemma";
  }

  return (
    <div className="flex flex-col gap-4 border-b border-white/10 px-4 py-4 md:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/12 text-blue-300 shadow-[0_0_0_1px_rgba(37,99,235,0.16)]">
          <Sparkles size={18} />
        </div>

        <div>
          <p className="text-sm font-semibold text-white">NIRA Chat</p>
          <p className="text-xs text-slate-400">
            {mode === "career"
              ? "Career guidance and growth support"
              : "Calm, structured study guidance"}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-1">
          <button
            type="button"
            onClick={() => onModeChange("study")}
            className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${
              mode === "study"
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <GraduationCap size={15} />
            Study
          </button>

          <button
            type="button"
            onClick={() => onModeChange("career")}
            className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${
              mode === "career"
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <Briefcase size={15} />
            Career
          </button>
        </div>

        <div className="nira-chip px-3 py-2 text-xs">
          <ShieldCheck size={14} className="text-emerald-300" />
          {mode === "career" ? "Career Mode" : "Study Mode"}
        </div>

        <div className="nira-chip px-3 py-2 text-xs">
          <Cpu size={14} className="text-blue-300" />
          {formatModelLabel(activeModel)}
        </div>

        {fallbackUsed ? (
          <div className="nira-chip px-3 py-2 text-xs">
            <AlertTriangle size={14} className="text-amber-300" />
            Fallback Used
          </div>
        ) : null}
      </div>
    </div>
  );
}
