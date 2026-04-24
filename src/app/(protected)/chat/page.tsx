// src/app/(protected)/chat/page.tsx

import ChatWindow from "@/components/chat/ChatWindow";
import { resolveMode } from "@/lib/experience/ModeManager";

export default async function ChatPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const params = await searchParams;
  const mode = resolveMode(params?.mode);

  return <ChatWindow mode={mode} />;
}
