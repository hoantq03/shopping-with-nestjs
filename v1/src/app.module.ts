import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { DatabaseModule } from './configs';
import { DiscountModule } from './discounts/discount.module';
import { DiscountsService } from './discounts/discounts.service';
import { OrdersModule } from './orders/orders.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UserModule,
    AuthModule,
    ProductModule,
    OrdersModule,
    CartModule,
    DiscountModule,
  ],
  controllers: [AppController],
  providers: [AppService, DiscountsService],
})
export class AppModule {}
