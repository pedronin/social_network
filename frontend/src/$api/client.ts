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
    deleteChat(chatId: string) {
      return http.delete(`/chats/${chatId}`);
    },
    cleanMessagesChat(chatId: string) {
      return http.patch(`/chats/${chatId}`);
    },

    deleteMessage(messageId: string) {
      return http.delete(`/messages/${messageId}`);
    },
    updateMessage(messageId: string, params: { body: string }) {
      return http.patch(`/messages/${messageId}`, params);
    },
    deleteManyMessage(params: { ids: string[] }) {
      return http.patch(`/messages/many`, params);
    },
    findMessagesByText(chatId: string, text: string) {
      return http.get(`/messages/${chatId}?text=${text}`);
    },

    uploadImage(
      id: string,
      FormData: FormData,
      params: { type: "user" | "message" | "chat" }
    ) {
      return axios.post<{ filePath: string }>(
        `${baseURL}/upload/${id}`,
        FormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: params,
        }
      );
    },
  };
};
