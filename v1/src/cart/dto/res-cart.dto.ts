import { CartDetailEntity } from '../entity';

export class ResCartDto {
  userId: string;
  totalAmount: number;
  cartDetails: CartDetailEntity[];
}
