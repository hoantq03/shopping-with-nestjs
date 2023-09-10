import { Injectable, UseGuards } from '@nestjs/common';
import { ReqCreateDiscountDto } from './dto/create-discount';
import { DiscountsEntity } from './entity/discount.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminGuard } from 'src/auth/guard';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(DiscountsEntity)
    private discountRepo: Repository<DiscountsEntity>,
  ) {}

  @UseGuards(AdminGuard)
  createGlobalDiscount(discountProps: ReqCreateDiscountDto) {
    const {
      code,
      description,
      end_date,
      id,
      name,
      number_of_use,
      status,
      type,
      userId,
      min_order_value,
      start_date,
    } = discountProps;

    this.discountRepo.create({
      code,
    });
  }
}
