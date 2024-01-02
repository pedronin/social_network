import axios from "axios";
import * as types from "./types";

export const createChatsClient = (baseURL: string) => {
  const http = axios.create({
    baseURL,
  });

  return {
    registerUser(params: types.RegisterParams) {
      return http.post<types.IUser>("/auth/register", params);
    },
    loginUser(params: types.LoginParams) {
      return http.post<types.IUser>("/auth/login", params);
    },
    toggleOnline(status: string, userId: string) {
      return http.post(`/auth/network/${userId}`, { status });
    },
    getUsersByName(fullName: string) {
      return http.get<types.IUser[]>(`/auth/users/${fullName}`);
    },

    getListChats(userId: string) {
      return http.get<types.GetListChatsResp>(`auth/chats/${userId}`);
    },
    getMessages(chatId: string) {
      return http.get(`/chat/messages/${chatId}`);
    },
    deleteMessages(chatId: string) {
      return http.delete(`/chat/messages/${chatId}`);
    },
    createUserChat(chatId: types.CreateUserChatParams) {
      return http.post("/auth/chats/create", chatId);
    },
    createChats(chatId: string) {
      return http.post("chat/create", { chatId: chatId });
    },
    addMessageChats(params: types.AddMessageChatsParams) {
      return http.post("/chat/message", params);
    },
  };
};
