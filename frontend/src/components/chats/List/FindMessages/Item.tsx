import Image from "next/image";
import React from "react";
import { IMessage } from "@/$api";
import dayjs from "dayjs";
import { Link } from "react-scroll";
import { useContextChat } from "../../../../../hooks";

interface FindMessagesItemProps {
  mess: IMessage;
}

export const FindMessagesItem = ({ mess }: FindMessagesItemProps) => {
  const { findMes, setFindMes } = useContextChat();
  //   ${active ? "bg-[#ab4700]" : "hover:bg-[#313b43]"}`}

  return (
    <li
      className={`
        flex items-center py-2 gap-3 w-full h-[61px] min-w-[265px] pl-3 pr-2 
        overflow-hidden hover:bg-[#313b43]
      `}
    >
      <Link
        onClick={() =>
          setFindMes({
            chatId: findMes?.chatId!,
            foundMessage: mess,
          })
        }
        className={`
          flex items-center py-2 gap-3 w-full h-[61px] min-w-[265px] pl-3 pr-2 
          cursor-pointer overflow-hidden hover:bg-[#313b43]
        `}
        to={mess.id}
        containerId="messages"
        smooth={true}
        offset={-100}
        duration={300}
      >
        <Image
          src={mess.sender.avatarUrl || "/file56870.jpeg"}
          width={45}
          height={45}
          alt="avatar"
          unoptimized
          className="rounded-full object-contain"
        />
        <div className="flex flex-col">
          <p className="">{mess.sender.fullName}</p>
          <p className={`text-[13px] text-[#8c949c] h-5 overflow-hidden`}>
            {mess.body}
          </p>
        </div>
        <span
          className={`text-[13px] text-right ml-auto h-full pt-1 text-[#8c949c] font-light`}
        >
          {dayjs(mess.createdAt).format("HH:mm")}
        </span>
      </Link>
    </li>
  );
};
