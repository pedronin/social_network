import { ChatsService } from './chats.service';
export declare class ChatsController {
    private readonly chatsService;
    constructor(chatsService: ChatsService);
    createChat(dto: any): import(".prisma/client").Prisma.Prisma__ChatClient<{
        body: {
            body: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            chatId: string;
            images: string[];
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
    deleteChat(id: string): Promise<{
        name: string;
        id: string;
    }>;
    getChat(id: string): Promise<{
        body: ({
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
        })[];
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
    deleteMessages(id: string): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
    getAll(): Promise<({
        body: {
            body: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            chatId: string;
            images: string[];
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
