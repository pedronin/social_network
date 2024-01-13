import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [UserModule, ChatsModule, MessagesModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
