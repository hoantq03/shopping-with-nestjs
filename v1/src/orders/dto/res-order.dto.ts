import { CartEntity } from 'src/cart/entity';
import { OrderStatus } from 'src/common';
import { AddressEntity, UsersEntity } from 'src/user/entity';
import { OrderDetailEntity, ShipperEntity } from '../entity';

export class ResOrderDto {
  order_id: string;
  total_amount: number;
  discount?: number;
  billDate: Date;
  shipDate?: Date;
  status: OrderStatus;
  tax: number;
  shipCost: number;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  shipper: ShipperEntity;
  user: UsersEntity;
  address: AddressEntity;
  orderDetails: OrderDetailEntity[];

  constructor(cartProps: CartEntity, discount?: number) {
    Object.assign(this, {
      total_amount: cartProps.total_amount,
      discount,
      billDate: new Date(),
      status: OrderStatus.ORDERED,
    });
  }
}
