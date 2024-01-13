/// <reference types="multer" />
import { PrismaService } from 'src/prisma.service';
export declare class UploadService {
    private prisma;
    constructor(prisma: PrismaService);
    uploadImage(file: Express.Multer.File, idUserOrChat: string, dto: {
        type: 'user' | 'message' | 'chat';
    }): Promise<{
        filePath: string;
    }>;
}
