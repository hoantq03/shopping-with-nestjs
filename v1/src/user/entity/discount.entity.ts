import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

const DISCOUNT_PREFIX = 'discount_';

@Entity('discounts')
export class DiscountsEntity {
  @PrimaryColumn({
    type: 'character varying',
    nullable: false,
    name: 'id',
  })
  id!: string;

  @Column({
    type: 'character varying',
    nullable: false,
    name: 'name',
  })
  name!: string;

  @Column({ type: 'character', nullable: false, name: 'description' })
  description!: string;

  @Column({ type: 'integer', nullable: false, name: 'type', default: 0 })
  type!: number; // 0 is fixed number - 1 is percentage

  @Column({ type: 'numeric', precision: 2, nullable: false, name: 'value' })
  value!: number;

  @Column({ type: 'character', nullable: false, name: 'code' })
  code!: string;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'start_date',
  })
  start_date?: Date;

  @Column({
    type: 'timestamptz',
    name: 'end_date',
  })
  end_date?: Date;

  @Column({ type: 'integer', nullable: false, name: 'number_of_use' })
  number_of_use!: number;

  @Column({
    type: 'numeric',
    precision: 2,
    nullable: false,
    name: 'min_order_value',
  })
  min_order_value!: number;

  @Column({
    type: 'character',
    nullable: false,
    name: 'status',
  })
  status!: string;

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
    return id ? id : `${DISCOUNT_PREFIX}${new Date().getTime()}_${uuidv4()}`;
  }
}
