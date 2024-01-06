import { IMessage } from "@/$api";
import { createContext, type SetStateAction, type Dispatch } from "react";

interface IContextMenu {
  setItemsMenu: (p: any) => void;
  setPositionMenu: Dispatch<SetStateAction<number[]>>;
  contextMMes: IMessage | null;
  setContextMMes: Dispatch<SetStateAction<IMessage | null>>;
  editMessageInfo: IMessage | null;
  setEditMessageInfo: Dispatch<SetStateAction<IMessage | null>>;
}

export const ContextMenu = createContext<IContextMenu>({} as IContextMenu);
