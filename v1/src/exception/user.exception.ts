import { HttpException, HttpStatus } from '@nestjs/common';
export class UserException {
  static userExist() {
    const res = {
      code: 'EMAIL_EXISTED',
      message: 'Email is existed',
    };
    throw new HttpException(res, HttpStatus.BAD_REQUEST);
  }
  static passwordNotMatch() {
    const res = {
      code: 'PASSWORD_NOT_MATCH',
      message: 'Password not match',
    };
    throw new HttpException(res, HttpStatus.BAD_REQUEST);
  }
  static userNotFound() {
    const res = {
      code: 'USER_NOT_FOUND',
      message: 'User Not Found',
    };
    throw new HttpException(res, HttpStatus.BAD_REQUEST);
  }
  static permission() {
    const res = {
      code: 'PERMISSION IS FORBIDDEN',
      message: 'you does not have permission to do this action',
    };
    throw new HttpException(res, HttpStatus.FORBIDDEN);
  }
  static NotEnoughQuantity() {
    const res = {
      code: 'NOT ENOUGH QUANTITY',
      message: 'The quantity in stock of this products not enough',
    };
    throw new HttpException(res, HttpStatus.BAD_REQUEST);
  }
}
