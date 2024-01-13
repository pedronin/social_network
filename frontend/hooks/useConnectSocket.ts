import { useEffect } from "react";
import SocketApi from "../api/socket-api";

export const useConnectSocket = (chatId: string) => {
  const connectSocket = () => {
    SocketApi.createConnection(chatId);

    SocketApi.socket?.emit("join", chatId);
  };

  useEffect(() => {
    connectSocket();
  }, []);
};
