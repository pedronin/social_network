import { ChatsContext } from "@/Context/Chat/ContextChat";
import { useContext } from "react";

export const useContextChat = () => useContext(ChatsContext);
