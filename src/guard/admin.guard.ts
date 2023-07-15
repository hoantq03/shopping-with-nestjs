import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthException } from 'src/exception';
import { UsersEntity } from 'src/user/entity';
import { UserServices } from 'src/user/user.services';
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userServices: UserServices,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) AuthException.unauthorized();
    try {
      const payLoad = await this.jwtService.verifyAsync(token);
      const user: UsersEntity = await this.userServices.findUserByEmail(
        payLoad.email,
      );
      request.body.userId = payLoad.userId;
      console.log(payLoad);
      if (user.role === 'admin') return true;
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
