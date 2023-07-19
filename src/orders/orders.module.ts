import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailEntity, OrderEntity, ShipperEntity } from './entity';
import { CartEntity, CartItemsEntity } from 'src/cart/entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetailEntity, OrderEntity, ShipperEntity]),
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
