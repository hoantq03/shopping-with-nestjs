import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CartEntity } from '../cart/entity';
import { UserStatus } from '../common';
import { AuthException, UserException } from '../exception';
import { RegisterUserDto, ResUserDto } from '../user/dto';
import { UsersEntity } from '../user/entity';
import { UserServices } from '../user/user.services';
import { UserJwtPayload } from './types';
import { ResLoginDto } from './dto/login';
@Injectable()
export class AuthServices {
  constructor(
    private userServices: UserServices,
    private jwtService: JwtService,
    @InjectRepository(UsersEntity)
    private userRepo: Repository<UsersEntity>,
    @InjectRepository(CartEntity)
    private cartRepo: Repository<CartEntity>,
  ) {}

  async signUp(props: RegisterUserDto): Promise<object> {
    if (props.password !== props.confirmPassword) {
      UserException.passwordNotMatch();
    }
    const userExist: UsersEntity | null =
      await this.userServices.findUserByEmail(props.email);
    if (userExist) {
      UserException.userExist();
    }
    const userId: string = UsersEntity.createUserId();
    props.password = await bcrypt.hash(
      props.password,
      Number.parseInt(process.env.SALT, 10),
    );
    // test

    const userSignUp: UsersEntity = this.userRepo.create({
      ...props,
      id: userId,
      status: UserStatus.ACTIVE,
      orders: [],
    });

    const cartId = CartEntity.createCartId();
    const cart = this.cartRepo.create({
      id: cartId,
      cartItems: [],
      total_amount: 0,
    });

    await this.cartRepo.save(cart);
    userSignUp.cart = cart;

    await this.userRepo.save(userSignUp);

    const user = new ResUserDto(userSignUp);
    const payLoad: UserJwtPayload = { userId: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payLoad);
    return {
      access_token,
    };
  }

  async signIn(email: string, password: string): Promise<ResLoginDto> {
    const user = await this.userServices.findUserByEmail(email);
    if (!user) {
      AuthException.emailNotExist();
    }
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      AuthException.unauthorized();
    }
    const payLoad: UserJwtPayload = { userId: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payLoad);
    return {
      access_token,
    };
  }
}
