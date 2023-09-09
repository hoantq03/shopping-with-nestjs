import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiKeyV1 } from 'src/guards/checkApiKey';
import { CartService } from './cart.service';
import { CustomerGuard } from 'src/auth/guard';
import { ReqAddProductToCartDto } from './dto';
@UseGuards(ApiKeyV1)
@Controller('/apiV1/cart')
export class CartController {
  constructor(private cartServices: CartService) {}

  //add to cart
  @UseGuards(CustomerGuard)
  @Post('/addToCart')
  addProductToCart(@Body() body: ReqAddProductToCartDto) {
    return this.cartServices.addProductToCart(body);
  }

  @UseGuards(CustomerGuard)
  @Get('/getCart')
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
