import { CartEntity } from 'src/cart/entity';
import { OrderEntity } from 'src/orders/entity';
import { ProductEntity } from 'src/product/entity/product.entity';
import { AddressEntity } from 'src/user/entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
const USER_PREFIX = 'user_';

@Entity('users')
export class UsersEntity {
  @PrimaryColumn({
    type: 'character varying',
    nullable: false,
    name: 'user_id',
  })
  user_id!: string;

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
    default: 'user',
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

  @OneToMany(() => AddressEntity, (address) => address.user)
  address?: AddressEntity[];

  @OneToMany(() => ProductEntity, (products) => products.user)
  products?: ProductEntity[];

  @OneToMany(() => OrderEntity, (orders) => orders.user)
  orders?: OrderEntity[];

  @OneToOne(() => CartEntity)
  @JoinColumn({ name: 'cart_id' })
  cart!: CartEntity;
  static createUserId(id?: string): string {
    return id ? id : `${USER_PREFIX}${new Date().getTime()}_${uuidv4()}`;
  }
}
