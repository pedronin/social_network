import { IMessage } from "@/$api";
import { createContext, type SetStateAction, type Dispatch } from "react";

export interface IContextMMes {
  message: IMessage;
  type: string;
}

interface IContextMenu {
  contextMMes: IContextMMes | null;
  setContextMMes: Dispatch<SetStateAction<IContextMMes | null>>;
  checkMessages: string[];
  setCheckMessages: Dispatch<SetStateAction<string[]>>;

  setItemsMenu: (p: any) => void;
  setPositionMenu: Dispatch<SetStateAction<number[]>>;
  // editMessageInfo: IMessage | null;
  // setEditMessageInfo: Dispatch<SetStateAction<IMessage | null>>;
}

export const ContextMenu = createContext<IContextMenu>({} as IContextMenu);
