import { Injectable } from '@nestjs/common';
import { ReqCreateDiscountDto } from './dto/create-discount';
import { DiscountsEntity } from './entity/discount.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(DiscountsEntity)
    private discountRepo: Repository<DiscountsEntity>,
  ) {}

  createDiscount(discountProps: ReqCreateDiscountDto) {
    const {
      code,
      description,
      end_date,
      id,
      name,
      number_od_use,
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
