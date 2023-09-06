import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { RoleUser } from 'src/common';
import { AuthException } from 'src/exception';
import { UsersEntity } from 'src/user/entity';
import { UserServices } from 'src/user/user.services';
import { UserJwtPayload } from '../interfaces';

@Injectable()
export class AdminGuard extends AuthGuard('jwt') {
  constructor(
    private jwtService: JwtService,
    private userServices: UserServices,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) AuthException.unauthorized();
    try {
      const payLoad: UserJwtPayload = await this.jwtService.verifyAsync(token);
      const user: UsersEntity = await this.userServices.findUserByEmail(
        payLoad.email,
      );
      request.body.userId = payLoad.userId;
      if (user.role === RoleUser.ADMIN) return true;
    } catch (e) {
      throw new Error(`Invalid Token ${JSON.stringify({ message: e })}`);
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
