import { IsEmail } from 'class-validator';

export class ReqFindUserByEmailDto {
  @IsEmail()
  email: string;
}
