import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from '../cart/cart.module';
import { CartEntity, CartItemsEntity } from '../cart/entity';
import { ProductModule } from '../product/product.module';
import { UsersEntity } from '../user/entity';
import { UserModule } from '../user/user.module';
import { OrderDetailEntity, OrderEntity } from './entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderDetailEntity,
      OrderEntity,
      UsersEntity,
      CartEntity,
      CartItemsEntity,
    ]),
    UserModule,
    CartModule,
    ProductModule,
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
