import { Entity, Column, PrimaryColumn, OneToMany, OneToOne } from 'typeorm';
import { CartItemsEntity } from './cart-item.entity';
import { v4 as uuidv4 } from 'uuid';
import { UsersEntity } from 'src/user/entity';

const CART_PREFIX = 'cart_';

@Entity('carts')
export class CartEntity {
  @PrimaryColumn({
    name: 'cart_id',
    type: 'character varying',
    nullable: false,
  })
  cart_id!: string;

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

  @OneToMany(() => CartItemsEntity, (cartItems) => cartItems.cart)
  cartItems!: CartItemsEntity[];

  @OneToOne(() => UsersEntity)
  user!: UsersEntity;

  static createCartId(id?: string): string {
    return id ? id : `${CART_PREFIX}${new Date().getTime()}_${uuidv4()}`;
  }
}
