import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserStatus } from '../common';
import { UserException } from '../exception';
import {
  CreateUserDto,
  ReqFindAllUserDto,
  ReqUpdateUserDto,
  ReqUserStatusDto,
  ResUserDto,
} from './dto';
import { UsersEntity } from './user.entity';

@Injectable()
export class UserServices {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepo: Repository<UsersEntity>,
  ) {}

  async getAllUser(body: ReqFindAllUserDto): Promise<ResUserDto[]> {
    const ResUsers: ResUserDto[] = [];
    const users: UsersEntity[] = await this.userRepo.find({
      where: { status: body.status },
    });

    users.forEach((user) => {
      ResUsers.push(new ResUserDto(user));
    });

    return ResUsers;
  }

  async createUser(props: CreateUserDto): Promise<ResUserDto> {
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

    const userCreate: UsersEntity = this.userRepo.create({
      ...props,
      id: userId,
      status: UserStatus.ACTIVE,
    });
    await this.userRepo.save(userCreate);
    return new ResUserDto(userCreate);
  }

  async findUserByEmail(email: string): Promise<UsersEntity> {
    const user: UsersEntity = await this.userRepo.findOne({
      where: { email },
    });
    if (!user) return new UserException.userNotFound();
    return user;
  }

  async findUserById(id: string): Promise<UsersEntity | null> {
    const user: UsersEntity = await this.userRepo.findOne({ where: { id } });
    if (!user) return new UserException.userNotFound();
    return user;
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
}
