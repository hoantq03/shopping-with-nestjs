import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from 'v1/src/common';

export class ReqCreateOrder {
  @IsString()
  @IsOptional({ always: false })
  orderId?: string;

  @IsNumber()
  discount!: number;

  @IsEnum(OrderStatus)
  status!: OrderStatus;

  @IsNumber()
  tax!: number;

  @IsNumber()
  shipCost!: number;

  @IsString()
  shipperId!: string;

  @IsString()
  userId!: string;

  @IsString()
  addressId!: string;
}
