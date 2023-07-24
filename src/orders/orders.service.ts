import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import { ResCartDto } from 'src/cart/dto';
import { ProductService } from 'src/product/product.service';
import { AddressEntity, UsersEntity } from 'src/user/entity';
import { UserServices } from 'src/user/user.services';
import { Repository } from 'typeorm';
import { ReqCreateOrder } from './dto/create-order/req-create-order.dto';
import { OrderEntity } from './entity';
import { OrderStatus } from 'src/common';
import { ResAddressDto, ResUserDto } from 'src/user/dto';
import { AddressException, CartException, UserException } from 'src/exception';

@Injectable()
export class OrdersService {
  constructor(
    private userServices: UserServices,
    private cartServices: CartService,
    @InjectRepository(UsersEntity)
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
      order_id: orderId,
      address: new ResAddressDto(address),
      discount: orderProps.discount,
      amount_total: cart.totalAmount * (1 - orderProps.discount / 100),
      shipCost: orderProps.shipCost,
      status: OrderStatus.ORDERED,
      user: new ResUserDto(user),
      tax: orderProps.tax,
      orderDetails: [],
    };

    console.log(order);
    await this.orderRepo.save(order);

    // await this.transferProductFromCartToOrderDetail(cart, orderProps, orderId);
    // // delete all product from cart
    // cart.cartItems = [];
    // // update cart and order
    // cart.totalAmount = 0;
    // return order;
  }

  async transferProductFromCartToOrderDetail(
    cart: ResCartDto,
    orderProps: ReqCreateOrder,
    orderId: string,
  ) {
    console.log(orderId);
    // console.log(orderProps);
    // const orderDetailList: OrderDetailEntity[] = [];
    // cart.cartItems.forEach(async (cartItem) => {
    //   const product: ProductEntity = await this.productServices.findProductById(
    //     cartItem.product_id,
    //   );
    //   orderDetailList.push({
    //     discount: orderProps.discount,
    //   });
    // });
  }
}
