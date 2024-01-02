import {
  BadRequestException,
  Get,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { genSaltSync, hash, hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(user: Partial<User>) {
    const hashedPassword = this.hashPassword(user.password);
    return this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        // @ts-ignore
        token: user.token
      },
    });
  }

  async findOne(idOrEmail: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ id: idOrEmail }, { email: idOrEmail }],
      },
      include: {
        chats: true,
      },
    });

    if (!user) {
      throw new BadRequestException('Пользователь не найден');
    }
    return user;
  }

  async delete(id: string) {
    await this.findOne(id);

    return this.prisma.user.delete({ where: { id } });
  }

  update() {}

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }

  // потом удалить
  async getAll() {
    return await this.prisma.user.findMany({
      include: {
        chats: true,
      },
    });
  }
}
