import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UsersEntity } from './user.entity';

const ADDRESS_PREFIX = 'address_';

@Entity()
export class AddressEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  address_line!: string;

  @Column()
  city!: string;

  @Column()
  postal_code!: string;

  @Column()
  country!: string;

  @ManyToOne(() => UsersEntity, (user) => user.address)
  user!: UsersEntity;

  static createUserId(id?: string): string {
    return id ? id : `${ADDRESS_PREFIX}${new Date().getTime()}_${uuidv4()}`;
  }
}
