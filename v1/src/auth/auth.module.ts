import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from '../cart/entity';
import { UsersEntity } from '../user/entity';
import { UserModule } from '../user/user.module';
import { AuthControllers } from './auth.controllers';
import { AuthServices } from './auth.services';

@Module({
  controllers: [AuthControllers],
  providers: [AuthServices],
  exports: [AuthServices],
  imports: [
    TypeOrmModule.forFeature([CartEntity, UsersEntity]),
    UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: `${process.env.SECRET_ACCESS_JWT}`,
      signOptions: { expiresIn: '24h' },
    }),
  ],
})
export class AuthModule {}
