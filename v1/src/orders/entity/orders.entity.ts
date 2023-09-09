import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ResUserDto } from 'src/user/dto';
import {
  DiscountUsedDetailEntity,
  DiscountsEntity,
  UsersEntity,
} from 'src/user/entity';
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
    name: 'total_amount',
    nullable: false,
    default: 0,
  })
  total_amount!: number;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'order_date',
    nullable: true,
  })
  order_date?: Date;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'billDate',
    nullable: true,
  })
  bill_date?: Date;

  @Column({
    name: 'status',
    type: 'character varying',
    length: 100,
    nullable: false,
  })
  status!: string;

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

  @OneToMany(
    () => DiscountUsedDetailEntity,
    (discount_used_detail) => discount_used_detail.order,
  )
  discount_used_detail!: DiscountUsedDetailEntity[];

  @ManyToOne(() => DiscountsEntity, (discount) => discount.orders)
  @JoinColumn({ name: 'discount_id' })
  discount!: DiscountsEntity;

  //methods
  static createOrderId(id?: string): string {
    return id ? id : `${ORDER_PREFIX}${new Date().getTime()}_${uuidv4()}`;
  }
}
