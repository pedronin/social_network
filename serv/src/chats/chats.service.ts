import { BadRequestException, Injectable } from '@nestjs/common';
import { Chat } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChatsService {
  constructor(private prisma: PrismaService) {}

  create(dto: Partial<Chat>) {
    return this.prisma.chat.create({
      data: {
        name: dto.name,
        participants: {
          // @ts-ignore
          connect: dto?.participants.map((id: string) => ({ id })),
        },
        id: dto.id,
      },
      include: {
        participants: true,
        body: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const chat = await this.prisma.chat.findFirst({
      where: {
        id,
      },
      include: {
        body: {
          orderBy: {
            createdAt: 'asc',
          },
          include: {
            sender: true
          }
        },
        participants: true,
      },
    });

    if (!chat) {
      throw new BadRequestException('Чат не найден');
    }
    return chat;
  }

  async delete(id: string) {
    await this.findOne(id);

    return this.prisma.chat.delete({ where: { id } });
  }

  deleteMessages(id: string) {
    return this.prisma.message.deleteMany({ where: { chatId: id } });
  }

  // потом удалить
  async getAll() {
    return await this.prisma.chat.findMany({
      include: {
        body: {
          orderBy: {
            createdAt: 'asc',
          },
        },
        participants: true,
      },
    });
  }
}
