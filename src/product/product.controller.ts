import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminGuard } from 'src/guard';
import { AuthGuard } from 'src/guard/auth.guard';
import { ReqAddCategory, ReqAddProduct } from './dto';
import { ProductService } from './product.service';
import { ResCategoryDto } from './dto/resCategory.dto';
import { ResProduct } from './dto/resProducts.dto';
@Controller('products')
export class ProductController {
  constructor(private productServices: ProductService) {}

  @UseGuards(AuthGuard)
  @Post('/add-product')
  async addProduct(@Body() productInfo: ReqAddProduct): Promise<ResProduct> {
    return this.productServices.addProduct(productInfo);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Post('/add-category')
  async addCategory(
    @Body() categoryInfo: ReqAddCategory,
  ): Promise<ResCategoryDto> {
    return this.productServices.addCategory(categoryInfo);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Delete('/delete-category/:categoryId')
  async deleteCategory(@Param() param) {
    const { categoryId } = param;
    return this.productServices.deleteCategory(categoryId);
  }

  // this route is for test, not in production
  @Get('/get-all-category')
  async getAllCategory(): Promise<ResCategoryDto[]> {
    return this.productServices.getAllCategory();
  }
}
