import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

import { CartEntity, CartItemsEntity } from 'src/cart/entity';
import {
  OrderDetailEntity,
  OrderEntity,
  ShipperEntity,
} from 'src/orders/entity';
import { CategoryEntity } from 'src/product/entity/categories.entity';
import { ProductEntity } from 'src/product/entity/product.entity';
import { AddressEntity, UsersEntity } from 'src/user/entity';
import { TypeOrmConfigService } from './orm-config.service';

export const dbSourceOption: DataSourceOptions = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [
    UsersEntity,
    AddressEntity,
    ProductEntity,
    CategoryEntity,
    OrderDetailEntity,
    OrderEntity,
    ShipperEntity,
    CartEntity,
    CartItemsEntity,
  ],
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
})
export class DatabaseModule {}
