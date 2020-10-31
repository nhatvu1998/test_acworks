import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {UserService} from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../../share/decorator/user.decorator';
import { UserEntity } from './entity/user.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(
    private readonly userService: UserService,
  ) {}
  
  @Post('update')
  updateUser(@Body() updateUserBody: UpdateUserDto, @User('user') user: UserEntity) {
    return this.userService.updateUser(user.id, {
      username: updateUserBody.username,
      age: updateUserBody.age,
      email: updateUserBody.email,
      gender: updateUserBody.gender,
      fullname: updateUserBody.fullname,
      }
    );
  }
}
