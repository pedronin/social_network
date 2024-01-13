"use client";

import React, { useEffect, useRef, useState } from "react";
import Input from "@/ui/Input";
import { ChatList } from "./ChatList";
import Image from "next/image";
import { useContextChat } from "../../../../hooks";
import { ProfileModal } from "./ProfileModal";

function ChatSidebar() {
  const [value, setValue] = useState("");
  const { user, findMes } = useContextChat();
  const [modalProf, setModalProf] = useState(false);

  const refInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (findMes) {
      refInput.current?.focus();
    }
  }, [findMes]);

  return (
    <aside className="bg-[#282e33] py-3">
      <div className="flex items-center gap-3 mb-3 px-3">
        {/* <AlignJustify /> */}
        <button onClick={() => setModalProf(true)}>
          <Image
            src={user?.avatarUrl || "/file56870.jpeg"}
            width={45}
            height={45}
            unoptimized
            alt="avatar"
            className="rounded-full object-contain"
          />
        </button>
        <Input
          ref={refInput}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Поиск"
          style="rounded-3xl max-w-[300px] w-full h-9 text-[14px] bg-[#3d444b] focus:outline-none"
        />
      </div>
      <ChatList setSearchValue={setValue} value={value} />
      {modalProf && <ProfileModal user={user!} setModal={setModalProf} />}
    </aside>
  );
}

export default ChatSidebar;
