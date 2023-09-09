import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CartException, ProductException, UserException } from '../exception';
import { ProductEntity } from '../product/entity';
import { ProductService } from '../product/product.service';
import { UsersEntity } from '../user/entity';
import { UserServices } from '../user/user.services';
import { ReqAddProductToCartDto, ResCartDto } from './dto';
import { CartEntity } from './entity';

@Injectable()
export class CartService {
  constructor(
    private userServices: UserServices,
    private productServices: ProductService,
    @InjectRepository(CartEntity)
    private cartRepo: Repository<CartEntity>,
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
  ) {}

  //   async addProductToCart(props: ReqAddProductToCartDto): Promise<object> {
  //     const product: ProductEntity = await this.productServices.findProductById(
  //       props.productId,
  //     );
  //     if (!product) ProductException.productNotFound();
  //     // if (props.quantity > product.stock) UserException.NotEnoughQuantity();

  //     const user: UsersEntity = await this.userServices.findUserById(
  //       props.userId,
  //     );
  //     if (!user) UserException.userNotFound();

  //     const cartItems: CartItemsEntity[] = await this.cartItemsRepo.find({
  //       where: { cart: { id: user.cart.id } },
  //       relations: ['product'],
  //     });

  //     const cart: CartEntity = await this.cartRepo.findOne({
  //       where: { id: user.cart.id },
  //     });
  //     if (!cart) CartException.cartNotFound();

  //     const item: CartItemsEntity = cartItems.find((cartItem) => {
  //       return String(cartItem?.product?.id) == String(props.productId);
  //     });
  //     let cartItemSave: CartItemsEntity;
  //     if (item) {
  //       item.quantity += props.quantity;
  //       item.total_amount = item.quantity * product.price;
  //       await this.cartItemsRepo.save(item);
  //       // product.stock -= props.quantity;
  //     } else {
  //       cartItemSave = {
  //         id: CartEntity.createCartId(),
  //         cart: cart,
  //         product: product,
  //         total_amount: product.price * props.quantity,
  //         quantity: props.quantity,
  //       };
  //       await this.cartItemsRepo.save(cartItemSave);
  //       // product.stock -= props.quantity;
  //     }

  //     await this.productRepo.save(product);
  //     await this.cartRepo.save(cart);

  //     return {
  //       message: 'add product to cart successfully',
  //       status: 200,
  //     };
  //   }

  //   async getCart(userId: string): Promise<ResCartDto> {
  //     const user: UsersEntity = await this.userServices.findUserById(userId);
  //     const cartItems: CartItemsEntity[] = await this.cartItemsRepo.find({
  //       where: { cart: { id: user.cart.id } },
  //       relations: ['product'],
  //     });
  //     let totalAmount = 0;
  //     cartItems.forEach((cartItem) => {
  //       totalAmount += +cartItem.total_amount;
  //     });

  //     const cart: ResCartDto = {
  //       userId: userId,
  //       cartDetails: cartItems,
  //       totalAmount: totalAmount,
  //     };
  //     return cart;
  //   }

  //   async removeProductFromCart(
  //     userId: string,
  //     productId: string,
  //   ): Promise<object> {
  //     const user: UsersEntity = await this.userServices.findUserById(userId);
  //     const cartItem: CartItemsEntity = await this.cartItemsRepo.findOne({
  //       where: { product: { id: productId }, cart: { id: user.cart.id } },
  //     });
  //     if (!cartItem) CartException.cartNotFound();

  //     const product: ProductEntity = await this.productServices.findProductById(
  //       productId,
  //     );
  //     if (!product) ProductException.productNotFound();

  //     await this.cartItemsRepo.remove(cartItem);

  //     product.stock = +product.stock + +cartItem.quantity;
  //     await this.productRepo.save(product);
  //     return {
  //       message: 'remove product in cart successfully',
  //       status: 200,
  //     };
  //   }
}
