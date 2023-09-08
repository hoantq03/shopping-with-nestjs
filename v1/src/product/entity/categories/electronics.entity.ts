import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

const INVENTORY_PREFIX = 'electronics_';

@Entity('elecronics')
export class ElectronicsEntity {
  @PrimaryColumn({
    type: 'character varying',
    nullable: false,
    name: 'id',
  })
  id!: string;

  @Column({
    type: 'character varying',
    nullable: false,
    length: 100,
    name: 'brand',
  })
  brand!: string;

  @Column({ type: 'integer', nullable: false, name: 'warranty' })
  warranty!: number;

  @Column({
    type: 'character varying',
    nullable: false,
    name: 'warranty_type',
  })
  warranty_type!: string;

  @Column({ type: 'integer', nullable: false, name: 'long' })
  long!: number;

  @Column({ type: 'integer', nullable: false, name: 'wide' })
  wide!: number;

  @Column({ type: 'integer', nullable: false, name: 'high' })
  high!: number;

  @Column({ type: 'integer', nullable: false, name: 'weight_product' })
  weight!: number;

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

  //relations

  // methods
  static createProductId(id?: string): string {
    return id ? id : `${INVENTORY_PREFIX}${new Date().getTime()}_${uuidv4()}`;
  }
}
