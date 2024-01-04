import { MessageService } from './message.service';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    createMessage(dto: any): import(".prisma/client").Prisma.Prisma__MessageClient<{
        body: string;
        id: string;
        createAt: Date;
        userId: string;
        chatId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
