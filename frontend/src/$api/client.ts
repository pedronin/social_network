import axios from "axios";
import * as types from "./types";

export const createChatsClient = (baseURL: string) => {
  const http = axios.create({
    baseURL,
  });

  return {
    registerUser(params: types.RegisterParams) {
      return http.post<types.IUser>("/user/register", params);
    },
    // сделать
    loginUser(params: types.LoginParams) {
      return http.post<types.IUser>("/user/login", params);
    },
    // сделать
    toggleOnline(status: string, userId: string) {
      return http.post(`/auth/network/${userId}`, { status });
    },
    getUsersByName(idOrEmailOrName: string) {
      return http.get<types.IUser[]>(`/user/${idOrEmailOrName}`);
    },

    getListChats(userId: string) {
      return http.get<types.IChat[]>(`/user/chats/${userId}`);
    },
    getChat(chatId: string) {
      return http.get<types.IChat>(`/chats/${chatId}`);
    },
    createChat(params: types.CreateChatParams) {
      return http.post<types.IChat>(`/chats`, params);
    },

    // getMessages(chatId: string) {
    //   return http.get(`/chat/messages/${chatId}`);
    // },
    // deleteMessages(chatId: string) {
    //   return http.delete(`/chat/messages/${chatId}`);
    // },
    // createUserChat(chatId: types.CreateUserChatParams) {
    //   return http.post("/auth/chats/create", chatId);
    // },
    // createChats(chatId: string) {
    //   return http.post("chat/create", { chatId: chatId });
    // },
    // addMessageChats(params: types.AddMessageChatsParams) {
    //   return http.post("/chat/message", params);
    // },
  };
};
