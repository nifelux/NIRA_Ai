// src/components/chat/ChatWindow.tsx

"use client";

import { useState, useRef, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import ChatTyping from "./ChatTyping";
import type { ChatMessage as ChatMessageType } from "@/lib/types/chat";

export default function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend(message: string) {
    if (!message.trim()) return;

    const userMessage: ChatMessageType = {
      role: "user",
      content: message,
    };

    const nextMessages: ChatMessageType[] = [...messages, userMessage];

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
          messages: [], // keep history off for now
        }),
      });

      const data = await response.json();

      const assistantMessage: ChatMessageType = {
        role: "assistant",
        content:
          data?.message ?? "NIRA could not generate a response right now.",
      };

      setMessages([...nextMessages, assistantMessage]);
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

  return (
    <div className="flex h-full flex-col">
      <ChatHeader />

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6">
        {messages.map((msg, index) => {
          if (msg.role === "system") return null;

          return (
            <ChatMessage
              key={index}
              role={msg.role}
              content={msg.content}
            />
          );
        })}

        {loading && <ChatTyping />}

        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}
