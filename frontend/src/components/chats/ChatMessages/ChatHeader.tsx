"use client";

import React, { useContext, useState } from "react";
import { Search, PanelRight, MoreVertical } from "lucide-react";
import { ChatsContext } from "@/components/Providers";
import { IUser } from "@/$api";
import { UserModal } from "@/components/Modals/UserModal";

interface ChatHeaderProps {
  chatId: string;
  user2: IUser;
}

function ChatHeader({ chatId, user2 }: ChatHeaderProps) {
  const { setFindMes, chat } = useContext(ChatsContext);
  const [modal, setModal] = useState(false);

  return (
    <div className="flex justify-between p-3 bg-[#282e33]">
      <button className="w-[100%] text-left flex flex-col" onClick={() => setModal(true)}>
        <h3>{chat?.name}</h3>
        <span className="text-xs">{user2?.status}</span>
      </button>
      <div className="flex justify-between items-center gap-3">
        <button onClick={() => setFindMes(chatId)}>
          <Search />
        </button>
        <PanelRight />
        <MoreVertical />
      </div>
      {modal && <UserModal user={user2} setModal={setModal} />}
    </div>
  );
}

export default ChatHeader;
