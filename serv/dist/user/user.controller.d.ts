import { UserService } from './user.service';
export declare class UserController {
    private readonly UserService;
    constructor(UserService: UserService);
    createUser(dto: any): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        fullName: string;
        password: string;
        email: string;
        avatarUrl: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    loginUser(dto: any): Promise<{
        id: string;
        fullName: string;
        password: string;
        email: string;
        avatarUrl: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
    }>;
    getUser(idOrEmailOrName: string): Promise<({
        chats: ({
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
    getChats(userId: string): Promise<({
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
    deleteUser(id: string): Promise<{
        id: string;
        fullName: string;
        password: string;
        email: string;
        avatarUrl: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
    }>;
    getAllUsers(): Promise<({
        chats: {
            name: string;
            id: string;
        }[];
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
}
