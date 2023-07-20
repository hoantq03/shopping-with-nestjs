import { IsNumber, IsString } from 'class-validator';

export class ReqAddProductToCartDto {
  @IsString()
  productId!: string;

  @IsNumber()
  quantity?: number;

  @IsString()
  userId?: string;
}
