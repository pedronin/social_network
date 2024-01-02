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
  fullName: string;
  email: string;
  chatsList: IChatsListItem[];
  avatarUrl: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  token: string;
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
