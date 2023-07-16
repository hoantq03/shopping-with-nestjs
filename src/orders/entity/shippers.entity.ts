import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('shippers')
export class OrderDetail {
  @PrimaryColumn('character varying', { name: 'orderId' })
  shipperId!: string;

  @Column('character varying', { length: 100, name: 'orderId' })
  companyName!: string;

  @Column('integer', { name: 'phone' })
  phone!: number;

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
