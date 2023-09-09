import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { ProductEntity } from '../product/entity';
import { ProductService } from '../product/product.service';
import { UserServices } from '../user/user.services';
import { CartDetailEntity, CartEntity } from './entity';
import { ReqAddProductToCartDto, ResCartDto } from './dto';
import { CartException, ProductException, UserException } from 'src/exception';
import { UsersEntity } from 'src/user/entity';

@Injectable()
export class CartService {
  constructor(
    private userServices: UserServices,
    private productServices: ProductService,
    @InjectRepository(CartEntity)
    private cartRepo: Repository<CartEntity>,
    @InjectRepository(CartDetailEntity)
    private cartDetailRepo: Repository<CartDetailEntity>,
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
  ) {}

  async addProductToCart(props: ReqAddProductToCartDto) {
    const { productId, quantity, userId } = props;

    const product: ProductEntity = await this.productServices.findProductById(
      productId,
    );
    if (!product) ProductException.productNotFound();
    if (quantity > product.inventory.stock) UserException.NotEnoughQuantity();

    const user: UsersEntity = await this.userServices.findUserById(userId);
    if (!user) UserException.userNotFound();

    const cartDetails: CartDetailEntity[] = await this.cartDetailRepo.find({
      where: { cart: { id: user.cart.id } },
      relations: ['product'],
    });

    const cart: CartEntity = await this.cartRepo.findOne({
      where: { id: user.cart.id },
    });
    if (!cart) CartException.cartNotFound();

    const item: CartDetailEntity = cartDetails.find((cartItem) => {
      return String(cartItem?.product?.id) == String(props.productId);
    });
    let cartItemSave: CartDetailEntity;
    if (item) {
      item.quantity += props.quantity;
      item.total_amount = item.quantity * product.price;
      await this.cartDetailRepo.save(item);
      product.inventory.stock -= props.quantity;
    } else {
      cartItemSave = {
        id: CartEntity.createCartId(),
        cart: cart,
        product: product,
        total_amount: product.price * props.quantity,
        quantity: props.quantity,
      };
      await this.cartDetailRepo.save(cartItemSave);
      product.inventory.stock -= props.quantity;
    }
    await this.productRepo.save(product);
    await this.cartRepo.save(cart);

    return {
      message: 'add product to cart successfully',
      status: 200,
    };
  }

  async getCart(userId: string): Promise<ResCartDto> {
    const user: UsersEntity = await this.userServices.findUserById(userId);
    const cartItems: CartDetailEntity[] = await this.cartDetailRepo.find({
      where: { cart: { id: user.cart.id } },
      relations: ['product'],
    });
    let totalAmount = 0;
    cartItems.forEach((cartItem) => {
      totalAmount += +cartItem.total_amount;
    });

    const cart: ResCartDto = {
      userId: userId,
      cartDetails: cartItems,
      totalAmount: totalAmount,
    };
    return cart;
  }

  async removeProductFromCart(
    userId: string,
    productId: string,
  ): Promise<object> {
    const user: UsersEntity = await this.userServices.findUserById(userId);
    const cartItem: CartDetailEntity = await this.cartDetailRepo.findOne({
      where: { product: { id: productId }, cart: { id: user.cart.id } },
    });
    if (!cartItem) CartException.cartNotFound();

    const product: ProductEntity = await this.productServices.findProductById(
      productId,
    );
    if (!product) ProductException.productNotFound();

    await this.cartDetailRepo.remove(cartItem);

    product.inventory.stock = +product.inventory.stock + +cartItem.quantity;
    await this.productRepo.save(product);
    return {
      message: 'remove product in cart successfully',
      status: 200,
    };
  }
}
