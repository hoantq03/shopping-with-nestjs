import { ProductEntity } from 'src/product/entity/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { OrderEntity } from './orders.entity';

@Entity('orderDetails')
export class OrderDetailEntity {
  @PrimaryColumn({ type: 'character varying', name: 'order_detail_id' })
  order_detail_id!: string;

  @Column({ type: 'character varying', name: 'product_id' })
  product_id!: string;

  @Column({ type: 'decimal', name: 'price' })
  price!: string;

  @Column({ type: 'integer', name: 'quantity' })
  quantity!: number;

  @Column({ type: 'decimal', name: 'discount' })
  discount!: string;

  @Column({ type: 'decimal', name: 'total' })
  total!: string;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'shipDate',
  })
  shipDate?: Date;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'billDate',
  })
  billDate?: Date;

  @ManyToOne(() => OrderDetailEntity, (order) => order.order)
  order!: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderDetails)
  @JoinColumn({ name: 'product_id' })
  product!: ProductEntity;

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
