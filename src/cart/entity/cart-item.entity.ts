import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CartEntity } from './cart.entity';
import { ProductEntity } from 'src/product/entity/product.entity';

@Entity('cart_items')
export class CartItemsEntity {
  @PrimaryColumn({
    name: 'id',
    type: 'character varying',
    nullable: false,
  })
  id!: string;

  @Column({ name: 'quantity', type: 'integer', default: 0, nullable: false })
  quantity!: number;

  @Column({
    name: 'amount_total',
    type: 'decimal',
    precision: 2,
    nullable: false,
    default: 0,
  })
  amount_total!: number;

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

  @ManyToOne(() => ProductEntity, (product) => product.cartItems)
  @JoinColumn({ name: 'product_id' })
  product!: ProductEntity;
}
