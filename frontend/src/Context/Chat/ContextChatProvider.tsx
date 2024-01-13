"use client";

import { type PropsWithChildren, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IChat, IMessage, IUser } from "@/$api";
import { ChatsContext, IFindMes } from "./ContextChat";

export default function ChatContextProvider({ children }: PropsWithChildren) {
  const router = useRouter();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [chatId, setChatId] = useState("");
  const [chat, setChat] = useState<IChat | null>(null);

  const [modalUser, setModalUser] = useState<IUser | null>(null);

  const [user, setUser] = useState<IUser | null>(
    JSON.parse(localStorage.getItem("user") || "{}") || null
    // typeof window !== "undefined"
    //   ? JSON.parse(localStorage.getItem("user") || "{}") || null
    //   : null
  );

  const [user2, setUser2] = useState<IUser | null>(
    // JSON.parse(localStorage.getItem("user2") || "{}")
    null
  );
  const [findMes, setFindMes] = useState<IFindMes | null>(null);

  useEffect(() => {
    if (!user || !user.email) {
      router.push("/login");
    }
  }, [user]);

  return (
    <ChatsContext.Provider
      value={{
        user,
        setUser,
        user2,
        setUser2,
        chatId,
        setChatId,
        chat,
        setChat,
        findMes,
        setFindMes,
        messages,
        setMessages,
        modalUser,
        setModalUser,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
}
