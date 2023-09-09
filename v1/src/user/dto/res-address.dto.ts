import { AddressEntity } from '../entity';

export class ResAddressDto {
  id: string;
  addressLine: string;
  district: string;
  ward: string;
  country: string;
  postalCode: string;
  city: string;
  userId: string;

  constructor(address: AddressEntity) {
    Object.assign(this, {
      id: address.id,
      addressLine: address.addressLine,
      district: this.district,
      ward: this.ward,
      country: address.country,
      postalCode: address.postalCode,
      city: address.city,
      userId: address.user.id,
    });
  }
}
