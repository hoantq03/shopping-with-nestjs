import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UsersEntity } from 'src/user/entity';
import { CartDetailEntity } from './cart-details.entity';

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
  @OneToMany(() => CartDetailEntity, (cartItems) => cartItems.cart, {
    cascade: true,
  })
  cartItems: CartDetailEntity[];

  @OneToOne(() => UsersEntity, {
    cascade: true,
  })
  user: UsersEntity;

  //methods
  static createCartId(id?: string): string {
    return id ? id : `${CART_PREFIX}${new Date().getTime()}_${uuidv4()}`;
  }
}
