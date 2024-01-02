import { IsString, IsNumber, IsDate } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
  chatsList: any[];
  @IsString()
  avatarUrl: string;
  @IsString()
  _id: string;
  @IsDate()
  createdAt: Date;
  @IsDate()
  updatedAt: Date;
  @IsNumber()
  __v: number;
  @IsString()
  token: string;
  @IsString()
  status: string;
}

// import { IsString } from 'class-validator';

// export class TaskDto {
//   @IsString()
//   user: {
//     name: string;
//     email: string;
//     // chatsList: chatItem[];
//     avatarUrl: string;
//     _id: string;
//     createdAt: string;
//     updatedAt: string;
//     __v: number;
//     token: string;
//     status: string;
//   };

//   chatItem: {
//     participants: string[];
//     // messages: message[];
//   };

//   message: {
//     body: string;
//     sender: string;
//     createAt: string;
//   }
// }
