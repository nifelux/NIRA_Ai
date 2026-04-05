"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function ChatInput({
  onSend,
}: {
  onSend: (msg: string) => void;
}) {
  const [value, setValue] = useState("");

  function handleSend() {
    if (!value.trim()) return;

    onSend(value);
    setValue("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="border-t border-white/10 p-3">
      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 focus-within:border-blue-500/40">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask NIRA anything..."
          className="flex-1 bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-slate-500"
        />

        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}