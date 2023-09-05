import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CartEntity } from 'src/cart/entity';
import { AddressException, AuthException, UserException } from 'src/exception';
import { AddressEntity, UsersEntity } from 'src/user/entity';
import { Repository } from 'typeorm';
import {
  ReqAddAddress,
  ReqFindAllUserDto,
  ReqUpdateUserDto,
  ReqUserStatusDto,
  ResAddressDto,
  ResUserDto,
} from './dto';

@Injectable()
export class UserServices {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepo: Repository<UsersEntity>,
    @InjectRepository(AddressEntity)
    private addressRepo: Repository<AddressEntity>,
  ) {}

  async getAllUser(body: ReqFindAllUserDto): Promise<ResUserDto[]> {
    const ResUsers: ResUserDto[] = [];
    const users: UsersEntity[] = await this.userRepo.find({
      where: { status: body.status },
      relations: ['addresses'],
    });

    users.forEach((user) => {
      ResUsers.push(new ResUserDto(user));
    });

    return ResUsers;
  }

  async findUserByEmail(email: string): Promise<UsersEntity | null> {
    const user = await this.userRepo.findOne({
      where: { email },
      relations: ['addresses'],
    });
    return user ? user : null;
  }

  async findUserById(id: string): Promise<UsersEntity | null> {
    const user: UsersEntity = await this.userRepo.findOne({
      where: { id },
      relations: ['addresses', 'cart'],
    });
    return user ? user : null;
  }

  async getUserByEmail(email: string): Promise<ResUserDto> {
    const user: UsersEntity = await this.findUserByEmail(email);
    if (!user) {
      UserException.userNotFound();
    }
    return new ResUserDto(user);
  }

  async getUserById(id: string): Promise<ResUserDto> {
    const user: UsersEntity = await this.findUserById(id);
    if (!user) {
      UserException.userNotFound();
    }
    return new ResUserDto(user);
  }

  async updateUser(updatedData: ReqUpdateUserDto): Promise<ResUserDto> {
    let hashPassword: string;
    let status: number;

    if (updatedData.password) {
      if (updatedData.password === updatedData.confirmPassword) {
        const hashPass: string = await bcrypt.hash(
          updatedData.password,
          Number.parseInt(process.env.SALT, 10),
        );
        hashPassword = hashPass;
      } else {
        UserException.passwordNotMatch();
      }
    }

    // find user
    const user: UsersEntity = await this.findUserByEmail(updatedData.email);

    if (!user) UserException.userNotFound();

    user.role = updatedData.role ?? user.role;
    user.password = hashPassword ?? user.password;
    user.status = status ?? user.status;
    user.firstName = updatedData.firstName ?? user.firstName;
    user.lastName = updatedData.lastName ?? user.lastName;
    user.phone = updatedData.phone ?? user.phone;
    user.birthday = updatedData.birthday ?? user.birthday;
    user.updatedAt = new Date();
    user.updatedBy = updatedData.userId;

    await this.userRepo.save(user);
    return new ResUserDto(user);
  }

  async changeStatusUser(
    id: string,
    body: ReqUserStatusDto,
  ): Promise<ResUserDto> {
    const user: UsersEntity = await this.findUserById(id);
    if (!user) UserException.userNotFound();
    user.status = body.status;
    await this.userRepo.save(user);
    return new ResUserDto(user);
  }

  async addAddress(addressInfo: ReqAddAddress): Promise<ResAddressDto> {
    const { userId, ...rest } = { ...addressInfo };
    const user = await this.findUserById(userId);
    user.addresses.forEach((address) => {
      if (address.addressLine === addressInfo.addressLine)
        if (address.city === addressInfo.city)
          if (address.country === address.country)
            AddressException.addressExisted();
    });

    const id = AddressEntity.createAddressId();
    //test
    const addressEntitySave: AddressEntity = { id, ...rest, user };
    await this.addressRepo.save(addressEntitySave);
    return new ResAddressDto(addressEntitySave);
  }

  async findAddressById(id: string): Promise<AddressEntity | null> {
    return this.addressRepo.findOne({ where: { id }, relations: ['user'] });
  }

  async findAddressByUser(user: UsersEntity): Promise<AddressEntity | null> {
    return this.addressRepo.findOne({
      where: { user: user },
      relations: ['user'],
    });
  }

  async getAllAddress(): Promise<ResAddressDto[]> {
    const result = await this.addressRepo.find({
      where: {},
      relations: ['user'],
    });

    const resAddress: ResAddressDto[] = [];
    result.forEach((res) => {
      resAddress.push(new ResAddressDto(res));
    });
    return resAddress;
  }

  async getAddress(userId: string): Promise<ResAddressDto[]> {
    const result = await this.addressRepo.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    const resAddress: ResAddressDto[] = [];
    result.forEach((res) => {
      resAddress.push(new ResAddressDto(res));
    });
    return resAddress;
  }

  async deleteAddress(addressId: string, userId: string): Promise<object> {
    const address = await this.findAddressById(addressId);
    if (!address) {
      AddressException.addressNotFound();
    }
    if (address.user.id !== userId) {
      AuthException.forbidden();
    }
    await this.addressRepo.remove(address);
    return {
      message: 'successfully deleted',
      status: 200,
    };
  }
}
