import { Module } from '@nestjs/common';
import { AuthControllers } from './auth.controllers';
import { UserModule } from 'src/user/user.module';
import { AuthServices } from './auth.services';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthControllers],
  providers: [AuthServices],
  exports: [],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: `${process.env.SECRET_KEY_JWT}`,
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}
