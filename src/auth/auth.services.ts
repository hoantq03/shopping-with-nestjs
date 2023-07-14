import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthException } from 'src/exception';
import { UserServices } from 'src/user/user.services';
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
    const payLoad = { userId: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payLoad),
    };
  }
}
