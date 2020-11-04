import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {AuthService} from './auth.service';
import {UserService} from '../user/user.service';
import {ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {Public} from '../../share/decorator/public.decorator';
import {AccessTokenDto} from './dto/access-token.dto';
import {LoginDto} from './dto/login.dto';
import {RegisterDto} from './dto/register.dto';
import { UserEntity } from '../user/entity/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {
  }

  @Post('login')
  @Public()
  @HttpCode(200)
  @ApiOkResponse({type: AccessTokenDto})
  async login(@Body() loginData: LoginDto) {
    return this.authService.createToken(
      loginData.username,
      loginData.password,
    );
  }

  @Post('register')
  @Public()
  @ApiOkResponse({type: UserEntity})
  async signup(@Body() registerBody: RegisterDto) {
    return this.userService.createUser(registerBody.username, registerBody.password, {
      age: registerBody.age,
      email: registerBody.email,
      gender: registerBody.gender,
      fullname: registerBody.fullname
    });
  }
}
