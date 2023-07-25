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

  static productExisted() {
    const res = {
      code: 'THE PRODUCT IS EXISTED',
      message: 'the product is existed,please try another one !',
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
  static productNotFound() {
    const res = {
      code: 'PRODUCT NOT FOUND',
      message: 'the product not found, please try again !',
    };
    throw new HttpException(res, HttpStatus.NOT_FOUND);
  }
}
