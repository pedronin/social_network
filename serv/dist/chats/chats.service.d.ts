import { Chat } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class ChatsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: Partial<Chat>): import(".prisma/client").Prisma.Prisma__ChatClient<{
        body: {
            body: string;
            id: string;
            createAt: Date;
            userId: string;
            chatId: string;
        }[];
        participants: {
            id: string;
            fullName: string;
            password: string;
            email: string;
            avatarUrl: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
        }[];
    } & {
        name: string;
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findOne(id: string): Promise<{
        body: {
            body: string;
            id: string;
            createAt: Date;
            userId: string;
            chatId: string;
        }[];
        participants: {
            id: string;
            fullName: string;
            password: string;
            email: string;
            avatarUrl: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
        }[];
    } & {
        name: string;
        id: string;
    }>;
    delete(id: string): Promise<{
        name: string;
        id: string;
    }>;
    deleteMessages(id: string): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
    getAll(): Promise<({
        body: {
            body: string;
            id: string;
            createAt: Date;
            userId: string;
            chatId: string;
        }[];
        participants: {
            id: string;
            fullName: string;
            password: string;
            email: string;
            avatarUrl: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
        }[];
    } & {
        name: string;
        id: string;
    })[]>;
}
