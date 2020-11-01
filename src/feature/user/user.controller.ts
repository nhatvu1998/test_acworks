import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {UserService} from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../../share/decorator/user.decorator';
import { UserEntity } from './entity/user.entity';
import { UserSession } from '../../share/interface/session.interface';
import { GetUserQuery } from './dto/get-users.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get('')
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async getUsers(@Query() getUsersQuery: GetUserQuery) {
    return this.userService.getUsers(getUsersQuery.username, getUsersQuery.page, getUsersQuery.limit);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async getUser(@Param('id') userId: number) {
    return this.userService.getUserByIdOrFail(userId);
  }

  @Put(':id')
  async updateUser(@Body() updateUserBody: UpdateUserDto, @Param('id') userId: number) {
    return this.userService.updateUser(userId, {
      username: updateUserBody.username,
      age: updateUserBody.age,
      email: updateUserBody.email,
      gender: updateUserBody.gender,
      fullname: updateUserBody.fullname,
      }
    );
  }

  @Delete(':id')
  async remove(@Param('id') userId: number) {
    return this.userService.deleteUser(userId);
  }
}
