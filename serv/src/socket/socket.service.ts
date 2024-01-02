import { Injectable } from '@nestjs/common';
import { OnGatewayConnection, WebSocketGateway } from '@nestjs/websockets';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketService implements OnGatewayConnection {

    handleConnection(client: any, ...args: any[]) {
        
    }
}
