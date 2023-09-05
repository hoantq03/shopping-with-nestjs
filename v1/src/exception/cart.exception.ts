import { HttpException, HttpStatus } from '@nestjs/common';
export class CartException {
  static cartNotFound() {
    const res = {
      code: 'CART IS NOT FOUND',
      message: 'cart is not found, please try again',
    };
    throw new HttpException(res, HttpStatus.NOT_FOUND);
  }

  static cartItemsNotFound() {
    const res = {
      code: 'CART ITEMS IS NOT FOUND',
      message: 'cart items is not found, please try again',
    };
    throw new HttpException(res, HttpStatus.NOT_FOUND);
  }
}
