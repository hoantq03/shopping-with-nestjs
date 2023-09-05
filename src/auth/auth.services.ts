import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthException, UserException } from 'src/exception';
import { UserServices } from 'src/user/user.services';
import { UserJwtPayload } from './interfaces';
import { RegisterUserDto, ResUserDto } from 'src/user/dto';
import { UsersEntity } from 'src/user/entity';
import { CartEntity } from 'src/cart/entity';
import { UserStatus } from 'src/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  async signIn(email: string, password: string): Promise<object> {
    const user = await this.userServices.findUserByEmail(email);
    if (!user) {
      AuthException.emailNotExist();
    }
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      AuthException.unauthorized();
    }
    const payLoad: UserJwtPayload = { userId: user.id, email: user.email };

    const token = await this.jwtService.signAsync(payLoad);

    return {
      access_token: token,
    };
  }

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
    const cartId = CartEntity.createCartId();
    const cart: CartEntity = this.cartRepo.create({
      id: cartId,
      amount_total: 0,
    });
    await this.cartRepo.save(cart);

    const userSignUp: UsersEntity = this.userRepo.create({
      ...props,

      id: userId,
      status: UserStatus.ACTIVE,
      cart: cart,
      orders: [],
    });
    await this.userRepo.save(userSignUp);

    const user = new ResUserDto(userSignUp);
    const payLoad: UserJwtPayload = { userId: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payLoad),
    };
  }
}
