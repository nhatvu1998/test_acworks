import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Public } from '../../../share/decorator/public.decorator';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../../user/entity/user.entity';
import { RegisterDto } from '../../auth/dto/register.dto';
import { CriteriaService } from '../criteria.service';
import { CriteriaEntity } from '../entity/criteria.entity';
import { CreateCriteriaDto } from '../dto/create-criteria.dto';
import { UpdateCriteriaBody } from '../dto/update-criteria.dto';
import { GetCriteriasQuery } from '../dto/get-criterias.dto';

@ApiTags('criteria')
@Controller('criteria')
export class CriteriaController {
  constructor(private readonly criteriaService: CriteriaService) {
  }

  @Get('')
  @ApiOkResponse({type: [CriteriaEntity]})
  async getCriterias(@Body() { name, limit, page }: GetCriteriasQuery) {
    return this.criteriaService.getCriterias(name, limit, page);
  }

  @Get('id')
  @ApiOkResponse({type: CriteriaEntity})
  async getCriteria(@Param('id') criteriaId: number) {
    return this.criteriaService.getCriteriaByIdOrFail(criteriaId);
  }

  @Post('')
  @ApiOkResponse({type: CriteriaEntity})
  async addCriteria(@Body() { name, description, userId, labelIds, date }: CreateCriteriaDto) {
    return this.criteriaService.createCriteria(name, description, userId, labelIds, date);
  }

  @Put('id')
  @ApiOkResponse({type: CriteriaEntity})
  async updateCriteria(@Body() { name, description, labelIds, date }: UpdateCriteriaBody, @Param('id') criteriaId: number) {
    return this.criteriaService.updateCriteria(criteriaId, name, description, labelIds, date)
  }

  @Delete('id')
  @ApiOkResponse({type: CriteriaEntity})
  async deleteCriteria(@Param('id') criteriaId: number) {
    return this.criteriaService.deleteCriteria(criteriaId)
  }
}
