import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../user/entity';
import { UserModule } from '../user/user.module';
import { CategoryEntity } from './entity/categories.entity';
import { ProductEntity } from './entity/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity, UsersEntity]),
    UserModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
