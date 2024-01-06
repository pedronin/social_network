"use client";

import React, { useState, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { chatsApi } from "@/lib/chatsApi";
import { useParams } from "next/navigation";
import { useContextChat, useContextMenu } from "../../../../hooks";

function Chat() {
  const { id: chatId } = useParams<{ id: string }>();
  const { setChat, setUser2, user, user2, setChatId, messages, setMessages } =
    useContextChat();

  const [notUsed, setNotUsed] = useState(false);
  const scrollDownRef = useRef<any>(null);

  // держим прокрутку чата всегда внизу
  useEffect(() => {
    if (scrollDownRef.current) {
      scrollDownRef.current.scrollTop = scrollDownRef.current.scrollHeight;
    }
  }, [scrollDownRef, messages]);

  useEffect(() => {
    setChatId(chatId);
  }, [chatId]);

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
        chatId={chatId}
        scrollDownRef={scrollDownRef}
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
