import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity, CartItemsEntity } from './entity';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/product/entity';
import { UsersEntity } from 'src/user/entity';
import { UserServices } from 'src/user/user.services';
import { ReqAddProductToCartDto } from './dto';
import { ProductService } from 'src/product/product.service';
import { UserException } from 'src/exception';

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
    const user: UsersEntity = await this.userServices.findUserById(
      props.userId,
    );
    const product: ProductEntity = await this.productServices.findProductById(
      props.productId,
    );

    console.log(user.cart);
    const cartItems: CartItemsEntity[] = await this.cartItemsRepo.find({
      where: { cart_id: user.cart.cart_id },
    });

    if (props.quantity > product.stock) UserException.NotEnoughQuantity();
    const cart = await this.cartRepo.findOne({
      where: { cart_id: user.cart.cart_id },
    });

    const cartItemSave = {
      cart: cart,
      cart_id: user.cart.cart_id,
      product: product,
      product_id: product.id,
      quantity: props.quantity,
      amount_total: product.price * props.quantity,
    };

    product.stock -= props.quantity;

    if (user && product) {
      cartItems.forEach((cartItem) => {
        cartItemSave.quantity += cartItem.quantity;
      });
      cartItemSave.amount_total = cartItemSave.quantity * product.price;
    }
    await this.cartItemsRepo.save(cartItemSave);
    await this.productRepo.save(product);
    return {
      message: 'add product to cart successfully',
      status: 200,
    };
  }
}
