import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  // createUser(@Body() dto: Partial<CreateUserDto>) {
  // @UsePipes(new ValidationPipe()x)
  @Post('/register')
  createUser(@Body() dto) {
    return this.UserService.register(dto);
  }

  @Post('/login')
  loginUser(@Body() dto) {
    return this.UserService.login(dto);
  }

  @Get(':idOrEmailOrName')
  getUser(@Param('idOrEmailOrName') idOrEmailOrName: string) {
    return this.UserService.findMany(idOrEmailOrName);
  }

  @Get('/chats/:userId')
  getChats(@Param('userId') userId: string) {
    return this.UserService.getChatsById(userId);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.UserService.delete(id);
  }

  // потом удалить
  @Get('')
  getAllUsers() {
    return this.UserService.getAll();
  }
}
