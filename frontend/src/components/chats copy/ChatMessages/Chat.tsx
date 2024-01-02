"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { chatsApi } from "@/lib/chatsApi";
import { IUser } from "@/$api";
import { ChatsContext } from "@/components/Providers";

export interface IMessage {
  chatId: string;
  message: string;
  userId: string;
  atTime: Date;
  createdAt: string;
}

interface ChatProps {
  chatId: string;
  user: IUser | null;
  user2: IUser | null;
}

function Chat({ chatId, user, user2 }: ChatProps) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messageListRef = useRef<any>(null);

  // держим прокрутку чата всегда внизу
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messageListRef, messages]);

  useEffect(() => {
    (async () => {
      const { data } = await chatsApi.getMessages(chatId);
      setMessages(data?.messages || []);
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
        notUsed={!messages.length}
        user={user}
        user2={user2}
        chatId={chatId}
        setMessages={setMessages}
      />
    </div>
  );
}

export default Chat;
