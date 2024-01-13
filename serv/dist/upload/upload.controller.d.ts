/// <reference types="multer" />
import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadAvatar(file: Express.Multer.File, idUserOrChat: string, dto: {
        type: 'user' | 'chat' | 'chat';
    }): Promise<{
        filePath: string;
    }>;
    getAvatar(filename: string, res: Response): void;
}
