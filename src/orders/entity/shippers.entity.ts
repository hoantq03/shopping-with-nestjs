import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { OrderEntity } from './orders.entity';

@Entity('shippers')
export class ShipperEntity {
  @PrimaryColumn('character varying', { name: 'orderId' })
  shipperId!: string;

  @Column('character varying', { length: 100, name: 'orderId' })
  companyName!: string;

  @Column('integer', { name: 'phone' })
  phone!: number;

  @OneToMany(() => OrderEntity, (orders) => orders.shipper)
  orders!: OrderEntity[];

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
