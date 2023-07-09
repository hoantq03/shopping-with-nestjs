import { Injectable } from '@nestjs/common';
import { AuthException } from 'src/exception';
import { UserServices } from 'src/user/user.services';
import * as bcrypt from 'bcrypt';
import { ResUserDto } from 'src/user/dto';
@Injectable()
export class AuthServices {
  constructor(private userServices: UserServices) {}

  async validateUser(email: string, password: string) {
    const userEntity = await this.userServices.findUserByEmail(email);
    if (!userEntity) {
      throw AuthException.unauthorized();
    }
    return (await bcrypt.compare(password, userEntity.password))
      ? new ResUserDto(userEntity)
      : null;
  }
}
