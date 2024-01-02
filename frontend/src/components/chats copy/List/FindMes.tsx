import { GetListChatsResp } from "@/$api";
import { ChatsContext } from "@/components/Providers";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useContext } from "react";

interface FindMesProps {
  allChats: GetListChatsResp;
}

function FindMes({ allChats }: FindMesProps) {
  const { findMes, setFindMes } = useContext(ChatsContext);
  const currChat = allChats.find((chat) => chat.chatId === findMes);

  return (
    <>
      <div className="px-3 pl-4 py-1 flex justify-between text-[13px] text-[#9ca3af] bg-[#3a4047]">
        Поиск в чате
      </div>
      <li
        className={`flex items-center justify-between w-full h-[50px] px-3 pr-5`}
      >
        <div className="flex items-center gap-3">
          <Image
            src={
              currChat?.user2?.avatarUrl
                ? currChat?.user2?.avatarUrl
                : "/file56870.jpeg"
            }
            width={38}
            height={38}
            alt="avatar"
            className="rounded-full object-contain"
          />
          <p>{currChat?.user2.fullName}</p>
        </div>

        <button onClick={() => setFindMes("")}>
          <X color="#9ca3af" width={23} height={23} />
        </button>
      </li>
      <div className="px-3 pl-4 py-1 flex justify-between text-[13px] text-[#9ca3af] bg-[#3a4047]">
        Поиск по сообщениям
      </div>
    </>
  );
}

export default FindMes;
