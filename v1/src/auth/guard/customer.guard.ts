import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { RoleUser } from 'src/common';
import { AuthException } from 'src/exception';
import { UsersEntity } from 'src/user/entity';
import { UserServices } from 'src/user/user.services';
import { UserJwtPayload } from '../interfaces';

@Injectable()
export class CustomerGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userServices: UserServices,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) AuthException.unauthorized();

    try {
      const payload: UserJwtPayload = await this.jwtService.verifyAsync(token);
      request.body.userId = payload.userId;
      const user: UsersEntity = await this.userServices.findUserByEmail(
        payload.email,
      );
      request.body.userId = payload.userId;
      if (user.role === RoleUser.CUSTOMER) return true;
      return true;
    } catch (e) {
      AuthException.unauthorized();
    }
    return false;
  }
  extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request?.headers['authorization']?.split(' ') ?? [];
    const tokenFromCookies = request?.cookies?.token?.access_token;
    if (type === 'Bearer') return token;
    else if (tokenFromCookies) return tokenFromCookies;
    else return undefined;
  }
}
