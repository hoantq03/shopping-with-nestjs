import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UsersEntity } from './user.entity';

const ADDRESS_PREFIX = 'address_';

@Entity('addresses')
export class AddressEntity {
  @PrimaryColumn({
    type: 'character varying',
    nullable: false,
    name: 'id',
  })
  id!: string;

  @Column({ type: 'character varying', nullable: false, name: 'address_line' })
  addressLine!: string;

  @Column({ type: 'character varying', nullable: false, name: 'city' })
  city!: string;

  @Column({ type: 'character varying', nullable: false, name: 'postal_code' })
  postalCode!: string;

  @Column({ type: 'character varying', nullable: false, name: 'country' })
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

  // relations
  @ManyToOne(() => UsersEntity, (user) => user.addresses)
  @JoinColumn({ name: 'user_id' })
  user!: UsersEntity;

  //methods
  static createAddressId(id?: string): string {
    return id ? id : `${ADDRESS_PREFIX}${new Date().getTime()}_${uuidv4()}`;
  }
}
