"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ChatsService = class ChatsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) {
        return this.prisma.chat.create({
            data: {
                name: dto.name,
                participants: {
                    connect: dto?.participants.map((id) => ({ id })),
                },
                id: dto.id,
            },
            include: {
                participants: true,
                body: true,
            },
        });
    }
    async findOne(id) {
        const chat = await this.prisma.chat.findFirst({
            where: {
                id,
            },
            include: {
                body: true,
                participants: true,
            },
        });
        if (!chat) {
            throw new common_1.BadRequestException('Чат не найден');
        }
        return chat;
    }
    async delete(id) {
        await this.findOne(id);
        return this.prisma.chat.delete({ where: { id } });
    }
    deleteMessages(id) {
        return this.prisma.message.deleteMany({ where: { chatId: id } });
    }
    async getAll() {
        return await this.prisma.chat.findMany({
            include: {
                body: true,
                participants: true,
            },
        });
    }
};
exports.ChatsService = ChatsService;
exports.ChatsService = ChatsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatsService);
//# sourceMappingURL=chats.service.js.map