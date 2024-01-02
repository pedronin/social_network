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
  @Post()
  // @UsePipes(new ValidationPipe())
  createUser(@Body() dto) {
    return this.UserService.create(dto);
  }

  @Get(':idOrEmail')
  getUser(@Param('idOrEmail') idOrEmail: string) {
    return this.UserService.findOne(idOrEmail);
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
