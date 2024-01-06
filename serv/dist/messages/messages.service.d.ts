import { PrismaService } from 'src/prisma.service';
import { Message } from '@prisma/client';
export declare class MessagesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: Partial<Message>): import(".prisma/client").Prisma.Prisma__MessageClient<{
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
        chat: {
            name: string;
            id: string;
        };
    } & {
        body: string;
        id: string;
        createAt: Date;
        userId: string;
        chatId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    delete(id: string): Promise<{
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
