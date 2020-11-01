import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CriteriaService } from '../criteria.service';
import { CreateLabelBody } from '../dto/create-label.dto';
import { LabelEntity } from '../entity/label.entity';
import { GetLabelsQuery } from '../dto/get-labels.dto';
import { UpdateLabelBody } from '../dto/update-label.dto';

@ApiTags('labels')
@Controller('labels')
export class LabelController {
  constructor(private readonly criteriaService: CriteriaService) {
  }

  @Get('')
  @ApiOkResponse({ type: [LabelEntity] })
  async getLabels() {
    return this.criteriaService.getLabels();
  }

  @Post('')
  @ApiOkResponse({ type: LabelEntity })
  async createLabel(@Body() { name, point, type }: CreateLabelBody) {
    return this.criteriaService.createLabel(name, point, type);
  }

  @Put(':id')
  @ApiOkResponse({ type: LabelEntity })
  async updateLabel(@Body() { name, point, type }: UpdateLabelBody, @Param('id') labelId: number) {
    return this.criteriaService.updateLabel(labelId, name, point, type);
  }

  @Delete(':id')
  async remove(@Param('id') labelId: number) {
    return this.criteriaService.deleteLabel(labelId);
  }
}
