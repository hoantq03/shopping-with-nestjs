import { Injectable } from '@nestjs/common';
import { ReqCreateOrder } from './dto/create-order/req-create-order.dto';
import { AddressEntity, UsersEntity } from 'src/user/entity';
import { UserServices } from 'src/user/user.services';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import { ResCartDto } from 'src/cart/dto';
import { OrderEntity } from './entity';
import { Repository } from 'typeorm';
import { OrderStatus } from 'src/common';

@Injectable()
export class OrdersService {
  constructor(
    private userServices: UserServices,
    private cartServices: CartService,
    @InjectRepository(UsersEntity)
    private orderRepo: Repository<OrderEntity>,
  ) {}
  async createOrder(orderProps: ReqCreateOrder): Promise<any> {
    // get all product of user from cart
    const user: UsersEntity = await this.userServices.findUserById(
      orderProps.userId,
    );
    const cart: ResCartDto = await this.cartServices.getCart(orderProps.userId);
    // transfer to order detail
    const address: AddressEntity = await this.userServices.findAddressById(
      orderProps.addressId,
    );
    const order: OrderEntity = {
      address: address,
      amount_total: cart.totalAmount,
      discount: orderProps.discount,
      order_id: OrderEntity.createOrderId(),
      shipCost: orderProps.shipCost,
      status: OrderStatus.ORDERED,
      user: user,
      tax: orderProps.tax,
      orderDetails: cart.cartItems,
    };
    await this.orderRepo.save(order);

    // delete all product from cart
    cart.cartItems = [];
    // update cart and order
    cart.totalAmount = 0;
    return order;
  }
}
