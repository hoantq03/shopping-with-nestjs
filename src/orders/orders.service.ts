import { Injectable } from '@nestjs/common';
import { ReqCreateOrder } from './dto/create-order/req-create-order.dto';
import { AddressEntity, UsersEntity } from 'src/user/entity';
import { UserServices } from 'src/user/user.services';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import { ResCartDto } from 'src/cart/dto';
import { OrderDetailEntity, OrderEntity } from './entity';
import { Repository } from 'typeorm';
import { OrderStatus } from 'src/common';
import { ProductEntity } from 'src/product/entity';
import { ProductService } from 'src/product/product.service';

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
    const user: UsersEntity = await this.userServices.findUserById(
      orderProps.userId,
    );
    const cart: ResCartDto = await this.cartServices.getCart(orderProps.userId);
    const address: AddressEntity = await this.userServices.findAddressById(
      orderProps.addressId,
    );

    // transfer cart to order detail
    console.log(cart);
    // await this.transferProductFromCartToOrderDetail(cart);

    // const order: OrderEntity = {
    //   address: address,
    //   amount_total: cart.totalAmount,
    //   discount: orderProps.discount,
    //   order_id: OrderEntity.createOrderId(),
    //   shipCost: orderProps.shipCost,
    //   status: OrderStatus.ORDERED,
    //   user: user,
    //   tax: orderProps.tax,

    // };
    // await this.orderRepo.save(order);

    // // delete all product from cart
    // cart.cartItems = [];
    // // update cart and order
    // cart.totalAmount = 0;
    // return order;
  }

  async transferProductFromCartToOrderDetail(cart: ResCartDto) {
    console.log(cart);
    const orderDetailList: OrderDetailEntity[] = [];
    cart.cartItems.forEach(async (cartItem) => {
      const product: ProductEntity = await this.productServices.findProductById(
        cartItem.product_id,
      );
      // orderDetailList.push({
      //   order_detail_id: OrderDetailEntity.createOrderDetailId(),
      //   product: product,
      //   product_id: cartItem.product_id,
      //   quantity: cartItem.quantity,
      //   price: product.price,
      //   order :
      // });
    });
  }
}
