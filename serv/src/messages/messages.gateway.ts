import {
  WebSocketGateway,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayConnection,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { Server, Socket } from 'socket.io';

// {
// cors: {
//   origin: '*',
// },
// transports: ['websocket'],
// }

@WebSocketGateway()
export class MessagesGateway implements OnGatewayConnection {
  constructor(private readonly messagesService: MessagesService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('server-path')
  async handleEvent(@MessageBody() dto: any, @ConnectedSocket() client: any) {
    const message = await this.messagesService.create(dto);

    this.server.to(dto?.chatId).emit('client-path', message);
  }

  @SubscribeMessage('join')
  createRoom(@MessageBody() chatId: string, @ConnectedSocket() client: Socket) {
    client.join(chatId);
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('CONNECTED');
  }
}
