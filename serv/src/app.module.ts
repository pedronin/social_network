import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ChatsModule } from './chats/chats.module';
import { MessageModule } from './message/message.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [UserModule, ChatsModule, MessageModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
