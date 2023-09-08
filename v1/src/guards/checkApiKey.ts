import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ServerException } from 'src/exception';
@Injectable()
export class ApiKeyV1 implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey && apiKey !== process.env.API_V1_KEY) {
      throw ServerException.ForbiddenException();
    }

    return true;
  }
}
