"use client";

import { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import ChatTyping from "./ChatTyping";
import type { ChatMessage as ChatMessageType } from "@/lib/types/chat";

export default function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  async function handleSend(message: string) {
    const nextMessages: ChatMessageType[] = [
      ...messages,
      { role: "user", content: message },
    ];

    setMessages(nextMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          mode: "study",
          messages,
        }),
      });

      const data = await response.json();

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            data?.message ?? "NIRA could not generate a response right now.",
        },
      ]);
    } catch {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: "NIRA could not connect right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[30px] border border-white/10 bg-white/5 backdrop-blur">
      <ChatHeader />

      <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            Ask NIRA anything. Start learning.
          </div>
        )}

        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}

        {loading && <ChatTyping />}

        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={handleSend} />
    </div>
  );
}