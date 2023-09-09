import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ReqAddAddress {
  @IsString()
  @IsOptional({ always: false })
  id: string;

  @IsString()
  @IsNotEmpty()
  addressLine: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsNotEmpty()
  ward: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsOptional({ always: false })
  userId: string;
}
