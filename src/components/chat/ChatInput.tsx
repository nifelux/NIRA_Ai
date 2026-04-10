// src/components/chat/ChatInput.tsx

"use client";

import { useState } from "react";
import { ArrowUp, Sparkles } from "lucide-react";

type Props = {
  onSend: (message: string) => void;
  disabled?: boolean;
};

export default function ChatInput({ onSend, disabled }: Props) {
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim() || disabled) return;

    onSend(message);
    setMessage("");
  }

  return (
    <div className="border-t border-white/10 bg-[rgba(2,6,23,0.78)] px-3 py-3 backdrop-blur md:px-4">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-4xl items-end gap-3"
      >
        <div className="flex min-h-[60px] flex-1 items-center gap-3 rounded-[24px] border border-white/10 bg-white/5 px-4 py-3 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.55)] transition focus-within:border-blue-500/40 focus-within:bg-white/7">
          <div className="hidden h-9 w-9 items-center justify-center rounded-2xl bg-blue-500/12 text-blue-300 md:flex">
            <Sparkles size={16} />
          </div>

          <textarea
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={disabled}
            placeholder="Ask NIRA anything..."
            className="max-h-36 min-h-[26px] flex-1 resize-none bg-transparent text-sm leading-7 text-white outline-none placeholder:text-slate-500"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as unknown as React.FormEvent);
              }
            }}
          />
        </div>

        <button
          type="submit"
          disabled={disabled || !message.trim()}
          className="nira-button nira-button-primary h-[58px] min-w-[58px] rounded-[22px] px-4 disabled:opacity-50"
        >
          <ArrowUp size={18} />
        </button>
      </form>
    </div>
  );
}
