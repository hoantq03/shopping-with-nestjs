import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

import { TypeOrmConfigService } from './orm-config.service';
import { UsersEntity } from 'src/user/entity/user.entity';
import { AddressEntity } from 'src/user/entity';
import { ProductEntity } from 'src/product/entity/product.entity';
import { CategoryEntity } from 'src/product/entity/categories.entity';

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
