import { CartDetailEntity } from '../entity';

export class ResCartDto {
  userId: string;
  total_amount: number;
  cartDetails: CartDetailEntity[];
}
