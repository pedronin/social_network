"use client";

import React from "react";
import { IUser } from "@/$api";
import { MassOperations } from "./MassOperations";
import ChatHeaderLink from "./Header";
import { useContextMenu } from "../../../../../hooks";

interface ChatHeaderProps {
  chatId: string;
  user2: IUser;
}

function ChatHeader() {
  const { checkMessages, setCheckMessages } = useContextMenu();

  return (
    <div className="flex justify-between items-center h-[55px] p-3 bg-[#282e33] border-[1px] border-[#242a2e]">
      {checkMessages.length ? (
        <MassOperations
          checkMessages={checkMessages}
          setCheckMessages={setCheckMessages}
        />
      ) : (
        <ChatHeaderLink />
      )}
    </div>
  );
}

export default ChatHeader;
