import { Body, Controller, Post } from '@nestjs/common';
import { AuthException } from 'src/exception';
import { RegisterUserDto } from 'src/user/dto';
import { UserServices } from 'src/user/user.services';
import { AuthServices } from './auth.services';
import { ReqLoginDto } from './dto/login';

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
