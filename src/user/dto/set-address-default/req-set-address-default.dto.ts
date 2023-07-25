import { IsString } from 'class-validator';

export class ReqSetAddressDefault {
  @IsString()
  userId: string;

  @IsString()
  addressId: string;
}
