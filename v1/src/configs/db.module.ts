import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
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
import { TypeOrmConfigService } from './orm-config.service';
import { DiscountsEntity } from 'src/discounts/entity';

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
    DiscountsEntity,
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
