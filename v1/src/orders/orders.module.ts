import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from '../cart/entity';
import { ProductModule } from '../product/product.module';
import {
  DiscountUsedDetailEntity,
  DiscountsEntity,
  UsersEntity,
} from '../user/entity';
import { UserModule } from '../user/user.module';
import { OrderDetailEntity, OrderEntity } from './entity';
import { OrdersController } from './orders.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderDetailEntity,
      OrderEntity,
      UsersEntity,
      CartEntity,
      DiscountsEntity,
      DiscountUsedDetailEntity,
    ]),
    UserModule,
    ProductModule,
  ],
  providers: [],
  controllers: [OrdersController],
})
export class OrdersModule {}
