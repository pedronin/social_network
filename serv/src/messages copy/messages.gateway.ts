import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Param } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  // dto: CreateMessageDto
  async create(@MessageBody() dto) {
    const message = await this.messagesService.create(dto);
    this.server.to(dto?.chatId).emit('message', message);
    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll(@Param('id') id: string) {
    return this.messagesService.findChat(id);
  }

  @SubscribeMessage('join')
  joinRoom(@MessageBody('name') message, @ConnectedSocket() client: Socket) {
    this.server.to(client.id).emit('chat', message);
    return message;
  }

  // @SubscribeMessage('findAllMessages')
  // typing(
  //   @MessageBody('isTyping') isTyping: boolean,
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   client.broadcast.emit('typing', { name, isTyping });
  // }

  // @SubscribeMessage('findOneMessage')
  // findOne(@MessageBody() id: number) {
  //   return this.messagesService.findOne(id);
  // }

  // @SubscribeMessage('updateMessage')
  // update(@MessageBody() updateMessageDto: UpdateMessageDto) {
  //   return this.messagesService.update(updateMessageDto.id, updateMessageDto);
  // }

  // @SubscribeMessage('removeMessage')
  // remove(@MessageBody() id: number) {
  //   return this.messagesService.remove(id);
  // }
}
