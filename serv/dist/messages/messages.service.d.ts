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
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        chatId: string;
        images: string[];
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    delete(id: string): Promise<({
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
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        chatId: string;
        images: string[];
    })[]>;
    updateMessage(id: string, dto: {
        body: string;
    }): Promise<({
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
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        chatId: string;
        images: string[];
    })[]>;
    deleteMany(ids: string[]): Promise<({
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
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        chatId: string;
        images: string[];
    })[]>;
    findByText(chatId: string, text: string): import(".prisma/client").Prisma.PrismaPromise<({
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
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        chatId: string;
        images: string[];
    })[]>;
}
