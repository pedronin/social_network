import { OnGatewayConnection } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { Server, Socket } from 'socket.io';
export declare class MessagesGateway implements OnGatewayConnection {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    server: Server;
    handleEvent(dto: any, client: any): Promise<void>;
    createRoom(chatId: string, client: Socket): void;
    handleConnection(client: any, ...args: any[]): void;
}
