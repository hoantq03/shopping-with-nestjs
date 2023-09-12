import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartDetailEntity, CartEntity } from '../cart/entity';
import { ProductModule } from '../product/product.module';
import { DiscountUsedDetailEntity, UsersEntity } from '../user/entity';
import { UserModule } from '../user/user.module';
import { OrderDetailEntity, OrderEntity } from './entity';
import { OrdersController } from './orders.controller';
import { DiscountsEntity } from 'src/discounts/entity/discount.entity';
import { OrdersService } from './orders.service';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderDetailEntity,
      OrderEntity,
      UsersEntity,
      CartEntity,
      DiscountsEntity,
      DiscountUsedDetailEntity,
      CartDetailEntity,
      CartEntity,
    ]),
    UserModule,
    ProductModule,
    CartModule,
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
