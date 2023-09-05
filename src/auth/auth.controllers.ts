import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
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
  async signIn(
    @Res({ passthrough: true }) res: Response,
    @Body() body: ReqLoginDto,
  ): Promise<object> {
    const token = await this.authServices.signIn(body.email, body.password);
    if (!token) AuthException.unauthorized();
    res.cookie('token', token);
    return token;
  }

  @Post('/register')
  async register(
    @Body() body: RegisterUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<object> {
    const token = await this.authServices.signUp(body);
    if (!token) AuthException.unauthorized();
    res.cookie('token', token);
    return token;
  }

  @Post('/logout')
  logout(@Res({ passthrough: true }) res: Response): object {
    res.clearCookie('token');
    return {
      message: 'logout successfully',
      statusCode: 200,
    };
  }
}
