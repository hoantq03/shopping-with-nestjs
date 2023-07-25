import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import { ResCartDto } from 'src/cart/dto';
import { AddressException, CartException, UserException } from 'src/exception';
import { ProductService } from 'src/product/product.service';
import { ResAddressDto, ResUserDto } from 'src/user/dto';
import { AddressEntity } from 'src/user/entity';
import { UserServices } from 'src/user/user.services';
import { Repository } from 'typeorm';
import { ReqCreateOrder } from './dto/create-order/req-create-order.dto';
import { OrderDetailEntity, OrderEntity } from './entity';
import { OrderStatus } from 'src/common';

@Injectable()
export class OrdersService {
  constructor(
    private userServices: UserServices,
    private cartServices: CartService,
    @InjectRepository(OrderEntity)
    private orderRepo: Repository<OrderEntity>,
    private productServices: ProductService,
  ) {}
  async createOrder(orderProps: ReqCreateOrder): Promise<any> {
    // get all product of user from cart
    const user = await this.userServices.findUserById(orderProps.userId);
    if (!user) UserException.userNotFound();

    const cart: ResCartDto = await this.cartServices.getCart(orderProps.userId);
    if (!cart) CartException.cartNotFound();

    const address: AddressEntity = await this.userServices.findAddressById(
      orderProps.addressId,
    );
    if (!address) AddressException.addressNotFound();

    // transfer products from cart to order detail
    const orderId = OrderEntity.createOrderId();
    const order: OrderEntity = {
      id: orderId,
      address: new ResAddressDto(address),
      discount: orderProps.discount,
      amount_total: cart.totalAmount * (1 - orderProps.discount / 100),
      shipCost: orderProps.shipCost,
      status: OrderStatus.ORDERED,
      user: new ResUserDto(user),
      tax: orderProps.tax,
      orderDetails: [],
    };

    await this.orderRepo.save(order);

    const orderDetailsList = this.transferProductFromCartToOrderDetail(
      cart,
      orderProps,
      orderId,
    );

    // delete all product from cart
    cart.cartItems = [];
    // update cart and order
    cart.totalAmount = 0;
    return order;

    // impacts : cart, cartItems,user,order,orderDetail
  }

  async transferProductFromCartToOrderDetail(
    cart: ResCartDto,
    orderProps: ReqCreateOrder,
    orderId: string,
  ): Promise<any> {
    const orderDetailList: any = [];
    cart.cartItems.forEach((cartItem) => {
      orderDetailList.push({
        productId: cartItem.product_id,
        quantity: cartItem.quantity,
      });
    });

    const order: OrderEntity = await this.orderRepo.findOne({
      where: { id: orderId },
    });
    if (!order) console.log('order not exist');
    const orderDetailEntityList: OrderDetailEntity[] = [];
    orderDetailList.forEach((orderDetail) => {
      orderDetailEntityList.push({
        order: order,
        order_id: orderId,
        // rest
      });
    });
    return orderDetailList;
  }
}
