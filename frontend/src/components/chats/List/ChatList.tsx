"use client";

import { ChatsContext } from "@/components/Providers";
import React, { useContext, useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";
import { chatsApi } from "@/lib/chatsApi";
import { GetListChatsResp, IUser } from "@/$api";
import { X } from "lucide-react";
import Image from "next/image";
import FindMes from "./FindMes";

interface ChatListProps {
  value: string;
}

export const ChatList = ({ value }: ChatListProps) => {
  const { user, chatId, allChatsId, setAllChatsId, findMes, setFindMes } =
    useContext(ChatsContext);
  const [allChats, setAllChats] = useState<GetListChatsResp>([]);
  const [findChats, setFindChats] = useState<IUser[]>([]);

  useEffect(() => {
    if (!value) {
      return;
    }
    (async () => {
      const { data } = await chatsApi.getUsersByName(value);
      setFindChats(data);
    })();
  }, [value]);

  useEffect(() => {
    (async () => {
      const { data } = await chatsApi.getListChats(user?._id!);
      setAllChats(data);
      setAllChatsId(
        data.map((data) => ({ chatId: data.chatId, user2Id: data.user2._id }))
      );
    })();
  }, [user]);

  if (findMes) {
    return <FindMes allChats={allChats} />;
  }

  return (
    <>
      {allChats.length || value ? (
        <ul>
          {/* пока что если мы ищем юзера с которым уже есть переписка, он скрывается из поиска */}
          {/* надо посмотреть, потестить, сделать как в тг */}
          {!!value &&
            findChats.map((user2) => {
              const chatIdS = allChatsId.find(
                (chat) => chat.user2Id === user2?._id
              );
              return (
                <React.Fragment key={user2._id}>
                  {user2._id !== user?._id && (
                    <ChatListItem
                      active={chatId === chatIdS?.chatId}
                      user2={user2}
                      chatId={chatIdS?.chatId}
                    />
                  )}
                </React.Fragment>
              );
            })}
          {!value &&
            allChats.map((user) => {
              return (
                <ChatListItem
                  active={chatId === user.chatId}
                  chatId={user.chatId}
                  user2={user.user2}
                  key={user.user2?._id}
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
