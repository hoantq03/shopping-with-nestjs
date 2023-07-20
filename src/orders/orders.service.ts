import { Injectable } from '@nestjs/common';
import { ReqCreateOrder } from './dto/create-order/req-create-order.dto';
import { UsersEntity } from 'src/user/entity';
import { UserServices } from 'src/user/user.services';
import { CartItemsEntity } from 'src/cart/entity';

@Injectable()
export class OrdersService {
  constructor(private userServices: UserServices) {}
  async createOrder(orderProps: ReqCreateOrder): Promise<any> {
    // get all product of user from cart
    const user: UsersEntity = await this.userServices.findUserById(
      orderProps.userId,
    );
    console.log(user);
    // transfer to order detail
    // delete all product from cart
    // update cart and order
  }
}
