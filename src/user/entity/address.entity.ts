import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UsersEntity } from './user.entity';

const ADDRESS_PREFIX = 'address_';

@Entity('address_info')
export class AddressEntity {
  @PrimaryColumn({ name: 'id' })
  id!: string;

  @ManyToOne(() => UsersEntity, (user) => user.address)
  user!: UsersEntity;

  @Column({ name: 'address_line' })
  address_line!: string;

  @Column({ name: 'city' })
  city!: string;

  @Column({ name: 'postal_code' })
  postal_code!: string;

  @Column({ name: 'country' })
  country!: string;

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

  static createAddressId(id?: string): string {
    return id ? id : `${ADDRESS_PREFIX}${new Date().getTime()}_${uuidv4()}`;
  }
}
