import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard, ShopGuard } from '../auth/guard';
import {
  ReqAddCategory,
  ReqAddProduct,
  ReqUpdateProduct,
  ResProductDto,
} from './dto';
import { ProductService } from './product.service';
import { ApiKeyV1 } from 'src/guards/checkApiKey';

@UseGuards(ApiKeyV1)
@Controller('apiV1/products')
export class ProductController {
  constructor(private productServices: ProductService) {}

  @UseGuards(ShopGuard)
  @Post('/add-product')
  async addProduct(@Body() productInfo: ReqAddProduct) {
    return this.productServices.addProduct(productInfo);
  }

  @UseGuards(ShopGuard)
  @Put('/update-product/:id')
  async updateProduct(
    @Body() productProps: ReqUpdateProduct,
    @Param() param: any,
  ): Promise<ResProductDto> {
    const { id } = param;
    return this.productServices.updateProduct(productProps, id);
  }

  @Get('/get-all-products')
  async getAllProductsWithCategory(
    @Query() query: any,
  ): Promise<ResProductDto[]> {
    const page = query.page ?? 0;
    return this.productServices.getAllProducts(page);
  }

  @Get('/get-product/:productId')
  async getOneProduct(@Param() param: any): Promise<ResProductDto> {
    const { productId } = param;
    return this.productServices.getOneProduct(productId);
  }

  // // this route is for test, not in production
  @Get('/getAllCategory')
  async getAllCategory() {
    return this.productServices.getAllCategory();
  }
}
