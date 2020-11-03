import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CriteriaType } from '../entity/criteria.entity';

export class CreateCriteriaDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  point: number;

  @ApiProperty()
  @IsNumber()
  type: CriteriaType;
}
