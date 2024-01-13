import { IChat, IMessage, IUser } from "@/$api";
import { createContext, type Dispatch, type SetStateAction } from "react";

export interface IModalConfirm {
  type: string;
  function: any;
}

interface IConfirmContext {
  modalConfirm: IModalConfirm | null;
  setModalConfirm: Dispatch<SetStateAction<IModalConfirm | null>>;
}

export const ConfirmContext = createContext<IConfirmContext>(
  {} as IConfirmContext
);
