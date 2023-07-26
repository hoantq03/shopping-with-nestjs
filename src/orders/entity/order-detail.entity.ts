import { ProductEntity } from 'src/product/entity/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { OrderEntity } from './orders.entity';
import { v4 as uuidv4 } from 'uuid';

const ORDER_DETAIL_PREFIX = 'order_detail_';
@Entity('order_details')
export class OrderDetailEntity {
  @PrimaryColumn({
    type: 'character varying',
    name: 'product_id',
    nullable: false,
  })
  product_id!: string;

  @PrimaryColumn({
    type: 'character varying',
    name: 'order_id',
    nullable: false,
  })
  order_id!: string;

  @Column({
    type: 'decimal',
    name: 'price',
    precision: 2,
    default: 0,
    nullable: false,
  })
  price!: number;

  @Column({
    type: 'integer',
    name: 'quantity',
    default: 0,
    nullable: false,
  })
  quantity!: number;

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
  @ManyToOne(() => OrderEntity, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  order!: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderDetails)
  @JoinColumn({ name: 'product_id' })
  product!: ProductEntity;

  // methods
  static createOrderDetailId(id?: string): string {
    return id
      ? id
      : `${ORDER_DETAIL_PREFIX}${new Date().getTime()}_${uuidv4()}`;
  }
}
