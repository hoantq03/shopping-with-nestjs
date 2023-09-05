import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { RoleUser } from 'v1/src/common';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @MinLength(8)
  confirmPassword: string;

  @IsNotEmpty()
  @MinLength(2)
  firstName: string;

  @IsNotEmpty()
  @MinLength(2)
  lastName: string;

  @IsEnum(RoleUser)
  role: string;

  @IsNotEmpty()
  phone: string;

  @IsDate()
  @Type(() => Date)
  birthday: Date;
}
