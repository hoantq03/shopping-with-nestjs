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
    });
  }
}
