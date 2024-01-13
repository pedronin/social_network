//
//
//
//
//
//

export interface AddMessageChatsParams {
  chatId: string;
  message: {
    message: string;
    userId: string;
    createdAt: Date;
  };
}

export interface CreateUserChatParams {
  userId: string;
  user2Id: string;
  chatId: string;
}

export interface LoginParams {
  password: string;
  email: string;
}

export interface RegisterParams {
  password: string;
  email: string;
  fullName: string;
}

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;

  chatsList: IChat[];
  token: any;
  status: string;
}

export interface IUser2 {
  chatId: string;
  user2: IUser;
}

export type TypeAuthResponse =
  | IUser
  | {
      error: string;
    };

export interface IChatsListItem {
  chatId: string;
  user2: IUser;
}

export type GetListChatsResp = {
  chatId: string;
  user2: IUser;
}[];

export interface IChat {
  name: string;
  id: string;
  body: IMessage[];
  // participants: Omit<IUser, "chatsList">[];
  participants: IUser[];
}

export interface IMessage {
  body: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  chatId: string;
  sender: IUser;
  images: string[];
}

export interface CreateChatParams {
  name: string;
  id: string;
  participants: string[];
}
