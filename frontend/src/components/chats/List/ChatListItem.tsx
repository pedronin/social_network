"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useContext } from "react";
import { ChatsContext } from "@/components/Providers";
import { IUser } from "@/$api";

interface ChatListItemProps {
  user2: IUser;
  active: boolean;
  chatId?: string;
  lastMessage?: string;
  timeLastMessage?: string;
}

function ChatListItem({
  user2,
  chatId,
  lastMessage,
  timeLastMessage,
  active,
}: ChatListItemProps) {
  const router = useRouter();
  const { setUser2 } = useContext(ChatsContext);

  const setCurrentChat = async () => {
    setUser2(user2);
    localStorage.setItem("user2", JSON.stringify(user2));
    router.push(`/${chatId || `f${(+new Date()).toString(16)}`}`);
  };

  return (
    <li
      onClick={setCurrentChat}
      className={`flex items-center py-2 gap-3 w-full h-[61px] min-w-[265px] pl-3 pr-2 
      ${active ? "bg-[#ab4700]" : "hover:bg-[#313b43]"}`}
    >
      <Image
        src={user2?.avatarUrl || "/file56870.jpeg"}
        width={45}
        height={45}
        alt="avatar"
        className="rounded-full object-contain"
      />
      <div className="flex flex-col">
        <p className="">{user2?.fullName}</p>
        <p className={`text-[13px] text-[#9ca3af] ${active && "text-[#fff]"}`}>
          last message
        </p>
      </div>
      <span
        className={`text-[13px] text-right ml-auto h-full pt-1 text-[#9ca3af] font-light
        ${active && "text-[#fff]"}`}
      >
        15.00
      </span>
    </li>
  );
}

export default ChatListItem;