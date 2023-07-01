import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

const USER_PREFIX = 'user_';

@Entity('users')
export class UsersEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ length: 100, name: 'first_name' })
  firstName!: string;

  @Column({ length: 100, name: 'last_name' })
  lastName!: string;

  @Column({ length: 100, unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ length: 20 })
  phone!: string;

  @Column()
  birthday!: Date;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'status' })
  status: number;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  static createUserId(id?: string): string {
    return id ? id : `${USER_PREFIX}${new Date().getTime()}_${uuidv4()}`;
  }
}
