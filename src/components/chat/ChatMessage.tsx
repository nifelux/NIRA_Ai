interface Props {
  role: "user" | "assistant";
  content: string;
}

export default function ChatMessage({ role, content }: Props) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-[20px] px-4 py-3 text-sm leading-7 shadow-sm ${
          isUser
            ? "bg-blue-600 text-white shadow-blue-950/30"
            : "bg-white/10 text-slate-200"
        }`}
      >
        {content}
      </div>
    </div>
  );
}