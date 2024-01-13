import React, {
  useState,
  type Dispatch,
  type SetStateAction,
  useRef,
  useMemo,
} from "react";
import Image from "next/image";
import { MoreVertical, User, X } from "lucide-react";
import { IUser } from "@/$api";
import { OptionsModal } from "./Options";

interface ProfileModalInfoProps {
  user: IUser;
}

export const ProfileModalInfo = ({ user }: ProfileModalInfoProps) => {
  return (
    <div>
      <div>
        <div className="flex gap-5 items-center px-5 pb-4 bg-[#282e33]">
          <Image
            src={user?.avatarUrl || "/file56870.jpeg"}
            unoptimized
            width={70}
            height={70}
            alt="avatar"
            className="rounded-full object-contain"
          />
          <div className="flex flex-col gap-1">
            <span className="text-[17px] leading-[18px]">{user?.fullName}</span>
            <span className="text-sm font-light">{user?.email}</span>
            <span className="text-xs text-[#8c949c]">
              Был(а) в сети сегодня в 7.45
            </span>
          </div>
        </div>
      </div>

      <ul className="flex flex-col gap-4 px-5 py-4 bg-[#282e33]">
        <div className="flex items-center gap-3">
          <User width={21} />
          <span className="text-sm text-left">Мой профиль</span>
        </div>
      </ul>

      <div className="flex flex-col gap-4 px-5 py-4 bg-[#282e33]">
        <div className="flex flex-col gap-1 text-sm">
          <p>{user?.email}</p>
          <p className="text-[#8c949c]">Почта</p>
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <p className="text-[#c0591d] cursor-pointer">@qpaychok</p>
          <p className="text-[#8c949c]">Имя пользователя</p>
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, eum?
          </span>
          <span className="text-[#8c949c]">О себе</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileModalInfo;
