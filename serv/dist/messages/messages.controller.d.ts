import { MessagesService } from './messages.service';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    deleteMessage(id: string): Promise<{
        body: string;
        id: string;
        createAt: Date;
        userId: string;
        chatId: string;
    }[]>;
    updateMessage(id: string, dto: {
        body: string;
    }): Promise<{
        body: string;
        id: string;
        createAt: Date;
        userId: string;
        chatId: string;
    }[]>;
}
