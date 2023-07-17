import { UsersEntity } from 'src/user/entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CategoryEntity } from './categories.entity';
import { OrderDetailEntity } from 'src/orders/entity';

const PRODUCT_PREFIX = 'product_';
@Entity('products')
export class ProductEntity {
  @PrimaryColumn({ name: 'id' })
  id!: string;

  @Column({ length: 100, name: 'name' })
  name!: string;

  @Column({ name: 'description' })
  description!: string;

  @Column({ length: 100, name: 'color' })
  color!: string;

  @Column('decimal', { precision: 2, name: 'discount' })
  discount!: number;

  @Column({ length: 100, name: 'imageUrl' })
  imageUrl!: string;

  @Column('decimal', { precision: 2, name: 'price' })
  price!: number;

  @Column({ name: 'quantityInStock' })
  quantityInStock!: number;

  @ManyToOne(() => UsersEntity, (user) => user.products)
  user!: UsersEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  category!: CategoryEntity;

  @ManyToOne(() => OrderDetailEntity, (orderDetail) => orderDetail.product)
  orderDetails?: OrderDetailEntity[];

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

  static createProductId(id?: string): string {
    return id ? id : `${PRODUCT_PREFIX}${new Date().getTime()}_${uuidv4()}`;
  }
}
