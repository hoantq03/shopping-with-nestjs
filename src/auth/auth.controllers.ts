import { Body, Controller, Post } from '@nestjs/common';
import { ResUserDto } from 'src/user/dto';
import { ReqLoginDto } from './dto/login';
import { AuthServices } from './auth.services';
import { AuthException } from 'src/exception';

@Controller('/auth')
export class AuthControllers {
  constructor(private authServices: AuthServices) {}

  @Post('/signup')
  async signUp(@Body() body: ReqLoginDto): Promise<ResUserDto | null> {
    const user = await this.authServices.validateUser(
      body.email,
      body.password,
    );
    if (!user) AuthException.unauthorized();
    return user;
  }
}
