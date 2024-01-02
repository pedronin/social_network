import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('')
  createMessage(@Body() dto) {
    return this.messageService.create(dto)
  }
}
