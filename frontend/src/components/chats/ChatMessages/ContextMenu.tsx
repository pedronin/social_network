"use client";

import { CheckCircle2, Copy, Pencil, Redo2, Trash2, Undo2 } from "lucide-react";
import { useContextChat, useContextMenu } from "../../../../hooks";
import { chatsApi } from "@/lib/chatsApi";
import { type RefObject } from "react";

interface ContextMenuMessageProps {
  x: number;
  y: number;
  ref: RefObject<HTMLDivElement>;
}

export const ContextMenuMessage = ({ x, y, ref }: ContextMenuMessageProps) => {
  const { contextMMes, setContextMMes, setEditMessageInfo } = useContextMenu();
  const { messages, setMessages } = useContextChat();

  const deleteMessage = async () => {
    const { data } = await chatsApi.deleteMessage(contextMMes?.id!);
    setMessages(data);
    setContextMMes(null);
  };

  const updateMessage = async () => {
    setEditMessageInfo(contextMMes);
  };

  const copyText = () => {
    navigator.clipboard.writeText(contextMMes?.body!);
  };

  return (
    <div
      style={{ top: y, left: x }}
      className={`
        ${!contextMMes && "hidden"}
        fixed top-0 right-0 w-fit h-fit p-3 bg-[#303a42] ss:p-4 text-left rounded-md z-50
      `}
      ref={ref}
    >
      <ul className="flex flex-col gap-2 text-[15px]">
        <li className="flex items-center gap-3 cursor-pointer">
          <Undo2 width={20} />
          Ответить
        </li>
        <li className="flex items-center gap-3 cursor-pointer">
          <Redo2 width={20} />
          Переслать
        </li>
        <li
          onClick={copyText}
          className="flex items-center gap-3 cursor-pointer"
        >
          <Copy width={20} />
          Копировать текст
        </li>
        <li
          onClick={updateMessage}
          className="flex items-center gap-3 cursor-pointer"
        >
          <Pencil width={20} />
          Изменить
        </li>
        <li
          onClick={deleteMessage}
          className="flex items-center gap-3 cursor-pointer"
        >
          <Trash2 width={20} />
          Удалить
        </li>
        <li className="flex items-center gap-3 cursor-pointer">
          <CheckCircle2 width={20} />
          Выделить
        </li>
      </ul>
    </div>
  );
};
