import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class ReqAddProduct {
  @IsString()
  @IsOptional({ always: false })
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsUrl()
  imageUrl: string;

  @IsNumber()
  price: number;

  @IsString()
  userId: string;
}
