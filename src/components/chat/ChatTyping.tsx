// src/components/chat/ChatTyping.tsx

export default function ChatTyping() {
  return (
    <div className="flex justify-start">
      <div className="flex max-w-[88%] flex-col md:max-w-[78%]">
        <div className="mb-2 px-1 text-[11px] uppercase tracking-[0.14em] text-slate-500">
          NIRA
        </div>

        <div className="rounded-[24px] rounded-bl-md border border-white/10 bg-white/6 px-4 py-3.5 text-sm text-slate-300 shadow-[0_18px_60px_-32px_rgba(0,0,0,0.7)]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.2s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-blue-300 [animation-delay:-0.1s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-blue-200" />
            <span className="ml-2 text-slate-400">NIRA is thinking...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
