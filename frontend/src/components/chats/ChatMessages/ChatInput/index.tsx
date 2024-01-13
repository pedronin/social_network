"use client";

import Input from "@/ui/Input";
import { Check, Paperclip, SendHorizontal, Smile } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { IMessage, IUser } from "@/$api";
import { useConnectSocket } from "../../../../../hooks/useConnectSocket";
import SocketApi from "../../../../../api/socket-api";
import { chatsApi } from "@/lib/chatsApi";
import { useContextChat, useContextMenu } from "../../../../../hooks";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { ChangeFile } from "./ChangeFile";
import { SendImgModal } from "./SendImgModal";

interface ChatInputProps {
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
  chatId: string;
  user2: IUser | null;
  user: IUser | null;
  notUsed: boolean;
}

function ChatInput({
  setMessages,
  user,
  user2,
  chatId,
  notUsed,
}: ChatInputProps) {
  useConnectSocket(chatId);
  const [message, setMessage] = useState("");
  const { contextMMes, setContextMMes } = useContextMenu();
  const [imagesUrl, setImagesUrl] = useState<string[]>([
    // "http://localhost:5555/upload/pictures/photo_1704788750750.jpg",
    // "http://localhost:5555/upload/pictures/photo_1704788750750.jpg",
    // "http://localhost:5555/upload/pictures/photo_1704788750750.jpg",
  ]);
  const inputFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    SocketApi.socket?.on("client-path", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => {
      SocketApi.socket?.removeListener("client-path");
    };
  });

  useEffect(() => {
    if (contextMMes?.type === "edit") {
      setMessage(contextMMes.message.body);
    }
  }, [contextMMes]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    notMessage?: boolean
  ) => {
    if (contextMMes !== null && contextMMes?.type === "edit") {
      event.preventDefault();
      const { data } = await chatsApi.updateMessage(contextMMes.message.id, {
        body: message,
      });
      setContextMMes(null);
      setMessage("");
      setMessages(data);
      return;
    }

    event.preventDefault();
    if (!message && !notMessage) {
      return;
    }
    const sended = {
      userId: user?.id,
      body: message,
      chatId: chatId,
      images: imagesUrl,
    };

    if (notUsed) {
      await chatsApi.createChat({
        name: "string",
        id: chatId,
        participants: [user2?.id!, user?.id!],
      });
    }

    SocketApi.socket?.emit("server-path", sended);
    setMessage("");
  };

  return (
    <div className="flex relative z-10 !bg-[#282e33]">
      <ChangeFile
        chatId={chatId}
        imagesUrl={imagesUrl}
        setImagesUrl={setImagesUrl}
        inputFileRef={inputFileRef}
      />
      {!!imagesUrl.length && (
        <SendImgModal
          imagesUrl={imagesUrl}
          setImagesUrl={setImagesUrl}
          handleSubmit={handleSubmit}
          message={message}
          setMessage={setMessage}
          inputFileRef={inputFileRef}
        />
      )}
      <form
        className="flex items-center w-[100%]"
        onSubmit={handleSubmit}
        action=""
      >
        {/* <Input
          // Пока мы вставляем картинки - этот инпут неактивный
          value={!!imagesUrl.length ? "" : message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="Написать сообщение..."
          style="w-full h-12 pl-10 !bg-[#282e33]"
          name="message"
        /> */}
        <textarea
          value={!!imagesUrl.length ? "" : message}
          onChange={(e) => setMessage(e.target.value)}
          className=" px-4 w-full focus:outline-none h-auto
          min-h-[48px] max-h-[240px] pl-10 bg-[#282e33] resize-y py-2 focus:border-none"
          placeholder="Написать сообщение..."
          rows={1}
        />
        <div className="flex gap-4 items-center">
          <Smile
            className="[&:hover+aside]:!visible !transition-all !duration-500 
            hover:stroke-[#fff] cursor-pointer"
            color="#989795"
            width={25}
            strokeWidth={1.5}
          />
          <EmojiPicker
            style={{ position: "absolute" }}
            className="bottom-14 right-4 invisible !transition-all !duration-500 hover:visible"
            onEmojiClick={(obj) => setMessage((prev) => (prev += obj.emoji))}
            width={350}
            theme={Theme.DARK}
            skinTonesDisabled={true}
          />
          <button className={`my-3 mr-3 ml-1 ${!message && "cursor-default"}`}>
            {contextMMes?.type !== "edit" ? (
              <SendHorizontal
                className="transition hover:stroke-[#fff]"
                stroke={`${message ? "#fc6a03" : "#989795"}`}
                width={24}
                strokeWidth={1.5}
              />
            ) : (
              <Check
                className="transition"
                stroke={`${message ? "#fc6a03" : "#fff"}`}
                width={24}
              />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatInput;
