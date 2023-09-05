import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { RoleUser, UserStatus } from 'v1/src/common';

export class ReqUpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(8, { always: false })
  password?: string;

  @IsOptional()
  @MinLength(8, { always: false })
  confirmPassword?: string;

  @IsOptional()
  @MinLength(2, { always: false })
  firstName?: string;

  @IsOptional()
  @MinLength(2, { always: false })
  lastName?: string;

  @IsEnum(RoleUser)
  role: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  @IsEnum(UserStatus)
  status: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthday?: Date;

  @IsString()
  @IsOptional({ always: false })
  userId?: string;
}
