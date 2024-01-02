export interface IUser {
  fullName: string;
  email: string;
  chatsList: [];
  avatarUrl: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  token: string;
}

export interface IUser2 {
  chatId: string;
  user2: IUser
}