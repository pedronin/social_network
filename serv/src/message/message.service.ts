import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  create(dto: Partial<Message>) {
    return this.prisma.message.create({
      data: {
        userId: dto.userId,
        body: dto.body,
        chatId: dto.chatId
      },
    });
  }
}
