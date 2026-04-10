// src/components/chat/ChatMessage.tsx

type Props = {
  role: "user" | "assistant";
  content: string;
  model?: string;
  fallbackUsed?: boolean;
  onDelete?: () => void;
};

function renderParagraphs(content: string) {
  return content
    .split(/\n{2,}/)
    .filter(Boolean)
    .map((block, index) => (
      <p key={index} className="whitespace-pre-wrap">
        {block}
      </p>
    ));
}

function modelLabel(model?: string) {
  if (!model) return "Gemma";
  if (model === "gemini_pro") return "Gemini Pro";
  if (model === "gemini") return "Gemini";
  if (model === "deepseek") return "DeepSeek";
  return "Gemma";
}

export default function ChatMessage({
  role,
  content,
  model,
  fallbackUsed,
  onDelete,
}: Props) {
  const isUser = role === "user";

  function handleContextMenu(e: React.MouseEvent) {
    e.preventDefault();
    if (!onDelete) return;

    const shouldDelete = window.confirm("Delete this message?");
    if (shouldDelete) {
      onDelete();
    }
  }

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[88%] md:max-w-[78%] ${
          isUser ? "items-end" : "items-start"
        } flex flex-col`}
        onContextMenu={handleContextMenu}
      >
        <div className="mb-2 flex items-center gap-2 px-1 text-[11px] uppercase tracking-[0.14em] text-slate-500">
          <span>{isUser ? "You" : "NIRA"}</span>

          {!isUser ? (
            <>
              <span>•</span>
              <span>{modelLabel(model)}</span>
              {fallbackUsed ? (
                <>
                  <span>•</span>
                  <span className="text-amber-400">Fallback</span>
                </>
              ) : null}
            </>
          ) : null}
        </div>

        <div
          className={
            isUser
              ? "rounded-[24px] rounded-br-md bg-gradient-to-b from-blue-600 to-blue-700 px-4 py-3.5 text-sm leading-7 text-white shadow-[0_18px_60px_-28px_rgba(37,99,235,0.55)]"
              : "rounded-[24px] rounded-bl-md border border-white/10 bg-white/6 px-4 py-3.5 text-sm leading-7 text-slate-200 shadow-[0_18px_60px_-32px_rgba(0,0,0,0.7)]"
          }
        >
          <div className="space-y-3">{renderParagraphs(content)}</div>
        </div>
      </div>
    </div>
  );
}
