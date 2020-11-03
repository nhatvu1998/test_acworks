import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Public } from '../../../share/decorator/public.decorator';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../../user/entity/user.entity';
import { RegisterDto } from '../../auth/dto/register.dto';
import { CriteriaService } from '../criteria.service';
import { CriteriaEntity } from '../entity/criteria.entity';
import { CreateCriteriaDto } from '../dto/create-criteria.dto';
import { UpdateCriteriaBody } from '../dto/update-criteria.dto';
import { GetUserCriteriasQuery } from '../dto/get-criterias.dto';
import { User } from '../../../share/decorator/user.decorator';
import { UserSession } from '../../../share/interface/session.interface';
import { Scopes } from '../../../share/decorator/scope.decorator';
import { PermissionScopes } from '../../user/entity/permission.entity';
import { GetUserQuery } from '../../user/dto/get-users.dto';

@ApiTags('criteria')
@Controller('criteria')
export class CriteriaController {
  constructor(private readonly criteriaService: CriteriaService) {
  }

  @Get('')
  @Scopes(PermissionScopes.ReadCriteria)
  @ApiOkResponse({type: [CriteriaEntity]})
  async getManyCriterias(@Query() {startDate, endDate}: GetUserCriteriasQuery, @User() user: UserSession) {
    return this.criteriaService.getManyUserCriterias(startDate, endDate);
  }

  @Get(':id')
  @Scopes(PermissionScopes.ReadCriteria)
  @ApiOkResponse({type: CriteriaEntity})
  async getCriteria(@Param('id') criteriaId: number) {
    return this.criteriaService.findOneCriteriaById(criteriaId);
  }

  @Post('')
  @Scopes(PermissionScopes.WriteCriteria)
  @ApiOkResponse({type: CriteriaEntity})
  async addCriteria(@Body() { name, point, type }: CreateCriteriaDto) {
    return this.criteriaService.createCriteria(name, point, type);
  }

  @Put(':id')
  @Scopes(PermissionScopes.WriteCriteria)
  @ApiOkResponse({type: CriteriaEntity})
  async updateCriteria(@Body() { name, point, type }: UpdateCriteriaBody, @Param('id') criteriaId: number) {
    return this.criteriaService.updateCriteria(criteriaId, name, point, type)
  }

  @Delete(':id')
  @Scopes(PermissionScopes.WriteCriteria)
  @ApiOkResponse({type: CriteriaEntity})
  async deleteCriteria(@Param('id') criteriaId: number) {
    return this.criteriaService.deleteCriteria(criteriaId)
  }


}
