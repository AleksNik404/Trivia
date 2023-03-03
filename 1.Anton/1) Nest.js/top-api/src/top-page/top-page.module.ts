import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageController } from './top-page.controller';
import { TopPageSchema } from './top-page.model/top-page.model';
import { TopPageService } from './top-page.service';

@Module({
  controllers: [TopPageController],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'TopPageModel',
        schema: TopPageSchema,
        collection: 'TopPage',
      },
    ]),
  ],
  providers: [TopPageService],
})
export class TopPageModule {}
