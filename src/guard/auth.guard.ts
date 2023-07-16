import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthException } from 'src/exception';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) AuthException.unauthorized();

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request.body.userId = payload.userId;
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
