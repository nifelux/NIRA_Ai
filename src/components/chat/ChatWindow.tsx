"use client";

import { useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWindow() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          mode: "study",
        }),
      });

      const data = await res.json();

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content:
          typeof data?.message === "string"
            ? data.message
            : "No response generated.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat request failed:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.role === "user"
                ? "ml-auto max-w-[85%] rounded-2xl bg-blue-600 px-4 py-3 text-white"
                : "max-w-[85%] rounded-2xl bg-white/10 px-4 py-3 text-white"
            }
          >
            {message.content}
          </div>
        ))}

        {loading ? (
          <div className="max-w-[85%] rounded-2xl bg-white/10 px-4 py-3 text-white">
            Thinking...
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              void sendMessage();
            }
          }}
          placeholder="Ask NIRA anything..."
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
        />
        <button
          onClick={() => {
            void sendMessage();
          }}
          disabled={loading}
          className="rounded-xl bg-blue-600 px-4 py-3 text-white disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
