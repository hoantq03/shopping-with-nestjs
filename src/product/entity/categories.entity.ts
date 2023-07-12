import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ProductEntity } from './product.entity';
import { v4 as uuidv4 } from 'uuid';

const CATEGORY_PREFIX = 'category_';
@Entity('categories')
export class CategoryEntity {
  @PrimaryColumn()
  categoryId: string;

  @Column()
  name: string;

  @Column()
  description: string;

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

  @OneToMany(() => ProductEntity, (products) => products.category)
  products: ProductEntity[];

  static createAddressId(id?: string): string {
    return id ? id : `${CATEGORY_PREFIX}${new Date().getTime()}_${uuidv4()}`;
  }
}
