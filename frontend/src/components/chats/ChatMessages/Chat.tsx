"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { chatsApi } from "@/lib/chatsApi";
import { IMessage, IUser } from "@/$api";
import { ChatsContext } from "@/components/Providers";

interface ChatProps {
  chatId: string;
  user: IUser | null;
  user2: IUser | null;
}

function Chat({ chatId, user, user2 }: ChatProps) {
  const { setChat, setUser2 } = useContext(ChatsContext);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [notUsed, setNotUsed] = useState(false);
  const messageListRef = useRef<any>(null);

  // держим прокрутку чата всегда внизу
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messageListRef, messages]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await chatsApi.getChat(chatId);
        setChat(data || null);
        setUser2(data.participants.find((u) => u.id !== user?.id) || null);
        setMessages(data?.body);
      } catch (error) {
        setNotUsed(true);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col content-between bg-[#18191d] h-screen">
      <ChatHeader user2={user2!} chatId={chatId} />
      <Messages
        messageListRef={messageListRef}
        user={user}
        messages={messages}
      />
      <ChatInput
        notUsed={notUsed}
        user={user}
        user2={user2}
        chatId={chatId}
        setMessages={setMessages}
      />
    </div>
  );
}

export default Chat;
