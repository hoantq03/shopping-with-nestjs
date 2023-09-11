import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/user/entity';
import { Repository } from 'typeorm';
import { DiscountsEntity } from './entity/discount.entity';
import { AuthException } from 'src/exception';
import { ReqCreateDiscountDto } from './dto/create-discount';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(DiscountsEntity)
    private discountRepo: Repository<DiscountsEntity>,
    @InjectRepository(UsersEntity)
    private userRepo: Repository<UsersEntity>,
  ) {}

  async createDiscount(discountProps: ReqCreateDiscountDto) {
    const {
      code,
      description,
      end_date,
      name,
      number_of_use,
      status,
      type,
      userId,
      min_order_value,
      start_date,
      value,
    } = discountProps;

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw AuthException.unauthorized();
    }

    const id = DiscountsEntity.createDiscountId();
    const discount = this.discountRepo.create({
      id,
      name,
      description,
      type,
      value,
      code,
      start_date,
      end_date,
      number_of_use,
      min_order_value,
      status,
      user,
    });

    await this.discountRepo.save(discount);

    return discount;
  }
}
