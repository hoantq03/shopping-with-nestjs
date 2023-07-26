import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from 'src/cart/cart.module';
import { UsersEntity } from 'src/user/entity';
import { UserModule } from 'src/user/user.module';
import { OrderDetailEntity, OrderEntity } from './entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ProductModule } from 'src/product/product.module';
import { CartEntity, CartItemsEntity } from 'src/cart/entity';

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
