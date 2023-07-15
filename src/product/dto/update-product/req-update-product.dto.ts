import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class ReqUpdateProduct {
  @IsString()
  @IsOptional({ always: false })
  id: string;

  @IsString()
  @IsOptional({ always: false })
  name: string;

  @IsString()
  @IsOptional({ always: false })
  description: string;

  @IsString()
  @IsOptional({ always: false })
  color: string;

  @IsNumber()
  @IsOptional({ always: false })
  discount: number;

  @IsUrl()
  @IsOptional({ always: false })
  imageUrl: string;

  @IsNumber()
  @IsOptional({ always: false })
  price: number;

  @IsNumber()
  @IsOptional({ always: false })
  quantityInStock: number;

  @IsString()
  @IsOptional({ always: false })
  categoryId: string;

  @IsString()
  @IsOptional({ always: false })
  userId: string;
}
