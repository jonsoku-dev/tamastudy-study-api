import { Module } from '@nestjs/common';
import { NoticesController } from './notices.controller';
import { NoticesService } from './notices.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Notice, NoticeSchema } from '../common/schemas/notice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notice.name, schema: NoticeSchema }]),
  ],
  controllers: [NoticesController],
  providers: [NoticesService],
})
export class NoticesModule {}
