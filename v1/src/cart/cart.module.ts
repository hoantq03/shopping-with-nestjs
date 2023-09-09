// import { Module } from '@nestjs/common';
// import { CartController } from './cart.controller';
// import { CartService } from './cart.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { CartEntity } from './entity';
// import { ProductEntity } from '../product/entity';
// import { UsersEntity } from '../user/entity';
// import { UserModule } from '../user/user.module';
// import { ProductModule } from '../product/product.module';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([CartEntity, ProductEntity, UsersEntity]),
//     UserModule,
//     ProductModule,
//   ],
//   controllers: [CartController],
//   providers: [CartService],
//   exports: [CartService],
// })
// export class CartModule {}
