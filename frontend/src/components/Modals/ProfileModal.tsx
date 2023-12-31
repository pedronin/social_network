import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { IUser } from "@/$api";

interface ProfileModalProps {
  user: IUser;
  setModalProf: any;
  setUser: any;
}

function ProfileModal({ user, setUser, setModalProf }: ProfileModalProps) {
  return (
    <div
      onClick={() => setModalProf(false)}
      className="fixed z-50 top-0 left-0 flex justify-center w-screen h-screen bg-[#000000ad]"
    >
      <div
        className="relative max-w-[395px] w-full h-fit mt-10 bg-[#303a42] rounded-[10px] 
      ss:p-4 overflow-hidden"
      >
        <div className="flex justify-between pb-8 px-5 pt-5 bg-[#282e33]">
          <h2 className="font-medium text-[18px]">Информация</h2>
          <button onClick={() => setModalProf(false)}>
            <X color="#9ca3af" width={23} height={23} />
          </button>
        </div>
        <div className="flex gap-5 items-center px-5 pb-4 bg-[#282e33]">
          <Image
            src={user?.avatarUrl || "/file56870.jpeg"}
            width={70}
            height={70}
            alt="avatar"
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="text-xl">{user?.fullName}</h3>
            <span className="text-xs text-[#9ca3af]">
              Был(а) в сети сегодня в 7.45
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-2 px-5 py-4 bg-[#282e33]">
          <div className="flex flex-col gap-1 text-sm">
            <p>{user?.email}</p>
            <p className="text-[#9ca3af]">Почта</p>
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <p className="text-[#c0591d] cursor-pointer">@qpaychok</p>
            <p className="text-[#9ca3af]">Имя пользователя</p>
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
              eum?
            </span>
            <span className="text-[#9ca3af]">О себе</span>
          </div>
        </div>
        <button onClick={() => setUser(null)}>Выйти</button>
      </div>
    </div>
  );
}

export default ProfileModal;
