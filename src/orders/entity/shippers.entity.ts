import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { OrderEntity } from './orders.entity';

@Entity('shippers')
export class ShipperEntity {
  @PrimaryColumn({ type: 'character varying', name: 'shipper_id' })
  shipper_id!: string;

  @Column({ type: 'character varying', length: 100, name: 'company_name' })
  company_name!: string;

  @Column({ type: 'integer', name: 'phone' })
  phone!: number;

  @OneToMany(() => OrderEntity, (orders) => orders.shipper)
  orders?: OrderEntity[];

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
