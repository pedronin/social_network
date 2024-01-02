import React from "react";
import MessagesItem from "./MessagesItem";
import { IMessage } from "./Chat";
import { IUser } from "@/$api";
import styles from './ChatMessages.module.scss';

interface ChatMessageProps {
  messages: IMessage[];
  user: IUser | null;
  messageListRef: React.MutableRefObject<HTMLUListElement>;
}

function ChatMessage({ messages, user, messageListRef }: ChatMessageProps) {
  return (
    <ul
      ref={messageListRef}
      className={`
        flex flex-col h-full px-6 mt-auto grow-1 overflow-y-scroll scrollbar-rounded 
        scrollbar-thin scrollbar-thumb-[#5d5e5e] scrollbar-track-[#37383a]
        ${styles.scrollbar}
    `}
    >
      {messages?.map((mes, i) => {
        return (
          <MessagesItem
            messageLeft={mes.userId === user?._id}
            message={mes.message}
            createdAt={mes.createdAt}
            key={i}
          />
        );
      })}
    </ul>
  );
}

export default ChatMessage;
