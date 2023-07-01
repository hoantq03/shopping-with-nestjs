import { IsEnum } from 'class-validator';
import { UserStatus } from 'src/common';

export class ReqUserStatusDto {
  @IsEnum(UserStatus)
  status: number;
}
