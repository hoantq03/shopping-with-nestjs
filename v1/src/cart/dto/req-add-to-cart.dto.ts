import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class ReqAddProductToCartDto {
  @IsString()
  productId!: string;

  @IsNumber()
  @Min(0)
  quantity!: number;

  @IsString()
  @IsOptional({ always: false })
  userId?: string;
}
