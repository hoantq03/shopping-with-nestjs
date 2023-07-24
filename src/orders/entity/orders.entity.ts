import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { ShipperEntity } from './shippers.entity';
import { AddressEntity, UsersEntity } from 'src/user/entity';
import { v4 as uuidv4 } from 'uuid';
import { OrderDetailEntity } from './order-detail.entity';
import { ResCartDto } from 'src/cart/dto';

const ORDER_PREFIX = 'order_';
@Entity('orders')
export class OrderEntity {
  @PrimaryColumn({
    type: 'character varying',
    name: 'order_id',
    nullable: false,
  })
  order_id!: string;

  @Column({
    type: 'decimal',
    name: 'amount_total',
    nullable: false,
    default: 0,
  })
  amount_total!: number;

  @Column({
    type: 'decimal',
    name: 'discount',
    nullable: false,
    default: 0,
  })
  discount!: number;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'billDate',
    nullable: true,
  })
  billDate?: Date;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'shipDate',
    nullable: true,
  })
  shipDate?: Date;

  @Column({
    name: 'status',
    type: 'character varying',
    length: 100,
    nullable: false,
  })
  status!: string;

  @Column({ name: 'tax', nullable: false, type: 'decimal', default: 0 })
  tax!: number;

  @Column({ name: 'ship_cost', nullable: false, type: 'decimal', default: 0 })
  shipCost!: number;

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

  @ManyToOne(() => ShipperEntity, (shipper) => shipper.orders)
  @JoinColumn({ name: 'shipper_id' })
  shipper?: ShipperEntity;

  @ManyToOne(() => UsersEntity, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user!: UsersEntity;

  @ManyToOne(() => AddressEntity, (address) => address.orders)
  @JoinColumn({ name: 'address_id' })
  address!: AddressEntity;

  @OneToMany(() => OrderDetailEntity, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetailEntity[];

  static createOrderId(id?: string): string {
    return id ? id : `${ORDER_PREFIX}${new Date().getTime()}_${uuidv4()}`;
  }
}
