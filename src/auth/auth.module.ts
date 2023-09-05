import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthControllers } from './auth.controllers';
import { AuthServices } from './auth.services';
import { PassportModule } from '@nestjs/passport';
import { CartModule } from 'src/cart/cart.module';
import { CartEntity } from 'src/cart/entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/user/entity';

@Module({
  controllers: [AuthControllers],
  providers: [AuthServices],
  exports: [AuthServices],
  imports: [
    TypeOrmModule.forFeature([CartEntity, UsersEntity]),
    CartModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: `${process.env.SECRET_KEY_JWT}`,
      signOptions: { expiresIn: '24h' },
    }),
  ],
})
export class AuthModule {}
