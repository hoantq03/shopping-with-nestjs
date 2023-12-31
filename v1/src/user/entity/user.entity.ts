import { CartEntity } from 'src/cart/entity';
import { OrderEntity } from 'src/orders/entity';
import { ProductEntity } from 'src/product/entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { AddressEntity } from './address.entity';
import { DiscountUsedDetailEntity } from './discount-used-detail.entity';
import { InventoryEntity } from 'src/product/entity/inventories.entity';
import { DiscountsEntity } from 'src/discounts/entity/discount.entity';

const USER_PREFIX = 'user_';

@Entity('users')
export class UsersEntity {
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
    name: 'first_name',
  })
  firstName!: string;

  @Column({
    type: 'character varying',
    nullable: false,
    length: 100,
    name: 'last_name',
  })
  lastName!: string;

  @Column({
    type: 'character varying',
    nullable: false,
    length: 100,
    unique: true,
    name: 'email',
  })
  email!: string;

  @Column({
    type: 'character varying',
    nullable: false,
    name: 'password',
  })
  password!: string;

  @Column({
    type: 'character varying',
    length: 100,
    default: 'customer',
    name: 'role',
  })
  role!: string;

  @Column({
    type: 'character varying',
    nullable: false,
    length: 20,
    name: 'phone',
  })
  phone!: string;

  @Column({ type: 'timestamp', nullable: false, name: 'birthday' })
  birthday!: Date;

  @Column({
    type: 'smallint',
    nullable: false,
    name: 'status',
    default: 1,
  })
  status!: number;

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
  @OneToOne(() => CartEntity, {
    cascade: true,
  })
  @JoinColumn({ name: 'cart_id' })
  cart!: CartEntity;

  @OneToMany(() => ProductEntity, (products) => products.user)
  products?: ProductEntity[];

  @OneToMany(() => OrderEntity, (orders) => orders.user)
  orders?: OrderEntity[];

  @OneToMany(() => AddressEntity, (addresses) => addresses.user)
  addresses?: AddressEntity[];

  @OneToMany(() => InventoryEntity, (inventory) => inventory.user)
  inventories!: InventoryEntity[];

  @OneToMany(
    () => DiscountUsedDetailEntity,
    (discount_used_detail) => discount_used_detail.user,
  )
  discount_used_detail!: DiscountUsedDetailEntity[];

  @OneToMany(() => DiscountsEntity, (discount) => discount.user)
  discounts?: DiscountsEntity[];
  // methods
  static createUserId(id?: string): string {
    return id ? id : `${USER_PREFIX}${new Date().getTime()}_${uuidv4()}`;
  }
}
