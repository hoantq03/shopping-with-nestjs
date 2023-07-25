import { AddressEntity } from 'src/user/entity';

export class ResAddressDto {
  id: string;
  addressLine: string;
  country: string;
  postalCode: string;
  city: string;
  userId: string;

  constructor(address: AddressEntity) {
    Object.assign(this, {
      id: address.id,
      addressLine: address.addressLine,
      country: address.country,
      postalCode: address.postalCode,
      city: address.city,
      userId: address.user.id,
    });
  }
}
