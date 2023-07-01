import { UsersEntity } from '../user.entity';

export class ResUserDto {
  constructor(user: UsersEntity) {
    id: String;
    status: String;
    firstName: String;
    lastName: String;
    phone: String;
    birthDay: Date;
    email: String;

    Object.assign(this, {
      id: user.id,
      status: user.status,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      birthday: user.birthday,
      email: user.email,
    });
  }
}
