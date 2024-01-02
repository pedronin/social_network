"use client";

import Input from "@/ui/Input";
import { Paperclip, SendHorizontal } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { IMessage } from "./Chat";
import { chatsApi } from "@/lib/chatsApi";
import { IUser } from "@/$api";
import { io } from "socket.io-client";

interface ChatInputProps {
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
  chatId: string;
  user2: IUser | null;
  user: IUser | null;
  notUsed: boolean;
}

const socketNest = io("http://localhost:3001")


function ChatInput({
  setMessages,
  user,
  user2,
  chatId,
  notUsed,
}: ChatInputProps) {
  const socket = useRef<any>(null);
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   socketNest.emit('findAllMessages')
  // }, [])


  // useEffect(() => {
  //   socket.current = new WebSocket("ws://localhost:8080");

  //   socket.current.onopen = () => {
  //     socket.current.send(
  //       JSON.stringify({
  //         method: "connection",
  //         id: chatId,
  //       })
  //     );
  //   };
  //   socket.current.onmessage = (event: any) => {
  //     const newMessage = JSON.parse(event.data);
  //     switch (newMessage.method) {
  //       case "connection":
  //         break;
  //       case "message":
  //         setMessages((prev) => [...prev, newMessage]);
  //         break;
  //     }
  //   };
  //   socket.current.onclose = () => {
  //     console.log("Socket закрыт");
  //   };
  //   socket.current.onerror = () => {
  //     console.log("Socket произошла ошибка");
  //   };
  // }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    if (!message) {
      return;
    }
    const sended = {
      message: message,
      userId: user?._id,
      userName: user?.fullName,
      createdAt: new Date(),
      method: "message",
      id: chatId,
    };

    if (notUsed) {
      await chatsApi.createUserChat({
        userId: user?._id!,
        user2Id: user2?._id!,
        chatId: chatId,
      });

      try {
        await chatsApi.createChats(chatId);
      } catch (error) {
        console.log(error);
      }
    }

    socket.current.send(JSON.stringify(sended));
    setMessage("");

    await chatsApi.addMessageChats({
      chatId: chatId,
      message: {
        message: message,
        userId: user?._id!,
        createdAt: new Date(),
      },
    });
  };

  return (
    <div className="relative shrink-0">
      <Paperclip
        width={22}
        height={22}
        color="#7b7b7b"
        className="absolute top-3 left-2"
      />
      <form onSubmit={handleSubmit} action="">
        <Input
          value={message}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMessage(e.target.value)
          }
          placeholder="Написать сообщение..."
          style="w-full h-12 pl-10 !bg-[#282e33]"
          name="message"
        />
        <button className="absolute top-3 right-8">
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
