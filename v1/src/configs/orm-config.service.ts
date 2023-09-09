import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { CartEntity, CartDetailEntity } from '../cart/entity';
import {
  OrderDetailEntity,
  OrderEntity,
  ShipperEntity,
} from '../orders/entity';
import {
  ProductEntity,
  ElectronicsEntity,
  InventoryEntity,
} from '../product/entity';
import {
  AddressEntity,
  UsersEntity,
  DiscountUsedDetailEntity,
  DiscountsEntity,
} from '../user/entity';

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
        DiscountsEntity,
        DiscountUsedDetailEntity,
        AddressEntity,
        ProductEntity,
        OrderEntity,
        OrderDetailEntity,
        ShipperEntity,
        CartEntity,
        ElectronicsEntity,
        InventoryEntity,
        CartDetailEntity,
      ],
      synchronize: false,
      logging: false,
    };
  }
}
