import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  async uploadImage(
    file: Express.Multer.File,
    idUserOrChat: string,
    dto: { type: 'user' | 'message' | 'chat' },
  ) {
    if (!file) {
      throw new BadRequestException('FIle is not an image');
    }

    // в случае если меняем аву пользователя
    const filePath = `http://localhost:5555/upload/pictures/${file.filename}`;

    if (dto.type === 'user') {
      await this.prisma.user.update({
        where: { id: idUserOrChat },
        data: { avatarUrl: filePath },
      });
    }

    return {
      filePath,
    };
  }
}

// import { BadRequestException, Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma.service';

// @Injectable()
// export class UploadService {
//   constructor(private prisma: PrismaService) {}

//   async uploadImage(
//     files: Express.Multer.File[] | Express.Multer.File,
//     idUserOrChat: string,
//     dto: { type: 'user' | 'message' | 'chat' },
//   ) {

//     if (!files || (Array.isArray(files) && !files.length)) {
//       throw new BadRequestException('FIle is not an image');
//       return
//     }

//     // в случае если меняем аву пользователя
//     if (!Array.isArray(files) ?? dto.type === 'user') {
//       const filePath = `http://localhost:5555/upload/pictures/${file.filename}`;

//       await this.prisma.user.update({
//         where: { id: idUserOrChat },
//         data: { avatarUrl: filePath },
//       });

//       return {
//         filePath,
//       };
//     }

//     const arr = [];

//     for (let i = 0; i < files?.length; i++) {}

//     const filePath = `http://localhost:5555/upload/pictures/${file.filename}`;

//     if (dto.type === 'user') {
//       await this.prisma.user.update({
//         where: { id: idUserOrChat },
//         data: { avatarUrl: filePath },
//       });
//     }

//     return {
//       filePath,
//     };
//   }
// }
