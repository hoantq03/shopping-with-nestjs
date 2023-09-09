import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { OrderStatus } from 'src/common';

export class ReqCreateOrder {
  @IsString()
  @IsOptional({ always: false })
  orderId?: string;

  @IsNumber()
  @Min(0)
  discount!: number;

  @IsEnum(OrderStatus)
  status!: OrderStatus;

  @IsNumber()
  @Min(0)
  tax!: number;

  @IsNumber()
  @Min(0)
  shipCost!: number;

  @IsString()
  shipperId!: string;

  @IsString()
  userId!: string;

  @IsString()
  addressId!: string;
}
