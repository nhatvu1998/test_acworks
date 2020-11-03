import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import {
  JWTPayload,
  UserSession,
} from 'src/share/interface/session.interface';
import {ConfigService} from '../../../share/module/config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JWTPayload): Promise<UserSession> {
    const user = await this.userService.findOneById(payload.userId);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return {
      userId: user.id,
      isAdmin: payload.isAdmin,
    };
  }
}
