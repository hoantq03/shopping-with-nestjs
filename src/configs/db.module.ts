import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

import { CategoryEntity } from 'src/product/entity/categories.entity';
import { ProductEntity } from 'src/product/entity/product.entity';
import { AddressEntity } from 'src/user/entity';
import { UsersEntity } from 'src/user/entity/user.entity';
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
  entities: [UsersEntity, AddressEntity, ProductEntity, CategoryEntity],
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
})
export class DatabaseModule {}
