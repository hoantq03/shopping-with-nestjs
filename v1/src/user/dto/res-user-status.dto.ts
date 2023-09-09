import { OrderEntity } from 'src/orders/entity';
import { AddressEntity } from '../entity';
import { UsersEntity } from '../entity/user.entity';

export class ResUserDto {
  id: string;
  status: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthDay: Date;
  email: string;
  role: string;
  orders: OrderEntity[];
  addresses: AddressEntity[];

  constructor(user: UsersEntity) {
    Object.assign(this, {
      id: user.id,
      status: user.status,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      birthday: user.birthday,
      email: user.email,
      role: user.role,
      addresses: user.addresses,
      orders: user.orders,
    });
  }
}
