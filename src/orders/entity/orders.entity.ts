import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('orders')
export class OrderDetail {
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
