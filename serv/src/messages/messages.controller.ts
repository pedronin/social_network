import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // @Post('')
  // createMessage(@Body() dto) {
  //   return this.messagesService.create(dto);
  // }

  // @Patch(':chatId')
  // deleteMessageToChat(@Param('chatId') chatId: string) {
  //   return this.messagesService.deleteMany(chatId);
  // }

  @Delete(':id')
  deleteMessage(@Param('id') id: string) {
    return this.messagesService.delete(id);
  }

  @Patch(':id')
  updateMessage(@Param('id') id: string, @Body() dto: { body: string }) {
    return this.messagesService.updateMessage(id,dto);
  }
}
