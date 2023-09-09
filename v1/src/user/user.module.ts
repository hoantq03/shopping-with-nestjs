import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from '../cart/entity';
import { AddressEntity, DiscountUsedDetailEntity } from './entity';
import { UsersEntity } from './entity/user.entity';
import { UserController } from './user.controllers';
import { UserServices } from './user.services';
import { DiscountsEntity } from 'src/discounts/entity/discount.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity,
      AddressEntity,
      CartEntity,
      DiscountsEntity,
      DiscountUsedDetailEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [UserServices],
  exports: [UserServices],
})
export class UserModule {}
