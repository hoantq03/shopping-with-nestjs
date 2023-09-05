import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { CartEntity, CartItemsEntity } from '../cart/entity';
import {
  OrderDetailEntity,
  OrderEntity,
  ShipperEntity,
} from '../orders/entity';
import { CategoryEntity, ProductEntity } from '../product/entity';
import { AddressEntity, UsersEntity } from '../user/entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        UsersEntity,
        AddressEntity,
        ProductEntity,
        CategoryEntity,
        OrderEntity,
        OrderDetailEntity,
        ShipperEntity,
        CartEntity,
        CartItemsEntity,
      ],
      synchronize: false,
      logging: false,
    };
  }
}
