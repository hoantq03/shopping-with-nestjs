import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { CustomerGuard } from 'src/auth/guard';
import { CartService } from './cart.service';
import { ReqAddProductToCartDto } from './dto';

@Controller('cart')
export class CartController {
  constructor(private cartServices: CartService) {}

  // add to cart
  @UseGuards(CustomerGuard)
  @Post('/addToCart')
  addProductToCart(@Body() body: ReqAddProductToCartDto) {
    return this.cartServices.addProductToCart(body);
  }

  @UseGuards(CustomerGuard)
  @Get('getCart')
  getCart(@Body() body: any) {
    const { userId } = body;
    return this.cartServices.getCart(userId);
  }

  // delete from cart
  @UseGuards(CustomerGuard)
  @Delete('/:productId')
  async removeProductFromCart(@Body() body: any, @Param() param: any) {
    const { productId } = param;
    const { userId } = body;
    return this.cartServices.removeProductFromCart(userId, productId);
  }
}
