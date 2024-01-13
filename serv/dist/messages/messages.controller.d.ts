import { MessagesService } from './messages.service';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    createOne(dto: {
        userId: string;
        body: string;
        chatId: string;
    }): import(".prisma/client").Prisma.Prisma__MessageClient<{
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
    deleteOne(id: string): Promise<({
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
    deleteMany(dto: {
        ids: string[];
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
    findOneByText({ text }: {
        text: string;
    }, chatId: string): import(".prisma/client").Prisma.PrismaPromise<({
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
