"use client";

import { CheckCircle2, Copy, Pencil, Redo2, Trash2, Undo2 } from "lucide-react";
import { useContextChat, useContextMenu } from "../../../../hooks";
import { chatsApi } from "@/lib/chatsApi";
import { useMemo, useRef } from "react";

interface ContextMenuMessageProps {
  x: number;
  y: number;
}

export const ContextMenuMessage = ({ x, y }: ContextMenuMessageProps) => {
  const { contextMMes, setContextMMes, checkMessages, setCheckMessages } =
    useContextMenu();
  const { setMessages } = useContextChat();

  const menuRef = useRef<HTMLDivElement>(null);

  const isCheck = checkMessages.includes(contextMMes?.message.id!);

  const checkedMessage = () => {
    if (checkMessages.includes(contextMMes?.message.id!)) {
      setCheckMessages(
        checkMessages.filter((id) => id !== contextMMes?.message.id!)
      );
    } else {
      setCheckMessages((prev) => [...prev, contextMMes?.message.id!]);
    }
  };

  const deleteMessage = async () => {
    const { data } = await chatsApi.deleteMessage(contextMMes?.message.id!);
    setMessages(data);
    setContextMMes(null);
  };

  const updateMessage = async () => {
    setContextMMes({ message: contextMMes?.message!, type: "edit" });
  };

  const copyText = () => {
    navigator.clipboard.writeText(contextMMes?.message.body!);
  };

  const { menuX, menuY } = useMemo(() => {
    // if (!menuRef.current) {
    //   return { menuX: x, menuY: y };
    // }
    // const menuW = menuRef.current?.clientWidth;
    // const menuH = menuRef.current?.clientHeight;
    const menuW = 190;
    const menuH = 208;
    const winInW = window.innerWidth;
    const winInH = window.innerHeight;

    if (menuW + x > winInW) {
      x -= menuW;
    }
    if (menuH + y > winInH) {
      y -= menuH;
    }
    return { menuX: x, menuY: y };
  }, [x, y, menuRef.current]);

  return (
    <div
      style={{ top: menuY, left: menuX }}
      ref={menuRef}
      className={`
        ${!contextMMes && "hidden"}
        fixed top-0 right-0 w-[190px] h-fit py-[6px] bg-[#282e33] text-left rounded-md z-50 shadow-2xl
      `}
    >
      <ul className="flex flex-col text-[15px]">
        <li className="flex items-center gap-3 cursor-pointer hover:bg-[#313b43] px-3 py-[6px]">
          <Undo2 width={20} />
          Ответить
        </li>
        <li className="flex items-center gap-3 cursor-pointer hover:bg-[#313b43] px-3 py-[6px]">
          <Redo2 width={20} />
          Переслать
        </li>
        <li
          onClick={copyText}
          className="flex items-center gap-3 cursor-pointer hover:bg-[#313b43] px-3 py-[6px]"
        >
          <Copy width={20} />
          Копировать текст
        </li>
        <li
          onClick={updateMessage}
          className="flex items-center gap-3 cursor-pointer hover:bg-[#313b43] px-3 py-[6px]"
        >
          <Pencil width={20} />
          Изменить
        </li>
        <li
          onClick={deleteMessage}
          className="flex items-center gap-3 cursor-pointer hover:bg-[#313b43] px-3 py-[6px]"
        >
          <Trash2 width={20} />
          Удалить
        </li>
        <li
          onClick={checkedMessage}
          className="flex items-center gap-3 cursor-pointer hover:bg-[#313b43] px-3 py-[6px]"
        >
          <CheckCircle2 width={20} />
          {isCheck ? "Отменить выбор" : "Выделить"}
        </li>
      </ul>
    </div>
  );
};
