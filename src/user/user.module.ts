import { Module } from '@nestjs/common';
import { UserController } from './user.controllers';
import { UserServices } from './user.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UserController],
  providers: [UserServices],
  exports: [UserServices],
})
export class UserModule {}
