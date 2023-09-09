import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProductEntity } from 'src/product/entity';
import { CartEntity } from './cart.entity';
import { v4 as uuidv4 } from 'uuid';

const CART_DETAIL_PREFIX = 'cart_detail_';

@Entity('cart_details')
export class CartDetailEntity {
  @PrimaryColumn({
    name: 'id',
    type: 'character varying',
    nullable: false,
  })
  id!: string;

  @Column({ name: 'quantity', type: 'integer', default: 0, nullable: false })
  quantity!: number;

  @Column({
    name: 'total_amount',
    type: 'decimal',
    precision: 2,
    nullable: false,
    default: 0,
  })
  total_amount!: number;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt?: Date;

  @Column({ name: 'created_by', default: () => '1' })
  createdBy?: string;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt?: Date;

  @Column({ name: 'updated_by', default: () => '1' })
  updatedBy?: string;

  //relations
  @ManyToOne(() => CartEntity, (cart) => cart.cartItems)
  @JoinColumn({ name: 'cart_id' })
  cart!: CartEntity;

  @ManyToOne(() => ProductEntity, (product) => product.cart_details)
  @JoinColumn({ name: 'product_id' })
  product!: ProductEntity;

  //methods
  static createCartId(id?: string): string {
    return id ? id : `${CART_DETAIL_PREFIX}${new Date().getTime()}_${uuidv4()}`;
  }
}
