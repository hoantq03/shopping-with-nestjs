import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ProductEntity } from 'src/product/entity';
import { OrderEntity } from './orders.entity';

const ORDER_DETAILS_PREFIX = 'order_detail_';
@Entity('order_details')
export class OrderDetailEntity {
  @PrimaryColumn({
    type: 'character varying',
    name: 'id',
    nullable: false,
  })
  id!: string;

  @Column({
    type: 'integer',
    name: 'quantity',
    default: 0,
    nullable: false,
  })
  quantity!: number;

  @Column({
    type: 'decimal',
    precision: 2,
    name: 'total_amount',
    default: 0,
    nullable: false,
  })
  total_amount!: number;

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
  @ManyToOne(() => OrderEntity, (order) => order.orderDetails, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order!: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.order_details, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product!: ProductEntity;

  // methods
  static createOrderDetailId(id?: string): string {
    return id
      ? id
      : `${ORDER_DETAILS_PREFIX}${new Date().getTime()}_${uuidv4()}`;
  }
}
