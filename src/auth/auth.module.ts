import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthControllers } from './auth.controllers';
import { AuthServices } from './auth.services';

@Module({
  controllers: [AuthControllers],
  providers: [AuthServices],
  exports: [],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: `${process.env.SECRET_KEY_JWT}`,
      signOptions: { expiresIn: '24h' },
    }),
  ],
})
export class AuthModule {}
