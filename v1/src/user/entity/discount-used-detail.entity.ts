import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { DiscountsEntity } from './discount.entity';
import { UsersEntity } from './user.entity';
import { OrderEntity } from 'src/orders/entity';

const DISCOUNT_USED_DETAIL_PREFIX = 'discount_used_detail_';

@Entity('discount_used_detail')
export class DiscountUsedDetailEntity {
  @PrimaryColumn({
    type: 'character varying',
    nullable: false,
    name: 'id',
  })
  id!: string;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'used_date',
  })
  used_date?: Date;

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
  @ManyToOne(() => DiscountsEntity, (discount) => discount.discount_used_detail)
  @JoinColumn({ name: 'discount_id' })
  discount: DiscountsEntity;

  @ManyToOne(() => UsersEntity, (user) => user.discount_used_detail)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @ManyToOne(() => OrderEntity, (order) => order.discount_used_detail)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;
  // methods
  static createProductId(id?: string): string {
    return id
      ? id
      : `${DISCOUNT_USED_DETAIL_PREFIX}${new Date().getTime()}_${uuidv4()}`;
  }
}
