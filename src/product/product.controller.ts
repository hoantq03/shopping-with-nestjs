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
import { AdminGuard, ShopGuard } from 'src/guard';
import {
  ReqAddCategory,
  ReqAddProduct,
  ReqUpdateProduct,
  ResCategoryDto,
  ResProductDto,
} from './dto';
import { ProductService } from './product.service';
@Controller('products')
export class ProductController {
  constructor(private productServices: ProductService) {}

  @UseGuards(ShopGuard)
  @Post('/add-product')
  async addProduct(@Body() productInfo: ReqAddProduct): Promise<ResProductDto> {
    return this.productServices.addProduct(productInfo);
  }

  @Get('/get-all-products')
  async getAllProducts(@Query() query): Promise<ResProductDto[]> {
    const page = query.page ?? 0;
    return this.productServices.getAllProducts(page);
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

  @UseGuards(AdminGuard)
  @Post('/add-category')
  async addCategory(
    @Body() categoryInfo: ReqAddCategory,
  ): Promise<ResCategoryDto> {
    return this.productServices.addCategory(categoryInfo);
  }

  @UseGuards(AdminGuard)
  @Delete('/delete-category/:categoryId')
  async deleteCategory(@Param() param: any): Promise<object> {
    const { categoryId } = param;
    return this.productServices.deleteCategory(categoryId);
  }

  // this route is for test, not in production
  @Get('/get-all-category')
  async getAllCategory(): Promise<ResCategoryDto[]> {
    return this.productServices.getAllCategory();
  }
}
