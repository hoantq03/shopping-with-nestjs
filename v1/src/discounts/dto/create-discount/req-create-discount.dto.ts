import { Type } from 'class-transformer';
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
  @Type(() => Date)
  @MinDate(new Date())
  end_date!: Date;

  @IsNumber()
  @Min(0)
  number_of_use!: number;

  @IsNumber()
  @Min(0)
  value!: number;

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
