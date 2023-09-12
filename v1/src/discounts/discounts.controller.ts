import {
  Body,
  Controller,
  Post,
  UseGuards,
  Param,
  Put,
  Get,
} from '@nestjs/common';
import { ApiKeyV1 } from 'src/guards/checkApiKey';
import { DiscountsService } from './discounts.service';
import { ReqCreateDiscountDto } from './dto/create-discount';
import { AdminGuard } from 'src/auth/guard';
import { DiscountsEntity } from './entity';

@UseGuards(ApiKeyV1)
@Controller('/apiV1/discounts')
export class DiscountsController {
  constructor(private readonly discountService: DiscountsService) {}

  @UseGuards(AdminGuard)
  @Post('/createGlobalDiscount')
  async createGlobalDiscount(@Body() body: ReqCreateDiscountDto) {
    return this.discountService.createGlobalDiscount(body);
  }

  @UseGuards(AdminGuard)
  @Put('/enableDiscount/:id')
  async enableDiscount(@Param() param: any) {
    const { id } = param;
    return this.discountService.enableDiscount(id);
  }

  @UseGuards(AdminGuard)
  @Put('/disableDiscount/:id')
  async disableDiscount(@Param() param: any) {
    const { id } = param;
    return this.discountService.disableDiscount(id);
  }

  @Get('/getAllDiscounts')
  async getAllDiscounts(): Promise<DiscountsEntity[]> {
    return this.discountService.getAllDiscounts();
  }
}
