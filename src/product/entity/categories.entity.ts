import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ProductEntity } from './product.entity';

const CATEGORY_PREFIX = 'category_';
@Entity('categories')
export class CategoryEntity {
  @PrimaryColumn({
    type: 'character varying',
    nullable: false,
    name: 'id',
  })
  id!: string;

  @Column({
    type: 'character varying',
    nullable: false,
    length: 100,
    name: 'name',
  })
  name!: string;

  @Column({ type: 'character varying', nullable: false, name: 'description' })
  description!: string;

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
  @OneToMany(() => ProductEntity, (products) => products.category)
  products?: ProductEntity[];

  //methods
  static createCategoryId(id?: string): string {
    return id ? id : `${CATEGORY_PREFIX}${new Date().getTime()}_${uuidv4()}`;
  }
}
