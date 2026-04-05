import { Sparkles } from "lucide-react";

export default function ChatHeader() {
  return (
    <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
      <div className="flex items-center gap-2">
        <Sparkles className="text-blue-400" size={18} />
        <span className="font-semibold text-white">NIRA AI</span>
      </div>

      <div className="text-xs text-blue-400">Study Mode</div>
    </div>
  );
}