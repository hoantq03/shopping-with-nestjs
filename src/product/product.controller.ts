import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
@Controller('products')
export class ProductController {
  constructor(private productServices: ProductService) {}

  @Get('/get-all-products')
  async getAllProducts() {
    // return this.productServices.getAllProducts();
  }
}
