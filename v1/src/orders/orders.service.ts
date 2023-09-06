import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CartService } from '../cart/cart.service';
import { ResCartDto } from '../cart/dto';
import { CartItemsEntity } from '../cart/entity';
import { OrderStatus } from '../common';
import {
  AddressException,
  CartException,
  OrderException,
  UserException,
} from '../exception';
import { ProductEntity } from '../product/entity';
import { ProductService } from '../product/product.service';
import { ResUserDto } from '../user/dto';
import { AddressEntity, UsersEntity } from '../user/entity';
import { UserServices } from '../user/user.services';
import { ReqCreateOrder } from './dto/create-order/req-create-order.dto';
import { OrderDetailEntity, OrderEntity } from './entity';

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
    @InjectRepository(CartItemsEntity)
    private cartItemsRepo: Repository<CartItemsEntity>,
    private dataSource: DataSource,
  ) {}
  async createOrder(orderProps: ReqCreateOrder): Promise<any> {
    // get all product of user from cart
    const user: UsersEntity = await this.userServices.findUserById(
      orderProps.userId,
    );
    if (!user) UserException.userNotFound();
    user.orders = [];

    const cart: ResCartDto = await this.cartServices.getCart(orderProps.userId);
    if (!cart) CartException.cartNotFound();

    const address: AddressEntity = await this.userServices.findAddressById(
      orderProps.addressId,
    );
    if (!address) AddressException.addressNotFound();

    // transfer products from cart to order detail
    const orderId: string = OrderEntity.createOrderId();

    const order: OrderEntity = this.orderRepo.create({
      id: orderId,
      discount: orderProps.discount,
      amount_total: cart.totalAmount * (1 - orderProps.discount / 100),
      shipCost: orderProps.shipCost,
      status: OrderStatus.ORDERED,
      user: new ResUserDto(user),
      tax: orderProps.tax,
      orderDetails: [],
    });

    await this.orderRepo.save(order);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const orderDetailsList: OrderDetailEntity[] =
        await this.transferProductFromCartToOrderDetail(cart, orderId);

      order.orderDetails = orderDetailsList;

      await queryRunner.manager.save(order);

      // // delete all product from cart
      await this.cartItemsRepo.delete({ cart: { id: user.cart.id } });

      await queryRunner.commitTransaction();
      return order;
    } catch (err) {
      await this.orderRepo.remove(order);
      await queryRunner.rollbackTransaction();
      console.log(err);
    } finally {
      await queryRunner.release();
    }
  }

  async transferProductFromCartToOrderDetail(
    cart: ResCartDto,
    orderId: string,
  ): Promise<OrderDetailEntity[]> {
    const orderDetailList: any = [];
    cart.cartItems.forEach((cartItem) => {
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