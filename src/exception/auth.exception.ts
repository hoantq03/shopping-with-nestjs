import { HttpException, HttpStatus } from '@nestjs/common';
export class AuthException {
  static unauthorized() {
    const res = {
      code: 'UNAUTHORIZED',
      message: 'UNAUTHORIZED',
    };
    throw new HttpException(res, HttpStatus.UNAUTHORIZED);
  }

  static emailNotExist() {
    const res = {
      code: 'Email incorrect',
      message: 'The Email does not exist, please register this email',
    };
    throw new HttpException(res, HttpStatus.BAD_REQUEST);
  }
}
