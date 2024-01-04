import { Message } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class MessageService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: Partial<Message>): import(".prisma/client").Prisma.Prisma__MessageClient<{
        body: string;
        id: string;
        createAt: Date;
        userId: string;
        chatId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
