"use client";

import { ChatsContext } from "@/components/Providers";
import React, { useContext, useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";
import { chatsApi } from "@/lib/chatsApi";
import { IChat, IUser } from "@/$api";
import { X } from "lucide-react";
import Image from "next/image";
import FindMes from "./FindMes";

interface ChatListProps {
  value: string;
}

export const ChatList = ({ value }: ChatListProps) => {
  const { user, chatId, findMes, setFindMes } = useContext(ChatsContext);
  const [chatList, setChatList] = useState<IChat[]>([]);
  const [findChats, setFindChats] = useState<IUser[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await chatsApi.getUsersByName(value);
      setFindChats(data);
    })();
  }, [value]);

  useEffect(() => {
    (async () => {
      if (!user?.id) {
        return;
      }
      const { data } = await chatsApi.getListChats(user?.id);
      setChatList(data);
    })();
  }, [user]);

  if (findMes) {
    return <FindMes chatList={chatList} />;
  }

  return (
    <>
      {chatList.length || value ? (
        <ul>
          {/* пока что если мы ищем юзера с которым уже есть переписка, он скрывается из поиска */}
          {/* надо посмотреть, потестить, сделать как в тг */}
          {!!value &&
            findChats.map((chat) => {
              return (
                <React.Fragment key={chat.id}>
                  {chat.id !== user?.id && (
                    <ChatListItem
                      active={chatId === chat.id}
                      user2={chat}
                      chatId={chat?.id}
                    />
                  )}
                </React.Fragment>
              );
            })}
          {!value &&
            chatList.map((chat) => {
              return (
                <ChatListItem
                  active={chatId === chat.id}
                  chatId={chat.id}
                  user2={
                    chat.participants.find((u) => u.id !== user?.id) || null
                  }
                  key={chat.id}
                />
              );
            })}
        </ul>
      ) : (
        <h2 className="text-center">Пока пусто</h2>
      )}
    </>
  );
};
