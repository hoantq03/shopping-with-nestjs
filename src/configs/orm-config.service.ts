import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import {
  OrderDetailEntity,
  OrderEntity,
  ShipperEntity,
} from 'src/orders/entity';
import { CategoryEntity } from 'src/product/entity/categories.entity';
import { ProductEntity } from 'src/product/entity/product.entity';
import { AddressEntity } from 'src/user/entity';

import { UsersEntity } from 'src/user/entity/user.entity';

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
      ],
      synchronize: false,
      logging: false,
    };
  }
}
