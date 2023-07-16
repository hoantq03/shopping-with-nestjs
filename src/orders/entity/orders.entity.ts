import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { OrderDetailEntity } from './order-detail.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryColumn('character varying', { name: 'orderId' })
  orderId!: string;

  @Column('character varying', { name: 'userId' })
  userId!: string;

  @Column('character varying', { name: 'shipperId' })
  shipperId!: string;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'orderDate',
  })
  orderDate?: Date;

  @ManyToOne(() => OrderDetailEntity, (orderDetail) => orderDetail.order)
  orderDetail!: OrderDetailEntity[];

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
