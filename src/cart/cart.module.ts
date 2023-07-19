import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity, CartItemsEntity } from './entity';
import { ProductEntity } from 'src/product/entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity, CartItemsEntity, ProductEntity]),
    UserModule,
    ProductModule,
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
