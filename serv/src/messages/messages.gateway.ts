import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway implements OnGatewayConnection {
  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('server-path')
  async handleEvent(dto: any, @ConnectedSocket() client: any) {
    console.log(dto.body);
    const message = await this.messagesService.create(dto);
    client.emit('client-path', dto.body);
  }

  handleConnection(client: any, ...args: any[]) {
    console.log(client);
    console.log('CONNECTED');
  }
}
