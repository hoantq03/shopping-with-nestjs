import { UsersEntity } from 'src/user/entity';
import { AddressEntity } from 'src/user/entity';

export class ResAddressDto {
  id: string;
  address_line: string;
  country: string;
  postal_code: string;
  city: string;
  user: UsersEntity;

  constructor(address: AddressEntity) {
    Object.assign(this, {
      id: address.id,
      address_line: address.address_line,
      country: address.country,
      postal_code: address.postal_code,
      city: address.city,
      User: address.user,
    });
  }
}
