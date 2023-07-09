import { HttpException, HttpStatus } from '@nestjs/common';
export class AuthException {
  static unauthorized() {
    const res = {
      code: 'UNAUTHORIZED',
      message: 'UNAUTHORIZED',
    };
    throw new HttpException(res, HttpStatus.UNAUTHORIZED);
  }
}
