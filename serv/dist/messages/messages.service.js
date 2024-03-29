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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let MessagesService = class MessagesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) {
        return this.prisma.message.create({
            data: {
                userId: dto.userId,
                body: dto.body,
                chatId: dto.chatId,
                images: dto?.images,
            },
            include: {
                sender: true,
                chat: true,
            },
        });
    }
    async delete(id) {
        await this.prisma.message.delete({ where: { id: id } });
        return this.prisma.message.findMany({
            orderBy: {
                createdAt: 'asc',
            },
            include: {
                sender: true,
            },
        });
    }
    async updateMessage(id, dto) {
        await this.prisma.message.update({
            where: { id: id },
            data: {
                body: dto.body,
                updatedAt: new Date(),
            },
        });
        return this.prisma.message.findMany({
            orderBy: {
                createdAt: 'asc',
            },
            include: {
                sender: true,
            },
        });
    }
    async deleteMany(ids) {
        await this.prisma.message.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
        return this.prisma.message.findMany({
            orderBy: {
                createdAt: 'asc',
            },
            include: {
                sender: true,
            },
        });
    }
    findByText(chatId, text) {
        return this.prisma.message.findMany({
            where: {
                chatId: chatId,
                body: {
                    contains: text,
                    mode: 'insensitive',
                },
            },
            include: {
                sender: true,
            },
        });
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MessagesService);
//# sourceMappingURL=messages.service.js.map