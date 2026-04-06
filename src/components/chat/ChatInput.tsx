// src/components/chat/ChatInput.tsx

"use client";

import { useState } from "react";

type Props = {
  onSend: (message: string) => void;
  disabled?: boolean; // ✅ ADD THIS
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
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 border-t border-white/10 p-4"
    >
      <input
        type="text"
        placeholder="Ask NIRA anything..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={disabled} // ✅ now valid
        className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
      />

      <button
        type="submit"
        disabled={disabled}
        className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
}