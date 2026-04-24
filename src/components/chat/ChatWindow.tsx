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

type ChatMode = "study" | "career" | "chat";

type StoredMessage = ChatMessageType & {
  id: string;
  timestamp: number;
};

function storageKey(sessionId: string, mode: ChatMode) {
  return `nira_chat_${sessionId}_${mode}`;
}

function createId() {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function normalizeMessages(data: unknown): StoredMessage[] {
  if (!Array.isArray(data)) return [];

  return data
    .map((msg) => {
      if (!msg || typeof msg !== "object") return null;

      const m = msg as Partial<StoredMessage>;

      if (!m.content || typeof m.content !== "string") return null;
      if (m.role !== "user" && m.role !== "assistant") return null;

      return {
        id: typeof m.id === "string" ? m.id : createId(),
        role: m.role,
        content: m.content,
        model: typeof m.model === "string" ? m.model : undefined,
        fallbackUsed: Boolean(m.fallbackUsed),
        timestamp:
          typeof m.timestamp === "number" ? m.timestamp : Date.now(),
      };
    })
    .filter(Boolean) as StoredMessage[];
}

export default function ChatWindow({
  mode = "study",
}: {
  mode?: ChatMode;
}) {
  const router = useRouter();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [messages, setMessages] = useState<StoredMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeModel, setActiveModel] = useState("gemma");
  const [fallbackUsed, setFallbackUsed] = useState(false);

  useEffect(() => {
    const id = getSessionId() || createId();
    setSessionId(id);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !sessionId) return;

    const key = storageKey(sessionId, mode);
    const raw = localStorage.getItem(key);

    if (!raw) {
      setMessages([]);
      setActiveModel("gemma");
      setFallbackUsed(false);
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      const safe = normalizeMessages(parsed);

      setMessages(safe);

      const last = [...safe].reverse().find((m) => m.role === "assistant");

      if (last?.model) {
        setActiveModel(last.model);
        setFallbackUsed(Boolean(last.fallbackUsed));
      } else {
        setActiveModel("gemma");
        setFallbackUsed(false);
      }
    } catch {
      setMessages([]);
      setActiveModel("gemma");
      setFallbackUsed(false);
    }
  }, [mode, sessionId, ready]);

  useEffect(() => {
    if (!ready || !sessionId) return;

    const key = storageKey(sessionId, mode);
    localStorage.setItem(key, JSON.stringify(messages));
  }, [messages, mode, sessionId, ready]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend(text: string) {
    if (!text.trim() || loading || !sessionId) return;

    const userMsg: StoredMessage = {
      id: createId(),
      role: "user",
      content: text,
      timestamp: Date.now(),
    };

    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text, mode, sessionId }),
      });

      const data = await res.json();

      const aiMsg: StoredMessage = {
        id: createId(),
        role: "assistant",
        content: data?.message || "No response",
        model: data?.model || "gemma",
        fallbackUsed: Boolean(data?.fallbackUsed),
        timestamp: Date.now(),
      };

      setActiveModel(aiMsg.model || "gemma");
      setFallbackUsed(Boolean(aiMsg.fallbackUsed));
      setMessages([...next, aiMsg]);
    } catch {
      setMessages([
        ...next,
        {
          id: createId(),
          role: "assistant",
          content: "Connection failed. Try again.",
          model: "gemma",
          fallbackUsed: true,
          timestamp: Date.now(),
        },
      ]);
      setActiveModel("gemma");
      setFallbackUsed(true);
    } finally {
      setLoading(false);
    }
  }

  function deleteMsg(id: string) {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }

  function switchMode(m: ChatMode) {
    if (m !== mode) router.push(`/chat?mode=${m}`);
  }

  const isEmpty = messages.length === 0 && !loading;

  function emptyTitle() {
    if (mode === "career") return "Start a career conversation with NIRA";
    if (mode === "chat") return "Start a general conversation with NIRA";
    return "Start a study conversation with NIRA";
  }

  function emptySubtitle() {
    if (mode === "career") {
      return "Ask about skills, growth paths, university direction, freelancing, and practical career development.";
    }
    if (mode === "chat") {
      return "Ask general questions, mix study and career topics, or chat more freely with NIRA.";
    }
    return "Ask about school topics, explanations, examples, revision, and guided learning.";
  }

  return (
    <div className="nira-panel flex h-[calc(100vh-10rem)] flex-col overflow-hidden">
      <ChatHeader
        mode={mode}
        onModeChange={switchMode}
        
        
      />

      <div className="relative flex-1 overflow-y-auto px-4 py-5 md:px-6">
        {!ready ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            Loading chat...
          </div>
        ) : isEmpty ? (
          <div className="flex h-full items-center justify-center">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/12 text-blue-300 shadow-[0_0_0_1px_rgba(37,99,235,0.18)]">
                ✦
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                {emptyTitle()}
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400 md:text-base">
                {emptySubtitle()}
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
                ) : mode === "chat" ? (
                  <>
                    <button
                      onClick={() => handleSend("Barcelona vs Real Madrid")}
                      className="nira-soft-block nira-hover-lift px-4 py-4 text-left"
                    >
                      <p className="text-sm font-medium text-white">
                        Barcelona vs Real Madrid
                      </p>
                      <p className="mt-1 text-xs text-slate-400">General question</p>
                    </button>

                    <button
                      onClick={() => handleSend("Help me combine study and career planning")}
                      className="nira-soft-block nira-hover-lift px-4 py-4 text-left"
                    >
                      <p className="text-sm font-medium text-white">
                        Combine study and career planning
                      </p>
                      <p className="mt-1 text-xs text-slate-400">Mixed guidance</p>
                    </button>

                    <button
                      onClick={() => handleSend("What is happening in tech this year?")}
                      className="nira-soft-block nira-hover-lift px-4 py-4 text-left"
                    >
                      <p className="text-sm font-medium text-white">
                        What is happening in tech this year?
                      </p>
                      <p className="mt-1 text-xs text-slate-400">Broader assistant</p>
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
                  onDelete={() => deleteMsg(msg.id)}
                />
              );
            })}

            {loading && <ChatTyping />}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <ChatInput onSend={handleSend} disabled={loading || !ready} />
    </div>
  );
}
