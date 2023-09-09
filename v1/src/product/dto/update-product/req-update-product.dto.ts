import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class ReqUpdateProduct {
  @IsNotEmpty()
  @IsOptional({ always: false })
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsOptional({ always: false })
  @IsString()
  description!: string;

  @IsOptional({ always: false })
  @IsUrl()
  imageUrl!: string;

  @IsNumber()
  @IsOptional({ always: false })
  @Min(0)
  price!: number;

  @IsNotEmpty()
  @IsOptional({ always: false })
  @IsString()
  userId!: string;

  @IsNotEmpty()
  @IsOptional({ always: false })
  @IsString()
  type!: string;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional({ always: false })
  @Min(0)
  stock!: number;

  @IsNotEmpty()
  @IsOptional({ always: false })
  @IsString()
  location!: string;

  @IsNotEmpty()
  @IsOptional({ always: false })
  @IsString()
  brand!: string;

  @IsNumber()
  @IsOptional({ always: false })
  @Min(0)
  high!: number;

  @IsNumber()
  @IsOptional({ always: false })
  @Min(0)
  long!: number;

  @IsNumber()
  @IsOptional({ always: false })
  @Min(0)
  wide!: number;

  @IsNumber()
  @IsOptional({ always: false })
  @Min(0)
  weight!: number;

  @IsNumber()
  @IsOptional({ always: false })
  @Min(0)
  warranty!: number;

  @IsNotEmpty()
  @IsOptional({ always: false })
  @IsString()
  warranty_type!: string;
}
