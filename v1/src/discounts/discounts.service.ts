import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/user/entity';
import { Repository } from 'typeorm';
import { DiscountsEntity } from './entity/discount.entity';
import {
  AuthException,
  DiscountException,
  ProductException,
} from 'src/exception';
import { ReqCreateDiscountDto } from './dto/create-discount';
import { DiscountStatus, RoleUser } from 'src/common';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(DiscountsEntity)
    private discountRepo: Repository<DiscountsEntity>,
    @InjectRepository(UsersEntity)
    private userRepo: Repository<UsersEntity>,
  ) {}

  async createGlobalDiscount(discountProps: ReqCreateDiscountDto) {
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

    const discountExisted = await this.discountRepo.findOne({
      where: { code },
    });
    if (discountExisted) {
      throw DiscountException.discountExisted();
    }
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

  async disableDiscount(id: string) {
    const discount = await this.discountRepo.findOne({ where: { id } });

    if (!discount) {
      throw DiscountException.discountNotFound();
    }
    discount.status = DiscountStatus.DISABLE;
    await this.discountRepo.save(discount);

    return {
      message: 'disable discount successfully',
      status: 200,
      data: discount,
    };
  }

  async enableDiscount(id: string) {
    const discount = await this.discountRepo.findOne({ where: { id } });

    if (!discount) {
      throw DiscountException.discountNotFound();
    }
    if (discount.end_date < new Date()) {
      discount.status = DiscountStatus.EXPIRED;
      await this.discountRepo.save(discount);
      throw DiscountException.discountExpired();
    }

    discount.status = DiscountStatus.AVAILABLE;
    await this.discountRepo.save(discount);

    return {
      message: 'enable discount successfully',
      status: 200,
      data: discount,
    };
  }
}
