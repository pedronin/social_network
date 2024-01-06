"use client";

import { chatsApi } from "@/lib/chatsApi";
import { Paintbrush, Trash2 } from "lucide-react";
import React from "react";
import { useContextChat } from "../../../../hooks";

interface OptionsModalProps {
  setModal: any;
  chatId: string;
}

function OptionsModal({ setModal, chatId }: OptionsModalProps) {
  const { setMessages } = useContextChat();
  const deleteChat = async () => {
    await chatsApi.deleteChat(chatId);
  };

  const cleanChat = async () => {
    await chatsApi.cleanMessagesChat(chatId);
    setMessages([]);
  };

  return (
    <div
      onClick={() => setModal(null)}
      className="fixed z-50 top-0 left-0 flex justify-center w-screen h-screen cursor-default"
    >
      <div className="absolute top-12 right-5 w-fit h-fit p-3 bg-[#303a42] ss:p-4 text-left rounded-md">
        <ul className="flex flex-col gap-2 text-[15px]">
          <li
            onClick={cleanChat}
            className="flex items-center gap-3 cursor-pointer"
          >
            <Paintbrush width={20} />
            Очистить историю
          </li>
          <li
            onClick={deleteChat}
            className="flex items-center gap-3 text-[#d43f3f] cursor-pointer"
          >
            <Trash2 color="#d43f3f" width={20} />
            Удалить чат
          </li>
        </ul>
      </div>
    </div>
  );
}

export default OptionsModal;
