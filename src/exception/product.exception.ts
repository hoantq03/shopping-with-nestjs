import { HttpException, HttpStatus } from '@nestjs/common';
export class ProductException {
  static ownerNotExist() {
    const res = {
      code: 'THE OWNER DOES NOT EXIST',
      message:
        'the owner does not exist, please enter correct userId and try again !',
    };
    throw new HttpException(res, HttpStatus.BAD_REQUEST);
  }
  static categoryNotExist() {
    const res = {
      code: 'THE CATEGORY DOES NOT EXIST',
      message:
        'the category does not exist, please enter correct userId and try again !',
    };
    throw new HttpException(res, HttpStatus.BAD_REQUEST);
  }
}
