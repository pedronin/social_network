import React from "react";
import dayjs from "dayjs";
import { useContextMenu } from "../../../../hooks";
import { IMessage } from "@/$api";

interface MessagesItemProps {
  message: IMessage;
  createdAt: string;
  messageLeft: boolean;
  id: string;
}

function MessagesItem({
  message,
  messageLeft,
  createdAt,
  id,
}: Partial<MessagesItemProps>) {
  const { setItemsMenu, setPositionMenu, setContextMMes } =
    useContextMenu();
  const openContextMenu = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    const { clientX, clientY } = e;

    setItemsMenu("message");
    setPositionMenu([clientX, clientY]);
    // console.log(id);
    setContextMMes(message!);
  };

  return (
    <li
      className={`first:mt-auto w-full list-none mt-2 last:mb-2 
      `}
      onContextMenu={(e) => openContextMenu(e)}
    >
      <div
        className={`flex-col max-w-[500px] w-fit pt-1 pb-4 px-3 bg-[#33393f] rounded-xl
        ${messageLeft && "ml-auto"}
      `}
      >
        <p className="">{message?.body}</p>
        <p className="text-xs float-right text-[#989795]">
          {dayjs(createdAt).format("HH:mm")}
        </p>
      </div>
    </li>
  );
}

export default MessagesItem;
