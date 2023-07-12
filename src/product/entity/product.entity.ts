import { UsersEntity } from 'src/user/entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { CategoryEntity } from './categories.entity';
import { v4 as uuidv4 } from 'uuid';

const PRODUCT_PREFIX = 'product_';
@Entity('products')
export class ProductEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  color: string;

  @Column()
  discount: number;

  @Column()
  imageUrl: string;

  @Column()
  price: number;

  @Column()
  quantityInStock: number;

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

  @ManyToOne(() => UsersEntity, (user) => user.products)
  user: UsersEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  category: CategoryEntity;

  static createAddressId(id?: string): string {
    return id ? id : `${PRODUCT_PREFIX}${new Date().getTime()}_${uuidv4()}`;
  }
}
