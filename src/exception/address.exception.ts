import { HttpException, HttpStatus } from '@nestjs/common';
export class AddressException {
  static addressNotFound() {
    const res = {
      code: 'ADDRESS NOT FOUND',
      message: 'Address not found',
    };
    throw new HttpException(res, HttpStatus.NOT_FOUND);
  }
}
