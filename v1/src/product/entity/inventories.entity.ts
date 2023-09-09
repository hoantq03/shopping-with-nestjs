import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ProductEntity } from './product.entity';
import { UsersEntity } from 'src/user/entity';

const INVENTORY_PREFIX = 'inventories_';

@Entity('inventories')
export class InventoryEntity {
  @PrimaryColumn({
    type: 'character varying',
    nullable: false,
    name: 'id',
  })
  id!: string;

  @Column({
    type: 'character varying',
    nullable: false,
    name: 'location',
  })
  location!: string;

  @Column({ type: 'integer', nullable: false, name: 'stock' })
  stock!: number;

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
  @OneToOne(() => ProductEntity, (product) => product.inventory, {
    cascade: true,
  })
  @JoinColumn({ name: 'product_id' })
  product?: ProductEntity;

  @ManyToOne(() => UsersEntity, (user) => user.inventories)
  @JoinColumn({ name: 'user_id' })
  user!: UsersEntity;
  // methods
  static createInventoryId(id?: string): string {
    return id ? id : `${INVENTORY_PREFIX}${new Date().getTime()}_${uuidv4()}`;
  }
}
