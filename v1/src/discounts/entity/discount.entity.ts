import { DiscountStatus, DiscountType } from 'src/common';
import { OrderEntity } from 'src/orders/entity';
import { DiscountUsedDetailEntity, UsersEntity } from 'src/user/entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
const DISCOUNT_PREFIX = 'discount_';

@Entity('discounts')
export class DiscountsEntity {
  @PrimaryColumn({ name: 'id', type: 'character varying', nullable: false })
  id!: string;

  @Column({ name: 'name', type: 'character varying', nullable: false })
  name!: string;

  @Column({ name: 'description', type: 'character varying', nullable: false })
  description!: string;

  @Column({
    name: 'type',
    type: 'character varying',
    nullable: false,
    default: DiscountType.FIXED_NUMBER,
  })
  type!: string;

  @Column({ name: 'value', type: 'integer', nullable: false })
  value!: number;

  @Column({ name: 'code', type: 'character varying', nullable: false })
  code!: string;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'start_date',
  })
  start_date?: Date;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'end_date',
  })
  end_date?: Date;

  @Column({ name: 'number_of_use', type: 'integer', nullable: false })
  number_of_use!: number;

  @Column({ name: 'min_order_value', type: 'integer', nullable: false })
  min_order_value!: number;

  @Column({
    name: 'status',
    type: 'character varying',
    nullable: false,
    default: DiscountStatus.AVAILABLE,
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

  // relations

  @ManyToOne(() => UsersEntity, (user) => user.discounts)
  @JoinColumn([{ name: 'user_id' }])
  user: UsersEntity;

  @OneToMany(() => OrderEntity, (orders) => orders.discount)
  orders: OrderEntity[];

  @OneToMany(
    () => DiscountUsedDetailEntity,
    (discount_used_detail) => discount_used_detail.discount,
  )
  discount_used_detail: DiscountUsedDetailEntity[];
  // methods
  static createDiscountId(id?: string): string {
    return id ? id : `${DISCOUNT_PREFIX}${new Date().getTime()}_${uuidv4()}`;
  }
}
