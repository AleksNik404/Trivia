import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthSchema } from './auth.model/auth.model';

@Module({
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'AuthModel',
        schema: AuthSchema,
        collection: 'Auth',
      },
    ]),
  ],
})
export class AuthModule {}
