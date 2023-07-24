import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartException, ProductException, UserException } from 'src/exception';
import { ProductEntity } from 'src/product/entity/product.entity';
import { ProductService } from 'src/product/product.service';
import { UsersEntity } from 'src/user/entity';
import { UserServices } from 'src/user/user.services';
import { Repository } from 'typeorm';
import { ReqAddProductToCartDto, ResCartDto } from './dto';
import { CartEntity, CartItemsEntity } from './entity';

@Injectable()
export class CartService {
  constructor(
    private userServices: UserServices,
    private productServices: ProductService,
    @InjectRepository(CartEntity)
    private cartRepo: Repository<CartEntity>,
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
    @InjectRepository(CartItemsEntity)
    private cartItemsRepo: Repository<CartItemsEntity>,
  ) {}

  async addProductToCart(props: ReqAddProductToCartDto): Promise<object> {
    const product: ProductEntity = await this.productServices.findProductById(
      props.productId,
    );
    if (!product) ProductException.productNotFound();
    if (props.quantity > product.stock) UserException.NotEnoughQuantity();

    const user: UsersEntity = await this.userServices.findUserById(
      props.userId,
    );
    if (!user) UserException.userNotFound();

    const cartItems: CartItemsEntity[] = await this.cartItemsRepo.find({
      where: { cart_id: user.cart.cart_id },
    });

    const cart: CartEntity = await this.cartRepo.findOne({
      where: { cart_id: user.cart.cart_id },
    });
    if (!cart) CartException.cartNotFound();

    const item: CartItemsEntity = cartItems.find((cartItem) => {
      return String(cartItem?.product_id) == String(props.productId);
    });

    let cartItemSave: CartItemsEntity;
    if (item) {
      item.quantity += props.quantity;
      item.amount_total = item.quantity * product.price;
      await this.cartItemsRepo.save(item);
      product.stock -= props.quantity;
    } else {
      cartItemSave = {
        cart: cart,
        cart_id: user.cart.cart_id,
        product: product,
        product_id: product.id,
        quantity: props.quantity,
        amount_total: product.price * props.quantity,
      };
      await this.cartItemsRepo.save(cartItemSave);
      product.stock -= props.quantity;
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
    const cartItems: CartItemsEntity[] = await this.cartItemsRepo.find({
      where: { cart_id: user.cart.cart_id },
    });

    let totalAmount = 0;
    cartItems.forEach((cartItem) => {
      totalAmount += +cartItem.amount_total;
    });

    const cart: ResCartDto = {
      userId: userId,
      cartItems: cartItems,
      totalAmount: totalAmount,
    };
    return cart;
  }

  async removeProductFromCart(
    userId: string,
    productId: string,
  ): Promise<object> {
    const user: UsersEntity = await this.userServices.findUserById(userId);
    const cartItems: CartItemsEntity = await this.cartItemsRepo.findOne({
      where: { product_id: productId, cart_id: user.cart.cart_id },
    });
    if (!cartItems) CartException.cartNotFound();
    await this.cartItemsRepo.remove(cartItems);
    return {
      message: 'remove product in cart successfully',
      status: 200,
    };
  }
}
