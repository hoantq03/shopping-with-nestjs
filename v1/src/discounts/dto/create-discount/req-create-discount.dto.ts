import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinDate,
} from 'class-validator';
import { DiscountStatus, DiscountType } from 'src/common';

export class ReqCreateDiscountDto {
  @IsString()
  @IsOptional({ always: false })
  id!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsEnum(DiscountType)
  @IsNotEmpty()
  type!: DiscountType;

  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsDate()
  @IsOptional({ always: false })
  start_date?: Date;

  @IsDate()
  @MinDate(new Date())
  end_date!: Date;

  @IsNumber()
  @Min(0)
  number_od_use!: number;

  @IsOptional({ always: false })
  @IsNumber()
  @Min(0)
  min_order_value?: number;

  @IsEnum(DiscountStatus)
  @IsNotEmpty()
  status!: DiscountStatus;

  @IsString()
  userId!: string;
}
