"use client";

import { type PropsWithChildren, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IChat, IMessage, IUser } from "@/$api";
import { ConfirmContext, IModalConfirm } from "./ConfirmContext";

export default function ConfirmContextProvider({
  children,
}: PropsWithChildren) {
  const [modalConfirm, setModalConfirm] = useState<IModalConfirm | null>(null);

  return (
    <ConfirmContext.Provider
      value={{
        modalConfirm,
        setModalConfirm,
      }}
    >
      {children}
    </ConfirmContext.Provider>
  );
}
