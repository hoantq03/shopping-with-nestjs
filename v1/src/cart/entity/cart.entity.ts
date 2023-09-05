import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UsersEntity } from 'v1/src/user/entity';
import { CartItemsEntity } from './cart-item.entity';

const CART_PREFIX = 'cart_';

@Entity('carts')
export class CartEntity {
  @PrimaryColumn({
    name: 'id',
    type: 'character varying',
    nullable: false,
  })
  id!: string;

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
    nullable: false,
  })
  createdAt?: Date;

  @Column({ name: 'created_by', default: () => '1', nullable: false })
  createdBy?: string;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
    nullable: false,
  })
  updatedAt?: Date;

  @Column({ name: 'updated_by', default: () => '1', nullable: false })
  updatedBy?: string;

  //relations
  @OneToMany(() => CartItemsEntity, (cartItems) => cartItems.cart)
  cartItems!: CartItemsEntity[];

  @OneToOne(() => UsersEntity)
  user!: UsersEntity;

  //methods
  static createCartId(id?: string): string {
    return id ? id : `${CART_PREFIX}${new Date().getTime()}_${uuidv4()}`;
  }
}
