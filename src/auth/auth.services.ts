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

  async signIn(email: string, password: string): Promise<object> {
    const user = await this.userServices.findUserByEmail(email);
    if (!user) {
      AuthException.emailNotExist();
    }
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      AuthException.unauthorized();
    }
    const payLoad = { userId: user.user_id, email: user.email };

    const token = await this.jwtService.signAsync(payLoad);

    return {
      access_token: token,
    };
  }
}
