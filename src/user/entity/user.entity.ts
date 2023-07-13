import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { AddressEntity } from 'src/user/entity';
import { ProductEntity } from 'src/product/entity/product.entity';
const USER_PREFIX = 'user_';

@Entity('users')
export class UsersEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ length: 100, name: 'first_name' })
  firstName!: string;

  @Column({ length: 100, name: 'last_name' })
  lastName!: string;

  @Column({ length: 100, unique: true, name: 'email' })
  email!: string;

  @Column({ name: 'password' })
  password!: string;

  @Column({ default: 'user', name: 'role' })
  role!: string;

  @Column({ length: 20, name: 'phone' })
  phone!: string;

  @Column({ name: 'birthday' })
  birthday!: Date;

  @Column('smallint', { name: 'status' })
  status!: number;

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

  @OneToMany(() => AddressEntity, (address) => address.user)
  address: AddressEntity[];

  @OneToMany(() => ProductEntity, (products) => products.user)
  products: ProductEntity[];

  static createUserId(id?: string): string {
    return id ? id : `${USER_PREFIX}${new Date().getTime()}_${uuidv4()}`;
  }
}
