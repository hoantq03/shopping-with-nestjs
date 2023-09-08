import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { OrderDetailEntity } from 'src/orders/entity';
import { CartDetailEntity } from 'src/cart/entity';
import { UsersEntity } from 'src/user/entity';

const PRODUCT_PREFIX = 'products_';
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

  @Column({
    type: 'character varying',
    nullable: false,
    length: 100,
    name: 'imageUrl',
  })
  imageUrl!: string;

  @Column({ type: 'character varying', nullable: false, name: 'description' })
  description!: string;

  @Column({ type: 'decimal', precision: 2, name: 'price', default: 0 })
  price!: number;

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
  @OneToMany(() => OrderDetailEntity, (orderDetails) => orderDetails.product)
  orderDetails!: OrderDetailEntity[];

  @OneToMany(() => CartDetailEntity, (cartItems) => cartItems.product)
  cartItems!: CartDetailEntity[];

  @ManyToOne(() => UsersEntity, (user) => user.products)
  @JoinColumn({ name: 'user_id' })
  user!: UsersEntity;

  // methods
  static createProductId(id?: string): string {
    return id ? id : `${PRODUCT_PREFIX}${new Date().getTime()}_${uuidv4()}`;
  }
}
