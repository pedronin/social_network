import React, {
  type FormEventHandler,
  type Dispatch,
  type SetStateAction,
  useState,
} from "react";
import Image from "next/image";
import { Bell, Info, Option, Smile, X } from "lucide-react";
import Input from "@/ui/Input";
import EmojiPicker, { Theme } from "emoji-picker-react";

import styles from '../ChatMessages.module.scss';

interface SendImgModalProps {
  imagesUrl: string[];
  setImagesUrl: Dispatch<SetStateAction<string[]>>;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    notMessage?: boolean
  ) => void;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  inputFileRef: any;
}

export const SendImgModal = ({
  imagesUrl,
  setImagesUrl,
  handleSubmit,
  message,
  setMessage,
  inputFileRef,
}: SendImgModalProps) => {
  const closeModal = () => {
    setMessage("");
    setImagesUrl([]);
  };

  return (
    <div className="fixed z-50 top-0 left-0 flex justify-center items-center w-screen h-screen bg-[#000000ad]">
      <div className="relative max-w-[370px] w-full max-h-screen mt-4 mb-4 bg-[#282e33] rounded-[10px] px-1 py-3">
        <div className="flex justify-between px-5">
          <h2 className="mb-3 text-[17px]">Отправить изображение</h2>
          <button onClick={closeModal}>
            <X color="#656565" width={23} height={23} />
          </button>
        </div>

        <ul className={`max-h-[500px] overflow-y-auto pl-7 pr-6 ${styles.scrollbar_photos}`}>
          {!!imagesUrl.length &&
            imagesUrl.map((url) => (
              <li key={url}>
                <img className="object-cover w-full h-full" src={url} width={60} alt="" />
              </li>
            ))}
        </ul>

        <form
          onSubmit={(e) => {
            handleSubmit(e, true);
            closeModal();
          }}
          className="px-5"
        >
          <div className="relative flex items-center w-[100%]">
            <Input
              value={message || ""}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Подпись"
              style="w-full h-12 text-sm !bg-[#282e33] border-b-[1.6px] border-[#ef6c21]"
              name="message"
            />
            <div className="absolute top-3 right-2 flex gap-4 items-center">
              <Smile
                className="z-50 [&:hover+aside]:!visible !transition-all !duration-500 
              hover:stroke-[#fff] cursor-pointer"
                color="#989795"
                width={26}
                strokeWidth={1.5}
              />
              <EmojiPicker
                style={{ position: "absolute" }}
                className="bottom-8 -right-10 invisible !transition-all !duration-500 hover:visible"
                onEmojiClick={(obj) =>
                  setMessage((prev) => (prev += obj.emoji))
                }
                skinTonesDisabled={true}
                searchDisabled={true}
                theme={Theme.DARK}
                width={350}
                height={300}
              />
            </div>
          </div>

          <div className="flex gap-1 mt-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                inputFileRef.current?.click();
              }}
              className="px-4 py-[6px] text-sm text-[#fda674] rounded-[6px] hover:bg-[#313b43]"
            >
              Добавить
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                closeModal();
              }}
              className="ml-auto px-4 py-[6px] text-sm text-[#fda674] rounded-[6px] hover:bg-[#313b43]"
            >
              Отмена
            </button>
            <button className="px-4 py-[6px] text-sm text-[#fda674] rounded-[6px] hover:bg-[#313b43]">
              Отправить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
