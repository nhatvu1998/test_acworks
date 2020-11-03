import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import {ConfigService} from "../../share/module/config/config.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async getPermissionsByUserId(userId: number) {
    return this.userRepo
      .createQueryBuilder('u')
      .innerJoinAndSelect('u.roles', 'r')
      .innerJoinAndSelect('r.permissions', 'p')
      .where('u.id = :userId', { userId })
      .getOne();
  }

  async createToken(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByName(username);
    console.log(user);
    if (!user) throw new UnauthorizedException('Invalid username or password');
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const token = this.jwtService.sign({
      isAdmin: user.username === this.configService.get('ADMIN_USERNAME'),
      userId: user.id,
      username: user.username,
      roles: user.roles.map(r => r.id),
    });
    return { token };
  }
}
