import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { CartDetailEntity, CartEntity } from '../cart/entity';
import {
  OrderDetailEntity,
  OrderEntity,
  ShipperEntity,
} from '../orders/entity';
import {
  ElectronicsEntity,
  InventoryEntity,
  ProductEntity,
} from '../product/entity';
import {
  AddressEntity,
  DiscountUsedDetailEntity,
  UsersEntity,
} from '../user/entity';
import { DiscountsEntity } from 'src/discounts/entity';

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
