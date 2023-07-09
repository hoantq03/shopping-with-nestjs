import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RoleUser, UserStatus } from 'src/common';

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
}
