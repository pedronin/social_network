"use client";

import { useRef, useState } from "react";
import { ContextMenu } from "./ContextMenu";
import { ContextMenuMessage } from "@/components/chats/ChatMessages/ContextMenu";
import { IMessage } from "@/$api";

export const ContextMenuProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [itemsMenu, setItemsMenu] = useState<"message">();
  const [positionMenu, setPositionMenu] = useState<number[]>([]);
  const [contextMMes, setContextMMes] = useState<IMessage | null>(null);
  const [editMessageInfo, setEditMessageInfo] = useState<IMessage | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: any) => {
    if (menuRef.current !== e.target) {
      setContextMMes(null);
    }
  };

  return (
    <ContextMenu.Provider
      value={{
        setItemsMenu,
        setPositionMenu,
        contextMMes,
        setContextMMes,
        editMessageInfo,
        setEditMessageInfo
      }}
    >
      <div onClick={handleClickOutside} className="w-screen h-screen">
        {itemsMenu === "message" && (
          <ContextMenuMessage
            x={positionMenu[0]}
            y={positionMenu[1]}
            ref={menuRef}
          />
        )}
        {children}
      </div>
    </ContextMenu.Provider>
  );
};
