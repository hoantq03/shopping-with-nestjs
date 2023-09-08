import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { AuthException } from '../exception';
import { RegisterUserDto } from '../user/dto';
import { AuthServices } from './auth.services';
import { ReqLoginDto, ResLoginDto } from './dto/login';
import { ApiKeyV1 } from 'src/guards/checkApiKey';
@UseGuards(ApiKeyV1)
@Controller('/apiV1/auth')
export class AuthControllers {
  constructor(private authServices: AuthServices) {}

  @Post('/signin')
  async signIn(
    @Res({ passthrough: true }) res: Response,
    @Body() body: ReqLoginDto,
  ): Promise<ResLoginDto> {
    const { access_token } = await this.authServices.signIn(
      body.email,
      body.password,
    );
    if (!access_token) AuthException.unauthorized();

    res.cookie('access_token', access_token);

    return { access_token };
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
