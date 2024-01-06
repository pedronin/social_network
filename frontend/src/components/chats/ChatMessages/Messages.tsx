import React from "react";
import MessagesItem from "./MessagesItem";
import { IMessage, IUser } from "@/$api";
import styles from "./ChatMessages.module.scss";

interface ChatMessageProps {
  messages: IMessage[];
  user: IUser | null;
  scrollDownRef: React.MutableRefObject<HTMLUListElement>;
  chatId: string;
}

function ChatMessage({
  chatId,
  messages,
  user,
  scrollDownRef,
}: ChatMessageProps) {
  return (
    <ul
      ref={scrollDownRef}
      className={`
    flex flex-col h-full px-6 mt-auto grow-1 overflow-y-scroll scrollbar-rounded 
    scrollbar-thin scrollbar-thumb-[#5d5e5e] scrollbar-track-[#37383a]
    ${styles.scrollbar}
    `}
    >
      {messages?.map((mes) => {
        return (
          <MessagesItem
            messageLeft={mes.userId === user?.id}
            message={mes}
            createdAt={mes.createAt}
            id={mes.id}
            key={mes.id}
          />
        );
      })}
    </ul>
  );
}

export default ChatMessage;
