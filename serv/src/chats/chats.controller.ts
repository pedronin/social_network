import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post('')
  createChat(@Body() dto) {
    return this.chatsService.create(dto);
  }

  @Delete(':id')
  deleteChat(@Param('id') id: string) {
    return this.chatsService.delete(id);
  }

  @Get(':id')
  getChat(@Param('id') id: string) {
    return this.chatsService.findOne(id);
  }

  
  // @Get('/:userId')
  // getChats(@Param('userId') userId: string) {
  //   return this.chatsService.getChatsByUserId(userId);
  // }

  // потом удалить
  @Get('')
  getAll() {
    return this.chatsService.getAll();
  }
}
