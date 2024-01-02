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
    });
  }

  findChat(id: string) {
    return this.prisma.chat.findFirst({ where: { id } });
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
