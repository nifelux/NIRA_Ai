// src/components/chat/ChatWindow.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import ChatTyping from "./ChatTyping";
import type { ChatMessage as ChatMessageType } from "@/lib/types/chat";
import { getSessionId } from "@/lib/experience/SessionManager";

type ChatMode = "study" | "career";

type StoredMessage = ChatMessageType & {
  id: string;
  timestamp: number;
};

function storageKey(sessionId: string, mode: ChatMode) {
  return `nira_chat_${sessionId}_${mode}`;
}

function createId() {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export default function ChatWindow({
  mode = "study",
}: {
  mode?: ChatMode;
}) {
  const router = useRouter();
  const [messages, setMessages] = useState<StoredMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeModel, setActiveModel] = useState<string>("gemma");
  const [fallbackUsed, setFallbackUsed] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const sessionId = getSessionId() || "temp";

  useEffect(() => {
    const key = storageKey(sessionId, mode);
    const saved = localStorage.getItem(key);

    if (saved) {
      try {
        const parsed = JSON.parse(saved) as StoredMessage[];
        const safeMessages = Array.isArray(parsed) ? parsed : [];
        setMessages(safeMessages);

        const lastAssistant = [...safeMessages]
          .reverse()
          .find((msg) => msg.role === "assistant");

        if (lastAssistant?.model) {
          setActiveModel(lastAssistant.model);
          setFallbackUsed(Boolean(lastAssistant.fallbackUsed));
        } else {
          setActiveModel("gemma");
          setFallbackUsed(false);
        }
      } catch {
        setMessages([]);
        setActiveModel("gemma");
        setFallbackUsed(false);
      }
    } else {
      setMessages([]);
      setActiveModel("gemma");
      setFallbackUsed(false);
    }
  }, [mode, sessionId]);

  useEffect(() => {
    const key = storageKey(sessionId, mode);
    localStorage.setItem(key, JSON.stringify(messages));
  }, [messages, mode, sessionId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend(message: string) {
    if (!message.trim() || loading) return;

    const userMessage: StoredMessage = {
      id: createId(),
      role: "user",
      content: message,
      timestamp: Date.now(),
    };

    const nextMessages: StoredMessage[] = [...messages, userMessage];
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
          mode,
          sessionId,
        }),
      });

      const data = await response.json();

      const assistantMessage: StoredMessage = {
        id: createId(),
        role: "assistant",
        content:
          data?.message ?? "NIRA could not generate a response right now.",
        model: data?.model ?? "gemma",
        fallbackUsed: Boolean(data?.fallbackUsed),
        timestamp: Date.now(),
      };

      setActiveModel(assistantMessage.model || "gemma");
      setFallbackUsed(Boolean(assistantMessage.fallbackUsed));
      setMessages([...nextMessages, assistantMessage]);
    } catch {
      const fallbackMessage: StoredMessage = {
        id: createId(),
        role: "assistant",
        content: "NIRA could not connect right now. Please try again.",
        model: "gemma",
        fallbackUsed: true,
        timestamp: Date.now(),
      };

      setActiveModel("gemma");
      setFallbackUsed(true);
      setMessages([...nextMessages, fallbackMessage]);
    } finally {
      setLoading(false);
    }
  }

  function handleModeChange(nextMode: ChatMode) {
    if (nextMode === mode) return;
    router.push(`/chat?mode=${nextMode}`);
  }

  function handleDeleteMessage(messageId: string) {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
  }

  const isEmpty = messages.length === 0 && !loading;

  return (
    <div className="nira-panel flex h-[calc(100vh-10rem)] flex-col overflow-hidden">
      <ChatHeader
        mode={mode}
        onModeChange={handleModeChange}
        activeModel={activeModel}
        fallbackUsed={fallbackUsed}
      />

      <div className="relative flex-1 overflow-y-auto px-4 py-5 md:px-6">
        {isEmpty ? (
          <div className="flex h-full items-center justify-center">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/12 text-blue-300 shadow-[0_0_0_1px_rgba(37,99,235,0.18)]">
                ✦
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                {mode === "career"
                  ? "Start a career conversation with NIRA"
                  : "Start a study conversation with NIRA"}
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400 md:text-base">
                {mode === "career"
                  ? "Ask about skills, growth paths, tech direction, freelancing, and practical development."
                  : "Ask about school topics, explanations, examples, revision, and guided learning."}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {mode === "career" ? (
                  <>
                    <button
                      onClick={() => handleSend("Help me choose a tech skill to learn")}
                      className="nira-soft-block nira-hover-lift px-4 py-4 text-left"
                    >
                      <p className="text-sm font-medium text-white">
                        Help me choose a tech skill
                      </p>
                      <p className="mt-1 text-xs text-slate-400">Career guidance</p>
                    </button>

                    <button
                      onClick={() => handleSend("How do I start freelancing as a beginner?")}
                      className="nira-soft-block nira-hover-lift px-4 py-4 text-left"
                    >
                      <p className="text-sm font-medium text-white">
                        How do I start freelancing?
                      </p>
                      <p className="mt-1 text-xs text-slate-400">Practical path</p>
                    </button>

                    <button
                      onClick={() => handleSend("Compare UI/UX and frontend development")}
                      className="nira-soft-block nira-hover-lift px-4 py-4 text-left"
                    >
                      <p className="text-sm font-medium text-white">
                        Compare UI/UX and frontend
                      </p>
                      <p className="mt-1 text-xs text-slate-400">Direction support</p>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleSend("What is an atom?")}
                      className="nira-soft-block nira-hover-lift px-4 py-4 text-left"
                    >
                      <p className="text-sm font-medium text-white">What is an atom?</p>
                      <p className="mt-1 text-xs text-slate-400">Quick science start</p>
                    </button>

                    <button
                      onClick={() => handleSend("Explain photosynthesis simply")}
                      className="nira-soft-block nira-hover-lift px-4 py-4 text-left"
                    >
                      <p className="text-sm font-medium text-white">
                        Explain photosynthesis simply
                      </p>
                      <p className="mt-1 text-xs text-slate-400">Easy teaching flow</p>
                    </button>

                    <button
                      onClick={() => handleSend("Teach me acids and bases")}
                      className="nira-soft-block nira-hover-lift px-4 py-4 text-left"
                    >
                      <p className="text-sm font-medium text-white">
                        Teach me acids and bases
                      </p>
                      <p className="mt-1 text-xs text-slate-400">Guided study</p>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto flex max-w-4xl flex-col gap-5">
            {messages.map((msg, index) => {
              if (msg.role === "system") return null;

              return (
                <ChatMessage
                  key={`${msg.id}-${msg.timestamp}-${index}`}
                  role={msg.role as "user" | "assistant"}
                  content={msg.content}
                  model={msg.model}
                  fallbackUsed={msg.fallbackUsed}
                  onDelete={() => handleDeleteMessage(msg.id)}
                />
              );
            })}

            {loading && <ChatTyping />}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}
