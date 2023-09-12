import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { RoleUser, UserStatus } from 'src/common';
import { AuthException } from 'src/exception';
import { UsersEntity } from 'src/user/entity';
import { UserServices } from 'src/user/user.services';
import { UserJwtPayload } from '../types';

@Injectable()
export class ShopGuard extends AuthGuard('jwt') {
  constructor(
    private jwtService: JwtService,
    private userServices: UserServices,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const access_token = this.extractTokenFromHeader(request);

    if (!access_token) AuthException.unauthorized();
    try {
      const payLoad: UserJwtPayload = await this.jwtService.verifyAsync(
        access_token,
      );
      const user: UsersEntity = await this.userServices.findUserByEmail(
        payLoad.email,
      );
      request.body.userId = payLoad.userId;
      if (user.role === RoleUser.SHOP && user.status === UserStatus.ACTIVE)
        return true;
    } catch (e) {
      throw new Error(`Invalid Token ${JSON.stringify({ message: e })}`);
    }
    return false;
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const tokenFromCookies = request?.cookies?.access_token;
    const [type, access_token] =
      request?.headers['authorization']?.split(' ') ?? [];

    if (tokenFromCookies) return tokenFromCookies;
    else if (type === 'Bearer') return access_token;
    else return undefined;
  }
}
