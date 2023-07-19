import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { CustomerGuard } from 'src/guard';
import { CartService } from './cart.service';
import { ReqAddProductToCartDto } from './dto';

@Controller('cart')
export class CartController {
  constructor(private cartServices: CartService) {}

  // add to cart
  @UseGuards(CustomerGuard)
  @Post('/addToCart')
  addProductToCart(@Body() body: any) {
    return this.cartServices.addProductToCart(body);
  }

  // delete from cart
}
