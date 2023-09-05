import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ReqAddProductToCartDto {
  @IsString()
  productId!: string;

  @IsNumber()
  quantity!: number;

  @IsString()
  @IsOptional({ always: false })
  userId?: string;
}
