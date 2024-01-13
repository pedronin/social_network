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
      id="messages"
      ref={scrollDownRef}
      className={`relative flex flex-col h-full overflow-y-scroll ${styles.scrollbar_messages}`}
    >
      {messages.map((mes) => {
        return (
          <MessagesItem
            messageRight={mes.userId === user?.id}
            message={mes}
            createdAt={mes.createdAt}
            id={mes.id}
            key={mes.id}
          />
        );
      })}
    </ul>
  );
}

export default ChatMessage;
