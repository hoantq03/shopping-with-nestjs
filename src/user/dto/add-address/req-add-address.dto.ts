import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ReqAddAddress {
  @IsString()
  @IsOptional({ always: false })
  id: string;

  @IsString()
  @IsNotEmpty()
  address_line: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  postal_code: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsOptional({ always: false })
  userId: string;
}
