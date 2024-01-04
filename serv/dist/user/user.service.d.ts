import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    register(user: Partial<User>): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        fullName: string;
        password: string;
        email: string;
        avatarUrl: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    login(dto: Pick<User, 'password' | 'email'>): Promise<{
        id: string;
        fullName: string;
        password: string;
        email: string;
        avatarUrl: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
    }>;
    getChatsById(userId: string): Promise<({
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
    findOne(idOrEmailOrName: string): Promise<{
        chats: ({
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
        })[];
    } & {
        id: string;
        fullName: string;
        password: string;
        email: string;
        avatarUrl: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
    }>;
    findMany(idOrEmailOrName: string): Promise<({
        chats: ({
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
        })[];
    } & {
        id: string;
        fullName: string;
        password: string;
        email: string;
        avatarUrl: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
    })[]>;
    delete(id: string): Promise<{
        id: string;
        fullName: string;
        password: string;
        email: string;
        avatarUrl: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
    }>;
    update(): void;
    getAll(): Promise<({
        chats: ({
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
        })[];
    } & {
        id: string;
        fullName: string;
        password: string;
        email: string;
        avatarUrl: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
    })[]>;
    private hashPassword;
}
