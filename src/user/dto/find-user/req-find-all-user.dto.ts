import { IsEnum, IsOptional } from 'class-validator';
import { UserStatus } from 'src/common';

export class ReqFindAllUserDto {
  @IsOptional()
  @IsEnum(UserStatus)
  status: number;
}
