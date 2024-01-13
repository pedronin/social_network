"use client";

import React, { useState, useEffect, useRef } from "react";
import ChatHeader from "./Header/index";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { chatsApi } from "@/lib/chatsApi";
import { useParams } from "next/navigation";
import { useContextChat } from "../../../../hooks";
import { ChevronDown } from "lucide-react";

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
        // setMessages([]);
        const { data } = await chatsApi.getChat(chatId);
        setChat(data || null);
        setUser2(data.participants.find((u) => u.id !== user?.id) || null);
        setMessages(data?.body);
      } catch (error) {
        // если чат не создан...
        setNotUsed(true);
        setMessages([]);
      }
    })();
  }, [chatId]);

  return (
    <div className="relative flex flex-col bg-[#18191d] h-screen">
      <ChatHeader />
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
      <button
        className="
          fixed flex justify-center items-center w-[42px] h-[42px] bottom-[64px] right-[18px] 
          rounded-full bg-[#434d57] transform translate-y-[65px] transition-transform duration-200
        "
      >
        <ChevronDown
          strokeWidth={1.2}
          width={37}
          height={35}
          color="#acb3b9"
          className="mt-1"
        />
      </button>
    </div>
  );
}

export default Chat;
