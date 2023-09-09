import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../user/entity';
import { UserModule } from '../user/user.module';
import { ProductEntity } from './entity/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ElectronicsEntity, InventoryEntity } from './entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      UsersEntity,
      InventoryEntity,
      ElectronicsEntity,
    ]),
    UserModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
