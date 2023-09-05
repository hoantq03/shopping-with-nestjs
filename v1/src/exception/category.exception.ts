import { HttpException, HttpStatus } from '@nestjs/common';
export class CategoryException {
  static categoryExisted() {
    const res = {
      code: 'CATEGORY IS EXISTED',
      message: 'category is existed, please create another one ',
    };
    throw new HttpException(res, HttpStatus.BAD_REQUEST);
  }
  static categoryNotFound() {
    const res = {
      code: 'CATEGORY IS NOT FOUND',
      message: 'category is not found, please try another one ',
    };
    throw new HttpException(res, HttpStatus.NOT_FOUND);
  }

  static categoryForbidden() {
    const res = {
      code: 'CATEGORY IS FORBIDDEN',
      message:
        'you have no permission to access this category, please try another one ',
    };
    throw new HttpException(res, HttpStatus.NOT_FOUND);
  }

  static categoryContainProducts() {
    const res = {
      code: 'CATEGORY IS CONTAIN PRODUCTS',
      message:
        'category contain products, please delete all products and try again  ',
    };
    throw new HttpException(res, HttpStatus.NOT_FOUND);
  }
}
