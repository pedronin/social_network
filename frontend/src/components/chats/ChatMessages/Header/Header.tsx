"use client";

import React, { useState } from "react";
import { Search, PanelRight, MoreVertical } from "lucide-react";
import OptionsModal from "@/components/chats/List/OptionsModal";
import { useContextChat } from "../../../../../hooks";

interface ChatHeaderLinkProps {}

function ChatHeaderLink() {
  const { setFindMes, chatId, user2, setModalUser } = useContextChat();
  const [modalOptions, setModalOptions] = useState(false);

  return (
    <>
      <button
        className="w-[100%] text-left flex flex-col"
        onClick={() => setModalUser(user2)}
      >
        {/* <h3>{chat?.name}</h3> */}
        <h3>{user2?.fullName}</h3>
        <span className="text-xs">{user2?.status}</span>
      </button>
      <div className="flex justify-between items-center gap-3 mr-1">
        <Search
          className="cursor-pointer"
          onClick={() =>
            setFindMes((prev) => (prev ? null : { chatId, foundMessage: null }))
          }
          width={20}
          color="#656565"
        />
        <PanelRight width={20} color="#656565" />
        <button className="relative">
          <MoreVertical
            className="cursor-pointer"
            onClick={() => setModalOptions((prev) => !prev)}
            width={20}
            color="#656565"
          />
          {modalOptions && (
            <OptionsModal chatId={chatId} setModal={setModalOptions} />
          )}
        </button>
      </div>
    </>
  );
}

export default ChatHeaderLink;
