import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { DeleteResult, Repository } from 'typeorm';
import { UserStatus } from '../common';
import { AuthException, UserException } from '../exception';
import {
  RegisterUserDto,
  ReqFindAllUserDto,
  ReqUpdateUserDto,
  ReqUserStatusDto,
  ResUserDto,
} from './dto';
import { UsersEntity } from './entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ReqAddAddress, ResAddressDto } from './dto/add-address';
import { AddressEntity } from 'src/user/entity';
import { add, isEmpty } from 'lodash';
import { AddressException } from 'src/exception/address.exception';

@Injectable()
export class UserServices {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepo: Repository<UsersEntity>,
    @InjectRepository(AddressEntity)
    private addressRepo: Repository<AddressEntity>,
    private jwtService: JwtService,
  ) {}

  async getAllUser(body: ReqFindAllUserDto): Promise<ResUserDto[]> {
    const ResUsers: ResUserDto[] = [];
    const users: UsersEntity[] = await this.userRepo.find({
      where: { status: body.status },
      relations: ['address'],
    });

    users.forEach((user) => {
      ResUsers.push(new ResUserDto(user));
    });

    return ResUsers;
  }

  async signUp(props: RegisterUserDto): Promise<object> {
    if (props.password !== props.confirmPassword) {
      UserException.passwordNotMatch();
    }
    const userExist: UsersEntity | null = await this.findUserByEmail(
      props.email,
    );
    if (userExist) {
      UserException.userExist();
    }
    const userId: string = UsersEntity.createUserId();
    props.password = await bcrypt.hash(
      props.password,
      Number.parseInt(process.env.SALT, 10),
    );

    const userSignUp: UsersEntity = this.userRepo.create({
      ...props,
      id: userId,
      status: UserStatus.ACTIVE,
    });
    await this.userRepo.save(userSignUp);

    const user = new ResUserDto(userSignUp);
    const payLoad = { userId: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payLoad),
    };
  }

  async findUserByEmail(email: string): Promise<UsersEntity | null> {
    const user: UsersEntity = await this.userRepo.findOne({
      where: { email },
      relations: ['address'],
    });
    return user ? user : null;
  }

  async findUserById(id: string): Promise<UsersEntity | null> {
    const user: UsersEntity = await this.userRepo.findOne({
      where: { id },
      relations: ['address'],
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
    if (!user) {
      UserException.userNotFound();
    }

    user.role = updatedData.role ?? user.role;
    user.password = hashPassword ?? user.password;
    user.status = status ?? user.status;
    user.firstName = updatedData.firstName ?? user.firstName;
    user.lastName = updatedData.lastName ?? user.lastName;
    user.phone = updatedData.phone ?? user.phone;
    user.birthday = updatedData.birthday ?? user.birthday;
    user.updatedAt = new Date();
    //updated by later
    await this.userRepo.save(user);
    return new ResUserDto(user);
  }

  async changeStatusUser(
    id: string,
    body: ReqUserStatusDto,
  ): Promise<ResUserDto> {
    const user: UsersEntity = await this.findUserById(id);
    user.status = body.status;
    await this.userRepo.save(user);
    return new ResUserDto(user);
  }

  async addAddress(address: ReqAddAddress): Promise<ResAddressDto> {
    const { userId, ...rest } = { ...address };
    const user = await this.findUserById(userId);
    const addressExisted = await this.userRepo.findOne({
      where: { address: { address_line: address.address_line } },
    });
    if (addressExisted) {
      AddressException.addressExisted();
    }
    const id = AddressEntity.createAddressId();
    const addressEntitySave = { id, ...rest, user };
    console.log(addressEntitySave);
    await this.addressRepo.save(addressEntitySave);
    return new ResAddressDto(addressEntitySave);
  }

  async findAddressById(id: string): Promise<ResAddressDto | null> {
    return new ResAddressDto(
      await this.addressRepo.findOne({ where: { id }, relations: ['user'] }),
    );
  }

  async findAddressByUser(user: UsersEntity): Promise<ResAddressDto | null> {
    return new ResAddressDto(
      await this.addressRepo.findOne({
        where: { user: user },
        relations: ['user'],
      }),
    );
  }

  async getAllAddress(): Promise<ResAddressDto[]> {
    const result = await this.addressRepo.find({
      where: {},
      relations: ['user'],
    });
    if (isEmpty(result)) AddressException.addressNotFound();
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
    if (address.userId !== userId) {
      AuthException.forbidden();
    }
    await this.addressRepo.delete(address);
    return {
      message: 'successfully deleted',
      status: 204,
    };
  }
}
