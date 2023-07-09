import { Module } from '@nestjs/common';
import { AuthControllers } from './auth.controllers';
import { UserModule } from 'src/user/user.module';
import { AuthServices } from './auth.services';

@Module({
  controllers: [AuthControllers],
  providers: [AuthServices],
  exports: [],
  imports: [UserModule],
})
export class AuthModule {}
