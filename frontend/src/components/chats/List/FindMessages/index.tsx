import { X } from "lucide-react";
import Image from "next/image";
import React, { useMemo } from "react";
import { useContextChat } from "../../../../../hooks";
import { IMessage } from "@/$api";
import { FindMessagesItem } from "./Item";

interface FindMesProps {
  setSearchValue: any;
  findMessages: IMessage[];
}

export const FindMessages = ({
  setSearchValue,
  findMessages,
}: FindMesProps) => {
  const { findMes, setFindMes, user2, chat } = useContextChat();

  return (
    <>
      <div className="px-3 pl-4 py-1 flex justify-between text-[13px] text-[#8c949c] bg-[#3a4047]">
        Поиск в чате:
      </div>
      <div
        className={`flex items-center justify-between w-full h-[50px] px-3 pr-5`}
      >
        <div className="flex items-center gap-3">
          <Image
            src={user2?.avatarUrl || "/file56870.jpeg"}
            width={38}
            height={38}
            alt="avatar"
            unoptimized
            className="rounded-full object-contain"
          />
          <p>{user2?.fullName}</p>
        </div>

        <button
          onClick={() => {
            setFindMes(null);
            setSearchValue("");
          }}
        >
          <X color="#656565" width={23} height={23} />
        </button>
      </div>
      <div className="px-3 pl-4 py-1 flex justify-between text-[13px] text-[#8c949c] bg-[#3a4047]">
        Найденно {findMessages.length}
        {findMessages.length <= 4 ? " сообщения" : " сообщений"}
      </div>
      <ul>
        {findMessages.map((mess) => (
          <FindMessagesItem key={mess.id} mess={mess} />
        ))}
      </ul>
    </>
  );
};
