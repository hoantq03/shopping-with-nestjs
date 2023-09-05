import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class ReqAddProduct {
  @IsString()
  @IsOptional({ always: false })
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  color: string;

  @IsNumber()
  discount: number;

  @IsUrl()
  imageUrl: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsString()
  categoryId: string;

  @IsString()
  userId: string;
}
