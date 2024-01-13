"use client";

import React from "react";
import Image from "next/image";
import { Bell, Info, Option, X } from "lucide-react";
import { useContextChat } from "../../../hooks";

export const UserModal = () => {
  const { modalUser, setModalUser } = useContextChat();

  if (!modalUser) {
    return null;
  }

  return (
    <div
      // onClick={() => setModalUser(null)}
      className="fixed z-50 top-0 left-0 flex justify-center w-screen h-screen bg-[#000000ad]"
    >
      <div
        className="relative max-w-[395px] w-full h-fit mt-10 bg-[#313b43] rounded-[10px] 
      overflow-hidden"
      >
        <div className="flex justify-between pb-8 px-5 pt-5 bg-[#282e33]">
          <h2 className="font-medium text-[18px]">Информация</h2>
          <button onClick={() => setModalUser(null)}>
            <X color="#656565" width={23} height={23} />
          </button>
        </div>
        <div className="flex gap-5 items-center px-5 pb-4 bg-[#282e33]">
          <Image
            src={modalUser?.avatarUrl || "/file56870.jpeg"}
            width={70}
            height={70}
            alt="avatar"
            className="rounded-full object-contain"
            unoptimized
          />
          <div className="flex flex-col">
            <h3 className="text-xl">{modalUser?.fullName}</h3>
            <span className="text-xs text-[#8c949c]">
              Был(а) в сети сегодня в 7.45
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-2 px-5 py-4 bg-[#282e33]">
          <div className="flex gap-3">
            <Info width={24} className="min-w-[21px]" />
            <div>
              <div className="flex flex-col gap-1 text-sm">
                <p>{modalUser?.email}</p>
                <p className="text-[#8c949c]">Почта</p>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <p className="text-[#c0591d] cursor-pointer">@qpaychok</p>
                <p className="text-[#8c949c]">Имя пользователя</p>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dicta, eum?
                </span>
              </div>
              <span className="text-[#8c949c]">О себе</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Bell width={21} />
            <span className="text-sm text-left">Уведомления</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-2 px-5 py-4 bg-[#282e33]">
          <button className="text-sm text-left cursor-default">
            Поделится контактом
          </button>
          <button className="text-sm text-left cursor-default">
            Изменить контакт
          </button>
          <button className="text-sm text-[#d43f3f] text-left cursor-default">
            Заблокировать
          </button>
        </div>
      </div>
    </div>
  );
};
