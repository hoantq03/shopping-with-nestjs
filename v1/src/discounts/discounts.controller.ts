import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  UseGuards,
  Body,
} from '@nestjs/common';
import { ApiKeyV1 } from 'src/guards/checkApiKey';
import { ReqCreateDiscountDto } from './dto/create-discount';
import { DiscountsService } from './discounts.service';

@UseGuards(ApiKeyV1)
@Controller('/apiV1/discounts')
export class DiscountsController {
  constructor(private readonly discountService: DiscountsService) {}

  @Post('/createDiscount')
  async createDiscount(@Body() body: ReqCreateDiscountDto) {
    return this.discountService.createDiscount();
  }
}
