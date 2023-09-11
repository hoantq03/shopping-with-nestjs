import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from 'src/common';

export class ReqCreateOrder {
  @IsString()
  @IsOptional({ always: false })
  id?: string;

  @IsString()
  @IsOptional({ always: false })
  shipper_id?: string;

  @IsString()
  userId!: string;

  @IsString()
  address_id!: string;

  @IsEnum(OrderStatus)
  @IsOptional({ always: false })
  status?: OrderStatus;

  @IsString()
  @IsOptional({ always: false })
  discount_id?: string;
}
