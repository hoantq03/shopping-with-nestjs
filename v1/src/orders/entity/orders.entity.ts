import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ResUserDto } from 'v1/src/user/dto';
import { UsersEntity } from 'v1/src/user/entity';
import { OrderDetailEntity } from './order-detail.entity';
import { ShipperEntity } from './shippers.entity';

const ORDER_PREFIX = 'order_';
@Entity('orders')
export class OrderEntity {
  @PrimaryColumn({
    type: 'character varying',
    name: 'id',
    nullable: false,
  })
  id!: string;

  @Column({
    type: 'decimal',
    precision: 2,
    name: 'amount_total',
    nullable: false,
    default: 0,
  })
  amount_total!: number;

  @Column({
    type: 'decimal',
    precision: 2,
    name: 'discount',
    nullable: false,
    default: 0,
  })
  discount!: number;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'order_date',
    nullable: true,
  })
  orderDate?: Date;

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

  @Column({
    name: 'tax',
    nullable: false,
    type: 'decimal',
    precision: 2,
    default: 0,
  })
  tax!: number;

  @Column({
    name: 'ship_cost',
    nullable: false,
    type: 'decimal',
    precision: 2,
    default: 0,
  })
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

  // relations
  @ManyToOne(() => ShipperEntity, (shipper) => shipper.orders)
  @JoinColumn({ name: 'shipper_id' })
  shipper?: ShipperEntity;

  @ManyToOne(() => UsersEntity, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user!: ResUserDto;

  @OneToMany(() => OrderDetailEntity, (orderDetails) => orderDetails.order)
  orderDetails!: OrderDetailEntity[];

  //methods
  static createOrderId(id?: string): string {
    return id ? id : `${ORDER_PREFIX}${new Date().getTime()}_${uuidv4()}`;
  }
}
