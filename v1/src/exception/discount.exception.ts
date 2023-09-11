import { HttpException, HttpStatus } from '@nestjs/common';

export class DiscountException {
  static discountExisted() {
    const res = {
      code: 'DISCOUNT IS EXISTED',
      message: 'discount is existed, please create another one ',
    };
    throw new HttpException(res, HttpStatus.BAD_REQUEST);
  }
  static discountNotFound() {
    const res = {
      code: 'DISCOUNT NOT  FOUND',
      message: 'discount not found, please try another one ',
    };
    throw new HttpException(res, HttpStatus.NOT_FOUND);
  }
  static discountExpired() {
    const res = {
      code: 'DISCOUNT EXPIRED',
      message: 'discount EXPIRED, please try another one ',
    };
    throw new HttpException(res, HttpStatus.BAD_REQUEST);
  }
}
