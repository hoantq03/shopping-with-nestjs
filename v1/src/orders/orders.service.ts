import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CartService } from '../cart/cart.service';
import { ResCartDto } from '../cart/dto';
import { OrderStatus } from '../common';
import {
  AddressException,
  CartException,
  DiscountException,
  OrderException,
  UserException,
} from '../exception';
import { ProductEntity } from '../product/entity';
import { ProductService } from '../product/product.service';
import { ResUserDto } from '../user/dto';
import {
  AddressEntity,
  DiscountUsedDetailEntity,
  UsersEntity,
} from '../user/entity';
import { UserServices } from '../user/user.services';
import { ReqCreateOrder } from './dto/create-order/req-create-order.dto';
import { OrderDetailEntity, OrderEntity } from './entity';
import { CartDetailEntity } from 'src/cart/entity';
import { DiscountsEntity } from 'src/discounts/entity';

@Injectable()
export class OrdersService {
  constructor(
    private userServices: UserServices,
    private cartServices: CartService,
    @InjectRepository(OrderEntity)
    private orderRepo: Repository<OrderEntity>,
    private productServices: ProductService,
    @InjectRepository(OrderDetailEntity)
    private orderDetailRepo: Repository<OrderDetailEntity>,
    @InjectRepository(CartDetailEntity)
    private cartDetailRepo: Repository<CartDetailEntity>,
    @InjectRepository(DiscountsEntity)
    private discountRepo: Repository<DiscountsEntity>,
    @InjectRepository(DiscountUsedDetailEntity)
    private discountUsedRepo: Repository<DiscountUsedDetailEntity>,
    private dataSource: DataSource,
  ) {}

  async createOrder(orderProps: ReqCreateOrder): Promise<any> {
    const user: UsersEntity = await this.userServices.findUserById(
      orderProps.userId,
    );
    if (!user) UserException.userNotFound();
    user.orders = [];

    // get all product of user from cart
    const cart: ResCartDto = await this.cartServices.getCart(orderProps.userId);
    if (!cart) CartException.cartNotFound();

    const discount = await this.discountRepo.findOne({
      where: { id: orderProps.discount_id },
    });
    if (!discount) {
      throw DiscountException.discountNotFound();
    }
    const address: AddressEntity = await this.userServices.findAddressById(
      orderProps.address_id,
    );
    if (!address) AddressException.addressNotFound();

    // transfer products from cart to order detail
    const orderId: string = OrderEntity.createOrderId();

    const order: OrderEntity = this.orderRepo.create({
      id: orderId,
      bill_date: new Date(),
      status: OrderStatus.PREPARING,
      user: new ResUserDto(user),
      discount,
      address,
    });

    // pre save
    await this.orderRepo.save(order);

    const orderDetailsList: OrderDetailEntity[] =
      await this.transferProductFromCartToOrderDetail(cart, orderId);

    order.orderDetails = orderDetailsList;
    order.status = OrderStatus.ORDERED;
    await this.orderRepo.save(order);

    // // delete all product from cart
    await this.cartDetailRepo.delete({ cart: { id: user.cart.id } });
    return order;
  }

  async transferProductFromCartToOrderDetail(
    cart: ResCartDto,
    orderId: string,
  ): Promise<OrderDetailEntity[]> {
    const orderDetailList: any = [];
    cart.cartDetails.forEach((cartItem) => {
      orderDetailList.push({
        productId: cartItem.product.id,
        quantity: cartItem.quantity,
      });
    });
    const order: OrderEntity = await this.orderRepo.findOne({
      where: { id: orderId },
    });

    if (!order) OrderException.orderNotExist();
    const orderDetailEntityList: OrderDetailEntity[] = [];

    await Promise.all(
      orderDetailList.map(async (orderDetail: any) => {
        const product: ProductEntity =
          await this.productServices.findProductById(orderDetail.productId);

        const orderDetailSave: OrderDetailEntity = {
          id: OrderDetailEntity.createOrderDetailId(),
          order: order,
          price: product.price,
          product: product,
          quantity: orderDetail.quantity,
        };
        orderDetailEntityList.push(orderDetailSave);
        await this.orderDetailRepo.save(orderDetailSave);
      }),
    );
    return orderDetailEntityList;
  }
}
