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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcrypt_1 = require("bcrypt");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    register(user) {
        const hashedPassword = this.hashPassword(user.password);
        return this.prisma.user.create({
            data: {
                fullName: user.fullName,
                email: user.email,
                password: hashedPassword,
            },
        });
    }
    async login(dto) {
        const password = (0, bcrypt_1.compareSync)(dto.password, (0, bcrypt_1.genSaltSync)(10));
        console.log(password);
        const user = await this.prisma.user.findFirst({
            where: {
                email: dto.email,
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('Неверно указана почта или пороль');
        }
        return user;
    }
    async getChatsById(userId) {
        const user = await this.findOne(userId);
        return user.chats;
    }
    async findOne(idOrEmailOrName) {
        const user = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { id: idOrEmailOrName },
                    { email: idOrEmailOrName },
                    { fullName: idOrEmailOrName },
                ],
            },
            include: {
                chats: {
                    include: {
                        body: true,
                        participants: true,
                    },
                },
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('Пользователь не найден');
        }
        return user;
    }
    async findMany(idOrEmailOrName) {
        const user = await this.prisma.user.findMany({
            where: {
                OR: [
                    { id: idOrEmailOrName },
                    { email: idOrEmailOrName },
                    {
                        fullName: {
                            contains: idOrEmailOrName,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
            include: {
                chats: {
                    include: {
                        body: true,
                        participants: true,
                    },
                },
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('Пользователь не найден');
        }
        return user;
    }
    async delete(id) {
        await this.findOne(id);
        return this.prisma.user.delete({ where: { id } });
    }
    update() { }
    async getAll() {
        return await this.prisma.user.findMany({
            include: {
                chats: {
                    include: {
                        body: true,
                        participants: true,
                    },
                },
            },
        });
    }
    hashPassword(password) {
        return (0, bcrypt_1.hashSync)(password, (0, bcrypt_1.genSaltSync)(10));
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map