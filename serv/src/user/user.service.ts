import {
  BadRequestException,
  Get,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { compareSync, genSaltSync, hash, hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  register(user: Partial<User>) {
    const hashedPassword = this.hashPassword(user.password);
    return this.prisma.user.create({
      data: {
        fullName: user.fullName,
        email: user.email,
        password: hashedPassword,
        // @ts-ignore
        // token: user.token
      },
    });
  }

  async login(dto: Pick<User, 'password' | 'email'>) {
    // bcrypt
    const password = compareSync(dto.password, genSaltSync(10));

    console.log(password);

    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
        // password: dto.password,
      },
    });


    if (!user) {
      throw new BadRequestException('Неверно указана почта или пороль');
    }

    return user;
  }

  async getChatsById(userId: string) {
    const user = await this.findOne(userId);
    return user.chats;
  }

  async findOne(idOrEmailOrName: string) {
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
      throw new BadRequestException('Пользователь не найден');
    }
    return user;
  }

  async findMany(idOrEmailOrName: string) {
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
      throw new BadRequestException('Пользователь не найден');
    }
    return user;
  }

  async delete(id: string) {
    await this.findOne(id);

    return this.prisma.user.delete({ where: { id } });
  }

  update() {}

  // потом удалить
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

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }
}
