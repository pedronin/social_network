import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Message } from '@prisma/client';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  create(dto: Partial<Message>) {
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

  async delete(id: string) {
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

  async updateMessage(id: string, dto: { body: string }) {
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

  async deleteMany(ids: string[]) {
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

  findByText(chatId: string, text: string) {
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

  // update(id: number, updateMessageDto: UpdateMessageDto) {
  //   return `This action updates a #${id} message`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} message`;
  // }
}
