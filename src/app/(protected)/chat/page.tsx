// src/app/(protected)/chat/page.tsx

import ChatWindow from "@/components/chat/ChatWindow";

export default async function ChatPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const params = await searchParams;
  const mode = params?.mode === "career" ? "career" : "study";

  return <ChatWindow mode={mode} />;
}
