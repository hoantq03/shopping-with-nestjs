import { Body, Controller, Post } from '@nestjs/common';
import { ReqLoginDto } from './dto/login';
import { AuthServices } from './auth.services';
import { AuthException } from 'src/exception';

@Controller('/auth')
export class AuthControllers {
  constructor(private authServices: AuthServices) {}

  @Post('/signin')
  async signIn(@Body() body: ReqLoginDto) {
    const token = await this.authServices.signIn(body.email, body.password);
    if (!token) AuthException.unauthorized();
    return token;
  }
}
