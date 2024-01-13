import { IChat, IMessage, IUser } from "@/$api";
import { createContext, type Dispatch, type SetStateAction } from "react";

export interface IFindMes {
  chatId: string;
  foundMessage: IMessage | null;
}

interface IChatsContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  user2: IUser | null;
  setUser2: Dispatch<SetStateAction<IUser | null>>;
  chatId: string;
  setChatId: Dispatch<SetStateAction<string>>;
  chat: IChat | null;
  setChat: Dispatch<SetStateAction<IChat | null>>;
  findMes: IFindMes | null;
  setFindMes: Dispatch<SetStateAction<IFindMes | null>>;
  messages: IMessage[];
  setMessages: Dispatch<SetStateAction<IMessage[]>>;
  modalUser: IUser | null;
  setModalUser: Dispatch<SetStateAction<IUser | null>>;
}

export const ChatsContext = createContext<IChatsContext>({} as IChatsContext);
