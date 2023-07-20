import { CartItemsEntity } from '../entity';

export class ResCartDto {
  userId: string;
  totalAmount: number;
  cartItems: CartItemsEntity[];
}
