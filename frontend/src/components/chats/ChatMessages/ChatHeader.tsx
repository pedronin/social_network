"use client";

import React, { useState } from "react";
import { Search, PanelRight, MoreVertical } from "lucide-react";
import { IUser } from "@/$api";
import { UserModal } from "@/components/Modals/UserModal";
import OptionsModal from "@/components/chats/List/OptionsModal";
import { useContextChat } from "../../../../hooks";

interface ChatHeaderProps {
  chatId: string;
  user2: IUser;
}

function ChatHeader({ chatId, user2 }: ChatHeaderProps) {
  const { setFindMes, chat } = useContextChat()
  const [modalUser, setModalUser] = useState(false);
  const [modalOptions, setModalOptions] = useState(false);

  return (
    <div className="flex justify-between p-3 bg-[#282e33]">
      <button
        className="w-[100%] text-left flex flex-col"
        onClick={() => setModalUser(true)}
      >
        {/* <h3>{chat?.name}</h3> */}
        <h3>{user2?.fullName}</h3>
        <span className="text-xs">{user2?.status}</span>
      </button>
      <div className="flex justify-between items-center gap-3 mr-1">
        <Search
          className="cursor-pointer"
          onClick={() => setFindMes((prev) => (prev ? "" : chatId))}
          width={20}
          color="#9ca3af"
        />
        <PanelRight width={20} color="#9ca3af" />
        <button className="relative">
          <MoreVertical
            className="cursor-pointer"
            onClick={() => setModalOptions((prev) => !prev)}
            width={20}
            color="#9ca3af"
          />
          {modalOptions && (
            <OptionsModal chatId={chatId} setModal={setModalOptions} />
          )}
        </button>
      </div>
      {modalUser && <UserModal user={user2} setModal={setModalUser} />}
    </div>
  );
}

export default ChatHeader;
