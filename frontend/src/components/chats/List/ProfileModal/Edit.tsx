import { IUser } from "@/$api";
import { User } from "lucide-react";
import Image from "next/image";
import React from "react";

import styles from "../ChatList.module.scss";
import Input from "@/ui/Input";

interface EditProfileProps {
  user: IUser;
}

export const EditProfile = ({ user }: EditProfileProps) => {
  return (
    <div>
      <div>
        <div className="flex flex-col gap-1 items-center px-5 pb-4 bg-[#282e33]">
          <Image
            src={user?.avatarUrl || "/file56870.jpeg"}
            unoptimized
            width={90}
            height={90}
            alt="avatar"
            className="rounded-full object-contain"
          />
          <span className="text-[17px] leading-[18px]">{user?.fullName}</span>
          <span className="text-xs text-[#8c949c]">
            Был(а) в сети сегодня в 7.45
          </span>
        </div>
      </div>

      <form className="bg-[#282e33]" action="">
        <div className="relative bg-[#282e33]">
          <textarea
            className="block px-4 w-full bg-inherit focus:outline-none resize-none"
            placeholder="О себе"
            name=""
            rows={2}
            maxLength={70}
            id=""
          />
          <span className="absolute top-0 right-0"></span>
        </div>

        <label className="block px-4 py-[6px] text-[13px] text-[#8c949c] bg-[#313b43]">
          Любые подробности, например: возраст, род занятий или город. <br />
          Пример: 23 годя, дизайнер из Санкт-Петербурга.
        </label>

        <Input placeholder="Имя" style="bg-inherit w-full" />
        <Input placeholder="Номер телефона" style="bg-inherit w-full" />
        <Input placeholder="Имя пользователя" style="bg-inherit w-full" />

        <label className="block px-4 py-[6px] text-[13px] text-[#8c949c] bg-[#313b43]">
          С помощью имени другие пользователи смогут связаться с
          Вами в Telegram, не зная Вашего телефона.
        </label>
      </form>
      <div className="h-5 bg-[#282e33]"></div>
    </div>
  );
};
