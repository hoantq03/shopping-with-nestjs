import { HttpException, HttpStatus } from '@nestjs/common';
export class OrderException {
  static orderNotExist() {
    const res = {
      code: 'ORDER NOT EXIST',
      message: 'order not exist',
    };
    throw new HttpException(res, HttpStatus.NOT_FOUND);
  }
}
