import { UsersEntity } from 'src/user/entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CategoryEntity } from './categories.entity';
import { OrderDetailEntity } from 'src/orders/entity';
import { CartItemsEntity } from 'src/cart/entity';

const PRODUCT_PREFIX = 'product_';
@Entity('products')
export class ProductEntity {
  @PrimaryColumn({
    type: 'character varying',
    nullable: false,
    name: 'id',
  })
  id!: string;

  @Column({
    type: 'character varying',
    nullable: false,
    length: 100,
    name: 'name',
  })
  name!: string;

  @Column({ type: 'character varying', nullable: false, name: 'description' })
  description!: string;

  @Column({
    type: 'character varying',
    nullable: false,
    length: 100,
    name: 'color',
  })
  color!: string;

  @Column({ type: 'decimal', precision: 2, name: 'discount', default: 0 })
  discount!: number;

  @Column({
    type: 'character varying',
    nullable: false,
    length: 100,
    name: 'imageUrl',
  })
  imageUrl!: string;

  @Column({ type: 'decimal', precision: 2, name: 'price', default: 0 })
  price!: number;

  @Column({ type: 'integer', nullable: false, name: 'stock', default: 0 })
  stock!: number;

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
  @ManyToOne(() => UsersEntity, (user) => user.products)
  @JoinColumn({ name: 'user_id' })
  user!: UsersEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category!: CategoryEntity;

  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.product)
  orderDetails?: OrderDetailEntity[];

  @OneToMany(() => CartItemsEntity, (cartItems) => cartItems.product)
  cartItems?: CartItemsEntity[];

  // methods
  static createProductId(id?: string): string {
    return id ? id : `${PRODUCT_PREFIX}${new Date().getTime()}_${uuidv4()}`;
  }
}
