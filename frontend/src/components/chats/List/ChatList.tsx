"use client";

import React, { useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";
import { chatsApi } from "@/lib/chatsApi";
import { IChat, IMessage, IUser } from "@/$api";
import { FindMessages } from "./FindMessages";
import { useContextChat } from "../../../../hooks";

interface ChatListProps {
  value: string;
  setSearchValue: any;
}

export const ChatList = ({ value, setSearchValue }: ChatListProps) => {
  const { user, chatId, findMes, setFindMes } = useContextChat();
  const [chatList, setChatList] = useState<IChat[]>([]);
  const [findUsers, setFindUsers] = useState<IUser[]>([]);
  const [findMessages, setFindMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    if (value === "") {
      setFindMessages([]);
      setFindUsers([]);
      return;
    }
    (async () => {
      if (findMes) {
        const { data } = await chatsApi.findMessagesByText(
          findMes.chatId,
          value
        );
        setFindMessages(data);
        return;
      }
      const { data } = await chatsApi.getUsersByName(value);
      setFindUsers(data);
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
    return (
      <FindMessages
        findMessages={findMessages}
        setSearchValue={setSearchValue}
      />
    );
  }

  return (
    <>
      {chatList.length || value ? (
        <>
          <ul>
            {/* пока что если мы ищем юзера с которым уже есть переписка, он скрывается из поиска */}
            {/* надо посмотреть, потестить, сделать как в тг */}
            {!!value &&
              findUsers.map((chat) => {
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

          {!!value && (
            <FindMessages
              findMessages={findMessages}
              setSearchValue={setSearchValue}
            />
          )}
        </>
      ) : (
        <h2 className="text-center">Пока пусто</h2>
      )}
    </>
  );
};
