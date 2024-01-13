import React, { useMemo } from "react";
import dayjs from "dayjs";
import { useContextChat, useContextMenu } from "../../../../hooks";
import { IMessage } from "@/$api";
import styles from "./ChatMessages.module.scss";
import Image from "next/image";

interface MessagesItemProps {
  message: IMessage;
  createdAt: string;
  messageRight: boolean;
  id: string;
}

function MessagesItem({ message, messageRight }: Partial<MessagesItemProps>) {
  const {
    setItemsMenu,
    setPositionMenu,
    setContextMMes,
    checkMessages,
    setCheckMessages,
  } = useContextMenu();
  const { setModalUser, findMes } = useContextChat();

  const checkIs = checkMessages.includes(message?.id!);
  const onlyPhotos = !!message?.images.length && !message?.body;
  const isFound = useMemo(() => {
    return message?.id === findMes?.foundMessage?.id;
  }, [findMes]);

  const openContextMenu = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    const { clientX, clientY } = e;

    setItemsMenu("message");
    setPositionMenu([clientX, clientY]);
    setContextMMes({ message: message!, type: "" });
  };

  const onClickMessage = () => {
    if (checkMessages.length) {
      if (checkIs) {
        setCheckMessages(checkMessages.filter((id) => id !== message?.id!));
      } else {
        setCheckMessages((prev) => [...prev, message?.id!]);
      }
      return;
    }
  };

  return (
    <li
      className={`
        relative flex items-end gap-3 first:mt-auto w-full list-none px-4 pb-[2px] pt-[2px] last:pb-2 first:pt-2
        ${messageRight && "md:ml-auto"} 
        ${messageRight && "md:flex-row-reverse"} 
        ${isFound && styles.message_found}
      `}
      onContextMenu={openContextMenu}
      onClick={onClickMessage}
      id={message?.id}
      // @ts-ignore
      name={message?.id!}
    >
      <Image
        onClick={() => setModalUser(message?.sender!)}
        className="rounded-full w-[30px] h-[30px]"
        src={message?.sender?.avatarUrl || "/file56870.jpeg"}
        width={30}
        height={30}
        unoptimized
        alt=""
      />
      <div
        className={`
          relative flex flex-col max-w-[450px] w-fit rounded-[15px]
          ${checkIs && "!bg-[#ab4700]"} 
          ${messageRight ? "bg-[#33393f]" : "bg-[#2a2f33]"}
        `}
      >
        <ul
          className={`
            grid max-w-[300px] rounded-t-[15px] overflow-hidden 
            ${styles.scrollbar_none} ${onlyPhotos && "rounded-[15px]"}
          `}
        >
          {!!message?.images.length &&
            message?.images?.map((url) => (
              <li key={url} className={`h-fit ${checkIs && styles.img__check}`}>
                <img
                  className="object-cover w-full h-full not-last:mb-5"
                  src={url}
                  width={60}
                  alt=""
                />
              </li>
            ))}
        </ul>

        <div
          className={`relative flex max-w-[500px] w-full 
          ${!onlyPhotos && "pb-[6px] pt-1 px-3"}`}
        >
          {!onlyPhotos && (
          <p className="pt-1 pb-[2px] not-last:mr-2 text-[15px] leading-[18px] tracking-tighter">
            {/* // <p className="pt-1 pb-[2px] not-last:mr-2 text-[15px]"> */}
              {message?.body}
            </p>
          )}
          <p
            className={`
              flex justify-end items-end mt-auto ml-auto text-xs float-right text-[#989795] rounded-[12px]
              ${checkIs && "text-[#fff]"}
              ${
                onlyPhotos &&
                "absolute bottom-2 right-2 px-2 py-[2px] text-[#fff] bg-[#18191d4d]"
              }
            `}
          >
            {message?.createdAt !== message?.updatedAt && "измененно  "}
            {dayjs(message?.createdAt).format("HH:mm")}
            {/* <span className="relative -mb-1">
            <Check className="ml-1" width={18} color="#c0591d" />
            <Check className="absolute top-0 left-2" width={18} color="#c0591d" />
          </span> */}
          </p>
          {!onlyPhotos && (
            <span
              className={`
              ${styles.message__item_after} 
              ${messageRight && styles.message__item_after_right} 
              ${checkIs && "!bg-[#ab4700]"}
              ${messageRight ? "bg-[#33393f]" : "bg-[#2a2f33]"}
            `}
            ></span>
          )}
        </div>
      </div>
    </li>
  );
}

export default MessagesItem;
