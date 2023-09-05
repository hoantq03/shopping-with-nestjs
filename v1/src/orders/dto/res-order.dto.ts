import { CartEntity } from 'v1/src/cart/entity';
import { OrderStatus } from 'v1/src/common';
import { AddressEntity, UsersEntity } from 'v1/src/user/entity';
import { OrderDetailEntity, ShipperEntity } from '../entity';

export class ResOrderDto {
  order_id: string;
  amount_total: number;
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
      amount_total: cartProps.amount_total,
      discount,
      billDate: new Date(),
      status: OrderStatus.ORDERED,
    });
  }
}
