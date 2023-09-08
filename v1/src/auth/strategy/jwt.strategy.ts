import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserJwtPayload } from '../types';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken() || ExtractJwt.fromAuthHeader(),
    });
  }

  // Passport will decodes the JWT using the secret key, then invokes the validate method below with the decoded JSON as a parameter
  // Passport builds a user object on the return value and attaches it to the request object
  async validate(payload: UserJwtPayload) {
    const { email, userId } = payload;
    return {
      email,
      userId,
    };
  }
}
