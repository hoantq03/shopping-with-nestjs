import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { OrderEntity } from './orders.entity';
import { ProductEntity } from 'src/product/entity';

@Entity('orderDetails')
export class OrderDetailEntity {
  @PrimaryColumn('character varying', { name: 'orderDetailId' })
  orderDetailId!: string;

  @Column('character varying', { name: 'orderId' })
  orderId!: string;

  @Column('character varying', { name: 'productId' })
  productId!: string;

  @Column('decimal', { precision: 2, name: 'price' })
  price!: string;

  @Column({ name: 'quantity' })
  quantity!: number;

  @Column('decimal', { precision: 2, name: 'discount' })
  discount!: string;

  @Column('decimal', { precision: 2, name: 'total' })
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

  @ManyToOne(() => OrderEntity, (order) => order.orderDetail)
  order!: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderDetails)
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
