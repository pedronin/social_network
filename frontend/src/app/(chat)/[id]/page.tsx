"use client";

import { useContext, useEffect } from "react";
import Chat from "@/components/chats/ChatMessages/Chat";
import { useParams } from "next/navigation";
import { ChatsContext } from "@/components/Providers";

function ChatId() {
  const { user, user2, setChatId } = useContext(ChatsContext);
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    setChatId(id);
  }, [id]);

  return <Chat user={user} user2={user2} chatId={id as string} />;
}

export default ChatId;
