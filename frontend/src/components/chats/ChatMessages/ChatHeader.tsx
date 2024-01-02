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
  const { setFindMes } = useContext(ChatsContext);
  const [modal, setModal] = useState(false);

  return (
    <div className="flex justify-between p-3 bg-[#282e33]">
      <button onClick={() => setModal(true)}>
        <h3>{user2?.fullName}</h3>
        <span>{user2?.status}</span>
      </button>
      <div className="flex justify-between gap-3">
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
