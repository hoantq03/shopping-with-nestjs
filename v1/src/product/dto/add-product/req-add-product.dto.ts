import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class ReqAddProduct {
  @IsString()
  @IsOptional({ always: false })
  id: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsUrl()
  imageUrl!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsNotEmpty()
  @IsString()
  userId!: string;

  @IsNotEmpty()
  @IsString()
  type!: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock!: number;

  @IsNotEmpty()
  @IsString()
  location!: string;

  @IsNotEmpty()
  @IsString()
  brand!: string;

  @IsNumber()
  @Min(0)
  high!: number;

  @IsNumber()
  @Min(0)
  long!: number;

  @IsNumber()
  @Min(0)
  wide!: number;

  @IsNumber()
  @Min(0)
  weight!: number;

  @IsNumber()
  @Min(0)
  warranty!: number;

  @IsNotEmpty()
  @IsString()
  warranty_type!: string;
}
