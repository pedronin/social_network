import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  createOne(@Body() dto: { userId: string; body: string; chatId: string }) {
    return this.messagesService.create(dto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.messagesService.delete(id);
  }

  // Many
  @Patch('/many')
  deleteMany(@Body() dto: { ids: string[] }) {
    return this.messagesService.deleteMany(dto.ids);
  }

  @Patch(':id')
  updateMessage(@Param('id') id: string, @Body() dto: { body: string }) {
    return this.messagesService.updateMessage(id, dto);
  }

  @Get(':chatId')
  findOneByText(@Query() { text }: { text: string }, @Param('chatId') chatId: string) {
    return this.messagesService.findByText(chatId, text);
  }
}
