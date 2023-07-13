import { UsersEntity } from 'src/user/entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { CategoryEntity } from './categories.entity';
import { v4 as uuidv4 } from 'uuid';

const PRODUCT_PREFIX = 'product_';
@Entity('products')
export class ProductEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  color!: string;

  @Column('decimal', { precision: 2 })
  discount!: number;

  @Column()
  imageUrl!: string;

  @Column('decimal', { precision: 2 })
  price!: number;

  @Column()
  quantityInStock!: number;

  @ManyToOne(() => UsersEntity, (user) => user.products)
  user!: UsersEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  category!: CategoryEntity;

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
