import React from "react";
import dayjs from "dayjs";

interface MessagesItemProps {
  message: string;
  createdAt: string;
  messageLeft: boolean;
}

function MessagesItem({
  message,
  messageLeft,
  createdAt,
}: Partial<MessagesItemProps>) {
  return (
    <li
      className={`flex-col max-w-[500px] w-fit list-none bg-[#33393f] mt-2 pt-1 pb-1 px-3 rounded-xl first:mt-auto last:mb-2 
      ${messageLeft && "ml-auto"}`}
    >
      <p className="">{message}</p>
      <p className="text-xs float-right text-[#989795]">
        {dayjs(createdAt).format("HH:mm")}
      </p>
    </li>
  );
}

export default MessagesItem;
