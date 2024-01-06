import { IChat, IMessage, IUser } from "@/$api";
import { createContext, type Dispatch, type SetStateAction } from "react";

interface IChatsContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  user2: IUser | null;
  setUser2: Dispatch<SetStateAction<IUser | null>>;
  chatId: string;
  setChatId: Dispatch<SetStateAction<string>>;
  chat: IChat | null;
  setChat: Dispatch<SetStateAction<IChat | null>>;
  findMes: string;
  setFindMes: Dispatch<SetStateAction<string>>;
  messages: IMessage[]
  setMessages: Dispatch<SetStateAction<IMessage[]>>;
}

export const ChatsContext = createContext<IChatsContext>({} as IChatsContext);
