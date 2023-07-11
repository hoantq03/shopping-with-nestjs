import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { CategoryEntity } from './entity/categories.entity';
import { UsersEntity } from 'src/user/entity';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity, UsersEntity]),
  ],
  exports: [ProductService],
})
export class ProductModule {}
