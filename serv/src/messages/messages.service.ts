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
      },
      include: {
        sender: true,
        chat: true,
      },
    });
  }

  // deleteMany(chatId: string) {
  //   return this.prisma.message.deleteMany({ where: { chatId } });
  // }

  async delete(id: string) {
    await this.prisma.message.delete({ where: { id: id } });
    return this.prisma.message.findMany();
  }

  async updateMessage(id: string, dto: { body: string }) {
    await this.prisma.message.update({
      where: { id: id },
      data: {
        body: dto.body,
      },
    });

    return this.prisma.message.findMany();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} message`;
  // }

  // update(id: number, updateMessageDto: UpdateMessageDto) {
  //   return `This action updates a #${id} message`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} message`;
  // }
}
