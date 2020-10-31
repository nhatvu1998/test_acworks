import { Body, Controller, Post } from '@nestjs/common';
import {AuthService} from './auth.service';
import {UserService} from '../user/user.service';
import {ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {Public} from '../../share/decorator/public.decorator';
import {AccessTokenDto} from './dto/access-token.dto';
import {LoginDto} from './dto/login.dto';
import {RegisterDto} from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {
  }

  @Post('login')
  @Public()
  @ApiOkResponse({type: AccessTokenDto})
  async login(@Body() loginData: LoginDto) {
    return this.authService.createToken(
      loginData.username,
      loginData.password,
    );
  }

  @Post('register')
  @Public()
  async signup(@Body() registerBody: RegisterDto) {
    return this.userService.createUser(registerBody.username, registerBody.password, {
      age: registerBody.age,
      email: registerBody.email,
      gender: registerBody.gender,
      fullname: registerBody.fullname
    });
  }
}
