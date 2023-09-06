import { HttpException, HttpStatus } from '@nestjs/common';
export class ServerException {
  static internalServerError() {
    const res = {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'internal server error',
    };
    throw new HttpException(res, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  static ForbiddenException() {
    const res = {
      code: 'Forbidden_Resources',
      message: 'This resource is forbidden',
    };
    throw new HttpException(res, HttpStatus.FORBIDDEN);
  }
}
