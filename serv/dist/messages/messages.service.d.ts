import { PrismaService } from 'src/prisma.service';
import { Message } from '@prisma/client';
export declare class MessagesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: Partial<Message>): import(".prisma/client").Prisma.Prisma__MessageClient<{
        chat: {
            name: string;
            id: string;
        };
        sender: {
            id: string;
            fullName: string;
            password: string;
            email: string;
            avatarUrl: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
        };
    } & {
        body: string;
        id: string;
        createAt: Date;
        userId: string;
        chatId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findChat(id: string): import(".prisma/client").Prisma.Prisma__ChatClient<{
        name: string;
        id: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
}
