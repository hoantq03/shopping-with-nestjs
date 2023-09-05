import { IsEnum } from 'class-validator';
import { UserStatus } from 'v1/src/common';

export class ReqUserStatusDto {
  @IsEnum(UserStatus)
  status: number;
}
