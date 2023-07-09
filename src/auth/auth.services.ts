import { Injectable } from '@nestjs/common';
import { AuthException } from 'src/exception';
import { UserServices } from 'src/user/user.services';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthServices {
  constructor(
    private userServices: UserServices,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userServices.findUserByEmail(email);
    if (!user) {
      AuthException.emailNotExist();
    }
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      AuthException.unauthorized();
    }
    const payLoad = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payLoad),
    };
  }
}
