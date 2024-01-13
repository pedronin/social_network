import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post(':idUserOrChat')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cd) => {
          console.log(file);
          // const name = file.originalname.split('.')[0].split(' ').join('_');
          const name = 'photo';
          const fileExtension = file.originalname.split('.')[1];
          const newFileName = name + '_' + Date.now() + '.' + fileExtension;

          cd(null, newFileName);
        },
      }),
      fileFilter: (req, file, cd) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cd(null, false);
        }
        cd(null, true);
      },
    }),
  )
  uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Param('idUserOrChat') idUserOrChat: string,
    @Body() dto: { type: 'user' | 'chat' | 'chat' },
  ) {
    return this.uploadService.uploadImage(file, idUserOrChat, dto);
  }

  @Get('pictures/:filename')
  getAvatar(@Param('filename') filename: string, @Res() res: Response) {
    // @ts-ignore
    res.sendFile(filename, { root: './uploads' });
  }
}
