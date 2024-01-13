"use client";

import { useRef, useState } from "react";
import { ContextMenu, IContextMMes } from "./ContextMenu";
import { ContextMenuMessage } from "@/components/chats/ChatMessages/ContextMenu";
import { IMessage } from "@/$api";
import { ConfirmationModal } from "@/components/Modals/Confirmation";

export const ContextMenuProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [itemsMenu, setItemsMenu] = useState<"message" | null>();
  const [positionMenu, setPositionMenu] = useState<number[]>([]);
  const [contextMMes, setContextMMes] = useState<IContextMMes | null>(null);
  const [checkMessages, setCheckMessages] = useState<string[]>([]);

  const handleClickOutside = (e: any) => {
    // setContextMMes(null);
    setItemsMenu(null)
  };

  return (
    <ContextMenu.Provider
      value={{
        setItemsMenu,
        setPositionMenu,
        contextMMes,
        setContextMMes,
        checkMessages,
        setCheckMessages,
      }}
    >
      <div onClick={handleClickOutside} className="w-screen h-screen">
        {itemsMenu === "message" && (
          <ContextMenuMessage x={positionMenu[0]} y={positionMenu[1]} />
        )}
        {/* {modalConfirm && <ConfirmationModal />} */}
        {children}
      </div>
    </ContextMenu.Provider>
  );
};
