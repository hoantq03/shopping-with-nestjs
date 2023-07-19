import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { OrderDetailEntity } from './order-detail.entity';
import { ShipperEntity } from './shippers.entity';
import { UsersEntity } from 'src/user/entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryColumn({
    type: 'character varying',
    name: 'order_id',
  })
  order_id!: string;

  @Column({ type: 'character varying', name: 'userId' })
  user_id!: string;

  @Column({ type: 'character varying', name: 'shipperId' })
  shipperId!: string;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'orderDate',
  })
  orderDate?: Date;

  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.orderDetail)
  orderDetail!: OrderDetailEntity[];

  @ManyToOne(() => ShipperEntity, (shipper) => shipper.orders)
  shipper!: ShipperEntity;

  @ManyToOne(() => UsersEntity, (user) => user.orders)
  user!: UsersEntity;

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
}
