import { IsEnum, IsOptional } from 'class-validator';
import { UserStatus } from 'v1/src/common';

export class ReqFindAllUserDto {
  @IsOptional()
  @IsEnum(UserStatus)
  status: number;
}
