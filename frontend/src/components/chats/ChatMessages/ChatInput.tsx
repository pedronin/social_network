"use client";

import Input from "@/ui/Input";
import { Paperclip, SendHorizontal } from "lucide-react";
import React, { useState, useEffect } from "react";
import { IMessage, IUser } from "@/$api";
import { useConnectSocket } from "../../../../hooks/useConnectSocket";
import SocketApi from "../../../../api/socket-api";
import { chatsApi } from "@/lib/chatsApi";

interface ChatInputProps {
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
  chatId: string;
  user2: IUser | null;
  user: IUser | null;
  notUsed: boolean;
}

function ChatInput({
  setMessages,
  user,
  user2,
  chatId,
  notUsed,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  useConnectSocket(chatId);

  useEffect(() => {
    SocketApi.socket?.on("client-path", (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    if (!message) {
      return;
    }
    const sended = {
      userId: user?.id,
      body: message,
      chatId: chatId,
    };

    if (notUsed) {
      await chatsApi.createChat({
        name: "string",
        id: chatId,
        participants: [user2?.id!, user?.id!],
      });
    }

    SocketApi.socket?.emit("server-path", sended);
    setMessage("");
  };

  return (
    <div className="flex relative shrink-0 !bg-[#282e33]">
      <Paperclip
        width={22}
        height={22}
        color="#7b7b7b"
        className="absolute top-3 left-2"
      />
      <form
        className="flex items-center w-[100%]"
        onSubmit={handleSubmit}
        action=""
      >
        <Input
          value={message}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMessage(e.target.value)
          }
          placeholder="Написать сообщение..."
          style="w-full h-12 pl-10 !bg-[#282e33]"
          name="message"
        />
        <button className={`my-3 mr-8 ml-1 ${!message && "cursor-default"}`}>
          <SendHorizontal
            className="transition"
            stroke={`${message ? "#fc6a03" : "#fff"}`}
            width={23}
          />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
