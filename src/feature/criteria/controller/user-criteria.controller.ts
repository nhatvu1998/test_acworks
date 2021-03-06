import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CriteriaService } from '../criteria.service';
import { CriteriaEntity } from '../entity/criteria.entity';
import { User } from '../../../share/decorator/user.decorator';
import { UserSession } from '../../../share/interface/session.interface';
import { Scopes } from '../../../share/decorator/scope.decorator';
import { PermissionScopes } from '../../user/entity/permission.entity';
import { CreateUserCriteriaDto } from '../dto/create-user-criteria.dto';
import { GetUserCriteriasQuery } from '../dto/get-user-criterias.dto';

@ApiTags('userCriteria')
@Controller('userCriteria')
export class UserCriteriaController {
  constructor(private readonly criteriaService: CriteriaService) {
  }

  @Get('')
  @Scopes(PermissionScopes.ReadCriteria)
  @ApiOkResponse({type: [CriteriaEntity]})
  async getManyCriterias(@Query() {startDate, endDate}: GetUserCriteriasQuery, @User() user: UserSession) {
    return this.criteriaService.getManyUserCriterias(startDate, endDate);
  }

  @Get('detail')
  @Scopes(PermissionScopes.ReadCriteria)
  @ApiOkResponse({type: [CriteriaEntity]})
  async getManyUserCriterias(@Query() {startDate, endDate}: GetUserCriteriasQuery, @User() user: UserSession) {
    return this.criteriaService.getUserCriterias(startDate, endDate, user.userId);
  }

  @Post('')
  @Scopes(PermissionScopes.WriteCriteria)
  @ApiOkResponse({type: CriteriaEntity})
  async addUserCriteria(@Body() {  userId, criteriaIds, date }: CreateUserCriteriaDto) {
    return this.criteriaService.createUserCriteria(userId, criteriaIds, date);
  }
}
