import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthException } from 'src/exception';
import { RegisterUserDto } from 'src/user/dto';
import { UserServices } from 'src/user/user.services';
import { AuthServices } from './auth.services';
import { ReqLoginDto } from './dto/login';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

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
    const token = await this.userServices.signUp(body);
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
