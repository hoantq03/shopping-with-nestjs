import { Body, Controller, Post } from '@nestjs/common';
import { ReqLoginDto } from './dto/login';
import { AuthServices } from './auth.services';
import { AuthException } from 'src/exception';
import { UserServices } from 'src/user/user.services';
import { RegisterUserDto } from 'src/user/dto';

@Controller('/auth')
export class AuthControllers {
  constructor(
    private authServices: AuthServices,
    private userServices: UserServices,
  ) {}

  @Post('/signin')
  async signIn(@Body() body: ReqLoginDto) {
    const token = await this.authServices.signIn(body.email, body.password);
    if (!token) AuthException.unauthorized();
    return token;
  }

  @Post('/register')
  async register(@Body() body: RegisterUserDto) {
    const token = await this.userServices.signUp(body);
    if (!token) AuthException.unauthorized();
    return token;
  }
}
