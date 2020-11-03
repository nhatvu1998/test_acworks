import { Body, Controller, Delete, Get, Logger, Param, Put, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entity/user.entity';
import { GetUserQuery } from './dto/get-users.dto';
import { Scopes } from '../../share/decorator/scope.decorator';
import { PermissionScopes } from './entity/permission.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get('')
  @Scopes(PermissionScopes.ReadUser)
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async getUsers(@Query() getUsersQuery: GetUserQuery) {
    return this.userService.getUsers(getUsersQuery.username, getUsersQuery.page, getUsersQuery.limit);
  }

  @Get(':id')
  @Scopes(PermissionScopes.ReadUser)
  @ApiOkResponse({ type: UserEntity })
  async getUser(@Param('id') userId: number) {
    return this.userService.getUserByIdOrFail(userId);
  }

  @Put(':id')
  @Scopes(PermissionScopes.WriteUser)
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
  @Scopes(PermissionScopes.WriteUser)
  async remove(@Param('id') userId: number) {
    return this.userService.deleteUser(userId);
  }
}
