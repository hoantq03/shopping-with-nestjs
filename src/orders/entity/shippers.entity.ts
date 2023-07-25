import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { OrderEntity } from './orders.entity';

@Entity('shippers')
export class ShipperEntity {
  @PrimaryColumn({ type: 'character varying', name: 'id', nullable: false })
  id!: string;

  @Column({
    type: 'character varying',
    length: 100,
    name: 'company_name',
    nullable: false,
  })
  company_name!: string;

  @Column({ type: 'integer', name: 'phone', nullable: false })
  phone!: number;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
    nullable: false,
  })
  createdAt?: Date;

  @Column({ name: 'created_by', default: () => '1', nullable: false })
  createdBy?: string;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
    nullable: false,
  })
  updatedAt?: Date;

  @Column({ name: 'updated_by', default: () => '1', nullable: false })
  updatedBy?: string;

  //relations
  @OneToMany(() => OrderEntity, (orders) => orders.shipper)
  orders?: OrderEntity[];
}
