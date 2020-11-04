import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { PointType } from '../entity/criteria.entity';

export class CreateCriteriaDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  point: number;

  @ApiProperty()
  @IsNumber()
  type: PointType;
}
